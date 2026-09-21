import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileCode, Printer, Copy, Check } from 'lucide-react';
import { SDESFiche, NowcastResult } from '../types/sdes';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiche: SDESFiche;
  nowcastResult: NowcastResult;
  targetPeriod: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  fiche,
  nowcastResult,
  targetPeriod
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCsv = () => {
    const headers = ['Mode / Indicateur', 'Unite', '2019', '2020', '2021', '2022', '2023', `${targetPeriod} (Nowcast)`, 'Delta YoY (%)', 'Source'];
    const rows = fiche.officialTableRows.map(r => {
      const vals = [
        `"${r.rowName.replace(/"/g, '""')}"`,
        `"${r.unit}"`,
        r.values['2019'] || '',
        r.values['2020'] || '',
        r.values['2021'] || '',
        r.values['2022'] || '',
        r.values['2023'] || '',
        r.values.target !== undefined ? r.values.target : '',
        r.deltaYoY || '',
        `"${r.sourceBadge}"`
      ];
      return vals.join(';');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SDES_${fiche.code}_${targetPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      ficheMeta: {
        code: fiche.code,
        title: fiche.title,
        category: fiche.category,
        period: targetPeriod
      },
      nowcast: nowcastResult
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SDES_${fiche.code}_${targetPeriod}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${fiche.code} - ${fiche.title} (${targetPeriod})
*Bilan Annuel des Transports - SDES / CCTN (Reproduction Nowcast)*

## Synthèse
${fiche.chapo}

## Indicateurs Clés
${nowcastResult.indicators.map(i => `- **${i.indicatorName}** : ${i.nowcastValue} ${i.unit} (Variation N/N-1 : ${i.deltaYearOnYearPct}%) [Source : ${i.sourceUsed}]`).join('\n')}

## Répartition Modale
${fiche.modalBreakdown.items.map(m => `- ${m.name} : ${m.percentage}% (${m.value} ${m.unit})`).join('\n')}

---
*Généré par SDES Transport Nowcast le ${new Date().toLocaleDateString('fr-FR')}*`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Exporter la Fiche {fiche.code}
              </h2>
              <p className="text-xs text-slate-400">
                Période {targetPeriod} • Formats institutionnels et statistiques
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

        {/* Body */}
        <div className="p-6 space-y-3">
          
          {/* CSV Export */}
          <button
            onClick={handleDownloadCsv}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Tableau de données CSV structuré
                </h4>
                <p className="text-[11px] text-slate-500">
                  Compatible Excel, R, Python et SIG avec séries 2019-2023 et nowcast
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </button>

          {/* JSON Export */}
          <button
            onClick={handleDownloadJson}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Payload JSON API Standard
                </h4>
                <p className="text-[11px] text-slate-500">
                  Schéma complet avec métadonnées, intervalles de confiance et proxies
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </button>

          {/* Markdown Copy */}
          <button
            onClick={handleCopyMarkdown}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                  {copied ? 'Markdown copié dans le presse-papier !' : 'Copier en format Markdown'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Idéal pour insérer dans un rapport ou une note ministérielle
                </p>
              </div>
            </div>
            <Copy className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
          </button>

          {/* Print PDF */}
          <button
            onClick={handlePrint}
            className="w-full p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Imprimer / Exporter en PDF
                </h4>
                <p className="text-[11px] text-slate-500">
                  Générer une version imprimable fidèle au format du Bilan des transports
                </p>
              </div>
            </div>
            <Printer className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
