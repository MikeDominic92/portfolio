"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Shield, Globe, Database, Lock, ArrowRight, Cpu } from 'lucide-react';

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        category: string;
        description: string;
        challenge: string;
        solution: string;
        architecture: string[]; // List of components for the diagram
        tech: string[];
    } | null;
}

const CaseStudyModal = ({ isOpen, onClose, project }: CaseStudyModalProps) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border border-terminal-green/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-[0_0_50px_rgba(57,255,20,0.1)] relative scrollbar-thin scrollbar-thumb-terminal-green/20 scrollbar-track-transparent"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Header */}
                            <div className="p-8 border-b border-white/10 bg-gradient-to-r from-terminal-green/5 to-transparent">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 bg-terminal-green/10 border border-terminal-green/30 rounded text-[10px] font-mono text-terminal-green uppercase tracking-wider">
                                        CASE_STUDY_LOG
                                    </span>
                                    <span className="text-white/40 font-mono text-xs">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                                <p className="text-terminal-green font-mono text-sm">&lt;{project.category} /&gt;</p>
                            </div>

                            <div className="p-8 space-y-12">
                                {/* Architecture Diagram (Visual Representation) */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Server className="w-5 h-5 text-terminal-green" />
                                        System Architecture
                                    </h3>
                                    <div className="bg-black/50 border border-white/10 rounded-lg p-8 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none"></div>

                                        {/* Simplified Flow Diagram */}
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                                            {project.architecture.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <div className="flex flex-col items-center gap-2 text-center group">
                                                        <div className="w-16 h-16 bg-[#111] border border-terminal-green/30 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.05)] group-hover:border-terminal-green/60 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all duration-300">
                                                            {index === 0 ? <Globe className="w-8 h-8 text-blue-400" /> :
                                                                index === project.architecture.length - 1 ? <Database className="w-8 h-8 text-purple-400" /> :
                                                                    <Cpu className="w-8 h-8 text-terminal-green" />}
                                                        </div>
                                                        <span className="text-xs font-mono text-white/80 max-w-[120px]">{item}</span>
                                                    </div>
                                                    {index < project.architecture.length - 1 && (
                                                        <div className="hidden md:flex flex-1 h-px bg-gradient-to-r from-transparent via-terminal-green/50 to-transparent relative">
                                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                                <ArrowRight className="w-4 h-4 text-terminal-green/50" />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {index < project.architecture.length - 1 && (
                                                        <div className="md:hidden h-8 w-px bg-gradient-to-b from-transparent via-terminal-green/50 to-transparent"></div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {/* The Challenge */}
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <Lock className="w-5 h-5 text-red-400" />
                                            The Challenge
                                        </h3>
                                        <p className="text-white/70 leading-relaxed">
                                            {project.challenge}
                                        </p>
                                    </div>

                                    {/* The Solution */}
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-terminal-green" />
                                            The Solution
                                        </h3>
                                        <p className="text-white/70 leading-relaxed">
                                            {project.solution}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-wider mb-4">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-white/90 font-mono hover:border-terminal-green/50 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CaseStudyModal;
