"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import Image from "next/image"; // Typically Next.js Image component requires domain config.
// Using standard img tag for external unpredictable URLs or need to configure next.config.ts
// But wait, Pollinations URLs are external. We should use standard img or configure remotePatterns.
// Simply using img for simplicity and to avoid Next.js config resets for now unless requested.
// Actually, let's use a standard img tag wrapped in a div for now to avoid domain issues.

interface ImageDisplayProps {
    imageUrl: string | null;
    isLoading: boolean;
    onClear: () => void;
}

export const ImageDisplay = ({ imageUrl, isLoading, onClear }: ImageDisplayProps) => {
    if (!imageUrl && !isLoading) return null;

    const handleDownload = async () => {
        if (!imageUrl) return;
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `generated-image-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <AnimatePresence>
            {(imageUrl || isLoading) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-2xl aspect-square mt-8 rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10 shadow-2xl flex items-center justify-center group"
                >
                    {isLoading ? (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-white/50 animate-pulse">Dreaming...</p>
                        </div>
                    ) : (
                        imageUrl && (
                            <>
                                <img
                                    src={imageUrl}
                                    alt="Generated"
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={handleDownload}
                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all hover:scale-110"
                                        title="Download"
                                    >
                                        <Download className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={onClear}
                                        className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white backdrop-blur-md transition-all hover:scale-110"
                                        title="Clear"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </>
                        )
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
