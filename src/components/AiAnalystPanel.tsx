import React, { useState } from 'react';
import { SDESFiche, NowcastResult, TimeGranularity } from '../types/sdes';
import { generateAiSynthesis, sendAiChatMessage } from '../services/apiClient';
import { 
  Sparkles, Send, Bot, User, RefreshCw, FileText, 
  ExternalLink, CheckCircle, HelpCircle, MessageSquare 
} from 'lucide-react';

interface AiAnalystPanelProps {
  fiche: SDESFiche;
  nowcastResult: NowcastResult;
  periodType: TimeGranularity;
  targetPeriod: string;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  groundingSources?: { title: string; url: string }[];
}

export const AiAnalystPanel: React.FC<AiAnalystPanelProps> = ({
  fiche,
  nowcastResult,
  periodType,
  targetPeriod
}) => {
  const [synthesisText, setSynthesisText] = useState<string>('');
  const [isGeneratingSynthesis, setIsGeneratingSynthesis] = useState<boolean>(false);
  
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Bonjour. Je suis l'Analyste Statistique IA spécialisé dans les fiches thématiques du Bilan Annuel des Transports du SDES et de la CCTN. Je peux analyser la dynamique de "${fiche.title}" pour la période ${targetPeriod}, expliquer les facteurs explicatifs ou vérifier la corrélation des proxies.`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleGenerateSynthesis = async () => {
    setIsGeneratingSynthesis(true);
    try {
      const text = await generateAiSynthesis(fiche.id, targetPeriod, periodType, nowcastResult.indicators);
      setSynthesisText(text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingSynthesis(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend
    };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const res = await sendAiChatMessage(textToSend, fiche.id, targetPeriod);
      const botMsg: ChatMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: res.text,
        groundingSources: res.groundingSources
      };
      setChatMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  const quickQuestions = [
    `Quels sont les facteurs explicatifs clés de la dynamique de ${targetPeriod} ?`,
    `Comment les livraisons de carburants CPDP corrèlent-elles avec cette fiche ?`,
    `Quelle est l'évolution de la part modale sur les 5 dernières années ?`,
    `Quelles sont les limites statistiques de ce nowcast avant la parution SDES ?`
  ];

  return (
    <div className="space-y-6">
      
      {/* Editorial Note Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Note de Conjoncture Officielle SDES (Générée par IA)
              </h2>
              <p className="text-xs text-slate-500">
                Synthèse statistique institutionnelle rédigée pour la fiche {fiche.code} ({targetPeriod})
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateSynthesis}
            disabled={isGeneratingSynthesis}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGeneratingSynthesis ? 'animate-spin' : ''}`} />
            <span>{isGeneratingSynthesis ? 'Rédaction en cours...' : 'Rédiger la Note de Conjoncture'}</span>
          </button>
        </div>

        {synthesisText ? (
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 prose prose-slate max-w-none">
            {synthesisText.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50/70 rounded-xl border border-dashed border-slate-200">
            <FileText className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-xs text-slate-600 font-medium">
              Cliquez sur "Rédiger la Note de Conjoncture" pour que Gemini 3.7 Flash analyse les chiffres clés, les élasticités et rédige le commentaire officiel au format SDES / CCTN.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Chat Analyst */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[520px]">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                <span>Expert Transport & Nowcast IA</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-medium px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Grounding Web Actif
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Posez vos questions sur la méthodologie, les données brutes ou les évolutions modales
              </p>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            {fiche.code} • {targetPeriod}
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {chatMessages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isBot ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white'
                }`}>
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-xl rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  isBot
                    ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs'
                    : 'bg-indigo-600 text-white'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Grounding Sources */}
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                        Sources consultées :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.groundingSources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 text-[10px] text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100"
                          >
                            <span className="truncate max-w-[140px]">{src.title}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 italic p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>L'Analyste consulte les sources et formule l'analyse statistique...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 flex items-center space-x-1 flex-shrink-0">
            <HelpCircle className="w-3 h-3" />
            <span>Sujets :</span>
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isSending}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Posez une question technique sur cette fiche SDES..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            disabled={isSending}
            className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isSending || !inputMessage.trim()}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
