"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, Folder, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Command {
    cmd: string;
    output: React.ReactNode;
}

const InteractiveTerminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Command[]>([
        { cmd: 'init', output: 'Welcome to IAM_SEC_OS v2.0. Type "help" for available commands.' }
    ]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Virtual File System
    const fileSystem: Record<string, React.ReactNode> = {
        'about.txt': (
            <div className="space-y-4 text-white/90 leading-relaxed">
                <div>
                    <span className="text-terminal-green font-bold block mb-1">01_PROFESSIONAL_SUMMARY.LOG</span>
                    <p>Cybersecurity Engineer with 10+ years in Cybersecurity and Technical Support, specializing in Identity & Access Management. Hands-on experience with AWS IAM, Entra ID, Active Directory, and access governance. Focused on Zero Trust architecture, privileged access management, and cloud identity security.</p>
                </div>
                <div>
                    <span className="text-terminal-green font-bold block mb-1">02_CURRENT_ROLE.LOG</span>
                    <p>Currently enforcing Least Privilege access models using SailPoint IdentityIQ and AWS IAM Access Analyzer. Configuring Identity Threat Detection and Response (ITDR) rules in CrowdStrike Falcon to detect compromised credentials, impossible travel anomalies, and lateral movement patterns. Investigating access-related incidents using Splunk SIEM.</p>
                </div>
                <div>
                    <span className="text-terminal-green font-bold block mb-1">03_AI_INTEGRATION.LOG</span>
                    <p>Integrating AI/ML for identity threat detection, anomaly-based risk scoring, and intelligent access analytics. Building portfolio projects that demonstrate enterprise-grade CIEM, ITDR, PAM, and IGA solutions with machine learning capabilities.</p>
                </div>
            </div>
        ),
        'skills.json': (
            <div className="space-y-1 text-terminal-green">
                <p>{`{`}</p>
                <div className="pl-4 text-white">
                    <p>"identity_platforms": ["Entra ID", "Active Directory", "Okta", "AWS IAM", "GCP IAM", "SailPoint"],</p>
                    <p>"authentication": ["SSO", "MFA", "OAuth 2.0", "OIDC", "SAML 2.0", "SCIM", "FIDO2"],</p>
                    <p>"pam": ["CyberArk", "HashiCorp Vault", "JIT Access", "Credential Rotation"],</p>
                    <p>"automation": ["Python", "Boto3", "PowerShell", "Terraform", "AI/ML Analytics"],</p>
                    <p>"security": ["Zero Trust", "NIST 800-53", "ISO 27001", "SOC 2", "ITDR"]</p>
                </div>
                <p>{`}`}</p>
            </div>
        ),
        'projects.log': (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">ZeroTrust IAM Analyzer</span>
                    <span className="text-xs text-gray-500">[CIEM - AWS/GCP]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">AI Access Sentinel</span>
                    <span className="text-xs text-gray-500">[ITDR - CrowdStrike]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">IAM Immune System</span>
                    <span className="text-xs text-gray-500">[IGA - SailPoint]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">Entra ID Governance</span>
                    <span className="text-xs text-gray-500">[IGA - Splunk]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">Keyless Kingdom</span>
                    <span className="text-xs text-gray-500">[OIDC Federation]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">PAM Vault Lab</span>
                    <span className="text-xs text-gray-500">[PAM - Vault/AWS]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">Okta SSO Hub</span>
                    <span className="text-xs text-gray-500">[SSO - SAML/OIDC]</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">Scroll down to Projects section for details.</p>
            </div>
        ),
        'contact.md': (
            <div className="text-white">
                <p>Email: <a href="mailto:DominicMH@pm.me" className="text-terminal-green hover:underline">DominicMH@pm.me</a></p>
                <p>GitHub: <a href="https://github.com/MikeDominic92" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">github.com/MikeDominic92</a></p>
            </div>
        )
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const rawCmd = input.trim();
        const cmdParts = rawCmd.split(' ');
        const cmd = cmdParts[0].toLowerCase();
        const arg = cmdParts[1];

        let output: React.ReactNode = '';

        switch (cmd) {
            case 'help':
                output = (
                    <div className="space-y-1 text-white">
                        <p>Available commands:</p>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-terminal-green">ls</span> <span>List files in current directory</span>
                            <span className="text-terminal-green">cat [file]</span> <span>Read file content</span>
                            <span className="text-terminal-green">whoami</span> <span>Display current user</span>
                            <span className="text-terminal-green">clear</span> <span>Clear terminal history</span>
                            <span className="text-terminal-green">sudo</span> <span>Execute command as superuser</span>
                        </div>
                    </div>
                );
                break;
            case 'ls':
                output = (
                    <div className="grid grid-cols-2 gap-2 text-terminal-green font-bold">
                        {Object.keys(fileSystem).map(file => (
                            <span key={file}>{file}</span>
                        ))}
                    </div>
                );
                break;
            case 'cat':
                if (!arg) {
                    output = <span className="text-red-500">Usage: cat [filename]</span>;
                } else if (fileSystem[arg]) {
                    output = fileSystem[arg];
                } else {
                    output = <span className="text-red-500">File not found: {arg}</span>;
                }
                break;
            case 'whoami':
                output = <span className="text-white">root@iam-portfolio</span>;
                break;
            case 'sudo':
                if (arg === 'rm' && cmdParts.includes('-rf') && cmdParts.includes('/')) {
                    output = <span className="text-red-500 font-bold animate-pulse">PERMISSION DENIED: Nice try, hacker. This system is protected.</span>;
                } else if (arg === 'make' && cmdParts.includes('sandwich')) {
                    output = <span className="text-white">What? Make it yourself.</span>;
                } else {
                    output = <span className="text-white">sudo: {arg || ''} command not found or access denied.</span>;
                }
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case '':
                break;
            default:
                if (fileSystem[cmd]) {
                    output = fileSystem[cmd];
                } else {
                    output = <span className="text-white">Command not found: {cmd}. Type "help" for assistance.</span>;
                }
        }

        setHistory([...history, { cmd: rawCmd, output }]);
        setInput('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden shadow-2xl font-mono text-sm flex flex-col min-h-[400px]"
        >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-white text-xs flex items-center gap-2">
                    <TerminalIcon className="w-3 h-3" />
                    root@iam-portfolio:~
                </div>
                <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex items-center gap-2 text-white mb-1">
                            <span className="text-terminal-green">root@iam-portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white">$</span>
                            <span className="text-white">{entry.cmd}</span>
                        </div>
                        <div className="ml-0 text-white leading-relaxed">
                            {entry.output}
                        </div>
                    </div>
                ))}

                <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
                    <span className="text-terminal-green">root@iam-portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-white w-full caret-green-500 font-mono"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </form>
            </div>
        </motion.div>
    );
};

export default InteractiveTerminal;
