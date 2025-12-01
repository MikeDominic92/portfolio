"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MatrixRain from "../components/MatrixRain";
import ZeroTrustLoader from "../components/ZeroTrustLoader";
import EndpointTelemetry from "../components/EndpointTelemetry";
import SessionTimer from "../components/SessionTimer";
import VerificationCountdown from "../components/VerificationCountdown";
import CredentialLeakChecker from "../components/CredentialLeakChecker";
import CVETicker from "../components/CVETicker";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-green-900/10 animate-pulse rounded-lg border border-green-900 flex items-center justify-center text-green-500 font-mono text-xs">INITIALIZING SATELLITE LINK...</div>
});

export interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
  asn: string;
  timezone: string;
  latitude: number;
  longitude: number;
  postal: string;
  region_code: string;
  country_code: string;
  currency: string;
  languages: string;
  county?: string;
  threatScore?: number;
  weather?: any; // Keeping optional to avoid breaking legacy types if any
}

export default function Home() {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [showAccessButton, setShowAccessButton] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  useEffect(() => {
    if (isVerified) {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        setShowAccessButton(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 800));

      try {
        const res = await fetch("https://ipapi.co/json/");
        const json = await res.json();

        // Simulate threat score calculation based on IP octets
        const ipParts = json.ip.split('.').map(Number);
        const simulatedScore = Math.floor((ipParts[3] % 100) * 0.8 + (ipParts[2] % 20));

        let county = null;
        try {
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${json.latitude}&lon=${json.longitude}&format=json`);
          const geoJson = await geoRes.json();
          if (geoJson.address && geoJson.address.county) {
            county = geoJson.address.county;
          }
        } catch (e) {
          console.error("Geo fetch failed", e);
        }

        setData({ ...json, threatScore: simulatedScore, county });
      } catch (error) {
        console.error(error);
        // Fallback to mock data so the experience still works
        setData({
          ip: "192.168.X.X",
          city: "Unknown Sector",
          region: "Encrypted",
          country_name: "Classified",
          org: "Private Network",
          asn: "AS-----",
          timezone: "UTC",
          latitude: 40.7128,
          longitude: -74.0060,
          postal: "*****",
          region_code: "XX",
          country_code: "XX",
          currency: "BTC",
          languages: "en-US",
          threatScore: 99,
          weather: null
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center gap-8 relative">
      {!isVerified && <ZeroTrustLoader onComplete={() => setIsVerified(true)} data={data} isLoading={loading} />}

      {isVerified && <VerificationCountdown />}

      {/* Footer Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-green-900 p-2 z-40 flex justify-between items-center text-[10px] font-mono text-green-500">
        <div className="flex items-center gap-4">
          <span>SYSTEM_STATUS: <span className="text-green-400">OPTIMAL</span></span>
          <span>ENCRYPTION: <span className="text-green-400">AES-256-GCM</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span>SESSION_ID: <span className="text-blue-400">{sessionId || "INITIALIZING..."}</span></span>
        </div>
      </div>

      <MatrixRain />

      <div className="w-full max-w-2xl terminal-window z-10 bg-black/90 backdrop-blur-sm">
        <div className="terminal-header">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
          <span className="ml-2 text-xs text-white">visitor_intel.exe</span>
        </div>
        <div className="terminal-body text-green-500">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">SYSTEM BREACH DETECTED</h1>
          </div>

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-green-900 pt-4 mt-4">
              <div>
                <p className="text-white text-xs uppercase">IP Address</p>
                <p className="text-lg">{data.ip}</p>
              </div>
              <div>
                <p className="text-white text-xs uppercase">Provider</p>
                <p className="text-lg">{data.org}</p>
              </div>
              <div>
                <p className="text-white text-xs uppercase">Location</p>
                <p className="text-lg">{data.city}, {data.region}</p>
              </div>
              <div>
                <p className="text-white text-xs uppercase">Coordinates</p>
                <p className="text-lg">{data.latitude}, {data.longitude}</p>
              </div>

              <div className="col-span-1 md:col-span-2 border-t border-green-900 pt-4 mt-2">
                <p className="text-white text-xs uppercase mb-2">Geographic Details</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white text-xs">ZIP/POSTAL</p>
                    <p className="text-sm">{data.postal}</p>
                  </div>
                  <div>
                    <p className="text-white text-xs">REGION CODE</p>
                    <p className="text-sm">{data.region_code}</p>
                  </div>
                  <div>
                    <p className="text-white text-xs">CURRENCY</p>
                    <p className="text-sm">{data.currency}</p>
                  </div>
                  <div>
                    <p className="text-white text-xs">COUNTRY CODE</p>
                    <p className="text-sm">{data.country_code}</p>
                  </div>
                  {data.county && (
                    <div className="col-span-2 md:col-span-4">
                      <p className="text-white text-xs">COUNTY</p>
                      <p className="text-sm">{data.county}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 border-t border-green-900 pt-4 mt-2">
                <p className="text-white text-xs uppercase mb-2">Live Signal Tracking</p>
                <Map lat={data.latitude} lng={data.longitude} />
              </div>

              <div className="col-span-1 md:col-span-2 border-t border-green-900 pt-4 mt-2">
                <EndpointTelemetry />
              </div>

              <div className="col-span-1 md:col-span-2 border-t border-green-900 pt-4 mt-2">
                <p className="text-white text-xs uppercase mb-2">Threat Intelligence Score</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-4 bg-green-900/30 rounded-full overflow-hidden border border-green-900">
                    <div
                      className={`h-full transition-all duration-1000 ${(data.threatScore || 0) > 75 ? 'bg-red-500' :
                        (data.threatScore || 0) > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${data.threatScore}%` }}
                    ></div>
                  </div>
                  <span className={`font-mono font-bold text-xl ${(data.threatScore || 0) > 75 ? 'text-red-500' :
                    (data.threatScore || 0) > 40 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                    {data.threatScore}/100
                  </span>
                </div>
                <p className="text-xs text-white mt-1">
                  {(data.threatScore || 0) > 75 ? 'CRITICAL RISK DETECTED' :
                    (data.threatScore || 0) > 40 ? 'MODERATE RISK LEVEL' : 'NO ACTIVE THREATS FOUND'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>


      <div className="w-full max-w-2xl terminal-window z-10 bg-black/90 backdrop-blur-sm">
        <CredentialLeakChecker />
      </div>
    </div>
  );
}
