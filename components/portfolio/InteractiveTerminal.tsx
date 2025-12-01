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
                    <span className="text-terminal-green font-bold block mb-1">01_ORIGIN_STORY.LOG</span>
                    <p>It started with necessity. As a first-generation immigrant kid, I couldn't afford new tech, so I built my own from scraps. But hardware was just the start. I taught myself to code by writing bots to farm items and complete quests in MMORPGs while I was at school. I wasn't just playing games; I was reverse-engineering them, understanding memory offsets and packet structures. That thrill of bending a system to my will was my first taste of engineering.</p>
                </div>
                <div>
                    <span className="text-terminal-green font-bold block mb-1">02_THE_PIVOT.LOG</span>
                    <p>Life took a detour into entrepreneurship, and I spent years building a successful restaurant business. Then COVID hit. I was forced to close my doors, losing everything I had built. But in that silence, I found clarity. I returned to my first love: code. I didn't go to a bootcamp; I locked myself in a room and relearned everything, treating my self-education like a full-time job. That resilience, the ability to rebuild from zero, is what I bring to every challenge.</p>
                </div>
                <div>
                    <span className="text-terminal-green font-bold block mb-1">03_CURRENT_STATE.LOG</span>
                    <p>Now, I'm not just writing code; I'm securing it. I leverage my background in automation and my 'hacker mindset' to anticipate threats before they happen. I'm an early adopter of AI, using it to build self-healing identity fabrics that adapt faster than attackers can evolve. I don't just follow frameworks; I innovate within them to create security that enables speed rather than blocking it.</p>
                </div>
            </div>
        ),
        'skills.json': (
            <div className="space-y-1 text-terminal-green">
                <p>{`{`}</p>
                <div className="pl-4 text-white">
                    <p>"cloud": ["AWS", "GCP", "Azure"],</p>
                    <p>"identity": ["Okta", "Auth0", "SailPoint"],</p>
                    <p>"code": ["Python", "TypeScript", "Terraform"],</p>
                    <p>"security": ["Zero Trust", "OAuth/OIDC", "Threat Modeling"]</p>
                </div>
                <p>{`}`}</p>
            </div>
        ),
        'projects.log': (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">Zero Trust Gatekeeper</span>
                    <span className="text-xs text-gray-500">[DEPLOYED]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">IAM Immune System</span>
                    <span className="text-xs text-gray-500">[ACTIVE]</span>
                </div>
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-terminal-green" />
                    <span className="text-white font-bold">Keyless Kingdom</span>
                    <span className="text-xs text-gray-500">[PRODUCTION]</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">Type 'cat projects.log' to see details or scroll down to the Projects section.</p>
            </div>
        ),
        'contact.md': (
            <div className="text-white">
                <p>Email: <a href="mailto:DominicMH@pm.me" className="text-terminal-green hover:underline">DominicMH@pm.me</a></p>
                <p>GitHub: <a href="https://github.com/mikedominic" target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:underline">github.com/mikedominic</a></p>
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
