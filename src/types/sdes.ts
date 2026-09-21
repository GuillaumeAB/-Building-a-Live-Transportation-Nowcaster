export type FicheCategory = 
  | 'marchandises' 
  | 'voyageurs' 
  | 'energie_climat' 
  | 'parc_vehicules' 
  | 'depenses_comptes' 
  | 'emploi_salaires' 
  | 'aerien' 
  | 'portuaire_fluvial';

export type TimeGranularity = 'year' | 'quarter';

export type SourceConfidence = 'A_OFFICIAL' | 'B_HIGH_PROXY' | 'C_MODEL_NOWCAST' | 'D_ESTIMATED';

export interface DataSourceMeta {
  id: string;
  name: string;
  producer: string; // e.g. "INSEE", "SDES", "CPDP", "ASFA", "DGAC", "VNF", "CCFA/PFA", "SNCF", "CITEPA"
  frequency: 'mensuel' | 'trimestriel' | 'annuel' | 'temps_reel';
  lagMonths: number;
  url: string;
  isLiveApiAvailable: boolean;
  lastUpdated: string;
  status: 'online' | 'synced' | 'fallback_proxy' | 'estimating';
  confidenceTier: SourceConfidence;
  description: string;
  apiEndpoint?: string;
}

export interface FicheIndicatorSeries {
  indicatorId: string;
  indicatorName: string;
  unit: string;
  historicalValues: Record<string, number>; // "2019": 350.2, "2020": ..., "2023": ...
  nowcastValue: number; // estimated value for target period (e.g. 2024 or T4 2024)
  lowerBound: number;
  upperBound: number;
  deltaYearOnYearPct: number; // % N/N-1
  deltaFiveYearPct: number; // % N/N-5
  sourceUsed: string;
  confidence: SourceConfidence;
  proxyFormulaUsed?: string;
  category?: string;
}

export interface SDESFiche {
  id: string;
  code: string; // e.g. "SDES-1.1", "SDES-2.1"
  title: string;
  subtitle: string;
  category: FicheCategory;
  chapo: string; // Official editorial summary
  primaryUnit: string;
  methodologicalNotice: string;
  officialReferenceUrl: string;
  primarySources: DataSourceMeta[];
  keyIndicators: FicheIndicatorSeries[];
  modalBreakdown: {
    categoryName: string;
    items: {
      name: string;
      value: number;
      percentage: number;
      unit: string;
      color: string;
      deltaYoY: number;
      source: string;
    }[];
  };
  econometricModels: {
    targetIndicator: string;
    proxyVariables: string[];
    rSquared: number;
    elasticityCoefficients: Record<string, number>;
    description: string;
  }[];
  officialTableRows: {
    rowName: string;
    unit: string;
    isTotal?: boolean;
    isSubHeader?: boolean;
    values: Record<string, number | string>; // "2019", "2020", "2021", "2022", "2023", "targetPeriod"
    deltaYoY: number;
    sourceBadge: string;
  }[];
}

export interface NowcastRequest {
  ficheId: string;
  periodType: TimeGranularity;
  targetPeriod: string; // "2024", "2025", "2024-Q4", "2025-Q1", "2025-Q2"
  customAssumptions?: Record<string, number>; // user customized proxy elasticities or raw inputs
}

export interface NowcastResult {
  ficheId: string;
  period: string;
  periodType: TimeGranularity;
  calculatedAt: string;
  overallConfidence: SourceConfidence;
  indicators: FicheIndicatorSeries[];
  editorialSynthesis: string;
  keyTakeaways: string[];
  macroEconomicContext: {
    gdpGrowth: number;
    inflationRate: number;
    brentPriceUsd: number;
    dieselPriceEuroLitre: number;
    electricityPriceTrend: string;
  };
  provenanceBreakdown: {
    directOfficialPct: number;
    highCorrelationProxyPct: number;
    econometricNowcastPct: number;
    aiSearchEstimatedPct: number;
  };
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  groundingSources?: { title: string; url: string }[];
}
