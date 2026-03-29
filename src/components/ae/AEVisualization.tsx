"use client";

import { motion, AnimatePresence } from "framer-motion";
import { InlineMath } from "react-katex";

export function AEVisualization({ step }: { step: number }) {
    // Stage-based visualization parameters
    const showRegister = step >= 1;
    const isCalculating = step === 2;
    const showResult = step >= 3;
    
    // Vector logic
    const vectorAngle = step === 0 ? 15 : (step === 1 ? 45 : 90);
    const RADIUS = 140;
    const vectorX = RADIUS * Math.cos((vectorAngle * Math.PI) / 180);
    const vectorY = -RADIUS * Math.sin((vectorAngle * Math.PI) / 180);

    // Register bits (8-bit register for visual impact)
    const bits = [0, 1, 1, 0, 1, 0, 0, 1]; // Result for theta
    
    return (
        <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm p-6 overflow-y-auto">
            
            {/* Top Part: State Vector (The 'Dial') */}
            <div className="relative w-full h-64 flex items-center justify-center mb-10">
                <svg viewBox="-180 -180 360 360" className="w-full h-full max-w-[300px] overflow-visible z-10 pointer-events-none">
                    <defs>
                        <marker id="arrowhead" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                            <polygon points="0,0 12,5 0,10" fill="var(--color-foreground)" />
                        </marker>
                    </defs>

                    {/* Simple Axis */}
                    <circle cx="0" cy="0" r={RADIUS} fill="none" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                    <line x1="-150" y1="0" x2="150" y2="0" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="0" y1="150" x2="0" y2="-150" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />

                    {/* The Rotating Vector */}
                    <motion.line
                        x1={0} y1={0}
                        animate={{ x2: vectorX, y2: vectorY }}
                        transition={{ type: "spring", stiffness: 40, damping: 15 }}
                        stroke="var(--primary-glow)"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                        style={{ filter: "drop-shadow(0px 0px 8px rgba(var(--color-primary-glow), 0.5))" }}
                    />

                    {/* Rotating "Clock" animation in step 2 */}
                    {isCalculating && (
                        <motion.circle
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            cx="0" cy="0" r={RADIUS + 10}
                            fill="none" stroke="var(--primary-glow)" strokeWidth="1" strokeDasharray="10 20" opacity="0.3"
                        />
                    )}

                    <circle cx="0" cy="0" r="4" fill="var(--color-foreground)" />
                </svg>
                
                <div className="absolute top-0 right-0 text-[10px] uppercase tracking-widest opacity-40 font-mono">
                    System State |Ψ⟩
                </div>
            </div>

            {/* Bottom Part: Phase Register (The 'Readout') */}
            <div className={`w-full flex flex-col items-center transition-all duration-700 ${showRegister ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-full h-px bg-foreground/5 mb-8" />
                
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-40 mb-4">Phase Register (M-bit)</h4>
                
                <div className="flex gap-2 mb-6">
                    {bits.map((bit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                backgroundColor: isCalculating ? 'rgba(var(--color-primary-glow), 0.1)' : (showResult && bit === 1 ? 'rgba(var(--color-primary-glow), 0.2)' : 'transparent'),
                                borderColor: isCalculating ? 'var(--primary-glow)' : 'rgba(var(--color-foreground), 0.1)'
                            }}
                            transition={{ delay: i * 0.05 }}
                            className="w-10 h-14 rounded-lg border flex items-center justify-center font-mono text-xl"
                        >
                            <AnimatePresence mode="wait">
                                {isCalculating ? (
                                    <motion.span
                                        key="calc"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                                        className="text-primary-glow text-xs"
                                    >
                                        ?
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key={showResult ? bit : 'empty'}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={bit === 1 ? "text-primary-glow" : "opacity-30"}
                                    >
                                        {showResult ? bit : "0"}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="px-4 py-2 bg-primary-glow/10 border border-primary-glow/20 rounded-full text-primary-glow text-sm font-semibold tracking-tighter shadow-[0_0_20px_rgba(var(--color-primary-glow),0.1)]">
                            <span className="opacity-60 text-xs uppercase tracking-widest mr-2">Estimated</span>
                            a ≈ 0.234
                        </div>
                        <div className="text-[10px] uppercase tracking-widest opacity-40 font-light translate-y-2">
                             Precision: ± 0.003 (with 8 Qubits)
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
