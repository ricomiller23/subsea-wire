import React, { useState } from 'react';
import { getAllCables } from '../lib/data';
import { Server, Search, ExternalLink, Filter } from 'lucide-react';

export const CableLedger: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const cables = getAllCables();

  const filteredCables = cables.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.owners.some(o => o.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          c.landing_points.some(lp => lp.city.toLowerCase().includes(searchTerm.toLowerCase()) || lp.country.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRisk = riskFilter === 'all' || c.risk_level === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            <span>TRANSOCEANIC FIBER ARTERY REGISTRY</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Displaying {filteredCables.length} of {cables.length} primary tracked intercontinental optical cable systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by cable, landing, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-xl p-1 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-500 ml-2" />
            {['all', 'critical', 'high', 'moderate', 'low'].map(r => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                className={`px-2.5 py-1 rounded-lg uppercase text-[10px] font-bold transition ${
                  riskFilter === r ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cable Cards Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCables.map((cable) => (
          <div
            key={cable.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition-all space-y-3.5 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="font-mono text-base font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                  {cable.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  cable.risk_level === 'critical' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  cable.risk_level === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  cable.risk_level === 'moderate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {cable.risk_level} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2.5 border-b border-slate-800/60 text-slate-300">
                <div>Capacity: <strong className="text-cyan-400">{cable.design_capacity_tbps} Tbps</strong></div>
                <div>Length: <strong className="text-white">{cable.length_km.toLocaleString()} km</strong></div>
                <div>Fiber Pairs: <strong className="text-white">{cable.fiber_pairs}</strong></div>
                <div>RFS Year: <strong className="text-white">{cable.rfs_year}</strong></div>
              </div>

              <div className="py-2.5 space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-mono block">Owners & Consortium:</span>
                  <span className="text-slate-300 font-medium">{cable.owners.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-mono block">Landing Hubs:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {cable.landing_points.map((lp, idx) => (
                      <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">
                        {lp.city}, {lp.country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Retrieved {cable.retrieved_at}</span>
              <a
                href={cable.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <span>TeleGeography Spec</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
