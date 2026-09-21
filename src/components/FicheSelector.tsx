import React, { useState } from 'react';
import { SDESFiche, FicheCategory } from '../types/sdes';
import { Truck, Users, Leaf, Car, Coins, Plane, Search, CheckCircle2 } from 'lucide-react';

interface FicheSelectorProps {
  fiches: SDESFiche[];
  selectedFiche: SDESFiche;
  onSelectFiche: (fiche: SDESFiche) => void;
}

const CATEGORY_MAP: Record<FicheCategory, { label: string; icon: any; color: string }> = {
  marchandises: { label: 'Fret & Marchandises', icon: Truck, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  voyageurs: { label: 'Voyageurs & Mobilités', icon: Users, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  energie_climat: { label: 'Énergie & GES', icon: Leaf, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  parc_vehicules: { label: 'Parc & Véhicules', icon: Car, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  depenses_comptes: { label: 'Comptes CCTN', icon: Coins, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  emploi_salaires: { label: 'Emploi & Salaires', icon: Users, color: 'text-slate-600 bg-slate-50 border-slate-200' },
  aerien: { label: 'Aviation Civile', icon: Plane, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  portuaire_fluvial: { label: 'Ports & Fluvial', icon: Truck, color: 'text-sky-600 bg-sky-50 border-sky-200' }
};

export const FicheSelector: React.FC<FicheSelectorProps> = ({
  fiches,
  selectedFiche,
  onSelectFiche
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFiches = fiches.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs mb-6">
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes les Fiches ({fiches.length})
          </button>
          {Object.entries(CATEGORY_MAP).map(([key, meta]) => {
            const count = fiches.filter(f => f.category === key).length;
            if (count === 0) return null;
            const Icon = meta.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === key
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une fiche ou code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Fiche Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredFiches.map((fiche) => {
          const isSelected = selectedFiche.id === fiche.id;
          const catMeta = CATEGORY_MAP[fiche.category] || CATEGORY_MAP.marchandises;
          const Icon = catMeta.icon;
          const primaryKeyIndicator = fiche.keyIndicators[0];

          return (
            <div
              key={fiche.id}
              onClick={() => onSelectFiche(fiche)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {fiche.code}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${catMeta.color}`}>
                      {catMeta.label}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="flex items-center text-blue-600 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 fill-blue-600 text-white" />
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1">
                  {fiche.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {fiche.subtitle}
                </p>
              </div>

              {/* Indicator Quick Glance */}
              {primaryKeyIndicator && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 truncate max-w-[170px]">
                    {primaryKeyIndicator.indicatorName}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-800">
                      {primaryKeyIndicator.nowcastValue} {primaryKeyIndicator.unit}
                    </span>
                    <span className={`font-semibold text-[11px] px-1.5 py-0.2 rounded-sm ${
                      primaryKeyIndicator.deltaYearOnYearPct >= 0
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-rose-700 bg-rose-50'
                    }`}>
                      {primaryKeyIndicator.deltaYearOnYearPct >= 0 ? '+' : ''}
                      {primaryKeyIndicator.deltaYearOnYearPct}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
