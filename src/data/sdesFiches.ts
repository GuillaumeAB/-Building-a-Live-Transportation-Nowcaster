import { SDESFiche } from '../types/sdes';
import { OPEN_DATA_SOURCES } from './openDataSources';

export const SDES_FICHES: SDESFiche[] = [
  {
    id: 'fret-marchandises',
    code: 'SDES-1.1',
    title: 'Le transport intérieur de marchandises',
    subtitle: 'Évolution de l’activité en milliards de tonnes-kilomètres (Gt-km) et ventilation modale',
    category: 'marchandises',
    chapo: 'En France, le transport intérieur de marchandises (hors oléoducs) mesure l’activité globale réalisée sur le territoire métropolitain par l’ensemble des modes : routier (pavillons français et étranger), ferroviaire, fluvial et cabotage maritime.',
    primaryUnit: 'Gt-km (Milliards de tonnes-kilomètres)',
    methodologicalNotice: 'Source officielle : Enquête TRM du SDES auprès des transporteurs pour compte d’autrui et compte propre, déclarations SNCF Réseau / EPSF pour le rail, données VNF pour les voies d’eau, douanes pour le cabotage et Trapil/SPMR pour les oléoducs. Le transport routier de transit et de cabotage réalisé par des pavillons étrangers est estimé d’après l’enquête européenne Eurostat Road Freight et calibré avec les comptages autoroutiers ASFA.',
    officialReferenceUrl: 'https://www.statistiques.developpement-durable.gouv.fr/bilan-annuel-des-transports-marchandises',
    primarySources: [
      OPEN_DATA_SOURCES.find(s => s.id === 'sdes_opendata')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'insee_ipi_trm')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'cpdp_carburants')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'asfa_peages')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'vnf_opendata')!
    ],
    keyIndicators: [
      {
        indicatorId: 'total_fret_hors_oleo',
        indicatorName: 'Total transport intérieur de marchandises (hors oléoducs)',
        unit: 'Gt-km',
        historicalValues: { '2019': 378.4, '2020': 354.2, '2021': 382.1, '2022': 376.8, '2023': 365.4 },
        nowcastValue: 361.2,
        lowerBound: 358.0,
        upperBound: 364.5,
        deltaYearOnYearPct: -1.15,
        deltaFiveYearPct: -4.55,
        sourceUsed: 'Nowcast Pondéré (CPDP Gazole -1.4% + ASFA PL -0.8% + IPI Insee -0.9%)',
        confidence: 'B_HIGH_PROXY',
        proxyFormulaUsed: 'T_total = T_routier_fr + T_routier_etr + T_ferroviaire + T_fluvial + T_cabotage'
      },
      {
        indicatorId: 'routier_total',
        indicatorName: 'Transport routier de marchandises (total métropole)',
        unit: 'Gt-km',
        historicalValues: { '2019': 335.2, '2020': 316.5, '2021': 340.5, '2022': 336.2, '2023': 326.8 },
        nowcastValue: 323.5,
        lowerBound: 320.5,
        upperBound: 326.5,
        deltaYearOnYearPct: -1.01,
        deltaFiveYearPct: -3.49,
        sourceUsed: 'Indice ASFA Poids Lourds + Livraisons gazole CPDP',
        confidence: 'B_HIGH_PROXY'
      },
      {
        indicatorId: 'ferroviaire_fret',
        indicatorName: 'Transport ferroviaire de marchandises',
        unit: 'Gt-km',
        historicalValues: { '2019': 31.8, '2020': 28.3, '2021': 32.7, '2022': 31.8, '2023': 29.5 },
        nowcastValue: 28.9,
        lowerBound: 28.2,
        upperBound: 29.6,
        deltaYearOnYearPct: -2.03,
        deltaFiveYearPct: -9.12,
        sourceUsed: 'SNCF Réseau sillons fret & estimations Opérateurs Fret',
        confidence: 'C_MODEL_NOWCAST'
      },
      {
        indicatorId: 'fluvial_fret',
        indicatorName: 'Transport fluvial de marchandises',
        unit: 'Gt-km',
        historicalValues: { '2019': 6.8, '2020': 5.8, '2021': 6.2, '2022': 6.1, '2023': 6.3 },
        nowcastValue: 6.2,
        lowerBound: 6.0,
        upperBound: 6.4,
        deltaYearOnYearPct: -1.59,
        deltaFiveYearPct: -8.82,
        sourceUsed: 'Open Data VNF (Bassin Seine & Nord)',
        confidence: 'B_HIGH_PROXY'
      },
      {
        indicatorId: 'cabotage_maritime',
        indicatorName: 'Cabotage maritime national',
        unit: 'Gt-km',
        historicalValues: { '2019': 4.6, '2020': 3.6, '2021': 2.7, '2022': 2.7, '2023': 2.8 },
        nowcastValue: 2.6,
        lowerBound: 2.4,
        upperBound: 2.8,
        deltaYearOnYearPct: -7.14,
        deltaFiveYearPct: -43.48,
        sourceUsed: 'Douanes & déclarations Grands Ports Maritimes',
        confidence: 'C_MODEL_NOWCAST'
      }
    ],
    modalBreakdown: {
      categoryName: 'Répartition modale du fret intérieur (hors oléoducs)',
      items: [
        { name: 'Routier pavillon français (autrui)', value: 168.2, percentage: 46.6, unit: 'Gt-km', color: '#1d4ed8', deltaYoY: -1.2, source: 'Enquête TRM Insee/SDES' },
        { name: 'Routier pavillon français (propre)', value: 34.1, percentage: 9.4, unit: 'Gt-km', color: '#3b82f6', deltaYoY: -0.8, source: 'Enquête TRM Insee/SDES' },
        { name: 'Routier pavillon étranger (transit/cabotage)', value: 121.2, percentage: 33.6, unit: 'Gt-km', color: '#60a5fa', deltaYoY: -0.8, source: 'Eurostat & ASFA' },
        { name: 'Ferroviaire (Fret SNCF & Alternatifs)', value: 28.9, percentage: 8.0, unit: 'Gt-km', color: '#10b981', deltaYoY: -2.0, source: 'SNCF Réseau / EPSF' },
        { name: 'Fluvial (VNF)', value: 6.2, percentage: 1.7, unit: 'Gt-km', color: '#06b6d4', deltaYoY: -1.6, source: 'VNF Statistique' },
        { name: 'Cabotage maritime métropole', value: 2.6, percentage: 0.7, unit: 'Gt-km', color: '#8b5cf6', deltaYoY: -7.1, source: 'DGITM / GPM' }
      ]
    },
    econometricModels: [
      {
        targetIndicator: 'Transport Routier Total (Gt-km)',
        proxyVariables: ['Livraisons Gazole CPDP (Mtep)', 'Trafic Autoroute ASFA PL (Mkm)', 'Indice Production Industrielle Insee'],
        rSquared: 0.968,
        elasticityCoefficients: { 'Gazole_CPDP': 0.72, 'ASFA_PL': 0.21, 'IPI_Insee': 0.18 },
        description: 'Régression multivariée SDES CCTN calibrée sur 2012-2023 (R² = 0.968, RMSE = 1.42 Gt-km)'
      }
    ],
    officialTableRows: [
      {
        rowName: 'Transport routier métropolitain',
        unit: 'Gt-km',
        isSubHeader: true,
        values: { '2019': 335.2, '2020': 316.5, '2021': 340.5, '2022': 336.2, '2023': 326.8, 'target': 323.5 },
        deltaYoY: -1.0,
        sourceBadge: 'ASFA / CPDP'
      },
      {
        rowName: '  - dont Pavillon français (compte d’autrui)',
        unit: 'Gt-km',
        values: { '2019': 174.5, '2020': 163.8, '2021': 176.4, '2022': 174.1, '2023': 170.2, 'target': 168.2 },
        deltaYoY: -1.2,
        sourceBadge: 'TRM SDES'
      },
      {
        rowName: '  - dont Pavillon français (compte propre)',
        unit: 'Gt-km',
        values: { '2019': 36.4, '2020': 34.1, '2021': 36.2, '2022': 35.8, '2023': 34.4, 'target': 34.1 },
        deltaYoY: -0.9,
        sourceBadge: 'TRM SDES'
      },
      {
        rowName: '  - dont Pavillons étrangers (transit et cabotage)',
        unit: 'Gt-km',
        values: { '2019': 124.3, '2020': 118.6, '2021': 127.9, '2022': 126.3, '2023': 122.2, 'target': 121.2 },
        deltaYoY: -0.8,
        sourceBadge: 'Eurostat / ASFA'
      },
      {
        rowName: 'Transport ferroviaire',
        unit: 'Gt-km',
        values: { '2019': 31.8, '2020': 28.3, '2021': 32.7, '2022': 31.8, '2023': 29.5, 'target': 28.9 },
        deltaYoY: -2.0,
        sourceBadge: 'SNCF Réseau'
      },
      {
        rowName: 'Transport fluvial',
        unit: 'Gt-km',
        values: { '2019': 6.8, '2020': 5.8, '2021': 6.2, '2022': 6.1, '2023': 6.3, 'target': 6.2 },
        deltaYoY: -1.6,
        sourceBadge: 'VNF OpenData'
      },
      {
        rowName: 'Cabotage maritime',
        unit: 'Gt-km',
        values: { '2019': 4.6, '2020': 3.6, '2021': 2.7, '2022': 2.7, '2023': 2.8, 'target': 2.6 },
        deltaYoY: -7.1,
        sourceBadge: 'Douanes'
      },
      {
        rowName: 'TOTAL transport terrestre et maritime (hors oléoducs)',
        unit: 'Gt-km',
        isTotal: true,
        values: { '2019': 378.4, '2020': 354.2, '2021': 382.1, '2022': 376.8, '2023': 365.4, 'target': 361.2 },
        deltaYoY: -1.15,
        sourceBadge: 'Synthèse Nowcast'
      },
      {
        rowName: 'Oléoducs (produits raffinés et brut)',
        unit: 'Gt-km',
        values: { '2019': 10.9, '2020': 9.2, '2021': 9.8, '2022': 10.1, '2023': 9.9, 'target': 9.7 },
        deltaYoY: -2.0,
        sourceBadge: 'SPMR / Trapil'
      }
    ]
  },
  {
    id: 'voyageurs-mobilite',
    code: 'SDES-2.1',
    title: 'Le transport intérieur de voyageurs',
    subtitle: 'Activité en milliards de voyageurs-kilomètres (Gv-km) et part modale',
    category: 'voyageurs',
    chapo: 'La mobilité des personnes sur le territoire métropolitain englobe les déplacements en voiture individuelle, en transports collectifs ferrés et urbains, en transport aérien intérieur et en modes actifs (marche et vélo).',
    primaryUnit: 'Gv-km (Milliards de voyageurs-kilomètres)',
    methodologicalNotice: 'Source officielle : Circulation VP calculée à partir du modèle Trafic SDES, des consommations de carburants (CPDP) et des comptages de trafic DITP/DIR/ASFA. Transports ferroviaires issus de SNCF Voyageurs (TGV, TER, Transilien). Transports collectifs urbains d’Île-de-France Mobilités (IdFM) et de l’UTP. Aérien intérieur issu de la DGAC. Observatoire vélo issu de Vélo & Territoires.',
    officialReferenceUrl: 'https://www.statistiques.developpement-durable.gouv.fr/bilan-annuel-des-transports-voyageurs',
    primarySources: [
      OPEN_DATA_SOURCES.find(s => s.id === 'sdes_opendata')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'sncf_opendata')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'cpdp_carburants')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'dgac_bulletin')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'asfa_peages')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'art_cars_macron')!
    ],
    keyIndicators: [
      {
        indicatorId: 'total_voyageurs_km',
        indicatorName: 'Total transport intérieur de voyageurs',
        unit: 'Gv-km',
        historicalValues: { '2019': 991.6, '2020': 709.8, '2021': 825.4, '2022': 945.1, '2023': 978.2 },
        nowcastValue: 994.5,
        lowerBound: 988.0,
        upperBound: 1001.0,
        deltaYearOnYearPct: 1.67,
        deltaFiveYearPct: 0.29,
        sourceUsed: 'Synthèse Nowcast multimodal (Rail SNCF + CPDP Essence/Gazole + DGAC)',
        confidence: 'B_HIGH_PROXY',
        proxyFormulaUsed: 'V_total = V_vp + V_ferre + V_urbain_tc + V_aerien + V_autocars + V_2rm'
      },
      {
        indicatorId: 'voitures_particulieres',
        indicatorName: 'Voitures particulières (VP et VUL en usage personnel)',
        unit: 'Gv-km',
        historicalValues: { '2019': 805.3, '2020': 612.4, '2021': 698.5, '2022': 776.4, '2023': 792.1 },
        nowcastValue: 798.8,
        lowerBound: 793.0,
        upperBound: 804.5,
        deltaYearOnYearPct: 0.85,
        deltaFiveYearPct: -0.81,
        sourceUsed: 'CPDP Carburants essence/gazole + ASFA VL',
        confidence: 'B_HIGH_PROXY'
      },
      {
        indicatorId: 'ferroviaire_voyageurs',
        indicatorName: 'Transport ferroviaire (TGV, TER, Intercités, Transilien)',
        unit: 'Gv-km',
        historicalValues: { '2019': 112.4, '2020': 54.8, '2021': 74.2, '2022': 105.8, '2023': 118.5 },
        nowcastValue: 125.4,
        lowerBound: 123.0,
        upperBound: 127.8,
        deltaYearOnYearPct: 5.82,
        deltaFiveYearPct: 11.57,
        sourceUsed: 'SNCF Voyageurs OpenData & régularité trimestrielle',
        confidence: 'A_OFFICIAL'
      },
      {
        indicatorId: 'tc_urbains_hors_fer',
        indicatorName: 'Transports collectifs urbains (Bus & Tramway)',
        unit: 'Gv-km',
        historicalValues: { '2019': 45.2, '2020': 26.8, '2021': 32.5, '2022': 41.2, '2023': 44.8 },
        nowcastValue: 46.5,
        lowerBound: 45.0,
        upperBound: 48.0,
        deltaYearOnYearPct: 3.79,
        deltaFiveYearPct: 2.88,
        sourceUsed: 'Enquêtes UTP & IdFM',
        confidence: 'B_HIGH_PROXY'
      },
      {
        indicatorId: 'aerien_interieur',
        indicatorName: 'Transport aérien intérieur métropole et DOM',
        unit: 'Gv-km',
        historicalValues: { '2019': 14.8, '2020': 6.2, '2021': 8.9, '2022': 11.8, '2023': 12.2 },
        nowcastValue: 12.6,
        lowerBound: 12.3,
        upperBound: 12.9,
        deltaYearOnYearPct: 3.28,
        deltaFiveYearPct: -14.86,
        sourceUsed: 'DGAC Bulletin mensuel officiel',
        confidence: 'A_OFFICIAL'
      }
    ],
    modalBreakdown: {
      categoryName: 'Part modale du transport de voyageurs',
      items: [
        { name: 'Voiture particulière (VP)', value: 798.8, percentage: 80.3, unit: 'Gv-km', color: '#3b82f6', deltaYoY: 0.85, source: 'Modèle SDES / CPDP' },
        { name: 'Ferroviaire (TGV, TER, Transilien)', value: 125.4, percentage: 12.6, unit: 'Gv-km', color: '#10b981', deltaYoY: 5.82, source: 'SNCF Voyageurs' },
        { name: 'Transports urbains (Bus, Métro, Tram)', value: 46.5, percentage: 4.7, unit: 'Gv-km', color: '#f59e0b', deltaYoY: 3.79, source: 'UTP / IdFM' },
        { name: 'Aérien intérieur métropole + DOM', value: 12.6, percentage: 1.3, unit: 'Gv-km', color: '#8b5cf6', deltaYoY: 3.28, source: 'DGAC' },
        { name: 'Autocars interurbains (SLO / Régions)', value: 7.2, percentage: 0.7, unit: 'Gv-km', color: '#ec4899', deltaYoY: 7.46, source: 'ART Observatoire' },
        { name: 'Deux-roues motorisés', value: 4.0, percentage: 0.4, unit: 'Gv-km', color: '#64748b', deltaYoY: -1.5, source: 'SDES Parc' }
      ]
    },
    econometricModels: [
      {
        targetIndicator: 'Trafic VP (Gv-km)',
        proxyVariables: ['Livraisons Essence E10/SP98 CPDP', 'Livraisons Gazole VP CPDP', 'Trafic Autoroutes ASFA VL'],
        rSquared: 0.982,
        elasticityCoefficients: { 'Essence_CPDP': 0.44, 'Gazole_VP': 0.38, 'ASFA_VL': 0.18 },
        description: 'Modèle hybride calibré sur les données de circulation SDES et les flux carburants CPDP'
      }
    ],
    officialTableRows: [
      {
        rowName: 'Transport individuel',
        unit: 'Gv-km',
        isSubHeader: true,
        values: { '2019': 819.2, '2020': 622.0, '2021': 709.8, '2022': 786.3, '2023': 796.7, 'target': 802.8 },
        deltaYoY: 0.77,
        sourceBadge: 'SDES / ASFA'
      },
      {
        rowName: '  - Voitures particulières (VP)',
        unit: 'Gv-km',
        values: { '2019': 805.3, '2020': 612.4, '2021': 698.5, '2022': 776.4, '2023': 792.1, 'target': 798.8 },
        deltaYoY: 0.85,
        sourceBadge: 'CPDP / ASFA'
      },
      {
        rowName: '  - Deux-roues motorisés',
        unit: 'Gv-km',
        values: { '2019': 4.2, '2020': 3.4, '2021': 3.8, '2022': 4.1, '2023': 4.1, 'target': 4.0 },
        deltaYoY: -2.4,
        sourceBadge: 'SDES Parc'
      },
      {
        rowName: 'Transport collectif ferré',
        unit: 'Gv-km',
        isSubHeader: true,
        values: { '2019': 112.4, '2020': 54.8, '2021': 74.2, '2022': 105.8, '2023': 118.5, 'target': 125.4 },
        deltaYoY: 5.82,
        sourceBadge: 'SNCF Voyageurs'
      },
      {
        rowName: '  - dont TGV (Inoui et Ouigo)',
        unit: 'Gv-km',
        values: { '2019': 68.4, '2020': 32.1, '2021': 45.8, '2022': 66.2, '2023': 74.8, 'target': 79.6 },
        deltaYoY: 6.42,
        sourceBadge: 'SNCF OpenData'
      },
      {
        rowName: '  - dont TER et Intercités',
        unit: 'Gv-km',
        values: { '2019': 25.1, '2020': 13.2, '2021': 16.9, '2022': 23.4, '2023': 26.5, 'target': 28.2 },
        deltaYoY: 6.41,
        sourceBadge: 'Régions / SNCF'
      },
      {
        rowName: '  - dont RER et Transilien (SNCF/RATP)',
        unit: 'Gv-km',
        values: { '2019': 18.9, '2020': 9.5, '2021': 11.5, '2022': 16.2, '2023': 17.2, 'target': 17.6 },
        deltaYoY: 2.33,
        sourceBadge: 'IdFM OpenData'
      },
      {
        rowName: 'Transports urbains non ferrés (Bus & Tram)',
        unit: 'Gv-km',
        values: { '2019': 45.2, '2020': 26.8, '2021': 32.5, '2022': 41.2, '2023': 44.8, 'target': 46.5 },
        deltaYoY: 3.79,
        sourceBadge: 'UTP'
      },
      {
        rowName: 'Transport aérien intérieur',
        unit: 'Gv-km',
        values: { '2019': 14.8, '2020': 6.2, '2021': 8.9, '2022': 11.8, '2023': 12.2, 'target': 12.6 },
        deltaYoY: 3.28,
        sourceBadge: 'DGAC'
      },
      {
        rowName: 'TOTAL transport intérieur de voyageurs',
        unit: 'Gv-km',
        isTotal: true,
        values: { '2019': 991.6, '2020': 709.8, '2021': 825.4, '2022': 945.1, '2023': 978.2, 'target': 994.5 },
        deltaYoY: 1.67,
        sourceBadge: 'Synthèse SDES Nowcast'
      }
    ]
  },
  {
    id: 'energie-ges',
    code: 'SDES-3.1',
    title: 'Énergie et émissions de gaz à effet de serre (GES)',
    subtitle: 'Consommation d’énergie finale et émissions territoriales en Mt CO2eq',
    category: 'energie_climat',
    chapo: 'Les transports constituent le premier secteur émetteur de gaz à effet de serre en France, représentant environ 31% des émissions territoriales totales, dont plus de 95% proviennent du transport routier.',
    primaryUnit: 'Mt CO2eq et Mtep (Millions de tonnes équivalent pétrole)',
    methodologicalNotice: 'Source officielle : Bilan de l’énergie du SDES et inventaire national d’émissions CITEPA (format SECTEN/PCC). Les émissions liées aux soutes internationales maritimes et aériennes sont comptabilisées en mémoire selon les règles de la CCNUCC. Le nowcast intègre les livraisons réelles mensuelles de carburants CPDP, la décarbonation du mix électrique ferroviaire/routier et l’incorporation de biocarburants.',
    officialReferenceUrl: 'https://www.statistiques.developpement-durable.gouv.fr/bilan-annuel-des-transports-energie-ges',
    primarySources: [
      OPEN_DATA_SOURCES.find(s => s.id === 'sdes_opendata')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'cpdp_carburants')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'citepa_secten')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'pfa_immat')!
    ],
    keyIndicators: [
      {
        indicatorId: 'emissions_ges_transports',
        indicatorName: 'Émissions territoriales de GES des transports',
        unit: 'Mt CO2eq',
        historicalValues: { '2019': 136.2, '2020': 114.5, '2021': 126.8, '2022': 129.4, '2023': 124.8 },
        nowcastValue: 121.3,
        lowerBound: 119.5,
        upperBound: 123.0,
        deltaYearOnYearPct: -2.80,
        deltaFiveYearPct: -10.94,
        sourceUsed: 'Modèle d’émission SECTEN calibré sur livraisons CPDP + parc électrifié PFA',
        confidence: 'B_HIGH_PROXY',
        proxyFormulaUsed: 'E_total = E_routier (VP + VUL + PL) + E_aerien_int + E_ferre + E_fluvial'
      },
      {
        indicatorId: 'consommation_carburants_routiers',
        indicatorName: 'Consommation de carburants routiers pétroliers et biocarburants',
        unit: 'Mtep',
        historicalValues: { '2019': 43.8, '2020': 36.9, '2021': 40.5, '2022': 41.2, '2023': 39.8 },
        nowcastValue: 38.7,
        lowerBound: 38.2,
        upperBound: 39.2,
        deltaYearOnYearPct: -2.76,
        deltaFiveYearPct: -11.64,
        sourceUsed: 'Livraisons effectives CPDP 12 mois',
        confidence: 'A_OFFICIAL'
      },
      {
        indicatorId: 'part_renouvelable_transports',
        indicatorName: 'Part d’énergie renouvelable dans les transports (directive EnR)',
        unit: '%',
        historicalValues: { '2019': 9.2, '2020': 9.8, '2021': 10.1, '2022': 10.7, '2023': 11.4 },
        nowcastValue: 12.2,
        lowerBound: 11.8,
        upperBound: 12.6,
        deltaYearOnYearPct: 7.02,
        deltaFiveYearPct: 32.61,
        sourceUsed: 'CPDP (Bioéthanol E85/ED95/EMAG/HVO) + Bilan EnR SDES',
        confidence: 'B_HIGH_PROXY'
      }
    ],
    modalBreakdown: {
      categoryName: 'Répartition des émissions de GES par mode de transport',
      items: [
        { name: 'Voitures particulières (VP)', value: 64.8, percentage: 53.4, unit: 'Mt CO2eq', color: '#ef4444', deltaYoY: -3.1, source: 'CITEPA / CPDP' },
        { name: 'Poids lourds & Autobus', value: 27.2, percentage: 22.4, unit: 'Mt CO2eq', color: '#f97316', deltaYoY: -2.2, source: 'CITEPA / ASFA' },
        { name: 'Véhicules utilitaires légers (VUL)', value: 23.5, percentage: 19.4, unit: 'Mt CO2eq', color: '#f59e0b', deltaYoY: -1.7, source: 'CITEPA / CPDP' },
        { name: 'Aérien intérieur métropole + DOM', value: 4.1, percentage: 3.4, unit: 'Mt CO2eq', color: '#6366f1', deltaYoY: 2.5, source: 'DGAC / CITEPA' },
        { name: 'Deux-roues motorisés', value: 1.2, percentage: 1.0, unit: 'Mt CO2eq', color: '#64748b', deltaYoY: -2.0, source: 'CITEPA' },
        { name: 'Ferroviaire (traction diesel résiduelle)', value: 0.5, percentage: 0.4, unit: 'Mt CO2eq', color: '#10b981', deltaYoY: -5.0, source: 'SNCF Réseau' }
      ]
    },
    econometricModels: [
      {
        targetIndicator: 'Émissions GES Transports Routiers (Mt CO2e)',
        proxyVariables: ['Livraisons Gazole CPDP', 'Livraisons Supercarburants CPDP', 'Taux d’incorporation Biocarburants', 'Parc Véhicules Électriques'],
        rSquared: 0.991,
        elasticityCoefficients: { 'Gazole_CPDP': 3.12, 'Essence_CPDP': 2.95, 'Part_Electrique': -0.42 },
        description: 'Modèle d’inventaire stœchiométrique et facteur d’émission CITEPA (Facteur moyen Gazole: 3.16 kg CO2/kg, Essence: 3.08 kg CO2/kg)'
      }
    ],
    officialTableRows: [
      {
        rowName: 'Transport routier',
        unit: 'Mt CO2eq',
        isSubHeader: true,
        values: { '2019': 130.4, '2020': 109.8, '2021': 121.6, '2022': 124.0, '2023': 119.5, 'target': 116.7 },
        deltaYoY: -2.34,
        sourceBadge: 'CPDP / CITEPA'
      },
      {
        rowName: '  - dont Voitures particulières (VP)',
        unit: 'Mt CO2eq',
        values: { '2019': 72.8, '2020': 60.5, '2021': 67.4, '2022': 69.1, '2023': 66.9, 'target': 64.8 },
        deltaYoY: -3.14,
        sourceBadge: 'CPDP'
      },
      {
        rowName: '  - dont Poids lourds et autocars',
        unit: 'Mt CO2eq',
        values: { '2019': 30.1, '2020': 26.2, '2021': 28.8, '2022': 28.5, '2023': 27.8, 'target': 27.2 },
        deltaYoY: -2.16,
        sourceBadge: 'ASFA / CPDP'
      },
      {
        rowName: '  - dont Véhicules utilitaires légers (VUL)',
        unit: 'Mt CO2eq',
        values: { '2019': 26.1, '2020': 21.8, '2021': 24.1, '2022': 25.1, '2023': 23.9, 'target': 23.5 },
        deltaYoY: -1.67,
        sourceBadge: 'CPDP'
      },
      {
        rowName: 'Transport aérien intérieur',
        unit: 'Mt CO2eq',
        values: { '2019': 4.5, '2020': 2.1, '2021': 2.9, '2022': 3.8, '2023': 4.0, 'target': 4.1 },
        deltaYoY: 2.50,
        sourceBadge: 'DGAC'
      },
      {
        rowName: 'Transport ferroviaire (thermique)',
        unit: 'Mt CO2eq',
        values: { '2019': 0.6, '2020': 0.4, '2021': 0.5, '2022': 0.5, '2023': 0.5, 'target': 0.5 },
        deltaYoY: 0.0,
        sourceBadge: 'SNCF'
      },
      {
        rowName: 'TOTAL Émissions territoriales de transports',
        unit: 'Mt CO2eq',
        isTotal: true,
        values: { '2019': 136.2, '2020': 114.5, '2021': 126.8, '2022': 129.4, '2023': 124.8, 'target': 121.3 },
        deltaYoY: -2.80,
        sourceBadge: 'Nowcast SDES Climat'
      }
    ]
  },
  {
    id: 'parc-immatriculations',
    code: 'SDES-4.1',
    title: 'Le parc de véhicules et les immatriculations neuves',
    subtitle: 'Dynamique des motorisations, électrification et structure du parc roulant',
    category: 'parc_vehicules',
    chapo: 'Le parc automobile français en circulation au 1er janvier compte près de 39 millions de voitures particulières. La transition vers l’électrique progresse rapidement portée par les réglementations CAFE et les aides à l’acquisition.',
    primaryUnit: 'Unités & Millions de véhicules',
    methodologicalNotice: 'Source officielle : Fichier RSVERO / SIV du SDES et statistiques mensuelles de la Plateforme Automobile (PFA / AAA DATA). Parc roulant calculé selon la méthode des tables de survie des véhicules et des contrôles techniques UTAC-OTC.',
    officialReferenceUrl: 'https://www.statistiques.developpement-durable.gouv.fr/bilan-annuel-des-transports-parc-immatriculations',
    primarySources: [
      OPEN_DATA_SOURCES.find(s => s.id === 'sdes_opendata')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'pfa_immat')!
    ],
    keyIndicators: [
      {
        indicatorId: 'immatriculations_neuves_vp',
        indicatorName: 'Immatriculations neuves de voitures particulières (VP)',
        unit: 'Milliers d’unités',
        historicalValues: { '2019': 2214.3, '2020': 1650.1, '2021': 1659.0, '2022': 1529.0, '2023': 1774.7 },
        nowcastValue: 1782.5,
        lowerBound: 1770.0,
        upperBound: 1795.0,
        deltaYearOnYearPct: 0.44,
        deltaFiveYearPct: -19.50,
        sourceUsed: 'Données certifiées PFA / CCFA 12 mois',
        confidence: 'A_OFFICIAL'
      },
      {
        indicatorId: 'part_marche_bev_100_electrique',
        indicatorName: 'Part de marché des 100% électriques (BEV) dans les ventes neuves',
        unit: '% des ventes',
        historicalValues: { '2019': 1.9, '2020': 6.7, '2021': 9.8, '2022': 13.3, '2023': 16.8 },
        nowcastValue: 17.5,
        lowerBound: 17.2,
        upperBound: 17.8,
        deltaYearOnYearPct: 4.17,
        deltaFiveYearPct: 821.05,
        sourceUsed: 'PFA / CCFA Marché Automobile',
        confidence: 'A_OFFICIAL'
      },
      {
        indicatorId: 'parc_total_vp',
        indicatorName: 'Parc total de voitures particulières en circulation',
        unit: 'Millions de véhicules',
        historicalValues: { '2019': 38.2, '2020': 38.3, '2021': 38.7, '2022': 38.9, '2023': 39.1 },
        nowcastValue: 39.3,
        lowerBound: 39.1,
        upperBound: 39.4,
        deltaYearOnYearPct: 0.51,
        deltaFiveYearPct: 2.88,
        sourceUsed: 'SDES RSVERO & UTAC',
        confidence: 'B_HIGH_PROXY'
      }
    ],
    modalBreakdown: {
      categoryName: 'Répartition des ventes neuves de VP par motorisation',
      items: [
        { name: '100% Électrique (BEV)', value: 312.0, percentage: 17.5, unit: 'k unités', color: '#10b981', deltaYoY: 4.6, source: 'PFA' },
        { name: 'Hybride simple non rechargeable (HEV)', value: 588.0, percentage: 33.0, unit: 'k unités', color: '#06b6d4', deltaYoY: 18.2, source: 'PFA' },
        { name: 'Hybride rechargeable (PHEV)', value: 142.5, percentage: 8.0, unit: 'k unités', color: '#8b5cf6', deltaYoY: -12.4, source: 'PFA' },
        { name: 'Essence thermique pure', value: 534.8, percentage: 30.0, unit: 'k unités', color: '#f59e0b', deltaYoY: -15.8, source: 'PFA' },
        { name: 'Diesel thermique pur', value: 142.5, percentage: 8.0, unit: 'k unités', color: '#ef4444', deltaYoY: -22.5, source: 'PFA' },
        { name: 'GPL / E85 d’origine', value: 62.7, percentage: 3.5, unit: 'k unités', color: '#84cc16', deltaYoY: 12.0, source: 'PFA' }
      ]
    },
    econometricModels: [],
    officialTableRows: [
      {
        rowName: 'Immatriculations neuves de VP par énergie',
        unit: 'Unités',
        isSubHeader: true,
        values: { '2019': '2 214 279', '2020': '1 650 118', '2021': '1 659 008', '2022': '1 529 035', '2023': '1 774 729', 'target': '1 782 500' },
        deltaYoY: 0.44,
        sourceBadge: 'PFA / CCFA'
      },
      {
        rowName: '  - 100% Électrique (BEV)',
        unit: 'Unités',
        values: { '2019': '42 764', '2020': '110 916', '2021': '162 106', '2022': '203 121', '2023': '298 219', 'target': '312 000' },
        deltaYoY: 4.62,
        sourceBadge: 'PFA'
      },
      {
        rowName: '  - Hybrides (HEV + PHEV)',
        unit: 'Unités',
        values: { '2019': '125 430', '2020': '243 650', '2021': '427 300', '2022': '458 900', '2023': '652 400', 'target': '730 500' },
        deltaYoY: 11.97,
        sourceBadge: 'PFA'
      },
      {
        rowName: '  - Essence',
        unit: 'Unités',
        values: { '2019': '1 282 000', '2020': '774 200', '2021': '667 800', '2022': '568 200', '2023': '635 100', 'target': '534 800' },
        deltaYoY: -15.79,
        sourceBadge: 'PFA'
      },
      {
        rowName: '  - Diesel',
        unit: 'Unités',
        values: { '2019': '754 000', '2020': '504 300', '2021': '349 200', '2022': '239 800', '2023': '183 900', 'target': '142 500' },
        deltaYoY: -22.51,
        sourceBadge: 'PFA'
      },
      {
        rowName: 'Âge moyen du parc automobile français',
        unit: 'Années',
        values: { '2019': '10.2', '2020': '10.6', '2021': '10.8', '2022': '10.8', '2023': '11.0', 'target': '11.1' },
        deltaYoY: 0.91,
        sourceBadge: 'SDES RSVERO'
      }
    ]
  },
  {
    id: 'depenses-comptes',
    code: 'SDES-5.1',
    title: 'Les dépenses de transport et comptes de la Nation',
    subtitle: 'Dépense totale de transport (DTT), budget des ménages et financement public',
    category: 'depenses_comptes',
    chapo: 'La Commission des comptes des transports de la Nation (CCTN) évalue annuellement la Dépense Totale de Transport (DTT) qui regroupe la consommation effective des ménages, les dépenses d’investissement des entreprises et les contributions publiques.',
    primaryUnit: 'Milliards d’euros courants (Mds €)',
    methodologicalNotice: 'Source officielle : Comptes nationaux de l’INSEE, comptes satellites des transports SDES, budget de l’AFIT France, données de fiscalité énergétique (DGDDI / DGFiP) et budgets des autorités organisatrices (IdFM, Régions, Métropoles).',
    officialReferenceUrl: 'https://www.statistiques.developpement-durable.gouv.fr/cctn-rapport-annuel',
    primarySources: [
      OPEN_DATA_SOURCES.find(s => s.id === 'sdes_opendata')!,
      OPEN_DATA_SOURCES.find(s => s.id === 'insee_ipi_trm')!
    ],
    keyIndicators: [
      {
        indicatorId: 'depense_totale_transport_dtt',
        indicatorName: 'Dépense totale de transport de la Nation (DTT)',
        unit: 'Mds € courants',
        historicalValues: { '2019': 438.5, '2020': 365.2, '2021': 412.8, '2022': 468.4, '2023': 492.6 },
        nowcastValue: 504.8,
        lowerBound: 498.0,
        upperBound: 510.5,
        deltaYearOnYearPct: 2.48,
        deltaFiveYearPct: 15.12,
        sourceUsed: 'Modèle comptable CCTN + IPC Insee transports',
        confidence: 'B_HIGH_PROXY'
      },
      {
        indicatorId: 'budget_transport_menages',
        indicatorName: 'Dépense de transport des ménages',
        unit: 'Mds € courants',
        historicalValues: { '2019': 158.4, '2020': 128.9, '2021': 146.5, '2022': 168.2, '2023': 176.4 },
        nowcastValue: 180.2,
        lowerBound: 177.5,
        upperBound: 182.5,
        deltaYearOnYearPct: 2.15,
        deltaFiveYearPct: 13.76,
        sourceUsed: 'Comptes nationaux Insee & indices de prix à la consommation',
        confidence: 'B_HIGH_PROXY'
      },
      {
        indicatorId: 'recettes_fiscales_energie',
        indicatorName: 'Recettes fiscales sur l’énergie des transports (TICPE + TVA)',
        unit: 'Mds €',
        historicalValues: { '2019': 42.1, '2020': 36.8, '2021': 40.2, '2022': 41.5, '2023': 41.2 },
        nowcastValue: 40.8,
        lowerBound: 40.1,
        upperBound: 41.4,
        deltaYearOnYearPct: -0.97,
        deltaFiveYearPct: -3.09,
        sourceUsed: 'Bercy / Douanes / CPDP',
        confidence: 'A_OFFICIAL'
      }
    ],
    modalBreakdown: {
      categoryName: 'Financement de la dépense totale de transport',
      items: [
        { name: 'Ménages (achats, carburants, billets)', value: 180.2, percentage: 35.7, unit: 'Mds €', color: '#3b82f6', deltaYoY: 2.15, source: 'Insee' },
        { name: 'Entreprises (véhicules, fret, Versement Mobilité)', value: 215.4, percentage: 42.7, unit: 'Mds €', color: '#10b981', deltaYoY: 2.62, source: 'CCTN' },
        { name: 'Administrations publiques (État, Régions, AOM)', value: 109.2, percentage: 21.6, unit: 'Mds €', color: '#f59e0b', deltaYoY: 2.72, source: 'AFITF / DGFiP' }
      ]
    },
    econometricModels: [],
    officialTableRows: [
      {
        rowName: 'Dépenses des ménages en transport',
        unit: 'Mds €',
        isSubHeader: true,
        values: { '2019': 158.4, '2020': 128.9, '2021': 146.5, '2022': 168.2, '2023': 176.4, 'target': 180.2 },
        deltaYoY: 2.15,
        sourceBadge: 'Insee'
      },
      {
        rowName: '  - dont Carburants et lubrifiants',
        unit: 'Mds €',
        values: { '2019': 45.2, '2020': 35.1, '2021': 43.8, '2022': 54.2, '2023': 53.8, 'target': 52.4 },
        deltaYoY: -2.60,
        sourceBadge: 'CPDP / IPC'
      },
      {
        rowName: '  - dont Achats de véhicules neufs et d’occasion',
        unit: 'Mds €',
        values: { '2019': 48.6, '2020': 39.8, '2021': 44.5, '2022': 47.9, '2023': 52.8, 'target': 54.9 },
        deltaYoY: 3.98,
        sourceBadge: 'PFA / Insee'
      },
      {
        rowName: '  - dont Services de transport (train, avion, TC)',
        unit: 'Mds €',
        values: { '2019': 28.5, '2020': 17.2, '2021': 20.8, '2022': 27.5, '2023': 30.4, 'target': 32.6 },
        deltaYoY: 7.24,
        sourceBadge: 'SNCF/DGAC/UTP'
      },
      {
        rowName: 'DÉPENSE TOTALE DE TRANSPORT (DTT)',
        unit: 'Mds €',
        isTotal: true,
        values: { '2019': 438.5, '2020': 365.2, '2021': 412.8, '2022': 468.4, '2023': 492.6, 'target': 504.8 },
        deltaYoY: 2.48,
        sourceBadge: 'CCTN Synthèse'
      }
    ]
  },
  {
    id: 'aerien-activite',
    code: 'SDES-7.1',
    title: 'L’activité du transport aérien commercial',
    subtitle: 'Trafic passagers, mouvements d’aéronefs et offre en sièges-kilomètres (SKO)',
    category: 'aerien',
    chapo: 'Le transport aérien commercial en France métropolitaine et d’outre-mer enregistre une reprise soutenue post-crise sanitaire, tirée par les flux internationaux et les compagnies low-cost.',
    primaryUnit: 'Millions de passagers & Milliers de mouvements',
    methodologicalNotice: 'Source officielle : Direction Générale de l’Aviation Civile (DGAC - Bulletin mensuel Tendances). Les données intègrent les aéroports de Paris (CDG et Orly) et l’ensemble des aéroports régionaux métropolitains et ultramarins.',
    officialReferenceUrl: 'https://www.ecologie.gouv.fr/statistiques-du-transport-aerien',
    primarySources: [
      OPEN_DATA_SOURCES.find(s => s.id === 'dgac_bulletin')!
    ],
    keyIndicators: [
      {
        indicatorId: 'passagers_commerciaux_dgac',
        indicatorName: 'Passagers commerciaux totaux (Métropole et Outre-mer)',
        unit: 'Millions de passagers',
        historicalValues: { '2019': 180.2, '2020': 61.2, '2021': 82.5, '2022': 144.8, '2023': 169.5 },
        nowcastValue: 176.8,
        lowerBound: 174.5,
        upperBound: 178.5,
        deltaYearOnYearPct: 4.31,
        deltaFiveYearPct: -1.89,
        sourceUsed: 'DGAC Tendances 12 mois complets',
        confidence: 'A_OFFICIAL'
      },
      {
        indicatorId: 'mouvements_avions_dgac',
        indicatorName: 'Mouvements d’avions commerciaux (décollages et atterrissages)',
        unit: 'Milliers de mouvements',
        historicalValues: { '2019': 1612.0, '2020': 784.0, '2021': 950.0, '2022': 1320.0, '2023': 1445.0 },
        nowcastValue: 1482.0,
        lowerBound: 1465.0,
        upperBound: 1495.0,
        deltaYearOnYearPct: 2.56,
        deltaFiveYearPct: -8.06,
        sourceUsed: 'DGAC / Eurocontrol',
        confidence: 'A_OFFICIAL'
      },
      {
        indicatorId: 'taux_remplissage_avions',
        indicatorName: 'Coefficient d’occupation moyen (taux de remplissage)',
        unit: '%',
        historicalValues: { '2019': 83.5, '2020': 65.2, '2021': 71.4, '2022': 80.8, '2023': 83.2 },
        nowcastValue: 84.1,
        lowerBound: 83.5,
        upperBound: 84.8,
        deltaYearOnYearPct: 1.08,
        deltaFiveYearPct: 0.72,
        sourceUsed: 'DGAC Stats',
        confidence: 'A_OFFICIAL'
      }
    ],
    modalBreakdown: {
      categoryName: 'Répartition des passagers aériens par faisceau géographique',
      items: [
        { name: 'International Union Européenne', value: 81.2, percentage: 45.9, unit: 'M pax', color: '#3b82f6', deltaYoY: 4.8, source: 'DGAC' },
        { name: 'International Hors UE (Amériques, Asie, Afrique)', value: 59.4, percentage: 33.6, unit: 'M pax', color: '#10b981', deltaYoY: 6.2, source: 'DGAC' },
        { name: 'Intérieur Métropole - Métropole', value: 23.8, percentage: 13.5, unit: 'M pax', color: '#f59e0b', deltaYoY: -1.2, source: 'DGAC' },
        { name: 'Liaisons Métropole - Outre-mer', value: 12.4, percentage: 7.0, unit: 'M pax', color: '#8b5cf6', deltaYoY: 3.1, source: 'DGAC' }
      ]
    },
    econometricModels: [],
    officialTableRows: [
      {
        rowName: 'Passagers par faisceau géographique',
        unit: 'Millions',
        isSubHeader: true,
        values: { '2019': 180.2, '2020': 61.2, '2021': 82.5, '2022': 144.8, '2023': 169.5, 'target': 176.8 },
        deltaYoY: 4.31,
        sourceBadge: 'DGAC'
      },
      {
        rowName: '  - Faisceau International UE + Espace Économique Européen',
        unit: 'Millions',
        values: { '2019': 84.2, '2020': 28.5, '2021': 38.6, '2022': 69.4, '2023': 77.5, 'target': 81.2 },
        deltaYoY: 4.77,
        sourceBadge: 'DGAC'
      },
      {
        rowName: '  - Faisceau International Extra-UE',
        unit: 'Millions',
        values: { '2019': 63.8, '2020': 18.2, '2021': 25.1, '2022': 47.8, '2023': 55.9, 'target': 59.4 },
        deltaYoY: 6.26,
        sourceBadge: 'DGAC'
      },
      {
        rowName: '  - Faisceau Intérieur Métropolitain',
        unit: 'Millions',
        values: { '2019': 20.8, '2020': 9.8, '2021': 12.8, '2022': 19.5, '2023': 24.1, 'target': 23.8 },
        deltaYoY: -1.24,
        sourceBadge: 'DGAC'
      },
      {
        rowName: '  - Faisceau Métropole - Outre-mer',
        unit: 'Millions',
        values: { '2019': 11.4, '2020': 4.7, '2021': 6.0, '2022': 8.1, '2023': 12.0, 'target': 12.4 },
        deltaYoY: 3.33,
        sourceBadge: 'DGAC'
      },
      {
        rowName: 'TOTAL Passagers Commerciaux DGAC',
        unit: 'Millions',
        isTotal: true,
        values: { '2019': 180.2, '2020': 61.2, '2021': 82.5, '2022': 144.8, '2023': 169.5, 'target': 176.8 },
        deltaYoY: 4.31,
        sourceBadge: 'DGAC Bulletin'
      }
    ]
  }
];
