import React, { useState } from 'react';
import { Header } from './components/Header';
import { GlobalSubseaMap } from './components/GlobalSubseaMap';
import { ChokepointMatrix } from './components/ChokepointMatrix';
import { CableLedger } from './components/CableLedger';
import { LatencyShockSimulator } from './components/LatencyShockSimulator';
import { IncidentDossier } from './components/IncidentDossier';
import { RepairFleetStatus } from './components/RepairFleetStatus';
import { getComputedStats } from './lib/data';
import { ShieldAlert, Cpu, Globe } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const stats = getComputedStats();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Institutional Macro Ticker */}
      <div className="bg-[#050C1A] border-b border-cyan-950/70 py-3">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Tracked Arteries</span>
            <strong className="text-white text-base font-bold">{stats.totalTrackedCables} Systems</strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Total Capacity</span>
            <strong className="text-cyan-400 text-base font-bold">{stats.totalCapacityTbps} Tbps</strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Optical Reach</span>
            <strong className="text-white text-base font-bold">{(stats.totalTrackedKm / 1000).toFixed(0)}k km</strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Critical Chokepoints</span>
            <strong className="text-red-400 text-base font-bold">4 Strategic Nodes</strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Daily SWIFT/Fedwire</span>
            <strong className="text-emerald-400 text-base font-bold">${stats.dailyFinancialSettlementTrillion.toFixed(1)} Trillion</strong>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 uppercase block">Red Sea Latency Tax</span>
            <strong className="text-amber-400 text-base font-bold">+{stats.redSeaLatencyPenaltyMs} ms RTT</strong>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'map' && <GlobalSubseaMap />}
        {activeTab === 'chokepoints' && <ChokepointMatrix />}
        {activeTab === 'cables' && <CableLedger />}
        {activeTab === 'simulator' && <LatencyShockSimulator />}
        {activeTab === 'incidents' && <IncidentDossier />}
        {activeTab === 'fleet' && <RepairFleetStatus />}
      </main>

      {/* Tactical Institutional Footer */}
      <footer className="border-t border-slate-800/80 bg-[#040812] py-8 text-xs font-mono text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-slate-200 font-bold uppercase text-[11px] mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Subsea Optical Mandate
            </h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Undersea optical cables transmit over 99% of all intercontinental traffic. Satellite constellations lack the high-density Petabit-scale bandwidth required to sustain global cloud and cross-border bank settlement infrastructure.
            </p>
          </div>

          <div>
            <h3 className="text-slate-200 font-bold uppercase text-[11px] mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              Standing Verification Invariants
            </h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every system, chokepoint, and cut incident is sourced directly from TeleGeography, the International Cable Protection Committee (ICPC), and SubTel Forum. All metrics are computed dynamically at runtime.
            </p>
          </div>

          <div>
            <h3 className="text-slate-200 font-bold uppercase text-[11px] mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Intelligence Series Integration
            </h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              SUBSEA-WIRE operates in real-time correlation with God's Eye Chokepoint Terminal and Macro Watch to monitor maritime, energy, and digital disruption vectors.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-slate-800/50 flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-500">
          <div>SUBSEA-WIRE // DEEPSEA FIBER & SEABED DEFENSE COMMAND · 2026 CYCLE</div>
          <div className="flex items-center gap-4">
            <span>Mercator Projection WGS-84</span>
            <span>Single Source: data/cables.json</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
