"use client";

import { motion } from 'framer-motion';
import { Mail, Github, Send, Terminal, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useHover } from '../context/HoverContext';

interface TerminalInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    type?: 'text' | 'email' | 'textarea';
}

const TerminalInput = ({ label, name, value, onChange, placeholder, type = 'text' }: TerminalInputProps) => (
    <div className="space-y-1">
        <label htmlFor={name} className="text-xs text-white ml-1 font-mono font-bold tracking-wide">{label}</label>
        <div className="relative group">
            <span className="absolute left-3 top-3 text-terminal-green text-sm select-none font-mono">root@guest:~$</span>
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={4}
                    className="w-full bg-black border border-white/10 rounded-sm py-2.5 pl-[120px] pr-4 text-white placeholder-white/50 focus:outline-none focus:border-terminal-green/50 focus:ring-1 focus:ring-terminal-green/50 transition-all font-mono text-sm resize-none"
                    placeholder={placeholder}
                    required
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-black border border-white/10 rounded-sm py-2.5 pl-[120px] pr-4 text-white placeholder-white/50 focus:outline-none focus:border-terminal-green/50 focus:ring-1 focus:ring-terminal-green/50 transition-all font-mono text-sm"
                    placeholder={placeholder}
                    required
                />
            )}
        </div>
    </div>
);

const Contact = () => {
    const { setIsHovered } = useHover();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden font-mono">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-terminal-green">root@iam:~/uplink#</span>
                        <span className="text-white">./establish_encrypted_communication.sh</span>
                    </h2>
                    <div className="h-px w-full bg-white/10 mb-6"></div>
                    <p className="text-white text-sm max-w-2xl">
                        Initiate encrypted communication. All payloads are scanned for threats.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info - System Status */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-sm relative overflow-hidden">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                                <span className="text-terminal-green">➜</span>
                                SYSTEM_STATUS
                            </h3>

                            <div className="space-y-6">
                                <div className="group flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-terminal-green group-hover:text-hacker-cyan group-hover:border-hacker-cyan/50 transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white mb-1">SMTP_RELAY</p>
                                        <a href="mailto:DominicMH@pm.me" className="text-white hover:text-terminal-green transition-colors text-sm">
                                            DominicMH@pm.me
                                        </a>
                                        <div className="text-[10px] text-terminal-green mt-1 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></div>
                                            PORT: 25 [OPEN]
                                        </div>
                                    </div>
                                </div>



                                <div className="group flex items-start gap-4">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-terminal-green group-hover:text-hacker-cyan group-hover:border-hacker-cyan/50 transition-all">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white mb-1">REPO_ACCESS</p>
                                        <a href="https://github.com/MikeDominic92" target="_blank" rel="noopener noreferrer" className="text-white hover:text-terminal-green transition-colors text-sm">
                                            github.com/MikeDominic92
                                        </a>
                                        <div className="text-[10px] text-terminal-green mt-1 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse"></div>
                                            PUBLIC_KEY_AUTH
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Command Input */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4 bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-sm">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                                <span className="text-terminal-green">➜</span>
                                INPUT_TERMINAL
                            </h3>

                            <TerminalInput
                                label="usr/bin/name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />

                            <TerminalInput
                                label="usr/bin/email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />

                            <TerminalInput
                                label="usr/bin/message_body"
                                name="message"
                                type="textarea"
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Message"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-terminal-green/10 hover:bg-terminal-green/20 text-terminal-green border border-terminal-green/50 py-3 px-6 rounded-sm font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>EXECUTING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="group-hover:animate-pulse">&gt;</span>
                                        <span>./send_payload.sh</span>
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="mt-4 p-3 bg-terminal-green/10 border border-terminal-green/30 rounded-sm text-terminal-green text-xs font-mono flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>PAYLOAD_DELIVERED_SUCCESSFULLY</span>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
