"use client";

import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import { generateImageDetails } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Maximize2, Share2, Sparkles, Wand2, Ratio } from "lucide-react";

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
    setImageUrl(null);

    try {
      // Modify prompt based on style/ratio (mock logic for now as API is simple)
      const enhancedPrompt = `${prompt}, ${style} style`;
      const { imageUrl: url } = generateImageDetails(enhancedPrompt);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageUrl(url);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError("Failed. Try again.");
        setIsLoading(false);
      };

    } catch (err) {
      setError("Error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden selection:bg-purple-500/30">
      {/* Ambient Moving Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* Main App Card - "The Phone" */}
      <div className="w-full max-w-[480px] h-[85vh] md:h-[800px] bg-[#000000] rounded-[40px] border border-white/10 shadow-2xl relative z-10 flex flex-col overflow-hidden ring-1 ring-white/5">

        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-bold text-lg tracking-tight">Faura</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10" />
        </div>

        {/* Content Area */}
        <div className="flex-1 relative flex flex-col p-2">

          {/* Image Display Area */}
          <div className="flex-1 bg-[#0a0a0a] rounded-[32px] overflow-hidden relative border border-white/5 group">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]"
                >
                  <div className="w-20 h-20 relative">
                    <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin" />
                  </div>
                  <p className="text-white/40 font-light tracking-widest text-xs uppercase animate-pulse">Generating...</p>
                </motion.div>
              ) : imageUrl ? (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full h-full"
                >
                  <img src={imageUrl} alt="Result" className="w-full h-full object-cover" />

                  {/* Overlay Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={imageUrl} download className="p-3 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-md transition-all">
                      <Download className="w-5 h-5" />
                    </a>
                    <button className="p-3 bg-black/60 hover:bg-black text-white rounded-full backdrop-blur-md transition-all">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <Sparkles className="w-12 h-12 mb-4 text-white/20" />
                  <h3 className="text-xl font-medium mb-1">Create Magic</h3>
                  <p className="text-sm font-light text-white/50">Type a prompt below to start generating images instantly.</p>
                </div>
              )}
            </AnimatePresence>

            {error && (
              <div className="absolute top-4 left-4 right-4 bg-red-500/20 text-red-200 p-3 rounded-xl border border-red-500/20 text-xs text-center backdrop-blur-md">
                {error}
              </div>
            )}
          </div>

          {/* Controls & Input Area */}
          <div className="mt-4 px-2 pb-4 space-y-4">

            {/* Pills (Model / Style / Ratio) */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] rounded-full border border-white/5 text-xs text-gray-300 transition-colors shrink-0">
                <Wand2 className="w-3 h-3" />
                <span>Style: {style}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] rounded-full border border-white/5 text-xs text-gray-300 transition-colors shrink-0">
                <Ratio className="w-3 h-3" />
                <span>Ratio: {aspectRatio}</span>
              </button>
            </div>

            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
