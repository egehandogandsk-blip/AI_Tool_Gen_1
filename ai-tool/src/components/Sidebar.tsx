"use client";

import { Home, Search, User, MessageSquare, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export const Sidebar = () => {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:flex flex-col items-center py-8 w-20 border-r border-white/5 bg-black/40 backdrop-blur-xl h-screen fixed left-0 top-0 z-50 text-white/50"
        >
            <div className="mb-12">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-bold text-xl">
                    F
                </div>
            </div>

            <div className="flex flex-col gap-8 flex-1">
                <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <Home className="w-5 h-5" />
                </button>
                <button className="p-3 hover:text-white hover:bg-white/10 rounded-full transition-all">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-3 hover:text-white hover:bg-white/10 rounded-full transition-all">
                    <User className="w-5 h-5" />
                </button>
                <button className="p-3 hover:text-white hover:bg-white/10 rounded-full transition-all">
                    <MessageSquare className="w-5 h-5" />
                </button>
                <button className="p-3 hover:text-white hover:bg-white/10 rounded-full transition-all">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <button className="p-3 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <LogOut className="w-5 h-5" />
            </button>
        </motion.div>
    );
};
