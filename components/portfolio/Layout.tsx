"use client";

import type { ReactNode } from 'react';
import { Shield, Lock, Menu, X, Terminal, Activity } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'WHOAMI', href: '#about' },
        { name: 'ACCESS_PROTOCOLS', href: '#skills' },
        { name: 'EXPERIENCE_LOGS', href: '#experience' },
        { name: 'ENCRYPTED_COMMUNICATION', href: '#contact' },
    ];

    return (
        <div className="min-h-screen text-white font-sans selection:bg-terminal-green selection:text-cyber-black overflow-x-hidden relative">

            {/* Scanline Overlay - Monitor Effect */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="fixed inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

            {/* Global Vignette */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]"></div>

            {/* Command Bar (Navbar) */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 supports-[backdrop-filter]:bg-black/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo / Status */}
                        <div className="flex items-center gap-3 group cursor-default">
                            <div className="relative">
                                <Shield className="w-6 h-6 text-terminal-green group-hover:animate-pulse" />
                                <div className="absolute inset-0 bg-terminal-green/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono font-bold tracking-wider text-white text-sm">SEC_ENGINEER</span>
                                <span className="font-mono text-[10px] text-terminal-green flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse" />
                                    SYSTEM ONLINE
                                </span>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-1">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="font-mono text-xs px-4 py-2 text-white hover:text-terminal-green hover:bg-terminal-green/5 border border-transparent hover:border-terminal-green/20 rounded-sm transition-all duration-300 relative group"
                                    >
                                        <span className="text-terminal-green/50 mr-1 group-hover:text-terminal-green">&gt;</span>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white hover:text-white p-2 hover:bg-white/5 rounded transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-black/95 border-b border-terminal-green/20 backdrop-blur-xl"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-white hover:text-terminal-green hover:bg-terminal-green/10 block px-3 py-3 rounded-sm text-sm font-mono border-l-2 border-transparent hover:border-terminal-green transition-all"
                                    >
                                        <span className="text-terminal-green mr-2">&gt;_</span>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-black/80 border-t border-white/10 py-8 mt-10 relative z-10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                        <Lock className="w-4 h-4 text-terminal-green" />
                        <span className="font-mono text-xs tracking-widest">SECURE CONNECTION ESTABLISHED • TLS 1.3</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white text-xs font-mono">
                            <Activity className="w-3 h-3" />
                            <span>LATENCY: 12ms</span>
                        </div>
                        <div className="text-white text-xs font-mono">
                            © {new Date().getFullYear()} IAM PORTFOLIO
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
