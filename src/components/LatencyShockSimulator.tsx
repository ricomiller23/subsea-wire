import React, { useState } from 'react';
import { AlertTriangle, RefreshCcw, DollarSign, Clock, ShieldAlert, Cpu } from 'lucide-react';
import { getComputedStats } from '../lib/data';

interface ScenarioState {
  redSeaCut: boolean;
  luzonStraitCut: boolean;
  malaccaCut: boolean;
  balticCut: boolean;
}

export const LatencyShockSimulator: React.FC = () => {
  const stats = getComputedStats();

  const [scenario, setScenario] = useState<ScenarioState>({
    redSeaCut: true, // currently active baseline
    luzonStraitCut: false,
    malaccaCut: false,
    balticCut: false,
  });

  // Calculate dynamic impact metrics based on simulated cuts
  let additionalLatencyMs = 0;
  let bandwidthLossTbps = 0;
  let capitalExposedTrillion = 0;
  let daysToRestore = 14;

  if (scenario.redSeaCut) {
    additionalLatencyMs += 48.5;
    bandwidthLossTbps += 64;
    capitalExposedTrillion += 2.4;
    daysToRestore = Math.max(daysToRestore, 65);
  }
  if (scenario.luzonStraitCut) {
    additionalLatencyMs += 36.2;
    bandwidthLossTbps += 120;
    capitalExposedTrillion += 3.8;
    daysToRestore = Math.max(daysToRestore, 45);
  }
  if (scenario.malaccaCut) {
    additionalLatencyMs += 22.0;
    bandwidthLossTbps += 85;
    capitalExposedTrillion += 2.1;
    daysToRestore = Math.max(daysToRestore, 30);
  }
  if (scenario.balticCut) {
    additionalLatencyMs += 14.8;
    bandwidthLossTbps += 35;
    capitalExposedTrillion += 0.9;
    daysToRestore = Math.max(daysToRestore, 28);
  }

  const activeCutsCount = Object.values(scenario).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>FINANCIAL NETWORK & LATENCY SHOCK SIMULATOR</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Interactive stress-testing model calculating global SWIFT financial settlement delays and intercontinental optical bandwidth deficits.
        </p>
      </div>

      {/* Main Simulation Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Controls Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Chokepoint Interdiction Toggles
            </span>
            <button
              onClick={() => setScenario({ redSeaCut: false, luzonStraitCut: false, malaccaCut: false, balticCut: false })}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              <RefreshCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="space-y-2.5">
            <label className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
              scenario.redSeaCut ? 'bg-red-500/10 border-red-500/50 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div>
                <strong className="text-xs block font-mono">Bab el-Mandeb (Red Sea) Cut</strong>
                <span className="text-[10px] text-slate-500">Forces Cape of Good Hope South-African routing</span>
              </div>
              <input
                type="checkbox"
                checked={scenario.redSeaCut}
                onChange={(e) => setScenario({ ...scenario, redSeaCut: e.target.checked })}
                className="rounded accent-red-500 w-4 h-4 cursor-pointer"
              />
            </label>

            <label className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
              scenario.luzonStraitCut ? 'bg-red-500/10 border-red-500/50 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div>
                <strong className="text-xs block font-mono">Luzon Strait Quad-Severance</strong>
                <span className="text-[10px] text-slate-500">East Asia ↔ Transpacific core failure</span>
              </div>
              <input
                type="checkbox"
                checked={scenario.luzonStraitCut}
                onChange={(e) => setScenario({ ...scenario, luzonStraitCut: e.target.checked })}
                className="rounded accent-red-500 w-4 h-4 cursor-pointer"
              />
            </label>

            <label className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
              scenario.malaccaCut ? 'bg-red-500/10 border-red-500/50 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div>
                <strong className="text-xs block font-mono">Strait of Malacca Disruption</strong>
                <span className="text-[10px] text-slate-500">Singapore hub isolation & Sunda reroute</span>
              </div>
              <input
                type="checkbox"
                checked={scenario.malaccaCut}
                onChange={(e) => setScenario({ ...scenario, malaccaCut: e.target.checked })}
                className="rounded accent-red-500 w-4 h-4 cursor-pointer"
              />
            </label>

            <label className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
              scenario.balticCut ? 'bg-red-500/10 border-red-500/50 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div>
                <strong className="text-xs block font-mono">Baltic Sea Telecom Severance</strong>
                <span className="text-[10px] text-slate-500">Finland-Estonia-Germany subsea cut</span>
              </div>
              <input
                type="checkbox"
                checked={scenario.balticCut}
                onChange={(e) => setScenario({ ...scenario, balticCut: e.target.checked })}
                className="rounded accent-red-500 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 font-mono">
            Active Cut Vectors: <strong className="text-cyan-400">{activeCutsCount} of 4 Critical Corridors</strong>
          </div>
        </div>

        {/* Real-time Shock Telemetry Outputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>London ↔ Singapore Latency Penalty</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black font-mono text-amber-400 mt-1">
                +{additionalLatencyMs.toFixed(1)} <span className="text-sm text-slate-400 font-normal">ms RTT</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Baseline RTT: 142ms. Projected RTT under current severed corridors: <strong className="text-white">{(142 + additionalLatencyMs).toFixed(1)}ms</strong>. High-frequency FX arbitrage disrupted.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Daily SWIFT/Fedwire Settlement At Risk</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black font-mono text-emerald-400 mt-1">
                ${capitalExposedTrillion.toFixed(1)} <span className="text-sm text-slate-400 font-normal">Trillion</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Represents <strong className="text-white">{((capitalExposedTrillion / stats.dailyFinancialSettlementTrillion) * 100).toFixed(0)}%</strong> of the ${stats.dailyFinancialSettlementTrillion.toFixed(1)}T daily transoceanic interbank volume.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Bandwidth Deficit (Dropped Capacity)</span>
                <Cpu className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-3xl font-black font-mono text-red-400 mt-1">
                -{bandwidthLossTbps} <span className="text-sm text-slate-400 font-normal">Tbps</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Terrestrial / satellite backup can absorb approximately 3.5 Tbps. Remaining traffic queued or throttled.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Estimated Fleet Repair Duration</span>
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black font-mono text-cyan-400 mt-1">
                {daysToRestore} <span className="text-sm text-slate-400 font-normal">Days</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Factoring mobilization time, ROV deep-sea grappling, and naval escort clearances in active military zones.
              </p>
            </div>
          </div>

          {/* Institutional Stress Analysis Box */}
          <div className="bg-slate-950 border border-cyan-900/50 rounded-2xl p-4 font-mono text-xs space-y-2">
            <div className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              Institutional Macro Threat Assessment:
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Subsea fiber cables transmit <strong>99% of all intercontinental communications</strong>. Unlike satellite links which lack the bandwidth scale for Petabit bulk transport, severed subsea arteries immediately degrade global CLS foreign exchange settlement, asynchronous database replication between North American and European cloud availability zones, and sovereign defense command data flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
