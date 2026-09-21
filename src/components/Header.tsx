import React from 'react';
import { Database, RefreshCw, FileText, Sparkles, BookOpen, ShieldCheck, Download, Sliders } from 'lucide-react';
import { DataSourceMeta } from '../types/sdes';

interface HeaderProps {
  sources: DataSourceMeta[];
  activeTab: 'fiche' | 'charts' | 'calibration' | 'ai_analyst';
  setActiveTab: (tab: 'fiche' | 'charts' | 'calibration' | 'ai_analyst') => void;
  onOpenSourcesDrawer: () => void;
  onOpenMethodology: () => void;
  onOpenExport: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  sources,
  activeTab,
  setActiveTab,
  onOpenSourcesDrawer,
  onOpenMethodology,
  onOpenExport,
  onRefreshData,
  isRefreshing
}) => {
  const syncedCount = sources.filter(s => s.status === 'synced' || s.status === 'online').length;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Republic Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 font-semibold tracking-wider uppercase text-[11px] text-slate-200">
              <span className="text-red-500">RÉPUBLIQUE</span>
              <span className="text-slate-300">FRANÇAISE</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 text-[11px] hidden sm:inline font-medium">
              Ministère de la Transition Écologique • SDES (Service des données et études statistiques)
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={onOpenSourcesDrawer}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2.5 py-0.5 rounded-full transition cursor-pointer border border-emerald-500/30"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">{syncedCount}/{sources.length} Flux Connectés</span>
            </button>
            <span className="text-slate-400 hidden md:inline">Bilan Annuel CCTN</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  SDES Transport Nowcast & Bilan
                </h1>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  Temps Réel IA
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Reproduction anticipée et estimation intelligente des fiches officielles de la CCTN / SDES
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs self-start lg:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('fiche')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'fiche'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Fiche Officielle</span>
            </button>

            <button
              onClick={() => setActiveTab('charts')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'charts'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Analyses & Séries</span>
            </button>

            <button
              onClick={() => setActiveTab('calibration')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'calibration'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Calibration & Proxies</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_analyst')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
                activeTab === 'ai_analyst'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Copilote IA SDES</span>
            </button>
          </div>

          {/* Actions & Tools */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenMethodology}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition cursor-pointer"
              title="Consulter la méthodologie d'estimation SDES"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Méthode</span>
            </button>

            <button
              onClick={onOpenExport}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-900 text-white rounded-md transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter</span>
            </button>

            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className={`p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md border border-slate-200 transition cursor-pointer ${
                isRefreshing ? 'animate-spin text-blue-600' : ''
              }`}
              title="Synchroniser les flux Open Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
