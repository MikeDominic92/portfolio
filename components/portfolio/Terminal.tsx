"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface Command {
    cmd: string;
    output: React.ReactNode;
}

const TerminalLine = ({ jsonKey, jsonValue, comment }: { jsonKey: string, jsonValue: string, comment: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-1">
            <div
                className="cursor-pointer hover:bg-white/5 transition-colors rounded px-1 -ml-1 select-none"
                onDoubleClick={() => setIsOpen(!isOpen)}
                title="Double-click to expand info"
            >
                <span className="text-terminal-green">"{jsonKey}"</span>: <span className="text-white">{jsonValue}</span>,
            </div>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-gray-500 text-xs ml-4 overflow-hidden"
                >
                    {comment}
                </motion.div>
            )}
        </div>
    );
};

const TerminalLogEntry = ({ summary, details }: { summary: string, details: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mb-4">
            <div
                className="flex items-center gap-2 cursor-pointer group select-none"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className={`text-terminal-green transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>➜</span>
                <span className={`font-bold transition-colors ${isExpanded ? 'text-terminal-green' : 'text-white group-hover:text-terminal-green'}`}>
                    {summary}
                </span>
            </div>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-white/90 leading-relaxed pl-6 mt-2 text-sm border-l border-terminal-green/30"
                >
                    {details}
                </motion.div>
            )}
        </div>
    );
};

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Command[]>([
        { cmd: 'init', output: 'Welcome to IAM_SEC_OS v2.0. Type "help" for available commands.' },
        {
            cmd: 'cat user_data.txt',
            output: (
                <div className="space-y-6 font-mono text-sm">
                    {/* JSON Identity Block */}
                    <div>
                        <div className="text-gray-500 mb-2 flex items-center gap-2">
                            <span>// IDENTITY_CONFIG.JSON</span>
                            <span className="text-terminal-green text-xs animate-pulse">(Double-click to expand)</span>
                        </div>
                        <div className="pl-4 border-l-2 border-white/20">
                            <span className="text-white">{`{`}</span>
                            <div className="pl-4">
                                <TerminalLine
                                    jsonKey="role"
                                    jsonValue='"Identity & Security Specialist"'
                                    comment="// My evolution: POS systems -> Trade Infrastructure -> Cloud Security -> Identity Governance."
                                />
                                <TerminalLine
                                    jsonKey="transition"
                                    jsonValue='"Tech Support → IAM Engineering"'
                                    comment="// I grew by automating my own support tasks, turning manual fixes into engineering solutions."
                                />
                                <TerminalLine
                                    jsonKey="focus"
                                    jsonValue='["Zero Trust", "Automation", "Resilience"]'
                                    comment="// Early adopter of AI, using it to build self-healing identity fabrics and predictive defense."
                                />
                                <TerminalLine
                                    jsonKey="current_org"
                                    jsonValue='"AlgOPro Solutions"'
                                    comment="// At AlgOPro, I'm closing the loop on risks I once chased manually, now using code to govern access."
                                />
                            </div>
                            <span className="text-white">{`}`}</span>
                        </div>
                    </div>

                    {/* Origin Story / Bio */}
                    <div>
                        <div className="text-gray-500 mb-2 flex items-center gap-2">
                            <span>// ORIGIN_STORY.LOG</span>
                            <span className="text-terminal-green text-xs animate-pulse">(Double-click to read)</span>
                        </div>
                        <div className="pl-4 border-l-2 border-terminal-green/50">
                            <TerminalLogEntry
                                summary="My Story: WhoAmI"
                                details="It started with necessity. As a first-generation immigrant kid, I couldn't afford new tech, so I built my own from scraps. But hardware was just the start. I taught myself to code by writing bots to farm items and complete quests in MMORPGs while I was at school. I wasn't just playing games; I was reverse-engineering them, understanding memory offsets and packet structures. That thrill of bending a system to my will was my first taste of engineering."
                            />
                            <TerminalLogEntry
                                summary="The Pivot: Turning Point"
                                details="Life took a detour into entrepreneurship, and I spent years building a successful restaurant business. Then COVID hit. I was forced to close my doors, losing everything I had built. But in that silence, I found clarity. I returned to my first love: code. I didn't go to a bootcamp; I locked myself in a room and relearned everything, treating my self-education like a full-time job. That resilience, the ability to rebuild from zero, is what I bring to every challenge."
                            />
                            <TerminalLogEntry
                                summary="The Journey: Mastering Skills"
                                details="Now, I'm not just writing code; I'm securing it. I leverage my background in automation and my 'hacker mindset' to anticipate threats before they happen. I'm an early adopter of AI, using it to build self-healing identity fabrics that adapt faster than attackers can evolve. I don't just follow frameworks; I innovate within them to create security that enables speed rather than blocking it."
                            />
                        </div>
                    </div>

                    {/* AI Stack */}
                    <div>
                        <div className="text-gray-500 mb-2">// ACTIVE_MODULES (AI_STACK)</div>
                        <div className="grid grid-cols-2 gap-4 pl-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                                <span className="text-white">ChatGPT 5.1</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse delay-75"></div>
                                <span className="text-white">Opus 4.5</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse delay-150"></div>
                                <span className="text-white">Gemini 3.0</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse delay-300"></div>
                                <span className="text-white">MCP Protocol</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ]);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (history.length > 1) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (cmd) {
            case 'help':
                output = (
                    <div className="space-y-1 text-white">
                        <p>Available commands:</p>
                        <p className="pl-4"><span className="text-terminal-green">whoami</span> : Display user profile</p>
                        <p className="pl-4"><span className="text-terminal-green">skills</span> : List top technical skills</p>
                        <p className="pl-4"><span className="text-terminal-green">contact</span> : Show contact info</p>
                        <p className="pl-4"><span className="text-terminal-green">clear</span> : Clear terminal screen</p>
                    </div>
                );
                break;
            case 'whoami':
                output = (
                    <div className="text-white">
                        <p>User: <span className="text-terminal-green font-bold">Jae (IAM Engineer)</span></p>
                        <p>Role: Security Architect & Identity Specialist</p>
                        <p>Mission: Securing digital identities through Zero Trust principles.</p>
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="grid grid-cols-2 gap-2 text-white">
                        <p>• Azure AD / Entra ID</p>
                        <p>• AWS IAM</p>
                        <p>• Okta / Auth0</p>
                        <p>• Python / PowerShell</p>
                        <p>• OAuth 2.0 / OIDC</p>
                        <p>• Terraform</p>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div className="text-white">
                        <p>Email: <a href="mailto:jae@example.com" className="text-terminal-green hover:underline">jae@example.com</a></p>

                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'sudo hire_me':
                output = <span className="text-terminal-green font-bold animate-pulse">ACCESS GRANTED. Let's build something secure together.</span>;
                break;
            default:
                output = <span className="text-white">Command not found: {cmd}. Type "help" for assistance.</span>;
        }

        setHistory([...history, { cmd: input, output }]);
        setInput('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden shadow-2xl font-mono text-sm flex flex-col"
        >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white/60" />
                </div>
                <div className="text-white text-xs">root@iam-portfolio:~</div>
                <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div
                className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry, i) => (
                    <div key={i} className="mb-6">
                        <div className="flex items-center gap-2 text-white mb-2">
                            <span className="text-terminal-green">root@iam-portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-white">~</span>
                            <span className="text-white">#</span>
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
                    <span className="text-white">~</span>
                    <span className="text-white">#</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-white w-full caret-green-500"
                        autoFocus
                    />
                </form>
                <div ref={bottomRef} />
            </div>
        </motion.div>
    );
};

export default Terminal;
