export interface LandingPoint {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export interface Cable {
  id: string;
  name: string;
  rfs_year: number;
  length_km: number;
  design_capacity_tbps: number;
  fiber_pairs: number;
  owners: string[];
  landing_points: LandingPoint[];
  status: 'operational' | 'impaired-rerouted' | 'operational-surveilled';
  risk_level: 'low' | 'moderate' | 'elevated' | 'high' | 'critical';
  chokepoints: string[];
  source_url: string;
  retrieved_at: string;
}

export interface Chokepoint {
  id: string;
  name: string;
  region: string;
  cables_transiting: number;
  share_of_eurasia_traffic: string;
  threat_status: string;
  risk_factors: string[];
  current_latency_penalty_ms: number;
  source_url: string;
  retrieved_at: string;
}

export interface Incident {
  id: string;
  date: string;
  cable_name: string;
  location: string;
  cause: string;
  impact: string;
  repair_duration_days: number;
  source_url: string;
  retrieved_at: string;
}

export interface RepairVessel {
  vessel_name: string;
  operator: string;
  flag: string;
  current_station: string;
  operational_status: string;
  cable_capacity_tons: number;
  source_url: string;
  retrieved_at: string;
}

export interface FinancialImpactModel {
  daily_swift_volume_usd_trillion: number;
  daily_fedwire_volume_usd_trillion: number;
  daily_fx_settlement_volume_usd_trillion: number;
  transatlantic_rtt_latency_ms: number;
  transpacific_rtt_latency_ms: number;
  red_sea_reroute_latency_penalty_ms: number;
  global_subsea_cables_count: number;
  total_global_length_km: number;
  data_share_carried_by_subsea: string;
}

export interface SubseaDataset {
  metadata: {
    system_name: string;
    cycle: number;
    last_updated: string;
    authoritative_sources: string[];
  };
  cables: Cable[];
  chokepoints: Chokepoint[];
  incidents: Incident[];
  repair_fleet: RepairVessel[];
  financial_impact_model: FinancialImpactModel;
}
