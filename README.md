# 🇫🇷 SDES Transport Nowcast — Bilan Annuel des Transports

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Plateforme d'anticipation statistique et de **Nowcasting** des fiches thématiques officielles du **Bilan Annuel des Transports** de la **Commission des Comptes des Transports de la Nation (CCTN)** et du **SDES** (Service des Données et Études Statistiques du Ministère de la Transition Écologique).

---

## 🎯 Problématique & Objectifs

Le *Bilan annuel des transports* constitue l'ouvrage de référence décrivant les flux physiques de transport (voyageurs, marchandises, émissions de GES, dépenses de transport) en France. Cependant, en raison du temps nécessaire à la consolidation des enquêtes de branche et des comptes d'entreprises, les publications officielles définitives paraissent avec **6 à 12 mois de délai** (ex. le bilan 2023 paraît à l'été 2024).

**SDES Transport Nowcast** permet de :
- ⏱️ **Devancer le calendrier officiel de 8 mois** en produisant une estimation « à date » de l'activité annuelle et trimestrielle.
- 🔗 **Mobiliser les flux physiques amont à haute fréquence** (M+1) : livraisons pétrolières du CPDP, comptages autoroutiers ASFA, trafic passagers DGAC, immatriculations PFA, etc.
- 📐 **Appliquer les modèles économétriques CCTN** (régressions multivariées avec contrôle de saisonnalité et coefficients d'élasticité calibrés sur 12 ans).
- 🧪 **Simuler des scénarios conjoncturels** (chocs de prix des carburants, tarifs de péages, variations du PIB ou de l'activité industrielle).
- ✍️ **Rédiger automatiquement la Note de Conjoncture** grâce à l'IA générative dans un style institutionnel strict conforme aux publications ministérielles.

---

## 🚀 Fonctionnalités Clés

### 1. Reproduction des Fiches Officielles CCTN
- **Fiches thématiques** :
  - **Fiche 1.1** : Transport intérieur de marchandises (France métropolitaine, Gt-km)
  - **Fiche 1.2** : Transport routier de marchandises sous pavillon français (Gt-km)
  - **Fiche 2.1** : Transport intérieur de voyageurs (Gp-km)
  - **Fiche 3.1** : Émissions de gaz à effet de serre (GES) et consommation d'énergie des transports (Mt CO₂ eq)
- **Tableaux officiels** : Séries historiques consolidées 2019-2023, colonne prévisionnelle Nowcast, taux de variation $N/N-1$ et indicateurs de révision.
- **Répartition modale** : Ventilation dynamique par mode (route, fer, fluvial, aérien, oléoduc) recalculée instantanément.

### 2. Moteur de Nowcast & Calibrage Économétrique
- **Horizon temporel modulable** : Projection annuelle (ex. 2024, 2025) ou trimestrielle (ex. 2024-T1 à 2024-T4).
- **Simulateur de sensibilité** : Ajustement interactif des proxies amont (volume carburant, trafic péage, PIB, choc industriel) avec calcul en temps réel des répercussions sur les grandeurs physiques et les parts modales.
- **Intervalles de confiance** : Encadrement statistique de l'estimation ($\pm 1,5\%$) jusqu'à publication consolidée.

### 3. Pipeline d'Ingestion Open Data
- Suivi de la latence et du statut des flux primaires :
  - **CPDP** : Statistiques pétrolières mensuelles (latence M+1)
  - **ASFA** : Indices kilométriques des autoroutes concédées (latence M+1)
  - **DGAC** : Bulletin statistique du trafic aérien commercial (latence M+1)
  - **Insee** : Indices de production industrielle & cadrage trimestriel PIB (M+2)
  - **PFA / CCFA** : Immatriculations de véhicules neufs (M+1)

### 4. Analyste Statistique IA (Gemini Flash)
- **Note de conjoncture automatisée** : Rédaction en 3 volets (Dynamique d'ensemble, Facteurs explicatifs amont, Structure modale et perspectives).
- **Assistant expert interactif** : Réponses fondées sur les équations de comportement du SDES et citations des sources institutionnelles.

### 5. Export des Données
- Export immédiat des estimations dans 3 formats :
  - **CSV / Excel** (avec séparateur décimal et nomenclature officielle)
  - **JSON API** (format pivot pour l'intégration dans des pipelines de données)
  - **LaTeX** (tableau prêt pour insertion dans des rapports académiques ou administratifs)

---

## 🛠️ Pile Technologique

- **Framework** : [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Style & UI** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Visualisations** : [Recharts](https://recharts.org/) (Séries chronologiques composées barres/lignes, décompositions en anneau)
- **Iconographie** : [Lucide React](https://lucide.dev/)
- **Intelligence Artificielle** : [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini Flash)

---

## 📦 Installation et Démarrage

### Prérequis
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Étapes d'installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/GuillaumeAB/-Building-a-Live-Transportation-Nowcaster.git
   cd -Building-a-Live-Transportation-Nowcaster
