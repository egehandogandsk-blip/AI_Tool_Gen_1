"use client";

import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import { GenerateButton } from "@/components/GenerateButton";
import { ImageDisplay } from "@/components/ImageDisplay";
import { generateImageDetails } from "@/lib/api";
import { motion } from "framer-motion";

export default function Home() {
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

      // Pre-fetch the image to ensure it's generated before showing
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageUrl(url);
        setIsLoading(false);
      };
      img.onerror = () => {
        // Fallback: Try without specific model if flux fails, or just show error
        console.error("Image load failed");
        setError("Failed to create image. The server might be busy, please try again.");
        setIsLoading(false);
      };

    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setImageUrl(null);
    setError(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden text-white bg-black">
      {/* Ultra Minimal Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black pointer-events-none" />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white/90">
            Imagine
          </h1>
          <p className="text-white/40 text-sm font-light tracking-widest uppercase">
            Limitless Creation
          </p>
        </motion.div>

        <div className="w-full max-w-2xl flex flex-col items-center gap-6">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
          />

          <GenerateButton
            onClick={handleGenerate}
            isLoading={isLoading}
            disabled={!prompt.trim() || isLoading}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 bg-red-950/30 px-6 py-3 rounded-xl border border-red-500/10 text-sm font-light"
            >
              {error}
            </motion.div>
          )}

          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            onClear={handleClear}
          />
        </div>
      </div>
    </main>
  );
}
