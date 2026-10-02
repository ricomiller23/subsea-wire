import React from 'react';
import { getAllChokepoints } from '../lib/data';
import { ShieldAlert, AlertTriangle, ExternalLink, Activity } from 'lucide-react';

export const ChokepointMatrix: React.FC = () => {
  const chokepoints = getAllChokepoints();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          <span>STRATEGIC MARITIME FIBER BOTTLENECKS</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Geographic choke points carrying critical percentages of intercontinental internet traffic and financial settlement messages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chokepoints.map((choke) => (
          <div
            key={choke.id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-cyan-800/80 transition-all space-y-4 shadow-lg"
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  {choke.region}
                </span>
                <h3 className="text-base font-bold text-white font-mono mt-0.5">{choke.name}</h3>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                choke.threat_status === 'Severe' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
                choke.threat_status === 'High' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                'bg-blue-500/20 text-blue-300 border-blue-500/40'
              }`}>
                {choke.threat_status} Threat
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-mono">
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Subsea Cables</div>
                <div className="text-base font-black text-cyan-400 mt-0.5">{choke.cables_transiting}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Traffic Share</div>
                <div className="text-base font-black text-white mt-0.5">{choke.share_of_eurasia_traffic}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Latency Penalty</div>
                <div className="text-base font-black text-amber-400 mt-0.5">+{choke.current_latency_penalty_ms}ms</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                Active Vulnerabilities & Seabed Threats:
              </span>
              <ul className="space-y-1 text-xs text-slate-300 pl-4 list-disc">
                {choke.risk_factors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-500" />
                Retrieved {choke.retrieved_at}
              </span>
              <a
                href={choke.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <span>Primary Dossier</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
