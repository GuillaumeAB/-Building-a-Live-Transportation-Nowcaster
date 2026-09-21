import React from 'react';
import { TimeGranularity } from '../types/sdes';
import { Calendar, Clock, Zap, Info } from 'lucide-react';

interface PeriodSelectorProps {
  periodType: TimeGranularity;
  setPeriodType: (type: TimeGranularity) => void;
  targetPeriod: string;
  setTargetPeriod: (period: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  periodType,
  setPeriodType,
  targetPeriod,
  setTargetPeriod
}) => {
  const annualOptions = ['2024', '2023 (Consolidé)', '2025 (Prévisionnel)'];
  const quarterlyOptions = ['2024-Q4', '2024-Q3', '2024-Q2', '2024-Q1', '2025-Q1'];

  const isQuarter = periodType === 'quarter';

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-4 sm:p-5 shadow-md mb-6 border border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left: Granularity toggle & selection */}
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Horizon temporel de reproduction</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle Switch */}
            <div className="bg-slate-800/80 p-1 rounded-lg border border-slate-700 flex text-xs">
              <button
                onClick={() => {
                  setPeriodType('year');
                  setTargetPeriod('2024');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  !isQuarter
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Dernière Année Calendaire</span>
              </button>

              <button
                onClick={() => {
                  setPeriodType('quarter');
                  setTargetPeriod('2024-Q4');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                  isQuarter
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Dernier Trimestre</span>
              </button>
            </div>

            {/* Target Period Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
              {(!isQuarter ? annualOptions : quarterlyOptions).map((p) => {
                const isSelected = targetPeriod === p || (p.startsWith(targetPeriod) && p.includes(targetPeriod));
                return (
                  <button
                    key={p}
                    onClick={() => setTargetPeriod(p.split(' ')[0])}
                    className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Timing & Advance comparison banner */}
        <div className="lg:border-l lg:border-slate-800/80 lg:pl-6 flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-xs text-slate-300 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-emerald-400">Gain d'anticipation : +8 mois</span>
          </div>
          <div className="text-[11px] text-slate-400 leading-relaxed max-w-sm flex items-start space-x-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>
              Parution officielle SDES CCTN : <strong className="text-slate-200">Juin N+1</strong>. 
              Grâce aux flux amont (CPDP, ASFA, DGAC), cette fiche est calculée <strong className="text-emerald-300">à date</strong> avec un intervalle de confiance calibré.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
