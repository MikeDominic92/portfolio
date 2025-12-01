"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const VerificationCountdown = ({ onComplete }: { onComplete?: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(10);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (onComplete) onComplete();
                    router.push('/portfolio');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none">
            {/* Transparent Overlay to allow seeing background - Reduced opacity for better visibility */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="text-6xl font-bold font-mono text-[#00ff41] animate-pulse tracking-tighter" style={{ textShadow: '0 0 20px rgba(0, 255, 65, 0.5)' }}>
                    00:{timeLeft.toString().padStart(2, '0')}
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white font-mono tracking-widest uppercase">
                        Identity Verification in Progress
                    </h2>
                    <p className="text-green-400/80 font-mono text-sm max-w-md">
                        SYSTEM ANALYSIS COMPLETE. REDIRECTING TO SECURE PORTFOLIO UPLINK.
                        <br />
                        PLEASE STAND BY...
                    </p>
                </div>

                {/* Loading Bar */}
                <div className="w-64 h-1 bg-green-900/50 rounded-full overflow-hidden mt-8">
                    <div
                        className="h-full bg-[#00ff41] transition-all duration-1000 ease-linear"
                        style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default VerificationCountdown;
