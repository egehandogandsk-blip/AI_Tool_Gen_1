"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { SettingsPanel } from "@/components/SettingsPanel";
import { generateImageDetails } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Maximize2, X } from "lucide-react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const { imageUrl: url } = generateImageDetails(prompt);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageUrl(url);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError("Failed to create image. The server might be busy, please try again.");
        setIsLoading(false);
      };

    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Sidebar />

      <div className="flex-1 flex flex-col md:flex-row ml-0 md:ml-20">
        {/* Left Panel - Input & Controls */}
        <SettingsPanel
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {/* Right Panel - Preview & Gallery */}
        <div className="flex-1 bg-[#050505] relative flex items-center justify-center p-8 overflow-hidden">

          {/* Background Mesh Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-white/40 tracking-widest font-light text-sm uppercase">Creating Masterpiece...</p>
              </motion.div>
            ) : imageUrl ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative group max-w-4xl w-full h-[80vh] bg-[#111] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img
                  src={imageUrl}
                  alt="Generated AI Art"
                  className="w-full h-full object-contain bg-black/50"
                />

                {/* Overlay Utility Bar */}
                <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={imageUrl}
                    download={`imagine-ai-${Date.now()}.png`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-black/50 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full transition-all border border-white/10"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button className="p-3 bg-black/50 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-full transition-all border border-white/10">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center opacity-30 select-none pointer-events-none">
                <div className="w-96 h-96 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full blur-[120px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                <h2 className="text-4xl font-bold mb-2">Ready to Create?</h2>
                <p className="font-light">Describe your vision in the panel on the left.</p>
              </div>
            )}
          </AnimatePresence>

          {error && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-xl backdrop-blur-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
