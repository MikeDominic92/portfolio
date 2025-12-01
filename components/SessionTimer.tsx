"use client";

import { useState, useEffect } from "react";

export default function SessionTimer() {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    alert("SESSION EXPIRED. RE-AUTHENTICATION REQUIRED.");
                    window.location.reload();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    return (
        <div
            id="session-timer"
            className="fixed top-4 right-4 z-50 font-mono text-red-500 font-bold text-sm md:text-base bg-black/80 px-3 py-1 border border-red-900/50 rounded backdrop-blur-sm animate-pulse"
        >
            SESSION EXPIRY: {formatTime(timeLeft)}
        </div>
    );
}
