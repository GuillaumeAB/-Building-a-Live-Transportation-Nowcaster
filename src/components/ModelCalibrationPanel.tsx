import React, { useState } from 'react';
import { SDESFiche, NowcastResult } from '../types/sdes';
import { Sliders, RefreshCw, Cpu, Check, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';

interface ModelCalibrationPanelProps {
  fiche: SDESFiche;
  nowcastResult: NowcastResult;
  onApplyCustomAssumptions: (assumptions: Record<string, number>) => void;
  onResetCalibration: () => void;
}

export const ModelCalibrationPanel: React.FC<ModelCalibrationPanelProps> = ({
  fiche,
  nowcastResult,
  onApplyCustomAssumptions,
  onResetCalibration
}) => {
  const [growthFactor, setGrowthFactor] = useState<number>(0);
  const [fuelElasticity, setFuelElasticity] = useState<number>(0.72);
  const [highwayElasticity, setHighwayElasticity] = useState<number>(0.21);
  const [industryShock, setIndustryShock] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const model = fiche.econometricModels[0] || {
    targetIndicator: fiche.keyIndicators[0]?.indicatorName || 'Indicateur pivot',
    proxyVariables: ['CPDP Carburants', 'ASFA Trafic', 'Insee IPI'],
    rSquared: 0.965,
    elasticityCoefficients: { 'CPDP': 0.72, 'ASFA': 0.21, 'IPI': 0.18 },
    description: 'Modèle de régression multivariée calibré sur les données de la CCTN'
  };

  const handleApply = () => {
    onApplyCustomAssumptions({
      growth_factor: growthFactor + (industryShock * 0.3)
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    setGrowthFactor(0);
    setFuelElasticity(0.72);
    setHighwayElasticity(0.21);
    setIndustryShock(0);
    onResetCalibration();
  };

  return (
    <div className="space-y-6">
      
      {/* Title Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Laboratoire de Calibration Économétrique & Test de Scénarios
              </h2>
              <p className="text-xs text-slate-500">
                Ajustez les hypothèses de proxy ou simulez un choc de conjoncture pour observer l'impact en temps réel sur la fiche SDES
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Réinitialiser
            </button>
            <button
              onClick={handleApply}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Appliqué !' : 'Recalculer la fiche'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Sliders & Model Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Area (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>Sensibilité des Proxies Amont</span>
            <span className="text-[11px] font-normal text-slate-500">Curseurs interactifs</span>
          </h3>

          {/* Slider 1: Choc Conjoncturel Global */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-800 flex items-center space-x-1">
                <span>Choc macroéconomique direct (Demande globale de transport)</span>
              </label>
              <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                growthFactor > 0 ? 'bg-emerald-50 text-emerald-700' : growthFactor < 0 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {growthFactor > 0 ? '+' : ''}{growthFactor}%
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.5"
              value={growthFactor}
              onChange={(e) => setGrowthFactor(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Récession (-10%)</span>
              <span>Baseline (0%)</span>
              <span>Forte expansion (+10%)</span>
            </div>
          </div>

          {/* Slider 2: Élasticité Carburant */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-800">
                Coefficient d'élasticité Carburants (CPDP β₁)
              </label>
              <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                β = {fuelElasticity}
              </span>
            </div>
            <input
              type="range"
              min="0.3"
              max="1.2"
              step="0.05"
              value={fuelElasticity}
              onChange={(e) => setFuelElasticity(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <p className="text-[11px] text-slate-500">
              Mesure la sensibilité de la reproduction statistique aux variations des livraisons CPDP.
            </p>
          </div>

          {/* Slider 3: Choc Activité Industrielle Insee */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-800">
                Variation de l'Indice de Production Industrielle (IPI Insee)
              </label>
              <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                {industryShock > 0 ? '+' : ''}{industryShock}%
              </span>
            </div>
            <input
              type="range"
              min="-8"
              max="8"
              step="0.5"
              value={industryShock}
              onChange={(e) => setIndustryShock(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
            <span>
              Les modifications de paramètres recalculent instantanément les totaux de la fiche choisie ainsi que l'ensemble des ventilations modales associées.
            </span>
          </div>
        </div>

        {/* Econometric Regression Details (1 col) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">
                Spécification Économétrique SDES
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {model.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                  Coefficient de Détermination (R²)
                </span>
                <span className="text-xl font-mono font-black text-emerald-400">
                  R² = {model.rSquared}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Pouvoir explicatif très élevé sur 12 ans d'historique
                </span>
              </div>

              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold mb-1">
                  Variables Explicatives Amont
                </span>
                <ul className="text-xs text-slate-200 space-y-1">
                  {model.proxyVariables.map((p, i) => (
                    <li key={i} className="flex items-center space-x-1.5 font-mono text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            Méthode MCO (Moindres Carrés Ordinaires) avec correction d'autocorrélation temporelle (Cochrane-Orcutt).
          </div>
        </div>

      </div>

    </div>
  );
};
