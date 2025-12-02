"use client";

import React from 'react';
import { Shield, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SecuritySphere from './SecuritySphere';
import Terminal from './Terminal';

const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#39FF14] opacity-70 animate-pulse translate-x-[2px] skew-x-12 mix-blend-screen">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#ffffff] opacity-70 animate-pulse -translate-x-[2px] -skew-x-12 mix-blend-screen animation-delay-75">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[#39FF14] opacity-70 animate-pulse translate-y-[2px] mix-blend-screen animation-delay-150">
                {text}
            </span>
        </div>
    );
};

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#050505]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-pulse animation-delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39FF14]/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 relative"
                    >
                        {/* System Status Badge */}
                        <div className="mb-6 inline-block relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-terminal-green/20 to-terminal-green/20 rounded blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative border border-white/10 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
                                <span className="text-terminal-green font-mono text-sm tracking-wider">SYSTEM_ONLINE</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-px w-12 bg-terminal-green/50"></div>
                                <span className="text-terminal-green font-mono text-xs tracking-[0.2em] uppercase">WhoAmI</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none">
                                <span className="block text-3xl md:text-5xl font-light text-white/60 mb-2 tracking-normal">Hi, I'm</span>
                                Dom
                                <span className="text-terminal-green">.</span>
                            </h1>

                            <div className="space-y-4 max-w-2xl">
                                <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide">
                                    AI Cybersecurity Engineer
                                </h2>
                                <p className="text-lg text-white/60 leading-relaxed font-light border-l-2 border-terminal-green/30 pl-6">
                                    Architecting <span className="text-white">intelligent identity governance</span> & <span className="text-white">automated threat defense</span> for the decentralized web.
                                </p>
                                <div className="pt-4">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-green/10 border border-terminal-green/50 rounded text-terminal-green font-mono text-sm tracking-wider hover:bg-terminal-green/20 transition-all group"
                                    >
                                        <TerminalIcon className="w-4 h-4" />
                                        <span>ACCESS_RESUME</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* 3D Sphere */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative h-[700px] w-full flex items-center justify-center perspective-1000"
                    >
                        {/* Holographic Platform */}
                        <div className="absolute bottom-20 w-[80%] h-20 bg-[#39FF14]/5 rounded-[100%] blur-[50px] transform rotate-x-60 animate-pulse"></div>
                        <SecuritySphere />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
