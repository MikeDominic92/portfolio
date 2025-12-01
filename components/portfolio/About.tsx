"use client";

import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Shield, Cpu, Award, Lock, Cloud, Key, CheckCircle } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useHover } from '@/components/context/HoverContext';
import InteractiveTerminal from './InteractiveTerminal';

const About = () => {
    const { setIsHovered } = useHover();

    return (
        <section id="about" className="py-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-64 h-64 bg-green-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3 font-mono tracking-tight">
                        <span className="text-green-500 mr-2">01.</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">WhoAmI</span>
                    </h2>
                    <div className="h-px w-32 bg-gradient-to-r from-green-500 to-transparent"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* LEFT COLUMN: Terminal (Bio & Workflow) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-full"
                    >
                        <InteractiveTerminal />
                    </motion.div>

                    {/* RIGHT COLUMN: Terminal Profile (Directives + Certs) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-full"
                    >
                        <div className="rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl font-mono text-sm relative group h-full">
                            {/* Terminal Header */}
                            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="ml-4 text-xs text-white font-mono flex-1 text-center">Professional Certification</div>
                            </div>

                            <div className="p-6 font-mono text-sm md:text-base space-y-6 relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.png')] opacity-[0.02] pointer-events-none"></div>

                                {/* Python Query Simulation */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white/60 text-xs">
                                        <span className="text-terminal-green">root@portfolio</span>
                                        <span className="text-white">:</span>
                                        <span className="text-white">~/certs</span>
                                        <span className="text-white">$ cat query_status.py</span>
                                    </div>

                                    <div className="bg-black/50 p-4 rounded border border-white/10 text-xs font-mono overflow-x-auto">
                                        <div className="text-gray-500">import <span className="text-white">sys</span></div>
                                        <div className="text-gray-500">import <span className="text-white">security_db</span></div>
                                        <br />
                                        <div className="text-terminal-green">def <span className="text-white">get_credentials</span>():</div>
                                        <div className="pl-4 text-gray-500"># Querying blockchain for verified authorities</div>
                                        <div className="pl-4 text-white">
                                            query = <span className="text-terminal-green">"SELECT * FROM certifications WHERE status='ACTIVE'"</span>
                                        </div>
                                        <div className="pl-4 text-white">results = security_db.execute(query)</div>
                                        <div className="pl-4 text-white">return results</div>
                                        <br />
                                        <div className="text-white">print(get_credentials())</div>
                                    </div>

                                    <div className="flex items-center gap-2 text-white/60 text-xs mt-6">
                                        <span className="text-terminal-green">root@portfolio</span>
                                        <span className="text-white">:</span>
                                        <span className="text-white">~/certs</span>
                                        <span className="text-white">$ python3 query_status.py</span>
                                    </div>

                                    <div className="space-y-2 font-mono text-xs">
                                        {[
                                            { name: "Microsoft Certified: Cybersecurity Architect Expert (SC-100)", id: "MS-SC100", status: "VERIFIED" },
                                            { name: "Identity & Access Administrator (SC-300)", id: "MS-SC300", status: "VERIFIED" },
                                            { name: "Azure Security Engineer (AZ-500)", id: "MS-AZ500", status: "VERIFIED" },
                                            { name: "GCP Professional Cloud Security Engineer", id: "GCP-PCSE", status: "VERIFIED" },
                                            { name: "AWS Certified Security - Specialty", id: "AWS-SCS", status: "VERIFIED" },
                                            { name: "SailPoint IdentityIQ Associate", id: "IIQ-ASSOC", status: "VERIFIED" }
                                        ].map((cert, i) => (
                                            <div key={i} className="flex items-center gap-3 text-white/90 p-1.5 hover:bg-white/5 rounded transition-colors group border-l-2 border-transparent hover:border-terminal-green">
                                                <span className="text-white/30 font-mono text-[10px] w-6">[{i}]</span>
                                                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                                    <span className="text-cyan-400 font-bold min-w-[100px]">{cert.id}</span>
                                                    <span className="text-white group-hover:text-white transition-colors text-xs sm:text-sm">{cert.name}</span>
                                                </div>
                                                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-terminal-green bg-terminal-green/10 px-2 py-1 rounded border border-terminal-green/20 shadow-[0_0_10px_rgba(57,255,20,0.1)]">
                                                    <CheckCircle className="w-3 h-3" />
                                                    <span className="tracking-wider font-bold">VERIFIED</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <span className="text-terminal-green">➜</span> <span className="animate-pulse">_</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
