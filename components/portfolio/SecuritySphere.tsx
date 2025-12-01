"use client";

import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Trail, MeshTransmissionMaterial, Environment, Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Threat Data ---
type ThreatType = 'MITRE' | 'ZERO_TRUST' | 'NIST';

const THREAT_TYPES: Record<ThreatType, { color: string; shape: string; attacks: string[] }> = {
    MITRE: {
        color: "#bd00ff", // Cyber Purple
        shape: "tetrahedron",
        attacks: ["Phishing", "Brute Force", "DDoS", "Malware", "Exfiltration"]
    },
    ZERO_TRUST: {
        color: "#00ff41", // Neon Green
        shape: "box",
        attacks: ["Lateral Move", "Bad Device", "Weak Auth", "Unauth Access", "Policy Violation"]
    },
    NIST: {
        color: "#ff0033", // Neon Red
        shape: "icosahedron",
        attacks: ["Id Theft", "Session Hijack", "Cred Stuffing", "Priv Escalation", "Social Eng"]
    }
};

// --- Optimized Components ---

const NeuralCore = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 1000; // Reduced from 2000

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color("#00ff41");

        for (let i = 0; i < count; i++) {
            const r = 0.8 + Math.random() * 0.4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            color.toArray(colors, i * 3);
        }
        return [positions, colors];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;

            // Simplified pulse
            const s = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
            pointsRef.current.scale.set(s, s, s);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} sizeAttenuation />
        </points>
    );
};

const CodeRing = ({ radius, color, speed }: { radius: number, color: string, speed: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    const chars = "101101001011010010110100";

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += speed * 0.01;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: 16 }).map((_, i) => { // Reduced from 24
                const angle = (i / 16) * Math.PI * 2;
                return (
                    <Text
                        key={i}
                        position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
                        rotation={[0, 0, angle + Math.PI / 2]}
                        fontSize={0.15}
                        color={color}
                        font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
                    >
                        {chars[i % chars.length]}
                    </Text>
                );
            })}
        </group>
    );
};

const WarpField = () => {
    const count = 500; // Reduced from 1000
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            const z = Math.random() * 100 - 50;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, []);

    useFrame(() => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { factor, speed, x, y, z } = particle;
            const t = particle.t += speed / 2;
            const s = Math.cos(t);

            dummy.position.set(
                x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
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
            <meshBasicMaterial color="#00ff41" transparent opacity={0.4} />
        </instancedMesh>
    );
};

const CyberGlobe = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) groupRef.current.rotation.y += 0.005;
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <sphereGeometry args={[0.8, 24, 24]} /> {/* Reduced segments */}
                <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.2} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.78, 24, 24]} />
                <meshBasicMaterial color="#00ff41" transparent opacity={0.05} />
            </mesh>
        </group>
    );
};

// --- Visual Components for Simulation ---

const ThreatVisual = ({ threat }: { threat: any }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.copy(threat.pos);
        }
    });

    return (
        <group ref={groupRef}>
            <Text
                position={[0, 0.6, 0]}
                fontSize={0.15}
                color={THREAT_TYPES[threat.type as ThreatType].color}
                anchorX="center"
                anchorY="bottom"
            >
                {threat.name}
            </Text>
            <Trail width={1.5} length={4} color={new THREE.Color(THREAT_TYPES[threat.type as ThreatType].color)} attenuation={(t) => t}>
                <mesh>
                    <dodecahedronGeometry args={[0.2]} />
                    <meshStandardMaterial color={THREAT_TYPES[threat.type as ThreatType].color} emissive={THREAT_TYPES[threat.type as ThreatType].color} emissiveIntensity={2} />
                </mesh>
            </Trail>
        </group>
    );
};

const InterceptorVisual = ({ interceptor, threats }: { interceptor: any, threats: any[] }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.copy(interceptor.pos);
        }
    });

    return (
        <group ref={groupRef}>
            <Trail width={1} length={3} color={new THREE.Color("#ffffff")} attenuation={(t) => t}>
                <mesh>
                    <sphereGeometry args={[0.05]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </Trail>
        </group>
    );
};

