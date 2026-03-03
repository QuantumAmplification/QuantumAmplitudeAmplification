"use client";

import { motion } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";

export function StateVisualization({ step }: { step: number }) {
    // Angles corresponding to the 6 pedagogical steps
    // 0: Superposition, 1: Goal, 2: Oracle, 3: Diffusion, 4: Geometric Rotation, 5: Convergence
    const angles = [10, 10, -10, 30, 60, 90];
    const targetAngle = angles[step] || 90;

    // Convert polar to cartesian (radius = 180px for length of vector)
    const RADIUS = 180;
    // SVG coordinates: y is inverted down, so we subtract for positive angle
    // origin at 0,0 (center of a group)
    const vectorX = RADIUS * Math.cos((targetAngle * Math.PI) / 180);
    const vectorY = -RADIUS * Math.sin((targetAngle * Math.PI) / 180);

    // The original state |A> for the dashed line
    const origX = RADIUS * Math.cos((10 * Math.PI) / 180);
    const origY = -RADIUS * Math.sin((10 * Math.PI) / 180);

    const isSuccess = step === 5;

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm">

            <svg viewBox="-240 -240 480 480" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10 pointer-events-none">
                <defs>
                    <marker id="arrowhead" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="var(--color-foreground)" />
                    </marker>
                    <marker id="arrowhead-success" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="var(--primary-glow)" />
                    </marker>
                </defs>

                {/* Axes */}
                <line x1="-200" y1="0" x2="200" y2="0" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="-200" x2="0" y2="200" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />

                {/* Axis Labels (Good and Bad States) */}
                <text x="190" y="20" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="end">Bad States |A₀⟩</text>
                <text x="-10" y="-190" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="end">Good States |A₁⟩</text>

                {/* Original State |A> (Faint Dashed Line) */}
                <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    x1="0" y1="0"
                    x2={origX} y2={origY}
                    stroke="var(--color-foreground)"
                    strokeWidth="1.5"
                    strokeOpacity="0.2"
                    strokeDasharray="4 4"
                />
                <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    x={origX + 15} y={origY + 10} fill="var(--color-foreground)" fillOpacity="0.5" fontSize="14" fontFamily="monospace"
                >
                    |A⟩
                </motion.text>

                {/* Current State Vector line with native marker to guarantee perfect tip alignment */}
                <motion.line
                    x1={0} y1={0}
                    animate={{ x2: vectorX, y2: vectorY }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                    stroke={isSuccess ? "var(--primary-glow)" : "var(--color-foreground)"}
                    strokeWidth="2"
                    opacity={0.9}
                    markerEnd={isSuccess ? "url(#arrowhead-success)" : "url(#arrowhead)"}
                />

                {/* Center dot */}
                <circle cx="0" cy="0" r="4" fill="var(--color-foreground)" />
            </svg>

            {/* Overlay label showing success */}
            {isSuccess && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-6 left-6 px-4 py-2 bg-primary-glow/10 border border-primary-glow/30 text-primary-glow rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-md"
                >
                    Perfect Alignment
                </motion.div>
            )}
        </div>
    );
}
