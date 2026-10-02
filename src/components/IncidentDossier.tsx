import React from 'react';
import { getAllIncidents } from '../lib/data';
import { AlertCircle, Calendar, MapPin, Wrench, ExternalLink, ShieldCheck } from 'lucide-react';

export const IncidentDossier: React.FC = () => {
  const incidents = getAllIncidents();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span>SUBSEA INTERDICTION & CUT INCIDENT DOSSIER</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Historical log of documented kinetic strikes, commercial anchor drags, and seismic severances with authoritative primary receipts.
        </p>
      </div>

      <div className="space-y-4">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-lg space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  CABLE ARTERY SEVERED
                </span>
                <h3 className="text-base font-bold text-white font-mono mt-0.5">{inc.cable_name}</h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {inc.date}
                </span>
                <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                  <Wrench className="w-3.5 h-3.5" />
                  {inc.repair_duration_days} Days to Restore
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" /> Location:
                </span>
                <p className="text-slate-200 font-medium">{inc.location}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase">Cause / Threat Vector:</span>
                <p className="text-slate-200">{inc.cause}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase">Operational Impact:</span>
                <p className="text-slate-200">{inc.impact}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Retrieved {inc.retrieved_at}
              </span>
              <a
                href={inc.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <span>Authoritative Incident Report</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
