import React, { useState } from 'react';
import { getAllCables, getAllChokepoints } from '../lib/data';
import type { Cable, Chokepoint } from '../types';
import { ShieldAlert, Server, ExternalLink, Zap } from 'lucide-react';

export const GlobalSubseaMap: React.FC = () => {
  const cables = getAllCables();
  const chokepoints = getAllChokepoints();
  const [selectedCable, setSelectedCable] = useState<Cable | null>(cables[0]);
  const [selectedChoke, setSelectedChoke] = useState<Chokepoint | null>(null);

  // Approximate Mercator projection mapping lat/lon to 1000x500 SVG coordinates
  const project = (lat: number, lon: number) => {
    const x = ((lon + 180) / 360) * 1000;
    // clamping latitude between -75 and 75
    const clampedLat = Math.max(-75, Math.min(75, lat));
    const y = ((75 - clampedLat) / 150) * 500;
    return { x, y };
  };

  return (
    <div className="space-y-4">
      {/* Map Control HUD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-white font-bold">OPTICAL TRANSOCEANIC RADAR</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Tracking {cables.length} Strategic Arteries ({cables.reduce((a,c) => a + c.length_km, 0).toLocaleString()} km)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Operational
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span> Monitored
          </span>
          <span className="flex items-center gap-1.5 text-red-400">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span> Impaired / Bottleneck
          </span>
        </div>
      </div>

      {/* SVG Vector Map Container */}
      <div className="relative bg-[#040812] border border-cyan-950/80 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-3 left-4 z-10 pointer-events-none">
          <div className="text-[10px] font-mono text-cyan-500/80 tracking-widest uppercase">
            COORDINATE GRID: MERCATOR WGS-84 · REALTIME FIBER TRACE
          </div>
        </div>

        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto max-h-[550px] select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#071326] via-[#040812] to-[#02050b]"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="0.8" />
            </pattern>

            {/* Glowing cable filters */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="500" fill="url(#grid)" />

          {/* Stylized Continents Outlines */}
          <g fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1.2">
            {/* North America */}
            <path d="M 120 80 Q 220 70 280 110 T 260 210 Q 200 240 180 270 T 120 200 Z" />
            {/* South America */}
            <path d="M 270 270 Q 350 290 340 370 T 290 460 Q 250 430 260 350 Z" />
            {/* Eurasia & Africa */}
            <path d="M 450 70 Q 600 60 780 90 T 880 170 Q 750 220 620 200 T 500 120 Z" />
            <path d="M 470 190 Q 560 190 560 290 T 520 420 Q 450 370 460 270 Z" />
            {/* Australia */}
            <path d="M 780 340 Q 880 330 890 390 T 820 440 Q 760 410 780 340 Z" />
          </g>

          {/* Equator & Tropics Reference Lines */}
          <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(6, 182, 212, 0.1)" strokeDasharray="4 4" strokeWidth="0.8" />
          <text x="12" y="246" fill="rgba(6, 182, 212, 0.3)" fontSize="8" fontFamily="monospace">EQUATOR 0°</text>

          {/* Render Undersea Cables */}
          {cables.map((cable) => {
            const isSelected = selectedCable?.id === cable.id;
            const isCritical = cable.risk_level === 'critical' || cable.status === 'impaired-rerouted';
            const strokeColor = isCritical ? '#EF4444' : isSelected ? '#38BDF8' : '#06B6D4';
            const strokeWidth = isSelected ? 3 : isCritical ? 2 : 1.4;

            // Generate Path
            const pts = cable.landing_points.map(p => project(p.lat, p.lon));
            if (pts.length < 2) return null;

            let pathD = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 1; i < pts.length; i++) {
              // Handle Pacific wrap-around if deltaX is very large
              const deltaX = pts[i].x - pts[i - 1].x;
              if (Math.abs(deltaX) > 600) {
                pathD += ` L ${pts[i].x > 500 ? 1000 : 0} ${pts[i - 1].y} M ${pts[i].x > 500 ? 0 : 1000} ${pts[i].y}`;
              }
              pathD += ` L ${pts[i].x} ${pts[i].y}`;
            }

            return (
              <g key={cable.id} className="cursor-pointer" onClick={() => { setSelectedCable(cable); setSelectedChoke(null); }}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={isSelected ? 1 : 0.75}
                  strokeDasharray={isCritical ? '4 2' : undefined}
                  filter={isCritical ? 'url(#glow-red)' : 'url(#glow-cyan)'}
                  className="transition-all hover:stroke-white hover:stroke-width-3"
                />

                {/* Cable Landing Nodes */}
                {pts.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 4 : 2.5}
                    fill={isCritical ? '#EF4444' : '#38BDF8'}
                    stroke="#040812"
                    strokeWidth="1"
                  />
                ))}
              </g>
            );
          })}

          {/* Strategic Maritime Chokepoint Danger Zones */}
          {chokepoints.map((choke) => {
            let coords = { x: 550, y: 220 }; // default
            if (choke.id === 'choke-red-sea') coords = project(12.5, 43.3);
            if (choke.id === 'choke-luzon') coords = project(20.5, 121.5);
            if (choke.id === 'choke-malacca') coords = project(2.2, 102.1);
            if (choke.id === 'choke-baltic') coords = project(59.5, 24.5);

            const isChokeSelected = selectedChoke?.id === choke.id;

            return (
              <g
                key={choke.id}
                className="cursor-pointer"
                onClick={() => { setSelectedChoke(choke); setSelectedCable(null); }}
              >
                {/* Pulsing ring */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="14"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="animate-spin"
                  style={{ transformOrigin: `${coords.x}px ${coords.y}px`, animationDuration: '6s' }}
                />
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isChokeSelected ? 7 : 5}
                  fill="#EF4444"
                  className="animate-pulse"
                />
                <text
                  x={coords.x + 9}
                  y={coords.y + 3}
                  fill="#F87171"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {choke.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Quick-Look Dossier Card */}
        {selectedCable && (
          <div className="absolute bottom-4 left-4 max-w-sm bg-slate-950/95 border border-cyan-800/80 rounded-xl p-4 backdrop-blur shadow-2xl text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-cyan-400" />
                <strong className="text-white font-mono text-sm">{selectedCable.name}</strong>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                selectedCable.status === 'impaired-rerouted' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {selectedCable.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
              <div>Capacity: <strong className="text-cyan-300">{selectedCable.design_capacity_tbps} Tbps</strong></div>
              <div>Length: <strong className="text-white">{selectedCable.length_km.toLocaleString()} km</strong></div>
              <div>Fiber Pairs: <strong className="text-white">{selectedCable.fiber_pairs}</strong></div>
              <div>RFS Year: <strong className="text-white">{selectedCable.rfs_year}</strong></div>
            </div>

            <div className="text-[11px] text-slate-400">
              <span className="text-slate-500">Owners: </span>
              {selectedCable.owners.join(', ')}
            </div>

            <div className="text-[11px] text-slate-400">
              <span className="text-slate-500">Landing Hubs: </span>
              {selectedCable.landing_points.map(l => `${l.city} (${l.country})`).join(' ↔ ')}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Retrieved {selectedCable.retrieved_at}</span>
              <a
                href={selectedCable.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <span>TeleGeography Spec</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {selectedChoke && (
          <div className="absolute bottom-4 left-4 max-w-sm bg-slate-950/95 border border-red-800/80 rounded-xl p-4 backdrop-blur shadow-2xl text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <strong className="text-white font-mono text-sm">{selectedChoke.name}</strong>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-red-500/20 text-red-300 border border-red-500/40">
                {selectedChoke.threat_status} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
              <div>Transiting Cables: <strong className="text-red-400">{selectedChoke.cables_transiting}</strong></div>
              <div>Eurasia Share: <strong className="text-white">{selectedChoke.share_of_eurasia_traffic}</strong></div>
              <div className="col-span-2">Active Reroute Latency Penalty: <strong className="text-amber-400">+{selectedChoke.current_latency_penalty_ms} ms</strong></div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Threat Drivers:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-300">
                {selectedChoke.risk_factors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Retrieved {selectedChoke.retrieved_at}</span>
              <a
                href={selectedChoke.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
              >
                <span>SubTel Forum Dossier</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
