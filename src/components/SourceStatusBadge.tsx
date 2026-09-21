import React from 'react';
import { SourceConfidence } from '../types/sdes';
import { ShieldCheck, Zap, Cpu, HelpCircle } from 'lucide-react';

interface SourceStatusBadgeProps {
  confidence: SourceConfidence;
  sourceText?: string;
  showDetails?: boolean;
}

export const CONFIDENCE_CONFIG: Record<SourceConfidence, {
  label: string;
  badgeColor: string;
  textColor: string;
  icon: any;
  description: string;
  errorMargin: string;
}> = {
  A_OFFICIAL: {
    label: 'Classe A : Donnée Brute Définitive',
    badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700',
    textColor: 'text-emerald-700',
    icon: ShieldCheck,
    description: 'Publication directe issue d’un producteur officiel (DGAC, PFA, Insee).',
    errorMargin: '±0.0%'
  },
  B_HIGH_PROXY: {
    label: 'Classe B : Proxy Corrélé (r > 0.95)',
    badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-700',
    textColor: 'text-blue-700',
    icon: Zap,
    description: 'Indicateur physique en quasi-temps réel (ex: livraisons gazole CPDP, péages ASFA).',
    errorMargin: '±0.8%'
  },
  C_MODEL_NOWCAST: {
    label: 'Classe C : Nowcast Économétrique',
    badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-800',
    textColor: 'text-amber-800',
    icon: Cpu,
    description: 'Régression multivariée SDES CCTN calibrée sur les séries historiques 2012-2023.',
    errorMargin: '±1.5%'
  },
  D_ESTIMATED: {
    label: 'Classe D : Synthèse IA & Tendances',
    badgeColor: 'bg-purple-500/10 border-purple-500/30 text-purple-700',
    textColor: 'text-purple-700',
    icon: HelpCircle,
    description: 'Modèle génératif Gemini 3.7 Flash avec grounding et projections structurelles.',
    errorMargin: '±3.0%'
  }
};

export const SourceStatusBadge: React.FC<SourceStatusBadgeProps> = ({
  confidence,
  sourceText,
  showDetails = false
}) => {
  const config = CONFIDENCE_CONFIG[confidence] || CONFIDENCE_CONFIG.B_HIGH_PROXY;
  const Icon = config.icon;

  return (
    <div className="inline-flex flex-col">
      <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${config.badgeColor}`}>
        <Icon className="w-3 h-3 flex-shrink-0" />
        <span>{config.label.split(':')[0]}</span>
        {sourceText && (
          <>
            <span className="opacity-40">|</span>
            <span className="font-normal truncate max-w-[140px]">{sourceText}</span>
          </>
        )}
      </div>

      {showDetails && (
        <p className="text-[10px] text-slate-500 mt-1 leading-tight">
          {config.description} (Marge : {config.errorMargin})
        </p>
      )}
    </div>
  );
};