const ParticleVisual = ({ particle }: { particle: any }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.copy(particle.pos);
            meshRef.current.scale.setScalar(particle.scale);
            if (Array.isArray(meshRef.current.material)) return;
            (meshRef.current.material as THREE.Material).opacity = particle.life;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={particle.color} transparent />
        </mesh>
    );
};

const FeedbackVisual = ({ feedback }: { feedback: any }) => {
    const textRef = useRef<any>(null);
    useFrame(() => {
        if (textRef.current) {
            textRef.current.position.copy(feedback.pos);
            textRef.current.fillOpacity = feedback.opacity;
        }
    });

    return (
        <Text
            ref={textRef}
            fontSize={0.12}
            color={feedback.color}
            anchorX="center"
            anchorY="bottom"
        >
            {feedback.text}
        </Text>
    );
};

const PatrolVisual = ({ patrol }: { patrol: any }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.copy(patrol.pos);
        }
    });

    return (
        <group ref={groupRef}>
            <Trail width={2} length={4} color={new THREE.Color("#39FF14")} attenuation={(t) => t}>
                <mesh>
                    <octahedronGeometry args={[0.15]} />
                    <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={4} />
                </mesh>
            </Trail>
        </group>
    );
};

const SecuritySimulation = ({ onEvent }: { onEvent: (type: string, color: string) => void }) => {
    // Mutable state for simulation logic (no re-renders)
    const state = useRef({
        threats: [] as any[],
        patrols: [0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((offset) => ({
            angle: offset,
            radius: 1.2,
            pos: new THREE.Vector3(),
            cooldown: 0
        })),
        interceptors: [] as any[],
        particles: [] as any[],
        feedback: [] as any[],
        nextId: 0,
        spawnTimer: 0
    });

    // Version state to trigger re-renders only when objects are added/removed
    const [version, setVersion] = useState(0);

    useFrame(({ clock }) => {
        const dt = 0.016;
        const s = state.current;
        let needsUpdate = false;

        // 1. Spawning
        s.spawnTimer += dt;
        if (s.spawnTimer > 0.8) {
            s.spawnTimer = 0;
            s.nextId++;

            const types = Object.keys(THREAT_TYPES) as ThreatType[];
            const typeKey = types[Math.floor(Math.random() * types.length)];
            const typeData = THREAT_TYPES[typeKey];
            const name = typeData.attacks[Math.floor(Math.random() * typeData.attacks.length)];

            const r = 9;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const pos = new THREE.Vector3(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );

            s.threats.push({
                id: s.nextId,
                type: typeKey,
                name: name,
                pos: pos,
                vel: pos.clone().multiplyScalar(-1).normalize().multiplyScalar(0.03),
                active: true,
                deflected: false,
                deflectTime: 0
            });
            needsUpdate = true;
        }

        // 2. Update Threats
        s.threats.forEach(threat => {
            if (!threat.active) return;

            if (threat.deflected) {
                threat.pos.add(threat.vel);
                threat.deflectTime += dt;
                if (threat.deflectTime > 1.0) {
                    threat.active = false;
                    needsUpdate = true;
                }
                return;
            }

            threat.pos.add(threat.vel);
            const dist = threat.pos.length();

            const spawnExplosion = (pos: THREE.Vector3, color: string) => {
                for (let i = 0; i < 5; i++) {
                    s.nextId++;
                    s.particles.push({
                        id: s.nextId,
                        pos: pos.clone(),
                        vel: new THREE.Vector3((Math.random() - 0.5) || 0.1, (Math.random() - 0.5) || 0.1, (Math.random() - 0.5) || 0.1).normalize().multiplyScalar(0.1),
                        color: color,
                        scale: 0.1 + Math.random() * 0.1,
                        life: 1.0 + Math.random() * 0.5
                    });
                }
                needsUpdate = true;
            };

            if (threat.type === 'MITRE' && dist < 1.7) {
                threat.deflected = true;
                threat.vel.reflect(threat.pos.clone().normalize()).multiplyScalar(2);
                spawnExplosion(threat.pos, THREAT_TYPES.MITRE.color);
                onEvent('DEFLECTED', THREAT_TYPES.MITRE.color);
                s.nextId++;
                s.feedback.push({
                    id: s.nextId,
                    pos: threat.pos.clone().add(new THREE.Vector3(0, 0.5, 0)),
                    text: `DEFLECTED: ${threat.name}`,
                    color: THREAT_TYPES.MITRE.color,
                    opacity: 1.0,
                    life: 1.5
                });
                needsUpdate = true;
            }

            if (threat.type === 'ZERO_TRUST' && dist < 1.3) {
                threat.deflected = true;
                threat.vel.reflect(threat.pos.clone().normalize()).multiplyScalar(2);
                spawnExplosion(threat.pos, THREAT_TYPES.ZERO_TRUST.color);
                onEvent('BLOCKED', THREAT_TYPES.ZERO_TRUST.color);
                s.nextId++;
                s.feedback.push({
                    id: s.nextId,
                    pos: threat.pos.clone().add(new THREE.Vector3(0, 0.5, 0)),
                    text: `BLOCKED: ${threat.name}`,
                    color: THREAT_TYPES.ZERO_TRUST.color,
                    opacity: 1.0,
                    life: 1.5
                });
                needsUpdate = true;
            }
        });

        // 3. Patrols & Interceptors
        const t = clock.getElapsedTime();
        s.patrols.forEach((patrol, i) => {
            patrol.angle += 0.01;
            patrol.pos.set(
                Math.cos(patrol.angle) * patrol.radius,
                Math.sin(t * 1.0 + i) * 0.2,
                Math.sin(patrol.angle) * patrol.radius
            );
            if (patrol.cooldown > 0) patrol.cooldown -= dt;
        });

        s.threats.forEach(threat => {
            if (!threat.active || threat.deflected || threat.type !== 'NIST') return;
            if (threat.pos.length() > 1.0) return;

            const isTargeted = s.interceptors.some(int => int.targetId === threat.id && int.active);
            if (isTargeted) return;

            const patrol = s.patrols.find(p => p.cooldown <= 0);
            if (patrol) {
                s.nextId++;
                s.interceptors.push({
                    id: s.nextId,
                    pos: patrol.pos.clone(),
                    targetId: threat.id,
                    active: true
                });
                patrol.cooldown = 0.5;
                needsUpdate = true;
            }
        });

        for (let i = s.interceptors.length - 1; i >= 0; i--) {
            const int = s.interceptors[i];
            if (!int.active) continue;

            const target = s.threats.find(t => t.id === int.targetId);
            if (!target || !target.active || target.deflected) {
                int.active = false;
                needsUpdate = true;
                continue;
            }

            const dir = target.pos.clone().sub(int.pos).normalize();
            int.pos.add(dir.multiplyScalar(0.15));

            if (int.pos.distanceTo(target.pos) < 0.2) {
                target.active = false;
                int.active = false;

                // Explosion
                for (let j = 0; j < 8; j++) {
                    s.nextId++;
                    s.particles.push({
                        id: s.nextId,
                        pos: target.pos.clone(),
                        vel: new THREE.Vector3((Math.random() - 0.5) || 0.1, (Math.random() - 0.5) || 0.1, (Math.random() - 0.5) || 0.1).normalize().multiplyScalar(0.15),
                        color: "#D000FF",
                        scale: 0.15,
                        life: 1.0
                    });
                }

                onEvent('NEUTRALIZED', '#D000FF');
                s.nextId++;
                s.feedback.push({
                    id: s.nextId,
                    pos: target.pos.clone().add(new THREE.Vector3(0, 0.5, 0)),
                    text: `NEUTRALIZED: ${target.name}`,
                    color: "#D000FF",
                    opacity: 1.0,
                    life: 1.5
                });
                needsUpdate = true;
            }
        }

        // 4. Update Particles & Feedback
        for (let i = s.particles.length - 1; i >= 0; i--) {
            const p = s.particles[i];
            p.pos.add(p.vel);
            p.life -= dt;
            p.scale *= 0.95;
            if (p.life <= 0) {
                s.particles.splice(i, 1);
                needsUpdate = true;
            }
        }

        for (let i = s.feedback.length - 1; i >= 0; i--) {
            const fb = s.feedback[i];
            fb.pos.y += 0.01;
            fb.life -= dt;
            fb.opacity = Math.min(1.0, fb.life);
            if (fb.life <= 0) {
                s.feedback.splice(i, 1);
                needsUpdate = true;
            }
        }

        // Cleanup inactive
        const prevThreatCount = s.threats.length;
        const prevIntCount = s.interceptors.length;
        s.threats = s.threats.filter(t => t.active);
        s.interceptors = s.interceptors.filter(i => i.active);

        if (s.threats.length !== prevThreatCount || s.interceptors.length !== prevIntCount) {
            needsUpdate = true;
        }

        if (needsUpdate) {
            setVersion(v => v + 1);
        }
    });

    return (
        <group>
            {state.current.threats.map((threat) => (
                <ThreatVisual key={`threat-${threat.id}`} threat={threat} />
            ))}
            {state.current.patrols.map((patrol, i) => (
                <PatrolVisual key={`patrol-${i}`} patrol={patrol} />
            ))}
            {state.current.interceptors.map((int) => (
                <InterceptorVisual key={`int-${int.id}`} interceptor={int} threats={state.current.threats} />
            ))}
            {state.current.particles.map((p) => (
                <ParticleVisual key={`p-${p.id}`} particle={p} />
            ))}
            {state.current.feedback.map((fb) => (
                <FeedbackVisual key={`fb-${fb.id}`} feedback={fb} />
            ))}
        </group>
    );
};

const RotatingGeometry = ({ onEvent }: { onEvent: (type: string, color: string) => void }) => {
    const groupRef = useRef<THREE.Group>(null);
    const layer2Ref = useRef<THREE.Group>(null);
    const layer3Ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        const mouse = state.mouse;
        if (groupRef.current) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.2, 0.1);
        }

        if (layer2Ref.current) {
            layer2Ref.current.rotation.x += 0.005;
            layer2Ref.current.rotation.y -= 0.005;
        }

        if (layer3Ref.current) {
            layer3Ref.current.rotation.z += 0.002;
            layer3Ref.current.rotation.x -= 0.002;
        }
    });

    // Optimized Glass Props
    const glassProps = {
        thickness: 0.1, // Reduced
        roughness: 0,
        transmission: 1,
        ior: 1.5,
        chromaticAberration: 0.02, // Reduced
        backside: true,
        distortion: 0.2, // Reduced
        distortionScale: 0.2,
    };

    return (
        <group ref={groupRef} scale={1.3}>
            <CyberGlobe />
            <NeuralCore />

            <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <CodeRing radius={1.2} color="#39FF14" speed={1} />
            </group>

            <SecuritySimulation onEvent={onEvent} />

            <group ref={layer2Ref}>
                <mesh>
                    <torusGeometry args={[1.6, 0.05, 12, 48]} /> {/* Reduced segments */}
                    <MeshTransmissionMaterial {...glassProps} color="#00ff41" resolution={256} /> {/* Reduced resolution */}
                </mesh>
                <Text position={[0, 1.8, 0]} fontSize={0.15} color="#00ff41" anchorX="center" anchorY="bottom">
                    ZERO TRUST
                </Text>
            </group>

            <group ref={layer3Ref}>
                <mesh>
                    <torusGeometry args={[2.2, 0.02, 12, 48]} /> {/* Reduced segments */}
                    <meshStandardMaterial color="#bd00ff" emissive="#bd00ff" emissiveIntensity={5} toneMapped={false} />
                </mesh>
                <mesh>
                    <torusGeometry args={[2.2, 0.1, 12, 48]} /> {/* Reduced segments */}
                    <MeshTransmissionMaterial {...glassProps} color="#bd00ff" resolution={256} opacity={0.3} transparent />
                </mesh>
                <Text position={[0, 2.4, 0]} fontSize={0.15} color="#bd00ff" anchorX="center" anchorY="bottom">
                    MITRE ATT&CK
                </Text>
            </group>
        </group>
    );
};

