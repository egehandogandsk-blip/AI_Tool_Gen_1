"use client";

import { useState } from "react";
import { Sparkles, Download, RefreshCw, AlertCircle, Wand2, Ratio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [style, setStyle] = useState("Realistic");
  const [ratio, setRatio] = useState("1:1");
  const [seed, setSeed] = useState(0);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null); // Clear previous image to show loading state clearly

    // Simple, robust URL construction
    const randomSeed = Math.floor(Math.random() * 1000000);
    setSeed(randomSeed);

    let width = 1024;
    let height = 1024;

    if (ratio === "16:9") {
      width = 1280;
      height = 720;
    } else if (ratio === "9:16") {
      width = 720;
      height = 1280;
    }

    // Enhance prompt based on style
    let enhancedPrompt = prompt;
    if (style === "Realistic") enhancedPrompt += ", photorealistic, highly detailed, 8k, realistic texture, photography";
    if (style === "Cartoon") enhancedPrompt += ", cartoon style, vibrant colors, flat design, illustration";
    if (style === "Ultrarealistic") enhancedPrompt += ", ultra realistic, cinematic lighting, ray tracing, unreal engine 5, octane render";

    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    // Explicitly using 'flux' model for best quality
    const url = `https://pollinations.ai/p/${encodedPrompt}?width=${width}&height=${height}&seed=${randomSeed}&model=flux&nologo=true`;

    // We set the URL directly. The <img> tag's onLoad/onError will handle the rest.
    setGeneratedImage(url);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError("Failed to generate image. Please try again.");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-start p-4 md:p-6 overflow-x-hidden selection:bg-orange-500/30">

      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#1a0b2e] via-[#000000] to-[#111]" />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[500px] flex flex-col gap-5 mt-4"
      >

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI Studio</h1>
        </div>

        {/* 1. Image Output Area */}
        <div className="w-full aspect-square bg-[#111] rounded-[24px] border border-white/5 relative overflow-hidden shadow-2xl group">
          <AnimatePresence mode="wait">
            {generatedImage && !error ? (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full"
              >
                <img
                  src={generatedImage}
                  alt={prompt}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`w-full h-full object-contain bg-black transition-all duration-700 ${isLoading ? 'blur-xl scale-110 opacity-50' : 'blur-0 scale-100 opacity-100'}`}
                />

                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="text-orange-400 text-xs font-medium animate-pulse tracking-widest uppercase">Generating...</span>
                  </div>
                )}

                {!isLoading && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={generatedImage}
                      download={`ai-generated-${seed}.png`}
                      target="_blank"
                      className="p-2 bg-black/60 hover:bg-white hover:text-black text-white rounded-full backdrop-blur-md transition-all border border-white/10"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/20 p-8 text-center">
                {error ? (
                  <div className="flex flex-col items-center text-red-400/80">
                    <AlertCircle className="w-10 h-10 mb-2" />
                    <p className="text-sm font-medium">Generation Failed</p>
                    <button onClick={handleGenerate} className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs text-white transition-colors">
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-sm font-light">Your imagination will appear here.</p>
                  </>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Controls Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {/* Style Selector */}
          <div className="flex-1 min-w-[200px] bg-[#111] p-3 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] font-bold uppercase tracking-wider">
              <Wand2 className="w-3 h-3" /> Style
            </div>
            <div className="flex gap-1">
              {['Realistic', 'Cartoon', 'Ultrarealistic'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${style === s ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {s === 'Ultrarealistic' ? 'Ultra' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Ratio Selector */}
          <div className="min-w-[140px] bg-[#111] p-3 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] font-bold uppercase tracking-wider">
              <Ratio className="w-3 h-3" /> Ratio
            </div>
            <div className="flex gap-1">
              {['1:1', '16:9', '9:16'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={`flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${ratio === r ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Input & Action */}
        <div className="flex flex-col gap-3">
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your image..."
              className="w-full bg-[#111] text-white placeholder-white/20 text-base p-4 rounded-[20px] outline-none min-h-[100px] resize-none border border-white/5 focus:border-orange-500/50 transition-colors"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className={`
                    w-full py-4 rounded-[18px] font-bold text-base uppercase tracking-wide shadow-xl transition-all relative overflow-hidden
                    ${!prompt.trim() || isLoading
                ? 'bg-[#1a1a1a] text-white/20 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20'
              }
                `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? 'Creating...' : 'Generate Art'}
              {!isLoading && <Sparkles className="w-4 h-4 fill-white" />}
            </span>
          </motion.button>
        </div>

      </motion.main>
    </div>
  );
}
