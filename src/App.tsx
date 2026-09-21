import React, { useState, useEffect } from 'react';
import { SDESFiche, DataSourceMeta, NowcastResult, TimeGranularity } from './types/sdes';
import { SDES_FICHES } from './data/sdesFiches';
import { OPEN_DATA_SOURCES } from './data/openDataSources';
import { fetchAllFiches, fetchLiveSources, runNowcastCalculation } from './services/apiClient';

import { Header } from './components/Header';
import { FicheSelector } from './components/FicheSelector';
import { PeriodSelector } from './components/PeriodSelector';
import { FicheOfficialLayout } from './components/FicheOfficialLayout';
import { ChartsView } from './components/ChartsView';
import { ModelCalibrationPanel } from './components/ModelCalibrationPanel';
import { AiAnalystPanel } from './components/AiAnalystPanel';
import { SourcePipelineDrawer } from './components/SourcePipelineDrawer';
import { MethodologyModal } from './components/MethodologyModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [fiches, setFiches] = useState<SDESFiche[]>(SDES_FICHES);
  const [selectedFiche, setSelectedFiche] = useState<SDESFiche>(SDES_FICHES[0]);
  const [sources, setSources] = useState<DataSourceMeta[]>(OPEN_DATA_SOURCES);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toISOString());

  const [periodType, setPeriodType] = useState<TimeGranularity>('year');
  const [targetPeriod, setTargetPeriod] = useState<string>('2024');
  const [customAssumptions, setCustomAssumptions] = useState<Record<string, number> | undefined>(undefined);

  const [nowcastResult, setNowcastResult] = useState<NowcastResult>(() =>
    runNowcastCalculation(selectedFiche.id, 'year', '2024') as any
  );

  const [activeTab, setActiveTab] = useState<'fiche' | 'charts' | 'calibration' | 'ai_analyst'>('fiche');
  const [isSourcesDrawerOpen, setIsSourcesDrawerOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial load
  useEffect(() => {
    async function loadData() {
      const loadedFiches = await fetchAllFiches();
      setFiches(loadedFiches);
      if (loadedFiches.length > 0) {
        setSelectedFiche(loadedFiches[0]);
      }
      const loadedSources = await fetchLiveSources();
      setSources(loadedSources.sources);
      setLastSyncTime(loadedSources.lastSync);
    }
    loadData();
  }, []);

  // Recalculate Nowcast on fiche, period, or assumption change
  useEffect(() => {
    async function updateNowcast() {
      const res = await runNowcastCalculation(selectedFiche.id, periodType, targetPeriod, customAssumptions);
      setNowcastResult(res);
    }
    updateNowcast();
  }, [selectedFiche.id, periodType, targetPeriod, customAssumptions]);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const loadedSources = await fetchLiveSources();
      setSources(loadedSources.sources);
      setLastSyncTime(loadedSources.lastSync);
      const res = await runNowcastCalculation(selectedFiche.id, periodType, targetPeriod, customAssumptions);
      setNowcastResult(res);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const handleApplyCustomAssumptions = (assumptions: Record<string, number>) => {
    setCustomAssumptions(assumptions);
  };

  const handleResetCalibration = () => {
    setCustomAssumptions(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Official Header */}
      <Header
        sources={sources}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSourcesDrawer={() => setIsSourcesDrawerOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        
        {/* Fiche Catalog & Selector */}
        <FicheSelector
          fiches={fiches}
          selectedFiche={selectedFiche}
          onSelectFiche={(f) => {
            setSelectedFiche(f);
            setCustomAssumptions(undefined);
          }}
        />

        {/* Period Horizon Selector (Year vs Quarter) */}
        <PeriodSelector
          periodType={periodType}
          setPeriodType={setPeriodType}
          targetPeriod={targetPeriod}
          setTargetPeriod={setTargetPeriod}
        />

        {/* Active Tab View */}
        {activeTab === 'fiche' && (
          <FicheOfficialLayout
            fiche={selectedFiche}
            nowcastResult={nowcastResult}
            periodType={periodType}
            targetPeriod={targetPeriod}
            onOpenCalibration={() => setActiveTab('calibration')}
            onOpenAiChat={() => setActiveTab('ai_analyst')}
            onOpenMethodology={() => setIsMethodologyOpen(true)}
          />
        )}

        {activeTab === 'charts' && (
          <ChartsView
            fiche={selectedFiche}
            nowcastResult={nowcastResult}
            periodType={periodType}
            targetPeriod={targetPeriod}
          />
        )}

        {activeTab === 'calibration' && (
          <ModelCalibrationPanel
            fiche={selectedFiche}
            nowcastResult={nowcastResult}
            onApplyCustomAssumptions={handleApplyCustomAssumptions}
            onResetCalibration={handleResetCalibration}
          />
        )}

        {activeTab === 'ai_analyst' && (
          <AiAnalystPanel
            fiche={selectedFiche}
            nowcastResult={nowcastResult}
            periodType={periodType}
            targetPeriod={targetPeriod}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">SDES Transport Nowcast</span>
            <span>•</span>
            <span>Reproduction anticipée des fiches du Bilan Annuel des Transports</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Notice méthodologique CCTN
            </button>
            <button
              onClick={() => setIsSourcesDrawerOpen(true)}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Flux Open Data
            </button>
            <a
              href="https://www.statistiques.developpement-durable.gouv.fr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
            >
              Site officiel SDES
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <SourcePipelineDrawer
        isOpen={isSourcesDrawerOpen}
        onClose={() => setIsSourcesDrawerOpen(false)}
        sources={sources}
        lastSyncTime={lastSyncTime}
        onTriggerSync={handleRefreshData}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
        fiche={selectedFiche}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        fiche={selectedFiche}
        nowcastResult={nowcastResult}
        targetPeriod={targetPeriod}
      />

    </div>
  );
}
