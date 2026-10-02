import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Globe, Server, Anchor, AlertTriangle, ExternalLink } from 'lucide-react';
import { getComputedStats } from '../lib/data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [utcTime, setUtcTime] = useState('');
  const stats = getComputedStats();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'map', label: 'Tactical Map', icon: Globe },
    { id: 'chokepoints', label: 'Chokepoint Telemetry', icon: ShieldAlert },
    { id: 'cables', label: 'Fiber Artery Ledger', icon: Server },
    { id: 'simulator', label: 'Latency Shock Model', icon: AlertTriangle },
    { id: 'incidents', label: 'Interdiction Log', icon: Activity },
    { id: 'fleet', label: 'Repair Fleet Readiness', icon: Anchor },
  ];

  return (
    <header className="border-b border-cyan-900/50 bg-[#07101E]/95 backdrop-blur sticky top-0 z-50">
      {/* Top Telemetry Strip */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-cyan-950 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 font-bold tracking-wider">SUBSEA-WIRE ACTIVE</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">DEFCON SEABED: <strong className="text-amber-400 font-bold">ELEVATED (LEVEL 3)</strong></span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">GLOBAL SWIFT/FEDWIRE EXPOSURE: <strong className="text-emerald-400 font-bold">${stats.dailyFinancialSettlementTrillion.toFixed(1)}T / DAY</strong></span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="text-cyan-300 font-semibold">{utcTime || 'SYNCHRONIZING CLOCK...'}</span>
          <a
            href="https://www.submarinecablemap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-1 text-[11px]"
          >
            <span>Primary Sources</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Nav & Branding */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-white tracking-tight font-mono flex items-center gap-2">
                <span>SUBSEA-WIRE</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-normal">
                  v4.8 SOURCED TELEMETRY
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Global Undersea Optical Arteries, Seabed Interdiction Telemetry & Financial Latency Shocks
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none font-mono text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 font-bold shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