const SceneContent = ({ onEvent }: { onEvent: (type: string, color: string) => void }) => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#bd00ff" />

            <Environment preset="city" background={false} />

            <WarpField />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} /> {/* Reduced count */}

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <RotatingGeometry onEvent={onEvent} />
            </Float>

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                <Noise opacity={0.02} />
                <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
            </EffectComposer>
        </>
    );
};

const DashboardOverlay = ({ integrity, blockedCount }: { integrity: number, blockedCount: number }) => {
    return (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
                <div className="flex flex-col items-start">
                    <div className="text-[#39FF14] text-xs font-mono tracking-widest mb-1 opacity-80 drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]">
                        SYSTEM INTEGRITY
                    </div>
                    <div className="flex items-end gap-2">
                        <div className={`text-4xl font-bold font-mono ${integrity > 50 ? 'text-[#39FF14]' : 'text-[#D000FF]'} drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]`}>
                            {integrity}%
                        </div>
                        <div className="h-1.5 w-24 bg-gray-900/80 border border-[#39FF14]/30 mb-2 relative overflow-hidden rounded-sm">
                            <div
                                className={`absolute top-0 left-0 h-full ${integrity > 50 ? 'bg-[#39FF14]' : 'bg-[#D000FF]'} shadow-[0_0_10px_rgba(0,255,65,0.8)] transition-all duration-500`}
                                style={{ width: `${integrity}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="text-[#D000FF] text-xs font-mono tracking-widest mb-1 opacity-80 drop-shadow-[0_0_5px_rgba(189,0,255,0.8)]">
                        THREATS BLOCKED
                    </div>
                    <div className="text-4xl font-bold font-mono text-[#D000FF] drop-shadow-[0_0_10px_rgba(189,0,255,0.5)]">
                        {blockedCount}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-8">
                <div className="flex flex-col items-center gap-1">
                    <div className="bg-black/60 backdrop-blur-md border border-[#39FF14]/50 px-6 py-1.5 rounded-sm shadow-[0_0_20px_rgba(0,255,65,0.3)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#39FF14]/10 animate-pulse" />
                        <div className="text-[#39FF14] text-xs font-mono tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] relative z-10">
                            ACCESS: GRANTED
                        </div>
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#39FF14]" />
                        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#39FF14]" />
                        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#39FF14]" />
                        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#39FF14]" />
                    </div>
                    <div className="text-[#39FF14]/50 text-[8px] font-mono tracking-[0.2em] uppercase">
                        World Verified • Session Secure
                    </div>
                </div>
            </div>
        </div>
    );
};

const SecuritySphere = () => {
    const [integrity] = useState(100);
    const [blockedCount, setBlockedCount] = useState(0);

    const handleEvent = (_type: string, _color: string) => {
        setBlockedCount(prev => prev + 1);
    };

    return (
        <div className="absolute inset-0 w-full h-full">
            <DashboardOverlay integrity={integrity} blockedCount={blockedCount} />
            <Canvas camera={{ position: [0, 0, 14], fov: 45 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
                <SceneContent onEvent={handleEvent} />
            </Canvas>
        </div>
    );
};

export default SecuritySphere;
