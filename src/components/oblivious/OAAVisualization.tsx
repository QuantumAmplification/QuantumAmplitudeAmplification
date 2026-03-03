"use client";

import { motion } from "framer-motion";

export function OAAVisualization({ step }: { step: number }) {
    // Stage 1: The One-Shot problem. Vector is fuzzy. 
    // Stage 2: Missing pivot. Show an attempted reflection that fails (spins wildly).
    // Stage 3: Helper Tag. A locked bright ancilla line appears.
    // Stage 4: Oblivious Trick. The vector pivots smoothly around the ancilla line towards the target.

    const isFuzzy = step < 2;
    const showFailedPivot = step === 1;
    const showAncilla = step >= 2;
    const executeReflection = step === 3;

    // Angles
    const initialAngle = 20;
    const failAngle = 140; // Spinning wildly out of control
    const successAngle = 80; // Amplified properly
    const ancillaAngle = 50; // The known pivot axis

    let currentAngle = initialAngle;
    if (showFailedPivot) currentAngle = failAngle;
    if (executeReflection) currentAngle = successAngle;

    const RADIUS = 180;
    const vectorX = RADIUS * Math.cos((currentAngle * Math.PI) / 180);
    const vectorY = -RADIUS * Math.sin((currentAngle * Math.PI) / 180);

    const ancillaX = RADIUS * Math.cos((ancillaAngle * Math.PI) / 180);
    const ancillaY = -RADIUS * Math.sin((ancillaAngle * Math.PI) / 180);

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm">
            <svg viewBox="-240 -240 480 480" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10 pointer-events-none">
                <defs>
                    <marker id="arrowhead" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="var(--color-foreground)" />
                    </marker>
                    <marker id="arrowhead-fuzzy" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="var(--color-foreground)" opacity="0.4" />
                    </marker>
                    <marker id="arrowhead-ancilla" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="var(--primary-glow)" />
                    </marker>
                </defs>

                {/* Axes */}
                <line x1="-200" y1="0" x2="200" y2="0" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="-200" x2="0" y2="200" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />

                <text x="190" y="20" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="end">Bad States</text>
                <text x="-10" y="-190" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="end">Good States</text>

                {showAncilla && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <line
                            x1="0" y1="0"
                            x2={ancillaX} y2={ancillaY}
                            stroke="var(--primary-glow)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />
                        <text x={ancillaX + 15} y={ancillaY - 10} fill="var(--primary-glow)" fontSize="12" fontFamily="monospace">Known Ancilla Pivot</text>
                    </motion.g>
                )}

                {/* Mystery Vector */}
                <motion.line
                    x1="0" y1="0"
                    animate={{ x2: vectorX, y2: vectorY }}
                    transition={{
                        type: showFailedPivot ? "spring" : "tween",
                        stiffness: showFailedPivot ? 50 : undefined,
                        duration: showFailedPivot ? undefined : 1.5
                    }}
                    stroke="var(--color-foreground)"
                    strokeWidth={isFuzzy ? "6" : "2"}
                    strokeOpacity={isFuzzy ? 0.4 : 1}
                    style={isFuzzy ? { filter: "blur(4px)" } : {}}
                    markerEnd={isFuzzy ? "url(#arrowhead-fuzzy)" : "url(#arrowhead)"}
                />

                <circle cx="0" cy="0" r="4" fill="var(--color-foreground)" />
            </svg>

            {/* Context Labels */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="flex flex-col gap-1 max-w-[200px]">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: isFuzzy ? 1 : 0 }}
                        className="text-xs uppercase tracking-widest font-mono text-foreground/50"
                    >
                        Status: Unknown State (Fuzzy)
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: showFailedPivot ? 1 : 0 }}
                        className="text-xs uppercase tracking-widest font-mono text-red-500/80"
                    >
                        Error: Missing Axis
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
