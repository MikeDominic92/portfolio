"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, SVGOverlay, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  lat: number;
  lng: number;
}

function ZoomEffect({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

function InteractiveTarget({ lat, lng }: { lat: number; lng: number }) {
  return (
    <CircleMarker center={[lat, lng]} pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.5 }} radius={8}>
      <Popup className="custom-popup">
        <div className="font-mono text-xs">
          <p className="font-bold text-green-600">TARGET ACQUIRED</p>
          <p>LAT: {lat.toFixed(4)}</p>
          <p>LNG: {lng.toFixed(4)}</p>
        </div>
      </Popup>
    </CircleMarker>
  );
}

export default function Map({ lat, lng }: MapProps) {
  const [attacks, setAttacks] = useState<Array<{
    id: number;
    startLat: number;
    startLng: number;
    duration: number;
    color: string;
  }>>([]);

  // Generate random attacks
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const startLat = (Math.random() * 160) - 80; // Random lat
      const startLng = (Math.random() * 360) - 180; // Random lng
      const duration = 1000 + Math.random() * 2000; // 1-3s duration
      const color = Math.random() > 0.8 ? '#ef4444' : '#22c55e'; // Mostly green (blocked), some red (threats)

      setAttacks(prev => [...prev, { id, startLat, startLng, duration, color }]);

      // Cleanup old attacks
      setTimeout(() => {
        setAttacks(prev => prev.filter(a => a.id !== id));
      }, duration);
    }, 800); // New attack every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-green-900 relative group bg-black">
      <div className="absolute inset-0 pointer-events-none z-[400] bg-green-900/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
      <div className="absolute inset-0 pointer-events-none z-[400] shadow-[inset_0_0_20px_rgba(0,255,0,0.2)]"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[400] bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

      <MapContainer
        center={[lat, lng]}
        zoom={2}
        scrollWheelZoom={false}
        className="h-full w-full grayscale contrast-125 brightness-75 invert hue-rotate-180"
        style={{ background: '#000' }}
        zoomControl={false}
      >
        <ZoomEffect center={[lat, lng]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Interactive Target Marker */}
        <InteractiveTarget lat={lat} lng={lng} />

        {/* Attack Vectors */}
        <SVGOverlay attributes={{ stroke: 'red' }} bounds={[[-90, -180], [90, 180]]}>
          {attacks.map(attack => (
            <line
              key={attack.id}
              x1={((attack.startLng + 180) / 360) * 100 + "%"}
              y1={((1 - Math.log(Math.tan(attack.startLat * Math.PI / 180) + 1 / Math.cos(attack.startLat * Math.PI / 180)) / Math.PI) / 2) * 100 + "%"}
              x2={((lng + 180) / 360) * 100 + "%"}
              y2={((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2) * 100 + "%"}
              stroke={attack.color}
              strokeWidth="2"
              strokeDasharray="10"
              className="animate-dash"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur={`${attack.duration}ms`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${attack.duration}ms`}
                repeatCount="1"
              />
            </line>
          ))}
        </SVGOverlay>
      </MapContainer>

      {/* Pulse Effect on Target (CSS Overlay) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full animate-ping z-[500] pointer-events-none opacity-50"></div>

      <div className="absolute bottom-2 right-2 z-[500] bg-black/80 text-green-500 text-[10px] px-2 py-1 font-mono border border-green-900">
        LIVE_THREAT_FEED: ACTIVE
      </div>

      <style jsx global>{`
        .leaflet-container { background: #000 !important; }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </div>
  );
}