"use client";

import { useEffect, useState } from "react";

interface CVE {
    id: string;
    summary: string;
}

export default function CVETicker() {
    const [cves, setCves] = useState<CVE[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCVEs = async () => {
            try {
                const res = await fetch("https://cve.circl.lu/api/last");
                if (!res.ok) throw new Error("API Unreachable");

                const data = await res.json();
                // Take top 15 and format
                const formatted = data.slice(0, 15).map((item: any) => ({
                    id: item.id,
                    summary: item.summary.length > 100 ? item.summary.substring(0, 100) + "..." : item.summary
                }));
                setCves(formatted);
            } catch (error) {
                console.error("CVE Fetch Failed, using fallback:", error);
                // Fallback data (High profile historical CVEs for aesthetic)
                setCves([
                    { id: "CVE-2021-44228", summary: "Log4Shell: Remote Code Execution in Log4j" },
                    { id: "CVE-2017-0144", summary: "EternalBlue: SMB Remote Code Execution" },
                    { id: "CVE-2014-0160", summary: "Heartbleed: OpenSSL Information Disclosure" },
                    { id: "CVE-2019-0708", summary: "BlueKeep: RDP Remote Code Execution" },
                    { id: "CVE-2023-4863", summary: "Heap buffer overflow in libwebp" },
                    { id: "CVE-2023-38545", summary: "SOCKS5 heap buffer overflow in curl" },
                    { id: "CVE-2024-3094", summary: "XZ Utils Backdoor - Malicious Code Injection" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCVEs();
    }, []);

    if (loading) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-red-900/50 h-8 flex items-center overflow-hidden font-mono text-xs">
            <div className="bg-red-900/80 text-white px-4 h-full flex items-center font-bold whitespace-nowrap z-10 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                BREAKING THREATS
            </div>

            <div className="flex-1 overflow-hidden relative h-full flex items-center">
                <div className="animate-marquee whitespace-nowrap flex gap-8 absolute">
                    {/* Duplicate list for seamless loop */}
                    {[...cves, ...cves].map((cve, i) => (
                        <span key={i} className="text-green-500 flex items-center gap-2">
                            <span className="text-red-500 font-bold">[{cve.id}]</span>
                            <span className="opacity-80">{cve.summary}</span>
                            <span className="text-green-900">///</span>
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}
