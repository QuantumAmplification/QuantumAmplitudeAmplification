"use client";

import { motion } from "framer-motion";

export function DQAAVisualization({ step }: { step: number }) {
    // Step 0: Monolithic standard amplitude amplification (1 giant node).
    // Step 1: Partitioning. The grid splits into 4 sub-processors.
    // Step 2: Chebyshev & Lucky Node. The 4 nodes search. One flashes (lucky node).
    // Step 3: Classical Concatenation. Merge outputs into final answer.

    const isMonolithic = step === 0;
    const isPartitioned = step >= 1;
    const isSearching = step === 2;
    const isConcatenating = step === 3;

    // We simulate 4 distributed nodes. Node 2 is our "Lucky Node" that finds the answer.
    const nodes = [
        { id: 1, isLucky: false },
        { id: 2, isLucky: true },
        { id: 3, isLucky: false },
        { id: 4, isLucky: false },
    ];

    const getXForNode = (index: number) => {
        if (isMonolithic) return 0;
        if (isConcatenating) return 0;
        // Spread them out into a 2x2 grid
        return (index % 2 === 0 ? -60 : 60);
    };

    const getYForNode = (index: number) => {
        if (isMonolithic) return 0;
        if (isConcatenating) return 0;
        // Spread them out into a 2x2 grid
        return (index < 2 ? -60 : 60);
    };

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm">
            <svg viewBox="-200 -200 400 400" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10">

                {/* Central Classical Hub (shows only at the end) */}
                <motion.circle
                    r="40"
                    cx="0"
                    cy="0"
                    fill="var(--background)"
                    stroke="var(--primary-glow)"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isConcatenating ? 1 : 0,
                        scale: isConcatenating ? 1 : 0
                    }}
                    transition={{ duration: 0.5 }}
                />
                <motion.text
                    x="0"
                    y="5"
                    fill="var(--primary-glow)"
                    fontSize="12"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isConcatenating ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Result
                </motion.text>

                {/* The Processors */}
                {nodes.map((node, i) => {
                    const cx = getXForNode(i);
                    const cy = getYForNode(i);

                    // Pulse effect for the searching phase
                    const pulseAnim = isSearching ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                    } : {};

                    return (
                        <motion.g
                            key={node.id}
                            initial={{ x: 0, y: 0 }}
                            animate={{ x: cx, y: cy }}
                            transition={{ type: "spring", stiffness: 60, damping: 12 }}
                        >
                            {/* Connecting lines back to center during concatenation */}
                            {isConcatenating && (
                                <motion.line
                                    x1={0} y1={0} x2={-cx} y2={-cy}
                                    stroke="var(--primary-glow)"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.5 }}
                                    transition={{ duration: 0.8 }}
                                />
                            )}

                            <motion.rect
                                x={isMonolithic ? -100 : -40}
                                y={isMonolithic ? -100 : -40}
                                width={isMonolithic ? 200 : 80}
                                height={isMonolithic ? 200 : 80}
                                rx="8"
                                fill={isSearching && node.isLucky ? "var(--primary-glow)" : "transparent"}
                                fillOpacity={isSearching && node.isLucky ? 0.2 : 0}
                                stroke={isSearching && node.isLucky ? "var(--primary-glow)" : "var(--color-foreground)"}
                                strokeWidth={isMonolithic ? 1 : 2}
                                strokeOpacity={isMonolithic ? 0.3 : (isSearching && node.isLucky ? 1 : 0.4)}
                                animate={pulseAnim}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                style={isSearching && node.isLucky ? { filter: "drop-shadow(0px 0px 15px var(--primary-glow))" } : {}}
                            />

                            {/* Label for the node */}
                            {!isMonolithic && (
                                <motion.text
                                    x="0"
                                    y={isSearching && node.isLucky ? "-5" : "5"}
                                    fill={isSearching && node.isLucky ? "var(--primary-glow)" : "var(--color-foreground)"}
                                    fontSize="10"
                                    fontFamily="sans-serif"
                                    textAnchor="middle"
                                    opacity="0.6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isConcatenating ? 0 : 0.8 }}
                                >
                                    Node {node.id}
                                </motion.text>
                            )}

                            {/* Lucky Node math */}
                            {isSearching && node.isLucky && (
                                <motion.text
                                    x="0"
                                    y="15"
                                    fill="var(--primary-glow)"
                                    fontSize="10"
                                    fontFamily="sans-serif"
                                    textAnchor="middle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    a_k ≥ a
                                </motion.text>
                            )}

                        </motion.g>
                    );
                })}

            </svg>

            {/* Context Overlays */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 max-w-[200px]">
                {isMonolithic && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-foreground/50">
                        Global monolithic problem (N=2ⁿ). High qubit overhead.
                    </motion.div>
                )}
                {isPartitioned && !isSearching && !isConcatenating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-foreground/80">
                        Problem partitioned into 2ʲ nodes. Qubits reduced to n-j.
                    </motion.div>
                )}
                {isSearching && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Parallel Chebyshev FPAA. The Lucky Node (Node 2) mathematically guarantees presence of answer.
                    </motion.div>
                )}
                {isConcatenating && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Classical Concatenation. Zero quantum communication required.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
