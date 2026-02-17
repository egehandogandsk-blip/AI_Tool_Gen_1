"use client";

import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

interface GenerateButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const GenerateButton = ({ onClick, isLoading, disabled }: GenerateButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
        relative group overflow-hidden px-8 py-4 rounded-full 
        font-bold text-lg text-white shadow-lg transition-all duration-300
        ${disabled ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-purple-500/50'}
      `}
        >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
            <div className="relative flex items-center gap-2">
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating Magic...</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate Image</span>
                    </>
                )}
            </div>
        </motion.button>
    );
};
