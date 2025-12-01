"use client";

import { useState, useEffect } from "react";
import { VisitorData } from "../app/page";

interface ZeroTrustLoaderProps {
    onComplete: () => void;
    data: VisitorData | null;
    isLoading: boolean;
}

export default function ZeroTrustLoader({ onComplete, data, isLoading }: ZeroTrustLoaderProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [accessGranted, setAccessGranted] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [adminToken, setAdminToken] = useState("");
    const [adminError, setAdminError] = useState("");
    const [sessionId, setSessionId] = useState("");

    useEffect(() => {
        setSessionId(Math.random().toString(36).substring(7).toUpperCase());
    }, []);

    useEffect(() => {
        // Reset lines and start sequence when data is available
        if (!data) {
            if (lines.length === 0) setLines(["> ESTABLISHING SECURE CONNECTION..."]);
            return;
        }

        setLines(["> ESTABLISHING SECURE CONNECTION..."]);

        const sequence = [
            { text: `> DETECTING IP ADDRESS... <span class='text-green-500'>[${data.ip}]</span>`, delay: 500 },
            { text: `> RESOLVING HOSTNAME... <span class='text-green-500'>[${data.org}]</span>`, delay: 1500 },
            { text: `> TRIANGULATING LOCATION... <span class='text-green-500'>[${data.city}, ${data.region}]</span>`, delay: 2500 },
            { text: `> COORDINATES... <span class='text-green-500'>[${data.latitude}, ${data.longitude}]</span>`, delay: 3200 },
            { text: "> VERIFYING KERNEL INTEGRITY... <span class='text-green-500'>[SECURE]</span>", delay: 4000 },
            { text: `> CALCULATING THREAT SCORE... <span class='${(data.threatScore || 0) > 50 ? 'text-red-500' : 'text-green-500'}'>[${data.threatScore}/100]</span>`, delay: 5000 },
            { text: "> CHECKING MFA STATUS... <span class='text-yellow-500 font-bold'>[NOT DETECTED]</span>", delay: 6000 },
            { text: "<br/>> POLICY ENFORCEMENT: APPLIED <span class='bg-yellow-500/20 text-yellow-500 px-1'>GUEST_READ_ONLY</span> ROLE", delay: 7000 },
        ];

        let timeouts: NodeJS.Timeout[] = [];

        sequence.forEach(({ text, delay }) => {
            const timeout = setTimeout(() => {
                setLines((prev) => [...prev, text]);
            }, delay);
            timeouts.push(timeout);
        });

        const finishTimeout = setTimeout(() => {
            setAccessGranted(true);
            setShowButton(true);
        }, 8000);
        timeouts.push(finishTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [data]);

    const handleAdminSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAdminError("ACCESS DENIED. REDIRECTING TO STANDARD CONTACT FORM...");
        setTimeout(() => {
            window.location.href = "mailto:contact@example.com?subject=Security Inquiry";
            setShowAdminModal(false);
            setAdminError("");
            setAdminToken("");
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono p-4">
            <div className="w-full max-w-2xl relative">
                <div className="mb-8 border-b border-green-900/50 pb-2">
                    <h1 className="text-green-500 text-xl font-bold tracking-widest animate-pulse">
                        ZERO TRUST ARCHITECTURE // ENFORCEMENT
                    </h1>
                </div>

                <div className="space-y-2 text-green-400/80 text-sm md:text-base min-h-[300px]">
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            dangerouslySetInnerHTML={{ __html: line }}
                            className="animate-in fade-in slide-in-from-left-2 duration-300"
                        />
                    ))}
                    <div className="animate-pulse text-green-500">_</div>
                </div>

                {accessGranted && (
                    <div className="mt-8 border-t border-green-900/50 pt-6 animate-in fade-in duration-1000 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse"></div>
                            <span className="text-yellow-500 font-bold">IDENTITY UNVERIFIED</span>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowAdminModal(true)}
                                className="px-4 py-2 border border-red-900/50 text-red-500 hover:bg-red-900/20 hover:border-red-500 transition-all text-xs md:text-sm uppercase tracking-wider"
                            >
                                Request Elevated Privileges
                            </button>

                            <button
                                onClick={onComplete}
                                className="px-6 py-2 bg-green-600 text-black font-bold hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all text-xs md:text-sm uppercase tracking-wider"
                            >
                                Acknowledge & Proceed
                            </button>
                        </div>
                    </div>
                )}

                {/* Admin Modal */}
                {showAdminModal && (
                    <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 animate-in fade-in duration-200">
                        <div className="border border-red-500/50 p-6 w-full max-w-md bg-black shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                            <h3 className="text-red-500 font-bold mb-4 tracking-widest">&gt;&gt; AUTHENTICATION REQUIRED</h3>
                            <form onSubmit={handleAdminSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-red-400/70 text-xs mb-1">ENTER ADMIN TOKEN:</label>
                                    <input
                                        type="password"
                                        value={adminToken}
                                        onChange={(e) => setAdminToken(e.target.value)}
                                        className="w-full bg-red-950/10 border border-red-900/50 text-red-500 p-2 focus:outline-none focus:border-red-500 font-mono"
                                        autoFocus
                                    />
                                </div>
                                {adminError && (
                                    <div className="text-red-500 font-bold text-sm animate-pulse">
                                        {adminError}
                                    </div>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAdminModal(false)}
                                        className="px-3 py-1 text-red-400/50 hover:text-red-400 text-xs"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-1 bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 text-xs font-bold"
                                    >
                                        AUTHENTICATE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 text-green-900/40 text-xs text-center">
                SECURE CONNECTION ESTABLISHED via TLS 1.3<br />
                SESSION ID: {sessionId}
            </div>
        </div>
    );
}
