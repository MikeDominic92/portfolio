"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';

const MovingGrid = () => {
    const gridRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (gridRef.current) {
            // Move grid towards camera to simulate forward motion
            gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1;
        }
    });

    return (
        <group ref={gridRef} rotation={[Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
            <Grid
                args={[20, 20]}
                cellSize={0.5}
                cellThickness={1}
                cellColor="#00ff41"
                sectionSize={2}
                sectionThickness={1.5}
                sectionColor="#00f0ff"
                fadeDistance={15}
                fadeStrength={1}
                infiniteGrid
            />
        </group>
    );
};

const FloatingParticles = () => {
    const count = 100;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 10 - 5;
            const z = Math.random() * 10 - 5;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, []);

    useFrame(() => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, speed, x, y, z } = particle;
            t = particle.t += speed / 2;
            const s = Math.cos(t);

            dummy.position.set(x, y + Math.sin(t) * 2, z);
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#00ff41" transparent opacity={0.6} />
        </instancedMesh>
    );
};

const ImmersiveGrid = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: true }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 5, 20]} />

                <ambientLight intensity={0.5} />
                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <MovingGrid />
                <FloatingParticles />
            </Canvas>

            {/* Overlay Gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none opacity-80"></div>
        </div>
    );
};

export default ImmersiveGrid;
