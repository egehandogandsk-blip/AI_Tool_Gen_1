"use client";

import { motion } from "framer-motion";

interface PromptInputProps {
    prompt: string;
    setPrompt: (value: string) => void;
    onGenerate: () => void;
}

export const PromptInput = ({ prompt, setPrompt, onGenerate }: PromptInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onGenerate();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe the image you want to imagine..."
                    className="w-full bg-transparent text-white placeholder-white/50 text-lg p-4 outline-none resize-none min-h-[100px] rounded-xl font-light"
                />
                <div className="text-right text-xs text-white/30 px-2 pb-1">
                    {prompt.length} chars
                </div>
            </div>
        </motion.div>
    );
};
