"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Terminal, Cloud, ClipboardList } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useHover } from '../context/HoverContext';

const Skills = () => {
    const { setIsHovered } = useHover();

    const skillCategories = [
        {
            id: 'identity',
            title: 'IDENTITY_ACCESS',
            icon: <Shield className="w-8 h-8" />,
            skills: [
                { name: "Azure AD / Entra ID", level: 95, description: "Architecting unified identity fabrics, conditional access, and app registrations." },
                { name: "Okta / SSO", level: 90, description: "Implementing seamless Single Sign-On and Lifecycle Management (SCIM)." },
                { name: "Active Directory", level: 88, description: "Managing legacy on-premise AD DS while migrating auth flows to the cloud." },
                { name: "OAuth / OIDC / SAML", level: 92, description: "Deep understanding of modern auth protocols for secure API and app integration." }
            ],
            borderColor: "border-terminal-green",
            textColor: "text-terminal-green",
            bgColor: "bg-terminal-green",
            hexColor: "#39FF14", // Neon Green
            hoverBorder: "hover:border-terminal-green",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
        },
        {
            id: 'cloud_sec',
            title: 'CLOUD_SECURITY',
            icon: <Cloud className="w-8 h-8" />,
            skills: [
                { name: "AWS IAM", level: 95, description: "Designing least-privilege policies, roles, and cross-account trust boundaries." },
                { name: "Azure RBAC", level: 90, description: "Implementing granular Role-Based Access Control for Azure resources." },
                { name: "CIEM / Cross-Account", level: 88, description: "Managing entitlements and securing privileged access paths across multi-cloud." },
                { name: "GCP IAM & Org Policies", level: 90, description: "Managing Google Cloud Identity, service accounts, and organization-level constraints." }
            ],
            borderColor: "border-terminal-green",
            textColor: "text-terminal-green",
            bgColor: "bg-terminal-green",
            hexColor: "#39FF14", // Neon Green
            hoverBorder: "hover:border-terminal-green",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
        },
        {
            id: 'grc',
            title: 'GRC_OPS',
            icon: <Lock className="w-8 h-8" />,
            skills: [
                { name: "Identity Risk Scoring", level: 90, description: "Prioritizing vulnerabilities based on real-world threat intelligence and business impact." },
                { name: "Access Reviews", level: 95, description: "Orchestrating periodic user access reviews and certification campaigns." },
                { name: "Least Privilege", level: 90, description: "Enforcing least privilege principles to reduce the identity attack surface." },
                { name: "Root Cause Analysis", level: 92, description: "Investigating identity-related security incidents and implementing preventative controls." }
            ],
            borderColor: "border-terminal-green",
            textColor: "text-terminal-green",
            bgColor: "bg-terminal-green",
            hexColor: "#39FF14", // Neon Green
            hoverBorder: "hover:border-terminal-green",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
        },
        {
            id: 'frameworks',
            title: 'FRAMEWORKS',
            icon: <ClipboardList className="w-8 h-8" />,
            skills: [
                { name: "NIST CSF / 800-53", level: 95, description: "Aligning security programs with the five core functions: Identify, Protect, Detect, Respond, Recover." },
                { name: "ISO 27001", level: 90, description: "Implementing ISMS policies and controls to ensure confidentiality, integrity, and availability." },
                { name: "SOC 2 Type II", level: 88, description: "Defining Trust Services Criteria (TSC) controls for security, availability, and confidentiality." },
                { name: "CIS Controls v8", level: 92, description: "Prioritizing critical security controls to defend against pervasive cyber threats." }
            ],
            borderColor: "border-terminal-green",
            textColor: "text-terminal-green",
            bgColor: "bg-terminal-green",
            hexColor: "#39FF14", // Neon Green
            hoverBorder: "hover:border-terminal-green",
            hoverShadow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
        }
    ];

    return (
        <section id="skills" className="py-12 relative overflow-hidden font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="h-full"
                        >
                            <div className={`bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-lg h-full ${category.hoverBorder} transition-all duration-500 group relative overflow-hidden hover:bg-black/90 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]`}>

                                {/* Terminal Header Line */}
                                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 font-mono text-[10px] tracking-wider opacity-70">
                                    <div className="flex gap-3 text-terminal-green">
                                        <span>drwxr-xr-x</span>
                                        <span className="text-white/50">2</span>
                                        <span className="text-white/50">root</span>
                                        <span className="text-white/50">root</span>
                                        <span className="text-white/50">4096</span>
                                    </div>
                                    <div style={{ color: category.hexColor }} className="opacity-80">{category.icon}</div>
                                </div>

                                {/* Category Title */}
                                <h3
                                    className={`font-bold text-lg tracking-widest mb-8 flex items-center gap-2 font-mono`}
                                    style={{ color: category.hexColor }}
                                >
                                    <span className="text-white/50">./</span>{category.title}
                                </h3>

                                {/* Skills List */}
                                <ul className="space-y-6">
                                    {category.skills.map((skill, idx) => (
                                        <li key={idx} className="group/skill relative pl-4 border-l border-white/10 hover:border-terminal-green transition-colors duration-300">
                                            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-terminal-green/5 to-transparent opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                            <div className="font-mono text-sm font-bold text-white mb-1 group-hover/skill:text-terminal-green transition-colors">
                                                {skill.name}
                                            </div>

                                            <p className="font-mono text-[11px] text-white/60 leading-relaxed">
                                                <span className="text-terminal-green/50 mr-1">#</span>
                                                {skill.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
