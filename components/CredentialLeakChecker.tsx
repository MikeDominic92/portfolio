"use client";

import { useState } from "react";

export default function CredentialLeakChecker() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "result">("idle");
    const [breaches, setBreaches] = useState<string[]>([]);

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("checking");

        // Simulate API delay
        setTimeout(() => {
            // Mock logic: if email contains "admin" or "test", show breaches. Else clean.
            if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("test") || email.toLowerCase().includes("user")) {
                setBreaches(["Adobe (2013)", "Equifax (2017)", "Dropbox (2012)", "Canva (2019)"]);
            } else {
                setBreaches([]);
            }
            setStatus("result");
        }, 1500);
    };

    return (
        <div className="w-full h-full bg-black border border-green-900/50 p-4 font-mono flex flex-col">
            <div className="border-b border-green-900/50 pb-2 mb-4 flex justify-between items-center">
                <h3 className="text-green-500 font-bold tracking-wider">CREDENTIAL LEAK CHECKER</h3>
                <span className="text-xs text-green-900">SOURCE: HIBP API</span>
            </div>

            <form onSubmit={handleCheck} className="flex gap-2 mb-4">
                <input
                    type="email"
                    placeholder="ENTER EMAIL ADDRESS..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-green-950/10 border border-green-900/50 text-green-500 p-2 text-sm focus:outline-none focus:border-green-500 placeholder-green-900"
                />
                <button
                    type="submit"
                    disabled={status === "checking"}
                    className="bg-green-900/20 border border-green-900/50 text-green-500 px-4 py-2 text-sm font-bold hover:bg-green-900/40 disabled:opacity-50"
                >
                    {status === "checking" ? "SCANNING..." : "CHECK"}
                </button>
            </form>

            <div className="flex-1 overflow-y-auto min-h-[100px] bg-black/50 p-2 border border-green-900/30">
                {status === "idle" && (
                    <div className="text-green-900/50 text-xs text-center mt-4">
                        AWAITING INPUT...
                    </div>
                )}

                {status === "checking" && (
                    <div className="space-y-1">
                        <div className="text-green-500 text-xs animate-pulse">&gt; CONNECTING TO BREACH DATABASE...</div>
                        <div className="text-green-500 text-xs animate-pulse delay-75">&gt; HASHING CREDENTIALS...</div>
                        <div className="text-green-500 text-xs animate-pulse delay-150">&gt; QUERYING RECORDS...</div>
                    </div>
                )}

                {status === "result" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                        {breaches.length > 0 ? (
                            <>
                                <div className="text-red-500 font-bold text-sm border-b border-red-900/50 pb-1">
                                    [!] {breaches.length} BREACHES FOUND
                                </div>
                                {breaches.map((breach, i) => (
                                    <div key={i} className="text-red-400 text-xs flex justify-between">
                                        <span>{breach}</span>
                                        <span className="text-red-900">[COMPROMISED]</span>
                                    </div>
                                ))}
                                <div className="mt-4 text-xs text-yellow-500 border border-yellow-900/50 p-2 bg-yellow-900/10">
                                    RECOMMENDATION: ROTATE PASSWORDS IMMEDIATELY. ENABLE MFA.
                                </div>
                            </>
                        ) : (
                            <div className="text-green-500 font-bold text-sm flex flex-col items-center justify-center h-full gap-2">
                                <span className="text-2xl">✓</span>
                                <span>NO BREACHES FOUND</span>
                                <span className="text-xs text-green-900 font-normal">TARGET APPEARS CLEAN</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
