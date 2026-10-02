import React from 'react';
import { getRepairFleet } from '../lib/data';
import { Anchor, MapPin, ExternalLink, Activity } from 'lucide-react';

export const RepairFleetStatus: React.FC = () => {
  const fleet = getRepairFleet();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
          <Anchor className="w-5 h-5 text-cyan-400" />
          <span>GLOBAL SPECIALIZED CABLE REPAIR FLEET</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Fewer than 60 dedicated subsea repair ships operate worldwide. Real-time readiness and deployment hub telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fleet.map((vessel, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-800/80 transition shadow-lg space-y-3.5"
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
                  {vessel.operator}
                </span>
                <h3 className="text-base font-bold text-white font-mono mt-0.5">{vessel.vessel_name}</h3>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                vessel.operational_status === 'Ready for Dispatch' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}>
                {vessel.operational_status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300">
              <div>
                <span className="text-slate-500 text-[10px] block">Flag Jurisdiction:</span>
                <strong>{vessel.flag}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Cable Tank Capacity:</span>
                <strong className="text-cyan-400">{vessel.cable_capacity_tons.toLocaleString()} Tons</strong>
              </div>
              <div className="col-span-2 mt-1">
                <span className="text-slate-500 text-[10px] block flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" /> Operational Station:
                </span>
                <strong className="text-white">{vessel.current_station}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-500" />
                Retrieved {vessel.retrieved_at}
              </span>
              <a
                href={vessel.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <span>Operator Vessel Registry</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
