"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface PromptInputProps {
    prompt: string;
    setPrompt: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export const PromptInput = ({ prompt, setPrompt, onGenerate, isLoading }: PromptInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onGenerate();
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full relative"
        >
            <div className="relative bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-2 shadow-2xl flex items-center gap-2 group focus-within:border-white/20 transition-all">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Imagine something..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-white placeholder-white/30 text-base py-3 px-4 outline-none resize-none h-[52px] font-light leading-relaxed"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                />

                <button
                    onClick={onGenerate}
                    disabled={!prompt.trim() || isLoading}
                    className={`
                h-10 w-10 sm:w-auto sm:px-5 rounded-full flex items-center justify-center gap-2 transition-all duration-300
                ${!prompt.trim() || isLoading
                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                            : 'bg-white text-black hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        }
            `}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>
                            <span className="hidden sm:inline font-semibold text-sm">Create</span>
                            <ArrowRight className="w-5 h-5 sm:w-4 sm:h-4" />
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
