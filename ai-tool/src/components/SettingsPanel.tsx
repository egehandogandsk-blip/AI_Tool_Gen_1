"use client";

import { Sparkles, Box, LayoutTemplate, Layers } from "lucide-react";

interface SettingsPanelProps {
    prompt: string;
    setPrompt: (val: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export const SettingsPanel = ({ prompt, setPrompt, onGenerate, isLoading }: SettingsPanelProps) => {
    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/5 p-6 md:w-[400px] w-full shrink-0 overflow-y-auto">
            <h1 className="text-3xl font-light text-white mb-8 mt-4 tracking-tight">Image Generation</h1>

            <div className="flex flex-col gap-6 flex-1">
                {/* Prompt Section */}
                <div className="space-y-3">
                    <label className="text-sm text-gray-400 font-medium">Describe your image</label>
                    <div className="relative bg-[#151515] rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors focus-within:border-white/20">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="A futuristic city with flying cars..."
                            className="w-full bg-transparent text-white placeholder-gray-600 outline-none resize-none min-h-[140px] text-base leading-relaxed"
                        />
                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <div className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                Add style
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Prompt Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 text-gray-300">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">AI Enhance Prompt</span>
                    </div>
                    <div className="w-10 h-5 bg-gray-800 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-gray-500 rounded-full absolute top-1 left-1" />
                    </div>
                </div>

                {/* Model Selector */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl border border-white/5 cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
                        <div className="flex items-center gap-3">
                            <Box className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                            <span className="text-gray-300 text-sm font-medium">Model</span>
                        </div>
                        <span className="text-gray-500 text-xs">Flux (Default) ›</span>
                    </div>
                </div>

                {/* Style Selector */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl border border-white/5 cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
                        <div className="flex items-center gap-3">
                            <Layers className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                            <span className="text-gray-300 text-sm font-medium">Style</span>
                        </div>
                        <span className="text-gray-500 text-xs">Realistic ›</span>
                    </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-3">
                    <div className="p-4 bg-[#151515] rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <LayoutTemplate className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm font-medium">Aspect Ratio</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <button className="flex-1 py-2 text-xs text-gray-400 bg-black/40 rounded-lg hover:bg-white/10 hover:text-white transition-colors border border-white/5">1:1</button>
                            <button className="flex-1 py-2 text-xs text-gray-400 bg-black/40 rounded-lg hover:bg-white/10 hover:text-white transition-colors border border-white/5">9:16</button>
                            <button className="flex-1 py-2 text-xs text-black bg-white rounded-lg font-bold shadow-lg">16:9</button>
                            <button className="flex-1 py-2 text-xs text-gray-400 bg-black/40 rounded-lg hover:bg-white/10 hover:text-white transition-colors border border-white/5">4:3</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Generate Button */}
            <div className="pt-6 mt-2">
                <button
                    onClick={onGenerate}
                    disabled={!prompt.trim() || isLoading}
                    className={`
                        w-full py-4 rounded-xl font-bold text-lg flex items-center justify-between px-6 transition-all duration-300
                        ${!prompt.trim() || isLoading
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        }
                    `}
                >
                    <span>{isLoading ? 'Generating...' : 'Generate'}</span>
                    <Sparkles className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </div>
    )
}
