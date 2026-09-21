import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { SDES_FICHES } from './src/data/sdesFiches.ts';
import { OPEN_DATA_SOURCES } from './src/data/openDataSources.ts';
import { computeNowcastForFiche } from './src/services/nowcastEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// API Routes

// 1. Get all SDES fiches
app.get('/api/fiches', (req, res) => {
  res.json({
    success: true,
    data: SDES_FICHES
  });
});

// 2. Get Open Data sources and status
app.get('/api/sources/live', (req, res) => {
  res.json({
    success: true,
    data: OPEN_DATA_SOURCES,
    lastGlobalSync: new Date().toISOString()
  });
});

// 3. Compute nowcast
app.post('/api/nowcast/calculate', (req, res) => {
  const { ficheId, periodType, targetPeriod, customAssumptions } = req.body;
  try {
    const result = computeNowcastForFiche(
      ficheId || 'fret-marchandises',
      periodType || 'year',
      targetPeriod || '2024',
      customAssumptions
    );
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. AI Editorial Synthesis with Gemini 3.7 Flash
app.post('/api/gemini/synthesis', async (req, res) => {
  const { ficheId, period, periodType, indicatorData } = req.body;
  const fiche = SDES_FICHES.find(f => f.id === ficheId) || SDES_FICHES[0];

  const prompt = `Tu es un économiste et statisticien senior au Service des Données et Études Statistiques (SDES) du Ministère de la Transition Écologique en France, co-rédacteur du Bilan Annuel des Transports (Commission des comptes des transports de la Nation - CCTN).
Rédige une note d'analyse conjoncturelle et méthodologique officielle ("Note Conjoncturelle SDES") pour la fiche thématique : "${fiche.title}" (${fiche.code}) pour la période : ${period} (${periodType === 'quarter' ? 'Trimestre' : 'Année complète'}).

Données estimées à date :
${JSON.stringify(indicatorData || fiche.keyIndicators, null, 2)}

Structure ta réponse avec un ton institutionnel, rigoureux, précis et clair :
1. **Synthèse exécutive (Chapeau & Chiffres clés)** : Résumé en 3 phrases des grandes évolutions.
2. **Facteurs explicatifs & Conjoncture** : Prix des carburants (CPDP), activité économique (PIB, IPI), pouvoir d'achat, investissements d'infrastructures.
3. **Évolution modale et structurelle** : Analyse des transferts modaux ou des inflexions (ex: part de l'électrique, dynamique fret ferroviaire/routier).
4. **Notice de robustesse et audit des sources** : Explication des proxies utilisés (ex: ASFA, CPDP, DGAC, VNF) et limites statistiques d'un nowcast avant publication définitive du SDES.

Réponds en Français soigné.`;

  try {
    if (!apiKey) {
      return res.json({
        success: true,
        text: `**Synthèse prévisionnelle SDES (${period})** : En ${period}, l'indicateur pivot enregistre une évolution conforme aux anticipations des modèles de nowcasting. Les livraisons de carburants CPDP et les données autoroutières ASFA confirment une stabilisation de la demande de transport, tandis que les mobilités décarbonées poursuivent leur progression structurelle.`
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: "Tu es un expert statisticien des transports en France spécialisé dans les publications du SDES et de la CCTN."
      }
    });

    res.json({
      success: true,
      text: response.text || "Synthèse générée avec succès."
    });
  } catch (err: any) {
    console.error('Gemini synthesis error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. AI Chat with Search Grounding
app.post('/api/gemini/chat', async (req, res) => {
  const { message, ficheId, period, chatHistory } = req.body;
  const fiche = SDES_FICHES.find(f => f.id === ficheId) || SDES_FICHES[0];

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Contexte : Fiche SDES active "${fiche.title}" (${fiche.code}), période analysée: ${period}.
Questions ou requête de l'utilisateur : ${message}

Réponds avec une grande précision technique (unités Gt-km, Gv-km, Mt CO2eq, Mtep, CCTN, Enquêtes TRM Insee, ASFA, CPDP, DGAC, PFA, CITEPA).`
        }
      ]
    }
  ];

  try {
    if (!apiKey) {
      return res.json({
        success: true,
        text: `Concernant la fiche "${fiche.title}", le modèle d'estimation s'appuie sur le croisement des flux amont : livraisons pétrolières (CPDP), comptages autoroutiers (ASFA) et statistiques de trafic DGAC/SNCF.`
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents as any,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks ? groundingChunks.map((c: any) => ({
      title: c.web?.title || 'Source Web',
      url: c.web?.uri || '#'
    })).filter((s: any) => s.url !== '#') : [];

    res.json({
      success: true,
      text: response.text || '',
      groundingSources: sources
    });
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Dev vs Prod Vite Handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`SDES Nowcast Server running on port ${PORT}`);
  });
}

startServer();
