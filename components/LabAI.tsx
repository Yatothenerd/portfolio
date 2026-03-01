
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Terminal, Cpu, Sparkles, Send } from 'lucide-react';

const LabAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [logs, setLogs] = useState<string[]>(['System initialized...', 'Neural prism uplink ready...']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isTyping) return;

    const currentQuery = query;
    setQuery('');
    setIsTyping(true);
    setLogs(prev => [...prev, `> Refracting: ${currentQuery}`]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: currentQuery,
        config: {
            systemInstruction: "You are the AI brain of YATO GALLERY. Response style: High-tech, cold, poetic, under 50 words. Focus on the convergence of glass, light, and code.",
            temperature: 0.9,
        }
      });

      const text = result.text || "Uplink lost in transmission.";
      setResponse(text);
      setLogs(prev => [...prev, `[RESOLVED] Prism data acquired.`]);
    } catch (err) {
      setLogs(prev => [...prev, `[FAULT] Refraction error.`]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 rounded-xl overflow-hidden prism-glass prism-border relative">
      <div className="bg-white/5 p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-zinc-400" />
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-zinc-300">Yato Intel Core</span>
        </div>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-12 min-h-[450px]">
        <div ref={scrollRef} className="col-span-1 border-r border-white/10 pr-6 overflow-y-auto space-y-3 font-mono text-[9px] text-zinc-500 scrollbar-hide max-h-[300px]">
          {logs.map((log, i) => <div key={i} className="opacity-70">{log}</div>)}
        </div>

        <div className="col-span-2 flex flex-col justify-between">
          <div className="flex-grow flex items-center">
            <AnimatePresence mode="wait">
              {isTyping ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center w-full space-y-8"
                >
                  <div className="relative w-24 h-24">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-dashed border-zinc-700 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border border-dashed border-zinc-800 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-mono">Refracting Thought...</p>
                </motion.div>
              ) : response ? (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  className="space-y-6"
                >
                  <Sparkles className="w-6 h-6 text-white/50" />
                  <p className="text-2xl font-serif italic text-white leading-tight tracking-tight">
                    {response}
                  </p>
                  <button 
                    onClick={() => setResponse(null)}
                    className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors"
                  >
                    Reset Prism
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center w-full text-center space-y-6"
                >
                  <div className="relative">
                    <Cpu className="w-16 h-16 text-zinc-900" />
                    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
                  </div>
                  <p className="text-zinc-600 font-mono text-xs tracking-widest">Inject thought stream...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="relative mt-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query the prism..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs focus:outline-none focus:border-white/40 transition-all font-mono placeholder:text-zinc-700"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-zinc-500 hover:text-white transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabAI;
