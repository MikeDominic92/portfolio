"use client";

import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Skills from "@/components/portfolio/Skills";
import Contact from "@/components/portfolio/Contact";
import SecuritySphere from "@/components/portfolio/SecuritySphere";
import Layout from "@/components/portfolio/Layout";
import ImmersiveGrid from "@/components/portfolio/ImmersiveGrid";
import { HoverProvider } from "@/components/context/HoverContext";

import Projects from "@/components/portfolio/Projects";
import { useEffect } from "react";

export default function PortfolioPage() {
    useEffect(() => {
        // Force scroll to top on mount
        window.scrollTo(0, 0);

        // Disable browser scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    return (
        <HoverProvider>
            <ImmersiveGrid />
            <Layout>
                <Hero />
                <About />
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <SecuritySphere />
                    </div>
                    <Skills />
                </div>
                <Projects />
                <Experience />
                <Contact />
            </Layout>
        </HoverProvider>
    );
}
