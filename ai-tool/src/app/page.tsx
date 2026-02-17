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

      // Simulate/wait for image to be ready or just set it
      // Pollinations returns a URL that generates on request. 
      // We can set it immediately, but the browser will trigger the request when <img src> loads.
      // To show a loading state, we can use the onLoad event of the image, 
      // but simpler for now is to just set it and let the ImageDisplay component handle the "loading" visual if possible,
      // OR we can pre-fetch it.

      // Better UX: Pre-fetch the image to ensure it's generated before showing
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageUrl(url);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError("Failed to generate image. Please try again.");
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden text-white">
      {/* Background with premium gradient/mesh */}
      <div className="absolute inset-0 bg-black z-[-2]" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black z-[-1]" />

      {/* Floating Blobs for aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-4 tracking-tighter">
          Imagine AI
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-light">
          Unlimited. Free. Instant.
        </p>
      </motion.div>

      <div className="w-full max-w-3xl flex flex-col items-center gap-8 z-10">
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
            className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/20"
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

      <footer className="absolute bottom-4 text-white/20 text-sm font-light">
        Powered by Pollinations.ai • No API Keys Required
      </footer>
    </main>
  );
}
