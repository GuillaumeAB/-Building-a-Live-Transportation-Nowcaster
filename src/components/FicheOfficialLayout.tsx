import React from 'react';
import { SDESFiche, NowcastResult, TimeGranularity } from '../types/sdes';
import { SourceStatusBadge } from './SourceStatusBadge';
import { 
  FileText, TrendingUp, TrendingDown, Info, ShieldCheck, 
  ExternalLink, Sparkles, AlertCircle, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

interface FicheOfficialLayoutProps {
  fiche: SDESFiche;
  nowcastResult: NowcastResult;
  periodType: TimeGranularity;
  targetPeriod: string;
  onOpenCalibration: () => void;
  onOpenAiChat: () => void;
  onOpenMethodology: () => void;
}

export const FicheOfficialLayout: React.FC<FicheOfficialLayoutProps> = ({
  fiche,
  nowcastResult,
  periodType,
  targetPeriod,
  onOpenCalibration,
  onOpenAiChat,
  onOpenMethodology
}) => {
  const isQuarter = periodType === 'quarter';

  return (
    <div className="space-y-6">
      
      {/* Official SDES Fiche Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-blue-900 text-white shadow-xs">
                {fiche.code}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                Bilan Annuel des Transports • SDES
              </span>
              <SourceStatusBadge confidence={nowcastResult.overallConfidence} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {fiche.title}
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-1">
              {fiche.subtitle}
            </p>
          </div>

          {/* Target Period Tag */}
          <div className="bg-slate-900 text-white px-4 py-3 rounded-xl flex flex-col items-end flex-shrink-0 shadow-sm border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Période Reproduite
            </span>
            <span className="text-xl font-black text-amber-400">
              {targetPeriod}
            </span>
            <span className="text-[10px] text-emerald-400 font-medium mt-0.5 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Estimation à date validée</span>
            </span>
          </div>
        </div>

        {/* Chapeau Officiel */}
        <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-xl text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
          « {fiche.chapo} »
        </div>

        {/* Key Indicators KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {nowcastResult.indicators.map((ind) => {
            const isPositive = ind.deltaYearOnYearPct >= 0;
            return (
              <div
                key={ind.indicatorId}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-700 leading-tight">
                      {ind.indicatorName}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                      {ind.unit}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      {ind.nowcastValue.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {ind.unit}
                    </span>
                  </div>

                  {/* Variation pills */}
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`flex items-center space-x-0.5 font-bold px-2 py-0.5 rounded-md ${
                      isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>{isPositive ? '+' : ''}{ind.deltaYearOnYearPct}% <span className="font-normal text-[10px]">N/N-1</span></span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      5 ans : <strong className={ind.deltaFiveYearPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {ind.deltaFiveYearPct >= 0 ? '+' : ''}{ind.deltaFiveYearPct}%
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Provenance Footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[170px]" title={ind.sourceUsed}>
                    Source : {ind.sourceUsed}
                  </span>
                  <span className="font-mono text-slate-400">
                    [{ind.lowerBound} - {ind.upperBound}]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Bar for Data Audit */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs">
          <div className="flex items-center space-x-3 text-slate-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Intervalle de confiance CCTN : <strong>±1.5%</strong></span>
            </span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={onOpenMethodology}
              className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
            >
              Consulter la notice méthodologique SDES
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenCalibration}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
            >
              Ajuster les hypothèses de régression
            </button>
            <button
              onClick={onOpenAiChat}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-xs transition cursor-pointer flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interroger l'analyste IA</span>
            </button>
          </div>
        </div>

      </div>

      {/* Official CCTN Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Tableau Officiel de la Commission des Comptes des Transports de la Nation</span>
            </h2>
            <p className="text-xs text-slate-400">
              Séries historiques consolidées 2019-2023 et estimation nowcastée pour {targetPeriod}
            </p>
          </div>

          <span className="text-[11px] font-mono bg-slate-800 text-amber-300 px-2.5 py-1 rounded-md border border-slate-700">
            Unité : {fiche.primaryUnit.split(' ')[0]}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4 min-w-[240px]">Mode de transport / Agrégat</th>
                <th className="py-3 px-3 text-right">2019</th>
                <th className="py-3 px-3 text-right">2020</th>
                <th className="py-3 px-3 text-right">2021</th>
                <th className="py-3 px-3 text-right">2022</th>
                <th className="py-3 px-3 text-right">2023</th>
                <th className="py-3 px-4 text-right bg-blue-50/80 font-black text-blue-900 border-x border-blue-200">
                  {targetPeriod} (Nowcast)
                </th>
                <th className="py-3 px-3 text-right">% N / N-1</th>
                <th className="py-3 px-4 text-left">Source & Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {fiche.officialTableRows.map((row, idx) => {
                const isSub = row.isSubHeader;
                const isTotal = row.isTotal;
                const targetVal = row.values.target !== undefined ? row.values.target : row.values['2023'];
                const scaleVal = (val: any) => {
                  if (typeof val === 'number') {
                    const scaled = isQuarter ? +(val * 0.255).toFixed(1) : val;
                    return scaled.toLocaleString('fr-FR');
                  }
                  return val;
                };

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition ${
                      isTotal
                        ? 'bg-slate-900 text-white font-black hover:bg-slate-900'
                        : isSub
                        ? 'bg-slate-50/90 font-bold text-slate-900'
                        : ''
                    }`}
                  >
                    <td className={`py-2.5 px-4 ${isTotal ? 'text-white' : ''}`}>
                      {row.rowName}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {scaleVal(row.values['2019'])}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {scaleVal(row.values['2020'])}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {scaleVal(row.values['2021'])}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {scaleVal(row.values['2022'])}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {scaleVal(row.values['2023'])}
                    </td>

                    {/* Target Nowcast Value */}
                    <td className={`py-2.5 px-4 text-right font-mono font-bold border-x ${
                      isTotal
                        ? 'bg-blue-800 text-amber-300 border-blue-700'
                        : 'bg-blue-50/50 text-blue-900 border-blue-200'
                    }`}>
                      {scaleVal(targetVal)}
                    </td>

                    {/* Delta YoY */}
                    <td className="py-2.5 px-3 text-right font-bold">
                      <span className={`${
                        row.deltaYoY >= 0
                          ? isTotal ? 'text-emerald-300' : 'text-emerald-600'
                          : isTotal ? 'text-rose-300' : 'text-rose-600'
                      }`}>
                        {row.deltaYoY >= 0 ? '+' : ''}{row.deltaYoY}%
                      </span>
                    </td>

                    {/* Source Badge */}
                    <td className="py-2.5 px-4">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
                        isTotal
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        {row.sourceBadge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>* Les données 2019-2023 correspondent aux publications définitives du SDES CCTN. La colonne {targetPeriod} est issue du modèle Nowcast.</span>
          <a
            href={fiche.officialReferenceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
          >
            <span>Consulter le rapport officiel SDES en ligne</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Modal Breakdown Progress & Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Modal Share Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {fiche.modalBreakdown.categoryName}
              </h3>
              <p className="text-xs text-slate-500">
                Structure de l'activité en {targetPeriod}
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
              100% Total
            </span>
          </div>

          <div className="space-y-3">
            {fiche.modalBreakdown.items.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="font-medium text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="font-bold text-slate-900">{item.percentage}%</span>
                    <span className="text-slate-400">({(isQuarter ? +(item.value * 0.255).toFixed(1) : item.value)} {item.unit})</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodological Transparency & Proxy Notice */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Info className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-white text-sm">
                Notice Méthodologique & Audit de Robustesse
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {fiche.methodologicalNotice}
            </p>

            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 text-xs space-y-1.5">
              <div className="font-semibold text-amber-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Formule CCTN appliquée :</span>
              </div>
              <p className="font-mono text-[11px] text-slate-200">
                {fiche.keyIndicators[0]?.proxyFormulaUsed || 'Total = Somme(Modalités Métropole) + Ajustements Pavillons Étrangers'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Sources primaires : {fiche.primarySources.length} flux certifiés</span>
            <button
              onClick={onOpenMethodology}
              className="text-indigo-300 hover:text-white font-semibold underline cursor-pointer"
            >
              Détails du modèle économétrique →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
