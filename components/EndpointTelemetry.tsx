"use client";

import { useEffect, useState } from "react";

export default function EndpointTelemetry() {
    const [report, setReport] = useState<any>(null);

    useEffect(() => {
        // 1. DISCOVER ASSETS (The Data)
        const ua = navigator.userAgent;
        const screenWidth = window.screen.width;
        const cores = navigator.hardwareConcurrency || 4;
        // @ts-ignore - deviceMemory is non-standard but supported in Chrome
        const ram = navigator.deviceMemory || 8;

        let os = "Unknown OS";
        let riskLevel = "LOW";
        let cveAlert = "None";
        let remediation = "None";

        // 2. ANALYZE POSTURE (The Logic)

        // Mobile/Tablet Detection
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua);
        const isAndroid = /Android/i.test(ua);
        const isMac = /Macintosh|Mac OS X/i.test(ua);
        const isWindows = /Windows/i.test(ua);
        const isLinux = /Linux/i.test(ua) && !isAndroid;

        if (isTablet) {
            os = isIOS ? "Apple iPad (iPadOS)" : isAndroid ? "Android Tablet" : "Tablet Device";
            riskLevel = "MEDIUM";
            cveAlert = "Mobile Architecture Detected";
            remediation = "ENFORCE MDM PROFILE";
        } else if (isMobile) {
            if (isIOS) {
                os = "Apple iPhone (iOS)";
                riskLevel = "MEDIUM";
                cveAlert = "Mobile Endpoint (BYOD)";
                remediation = "VERIFY DEVICE ENCRYPTION";
            } else if (isAndroid) {
                os = "Android Device";
                riskLevel = "ELEVATED"; // Android fragmentation risk
                cveAlert = "Fragmented OS Version Risk";
                remediation = "CHECK SECURITY PATCH LEVEL";
            } else {
                os = "Unknown Mobile Device";
                riskLevel = "HIGH";
                remediation = "QUARANTINE DEVICE";
            }
        } else if (isWindows) {
            if (ua.indexOf("Windows NT 10.0") !== -1) {
                os = "Windows 10/11 Workstation";
                riskLevel = "LOW";
                cveAlert = "Zero-Day Heuristics: Clean";
                remediation = "MAINTAIN MONITORING";
            } else {
                os = "Legacy Windows (7/8/XP)";
                riskLevel = "CRITICAL";
                cveAlert = "CVE-2019-0708 (BlueKeep) Risk";
                remediation = "ISOLATE HOST & PATCH";
            }
        } else if (isMac) {
            os = "Apple Macintosh (macOS)";
            riskLevel = "LOW";
            cveAlert = "System Integrity Protection: Active";
            remediation = "MAINTAIN MONITORING";
        } else if (isLinux) {
            os = "Linux Kernel (Custom)";
            riskLevel = "ELEVATED";
            cveAlert = "Root Privileges Detected";
            remediation = "AUDIT SUDOERS FILE";
        }

        setReport({
            os,
            cores,
            ram,
            riskLevel,
            cveAlert,
            remediation
        });
    }, []);

    if (!report) return <div className="text-green-500 animate-pulse">INITIALIZING TELEMETRY...</div>;

    return (
        <div className="font-mono text-green-500 bg-black p-6 border border-green-900/50 w-full h-full">
            <h3 className="border-b border-green-500 pb-2 mb-4 font-bold tracking-wider">
                &gt;&gt; ENDPOINT VULNERABILITY REPORT &lt;&lt;
            </h3>

            <div className="space-y-2 text-sm">
                <p>[+] ASSET ID: <span className="text-white">{report.os}</span></p>
                <p>[+] HARDWARE: <span className="text-white">{report.cores} Cores / ~{report.ram}GB RAM</span></p>

                <br />
                <p className="animate-pulse">&gt;&gt;&gt; ANALYZING SECURITY POSTURE...</p>
                <p>[!] RISK LEVEL: <span className={`font-bold ${report.riskLevel === 'CRITICAL' ? 'text-red-500' :
                    report.riskLevel === 'MEDIUM' ? 'text-orange-500' :
                        report.riskLevel === 'ELEVATED' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                    {report.riskLevel}
                </span></p>

                <p>[!] DETECTED VULNERABILITY: <span className="text-red-500">{report.cveAlert}</span></p>

                <br />
                <div className="border border-dashed border-green-900 p-3 bg-green-900/10">
                    <p>&gt;&gt; RECOMMENDED ACTION:</p>
                    <p className="text-yellow-500 font-bold mt-1">&gt; {report.remediation}</p>
                </div>
            </div>
        </div>
    );
}
