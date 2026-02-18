"use client";

import { useState } from "react";
import { generateImageDetails } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Ratio, Image as ImageIcon, Download, Share2 } from "lucide-react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [style, setStyle] = useState("Realistic");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    // Keep previous image visible while loading for better UX, or clear it?
    // User asked for output at top, so better to show loading state there clearly.
    // Let's clear it to show we are working on a new one.
    // actually, keeping it is standard behavior until new one arrives.
    // But let's follow the "generation failed" feedback -> clean slate might be better to see errors.

    try {
      const fullPrompt = `${prompt}, ${style} style, detailed, high quality`;
      const { imageUrl: url } = generateImageDetails(fullPrompt, aspectRatio);

      // Direct assignment for faster feedback, let the img tag handle the loading visual
      setImageUrl(url);
      setIsLoading(true);

    } catch (err) {
      setError("Failed to start generation.");
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError("Generation failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-start p-4 md:p-8 relative overflow-x-hidden selection:bg-orange-500/30">

      {/* Ambient Background - Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#1a0b2e] via-[#000000] to-[#0f172a]" />

      {/* Main Content Container - Vertical Stack */}
      <main className="relative z-10 w-full max-w-[600px] flex flex-col gap-6 mt-4 md:mt-8">

        {/* 1. Header/Logo Area */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
            <Sparkles className="w-6 h-6 text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Imagine
          </h1>
        </div>

        {/* 2. Image Output (Top) */}
        <div className="w-full aspect-[4/3] sm:aspect-square bg-[#121212] rounded-[32px] border border-white/5 overflow-hidden relative shadow-2xl group transition-all duration-500 hover:border-white/10">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="Generated AI Art"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-full h-full object-contain bg-black/50 transition-opacity duration-500 ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100'}`}
              />
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <span className="text-white/50 text-sm font-light animate-pulse">Creating Magic...</span>
                </div>
              )}
              {!isLoading && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={imageUrl} download className="p-3 bg-black/60 hover:bg-white hover:text-black text-white rounded-full backdrop-blur-md transition-all">
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-10 h-10" />
              </div>
              <p className="font-light text-sm">Your creation will appear here</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl text-center max-w-[80%]">
                <p className="mb-2 font-medium">Generation Failed</p>
                <p className="text-xs opacity-70 mb-4">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Controls (Middle) - Style & Ratio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Style Selector */}
          <div className="bg-[#121212] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-3 text-white/50 text-xs uppercase tracking-wider font-semibold">
              <Wand2 className="w-3 h-3" />
              Style
            </div>
            <div className="flex gap-2 bg-black/40 p-1 rounded-xl">
              {['Realistic', 'Cartoon', 'Ultra'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s === 'Ultra' ? 'Ultrarealistic' : s)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${(style === s || (s === 'Ultra' && style === 'Ultrarealistic'))
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="bg-[#121212] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-3 text-white/50 text-xs uppercase tracking-wider font-semibold">
              <Ratio className="w-3 h-3" />
              Ratio
            </div>
            <div className="flex gap-2 bg-black/40 p-1 rounded-xl">
              {['1:1', '16:9', '9:16'].map((r) => (
                <button
                  key={r}
                  onClick={() => setAspectRatio(r)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${aspectRatio === r
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Prompt Input (Bottom-ish) */}
        <div className="bg-[#121212] rounded-[24px] p-1 border border-white/5 focus-within:border-orange-500/50 transition-colors duration-300">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your imagination..."
            className="w-full bg-transparent text-white placeholder-white/30 text-lg p-5 outline-none resize-none min-h-[120px] font-light leading-relaxed rounded-[20px]"
          />
        </div>

        {/* 5. Generate Button (Bottom) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
          className={`
                    w-full py-5 rounded-2xl font-bold text-lg tracking-wide uppercase shadow-lg transition-all duration-300 relative overflow-hidden group
                    ${!prompt.trim() || isLoading
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-900/20'
            }
                `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative flex items-center justify-center gap-3">
            {isLoading ? 'Dreaming...' : 'Generate Image'}
            {!isLoading && <Sparkles className="w-5 h-5" />}
          </span>
        </motion.button>

      </main>
    </div>
  );
}
