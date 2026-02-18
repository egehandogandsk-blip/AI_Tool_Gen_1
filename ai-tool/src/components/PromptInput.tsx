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
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl hover:bg-white/10 transition-colors">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe the image you want to imagine..."
                    className="w-full bg-transparent text-white placeholder-white/30 text-lg p-4 outline-none resize-none min-h-[120px] rounded-xl font-light"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }} // Ensure readability
                />
                <div className="flex justify-end gap-2 px-2 pb-1">
                    <span className="text-xs text-white/20">
                        {prompt.length} chars
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
