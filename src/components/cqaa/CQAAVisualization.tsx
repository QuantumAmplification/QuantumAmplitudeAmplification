"use client";

import { motion, AnimatePresence } from "framer-motion";

export function CQAAVisualization({ step }: { step: number }) {
    // Step 0: Standard AA (No control)
    // Step 1: Controlled Architecture (The Control Qubit)
    // Step 2: The (+1)-Eigenvector Overlap
    // Step 3: Detection via Overlap

    const isControlled = step >= 1;
    const isEigenvector = step >= 2;

    return (
        <div className="relative w-full h-full min-h-[450px] flex flex-col items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm p-10">
            
            {/* Circuit Diagram Area */}
            <div className="relative w-full h-48 flex items-center justify-center mb-10 border-b border-foreground/5">
                <svg width="400" height="150" viewBox="0 0 400 150" className="overflow-visible">
                    {/* Qubit Lines */}
                    <line x1="50" y1="40" x2="350" y2="40" stroke="var(--color-foreground)" strokeOpacity="0.2" />
                    <line x1="50" y1="100" x2="350" y2="100" stroke="var(--color-foreground)" strokeOpacity="0.2" />
                    
                    <text x="30" y="45" fill="var(--primary-glow)" fontSize="12" fontFamily="monospace" textAnchor="end">Control</text>
                    <text x="30" y="105" fill="var(--color-foreground)" fontSize="12" fontFamily="monospace" textAnchor="end" opacity="0.6">Data</text>

                    {/* Control Dot */}
                    <AnimatePresence>
                        {isControlled && (
                            <motion.g
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <circle cx="200" cy="40" r="6" fill="var(--primary-glow)" />
                                <line x1="200" y1="40" x2="200" y2="75" stroke="var(--primary-glow)" strokeWidth="2" />
                            </motion.g>
                        )}
                    </AnimatePresence>

                    {/* Unitary U Box */}
                    <motion.rect
                        x="160" y="75" width="80" height="50" rx="8"
                        fill={isControlled ? "var(--primary-glow)" : "var(--color-foreground)"}
                        fillOpacity={isControlled ? "0.15" : "0.05"}
                        stroke={isControlled ? "var(--primary-glow)" : "var(--color-foreground)"}
                        strokeWidth="2"
                    />
                    <text x="200" y="105" fill={isControlled ? "var(--primary-glow)" : "var(--color-foreground)"} fontSize="20" fontFamily="serif" textAnchor="middle" fontWeight="bold">U</text>
                </svg>
            </div>

            {/* Mathematical Visualization Area */}
            <div className="relative w-full flex-1 flex flex-col items-center justify-center gap-6">
                <div className="relative w-64 h-64">
                    {/* Eigenvector Sphere/Circle */}
                    <motion.circle
                        cx="128" cy="128" r="100"
                        fill="transparent"
                        stroke="var(--color-foreground)"
                        strokeWidth="1"
                        strokeOpacity="0.1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isEigenvector ? 1 : 0 }}
                    />
                    
                    {/* Target State Overlay (Constant 50%) */}
                    <AnimatePresence>
                        {isEigenvector && (
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {/* The |g> sub-state */}
                                <motion.circle
                                    cx="128" cy="128" r="70"
                                    fill="var(--primary-glow)"
                                    fillOpacity="0.2"
                                    stroke="var(--primary-glow)"
                                    strokeWidth="2"
                                    style={{ filter: "drop-shadow(0px 0px 10px var(--primary-glow))" }}
                                />
                                <text x="128" y="130" fill="var(--primary-glow)" fontSize="24" fontFamily="serif" textAnchor="middle">|g⟩</text>
                                
                                {/* Labels */}
                                <motion.text
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    x="128" y="40" fill="var(--color-foreground)" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.6"
                                >
                                    (+1)-Eigenvector |U₀⟩
                                </motion.text>
                                
                                <motion.text
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    x="128" y="210" fill="var(--primary-glow)" fontSize="10" fontWeight="bold" textAnchor="middle"
                                >
                                    CONSTANT OVERLAP = 1/2
                                </motion.text>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </div>

                {/* Legend/Context */}
                <div className="flex gap-10 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-foreground/10" />
                        <span className="text-[10px] uppercase tracking-widest opacity-40">Initial State</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary-glow shadow-[0_0_5px_var(--primary-glow)]" />
                        <span className="text-[10px] uppercase tracking-widest opacity-40">Target Overlap</span>
                    </div>
                </div>
            </div>

            {/* Bottom Alert */}
            <AnimatePresence>
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-10 px-6 py-3 rounded-2xl bg-primary-glow text-background text-xs font-bold uppercase tracking-[0.2em] shadow-xl"
                    >
                        Target State Detected
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

