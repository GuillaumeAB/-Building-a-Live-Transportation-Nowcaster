import React, { useState } from 'react';
import { SDESFiche, NowcastResult, TimeGranularity } from '../types/sdes';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, Legend, Cell, PieChart, Pie 
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp, Layers } from 'lucide-react';

interface ChartsViewProps {
  fiche: SDESFiche;
  nowcastResult: NowcastResult;
  periodType: TimeGranularity;
  targetPeriod: string;
}

export const ChartsView: React.FC<ChartsViewProps> = ({
  fiche,
  nowcastResult,
  periodType,
  targetPeriod
}) => {
  const [activeChartType, setActiveChartType] = useState<'historical' | 'modal' | 'submodes'>('historical');
  const isQuarter = periodType === 'quarter';

  const primaryIndicator = nowcastResult.indicators[0] || fiche.keyIndicators[0];

  // Historical data series formatted for Recharts
  const historicalChartData = [
    { year: '2019', value: primaryIndicator.historicalValues['2019'] * (isQuarter ? 0.255 : 1.0), type: 'Officiel SDES' },
    { year: '2020', value: primaryIndicator.historicalValues['2020'] * (isQuarter ? 0.255 : 1.0), type: 'Officiel SDES' },
    { year: '2021', value: primaryIndicator.historicalValues['2021'] * (isQuarter ? 0.255 : 1.0), type: 'Officiel SDES' },
    { year: '2022', value: primaryIndicator.historicalValues['2022'] * (isQuarter ? 0.255 : 1.0), type: 'Officiel SDES' },
    { year: '2023', value: primaryIndicator.historicalValues['2023'] * (isQuarter ? 0.255 : 1.0), type: 'Officiel SDES' },
    {
      year: `${targetPeriod}*`,
      value: primaryIndicator.nowcastValue,
      lowerBound: primaryIndicator.lowerBound,
      upperBound: primaryIndicator.upperBound,
      type: 'Nowcast Estimé'
    }
  ];

  // Modal data for Pie chart
  const pieData = fiche.modalBreakdown.items.map(item => ({
    name: item.name,
    value: item.percentage,
    rawValue: isQuarter ? +(item.value * 0.255).toFixed(1) : item.value,
    unit: item.unit,
    color: item.color
  }));

  // Submodes delta YoY
  const submodesData = nowcastResult.indicators.map(ind => ({
    name: ind.indicatorName.length > 28 ? ind.indicatorName.substring(0, 26) + '...' : ind.indicatorName,
    delta: ind.deltaYearOnYearPct,
    val: ind.nowcastValue,
    unit: ind.unit
  }));

  return (
    <div className="space-y-6">
      
      {/* Chart View Header & Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Exploration Graphique & Trajectoires Statistiques</span>
          </h2>
          <p className="text-xs text-slate-500">
            Visualisation des séries chronologiques et de la décomposition modale pour {fiche.title}
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveChartType('historical')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              activeChartType === 'historical'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Série Longue & Nowcast</span>
          </button>

          <button
            onClick={() => setActiveChartType('modal')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              activeChartType === 'modal'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Part Modale</span>
          </button>

          <button
            onClick={() => setActiveChartType('submodes')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              activeChartType === 'submodes'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Croissances N/N-1</span>
          </button>
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        
        {/* Historical Time Series Chart */}
        {activeChartType === 'historical' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Évolution 2019-2023 et Nowcast {targetPeriod} : {primaryIndicator.indicatorName}
                </h3>
                <p className="text-xs text-slate-500">
                  Unité : {primaryIndicator.unit} • En vert/bleu : Données consolidées • Dernier point : Nowcast calculé à date
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center space-x-1 text-slate-600">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span>Série SDES</span>
                </span>
                <span className="flex items-center space-x-1 text-indigo-600 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span>Point Nowcast {targetPeriod}</span>
                </span>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sdesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fontSize: 12 }}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    formatter={(val: any) => [`${(+val).toLocaleString('fr-FR')} ${primaryIndicator.unit}`, primaryIndicator.indicatorName]}
                    labelFormatter={(lbl) => `Année : ${lbl}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#sdesGradient)"
                    dot={{ r: 5, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 7 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>
                Fourchette d'incertitude sur {targetPeriod} : <strong>{primaryIndicator.lowerBound} à {primaryIndicator.upperBound} {primaryIndicator.unit}</strong>
              </span>
              <span className="text-emerald-700 font-semibold">
                Delta N/N-1 : {primaryIndicator.deltaYearOnYearPct >= 0 ? '+' : ''}{primaryIndicator.deltaYearOnYearPct}%
              </span>
            </div>
          </div>
        )}

        {/* Modal Share Pie Chart */}
        {activeChartType === 'modal' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {fiche.modalBreakdown.categoryName} ({targetPeriod})
                </h3>
                <p className="text-xs text-slate-500">
                  Ventilation en pourcentage et en volume ({primaryIndicator.unit})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                      formatter={(val: any, name: any, item: any) => [
                        `${val}% (${item.payload.rawValue} ${item.payload.unit})`,
                        name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend List */}
              <div className="space-y-2.5">
                {pieData.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 transition flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-3.5 h-3.5 rounded-md flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="font-medium text-slate-800">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono">
                      <span className="font-black text-slate-900">{item.value}%</span>
                      <span className="text-slate-400">({item.rawValue} {item.unit})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submodes Delta YoY Bar Chart */}
        {activeChartType === 'submodes' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Taux de variation annuelle (% N / N-1) par agrégat
                </h3>
                <p className="text-xs text-slate-500">
                  Comparaison des dynamiques relatives sur la période {targetPeriod}
                </p>
              </div>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={submodesData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    formatter={(val: any) => [`${val >= 0 ? '+' : ''}${val}%`, 'Variation N/N-1']}
                  />
                  <Bar dataKey="delta" radius={[0, 4, 4, 0]}>
                    {submodesData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.delta >= 0 ? '#10b981' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
