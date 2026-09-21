import React from 'react';
import { X, BookOpen, ShieldCheck, Cpu, Database, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { SDESFiche } from '../types/sdes';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiche: SDESFiche;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
  fiche
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Cadre Méthodologique Officiel & Protocole Nowcast
              </h2>
              <p className="text-xs text-slate-400">
                Notice de conformité aux standards du SDES et de la CCTN (Commission des comptes des transports)
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

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Section 1: Le défi du décalage temporel */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">1</span>
              <span>Le défi du calendrier de parution SDES vs Nowcast</span>
            </h3>
            <p className="text-xs text-slate-600">
              Le <em>Bilan annuel des transports</em> du SDES est traditionnellement publié à l'été suivant l'année de référence (ex: publication du bilan 2023 en juin-juillet 2024). Pour les décideurs publics, les opérateurs et les analystes, disposer d'une estimation <strong>à date</strong> (dès la fin de l'année calendaire ou au trimestre échu) est essentiel.
            </p>
          </div>

          {/* Section 2: Cascade d'estimation et proxies */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">2</span>
              <span>La cascade d'estimation par proxies haute fréquence</span>
            </h3>
            <p className="text-xs text-slate-600">
              Pour reproduire la fiche <strong>{fiche.code} - {fiche.title}</strong>, le moteur s'appuie sur une hiérarchie de sources rigoureusement corrélées :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 text-xs flex items-center space-x-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Flux physiques certifiés (M+1)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Livraisons de carburants CPDP, comptages autoroutiers ASFA, statistiques passagers DGAC, immatriculations PFA.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 text-xs flex items-center space-x-1.5 mb-1">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Modèle économétrique CCTN</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Régression multivariée avec contrôle de saisonnalité et coefficient de corrélation R² &gt; 0.95.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Notice spécifique à la fiche */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">3</span>
              <span>Notice méthodologique officielle de la fiche</span>
            </h3>
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-950 italic">
              {fiche.methodologicalNotice}
            </div>
          </div>

          {/* Section 4: Audit des sources primaires */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">4</span>
              <span>Sources primaires mobilisées</span>
            </h3>
            <div className="space-y-1.5">
              {fiche.primarySources.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{s.name}</span>
                    <span className="text-slate-400 ml-2 font-mono">({s.producer})</span>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Délai M+{s.lagMonths}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Fermer la notice
          </button>
        </div>

      </div>
    </div>
  );
};
