import datasetRaw from '../../data/cables.json';
import type { SubseaDataset, Cable, Chokepoint, Incident, RepairVessel } from '../types';

export const subseaData = datasetRaw as SubseaDataset;

export function getAllCables(): Cable[] {
  return subseaData.cables;
}

export function getAllChokepoints(): Chokepoint[] {
  return subseaData.chokepoints;
}

export function getAllIncidents(): Incident[] {
  return subseaData.incidents;
}

export function getRepairFleet(): RepairVessel[] {
  return subseaData.repair_fleet;
}

export function getComputedStats() {
  const cables = subseaData.cables;
  const totalCapacityTbps = cables.reduce((acc, c) => acc + c.design_capacity_tbps, 0);
  const totalTrackedKm = cables.reduce((acc, c) => acc + c.length_km, 0);
  const criticalCount = cables.filter(c => c.risk_level === 'critical' || c.risk_level === 'high').length;
  const impairedCount = cables.filter(c => c.status === 'impaired-rerouted').length;

  return {
    totalTrackedCables: cables.length,
    totalCapacityTbps,
    totalTrackedKm,
    criticalCount,
    impairedCount,
    globalCablesUniverse: subseaData.financial_impact_model.global_subsea_cables_count,
    dailyFinancialSettlementTrillion: subseaData.financial_impact_model.daily_swift_volume_usd_trillion + subseaData.financial_impact_model.daily_fedwire_volume_usd_trillion,
    redSeaLatencyPenaltyMs: subseaData.financial_impact_model.red_sea_reroute_latency_penalty_ms,
    subseaDataShare: subseaData.financial_impact_model.data_share_carried_by_subsea
  };
}
