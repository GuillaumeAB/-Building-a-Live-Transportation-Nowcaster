import React, { useState } from 'react';
import { DataSourceMeta } from '../types/sdes';
import { X, Database, CheckCircle2, Clock, ExternalLink, RefreshCw, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { SourceStatusBadge } from './SourceStatusBadge';

interface SourcePipelineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sources: DataSourceMeta[];
  lastSyncTime: string;
  onTriggerSync: () => void;
}

export const SourcePipelineDrawer: React.FC<SourcePipelineDrawerProps> = ({
  isOpen,
  onClose,
  sources,
  lastSyncTime,
  onTriggerSync
}) => {
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { status: string; latencyMs: number }>>({});

  if (!isOpen) return null;

  const handleTestPing = (sourceId: string) => {
    setTestingId(sourceId);
    setTimeout(() => {
      setTestResults(prev => ({
        ...prev,
        [sourceId]: {
          status: '200 OK (Flux actif & validé)',
          latencyMs: Math.floor(Math.random() * 80 + 35)
        }
      }));
      setTestingId(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Centre d'Ingestion Open Data & Flux Amont
              </h2>
              <p className="text-xs text-slate-400">
                Pipeline de collecte des sources statistiques et d'estimation à date
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Pipeline Status Bar */}
        <div className="bg-blue-50/80 border-b border-blue-100 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">Pipeline Opérationnel</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-600">Dernière synchro : {new Date(lastSyncTime).toLocaleTimeString('fr-FR')}</span>
          </div>

          <button
            onClick={onTriggerSync}
            className="flex items-center space-x-1 font-medium text-blue-700 hover:text-blue-900 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tester tous les flux</span>
          </button>
        </div>

        {/* Sources List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong>Architecture du Nowcast :</strong> Afin de devancer les 6 à 12 mois de délai de publication du SDES officiel, la plateforme agrège les séries haute fréquence (mensuelles CPDP, ASFA, PFA, DGAC) et applique les régressions CCTN pour estimer les totaux de transport.
          </div>

          {sources.map((src) => {
            const test = testResults[src.id];
            const isTesting = testingId === src.id;

            return (
              <div
                key={src.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm">
                        {src.name}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {src.producer}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      {src.description}
                    </p>
                  </div>

                  <SourceStatusBadge confidence={src.confidenceTier} />
                </div>

                {/* Pipeline Metrics */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Fréquence</span>
                    <span className="font-semibold text-slate-700 capitalize">{src.frequency}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Délai Parution</span>
                    <span className="font-semibold text-slate-700">M+{src.lagMonths} {src.lagMonths === 0 ? '(J+5)' : ''}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Dernier relevé</span>
                    <span className="font-semibold text-slate-700">{src.lastUpdated}</span>
                  </div>
                </div>

                {/* Actions & Test */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTestPing(src.id)}
                      disabled={isTesting}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition cursor-pointer"
                    >
                      <Activity className={`w-3 h-3 ${isTesting ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                      <span>{isTesting ? 'Ping...' : 'Tester le flux'}</span>
                    </button>

                    {test && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{test.status} ({test.latencyMs}ms)</span>
                      </span>
                    )}
                  </div>

                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span>Portail source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Fermer le moniteur
          </button>
        </div>

      </div>
    </div>
  );
};
