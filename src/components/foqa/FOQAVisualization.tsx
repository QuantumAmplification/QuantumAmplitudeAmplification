"use client";

import { motion } from "framer-motion";

export function FOQAVisualization({ step }: { step: number }) {
    const isSouffle = step === 0;
    const isDamping = step === 1;
    const isBlockEncoding = step === 2;
    const isLCU = step === 3;
    const isSpeedup = step === 4;
    const isSchedule = step === 5;

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm p-8 text-foreground">
            <svg viewBox="-200 -200 400 400" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10">

                {/* Step 0: The Soufflé Effect */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSouffle ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <line x1="-150" y1="-80" x2="150" y2="-80" stroke="var(--primary-glow)" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="0" y="-90" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Target State (Probability = 1)</text>
                    <motion.path
                        d="M -150 100 Q -100 100 -50 0 T 50 -120 T 150 50"
                        fill="transparent"
                        stroke="var(--color-foreground)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isSouffle ? 1 : 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <circle cx="50" cy="-120" r="6" fill="red" opacity="0.6" />
                    <text x="50" y="-135" fill="red" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">Overshoot!</text>
                </motion.g>

                {/* Step 1: Fixed-Point Damping */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDamping ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <line x1="-150" y1="-80" x2="150" y2="-80" stroke="var(--primary-glow)" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="0" y="-90" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Target State (Probability = 1)</text>
                    <motion.path
                        d="M -150 100 Q -100 100 -50 0 T 50 -75 T 150 -80"
                        fill="transparent"
                        stroke="var(--primary-glow)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isDamping ? 1 : 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0px 0px 8px var(--primary-glow))" }}
                    />
                    <circle cx="-50" cy="0" r="4" fill="var(--color-foreground)" opacity="0.5" />
                    <circle cx="5" cy="-55" r="4" fill="var(--color-foreground)" opacity="0.5" />
                    <circle cx="50" cy="-75" r="4" fill="var(--color-foreground)" opacity="0.5" />
                    <text x="0" y="-40" fill="var(--color-foreground)" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.7">Friction gradually applied</text>
                </motion.g>

                {/* Step 2: Block Encoding */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isBlockEncoding ? 1 : 0, scale: isBlockEncoding ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    <rect x="-110" y="-110" width="220" height="220" rx="12" fill="var(--color-foreground)" fillOpacity="0.02" stroke="var(--primary-glow)" strokeWidth="2" strokeDasharray="6 6" />
                    <text x="0" y="-125" fill="var(--primary-glow)" fontSize="18" fontFamily="sans-serif" textAnchor="middle">Unitary Circuit U</text>
                    <rect x="-110" y="-110" width="100" height="100" rx="12" fill="var(--primary-glow)" fillOpacity="0.2" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="-60" y="-65" fill="var(--primary-glow)" fontSize="16" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Damped</text>
                    <text x="-60" y="-45" fill="var(--primary-glow)" fontSize="16" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Operation</text>
                    <rect x="-5" y="-110" width="115" height="100" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" />
                    <rect x="-110" y="-5" width="100" height="115" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" />
                    <rect x="-5" y="-5" width="115" height="115" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" />
                    <text x="52" y="52" fill="var(--color-foreground)" opacity="0.5" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Ancilla Garbage</text>
                </motion.g>

                {/* Step 3: LCU and Ry Gate */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLCU ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <line x1="-150" y1="-20" x2="150" y2="-20" stroke="var(--color-foreground)" strokeWidth="2" strokeOpacity="0.3" />
                    <line x1="-150" y1="40" x2="150" y2="40" stroke="var(--color-foreground)" strokeWidth="2" strokeOpacity="0.3" />
                    <text x="-170" y="-15" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="end">Ancilla</text>
                    <text x="-170" y="45" fill="var(--color-foreground)" fontSize="14" fontFamily="sans-serif" textAnchor="end">Data</text>
                    <rect x="-80" y="-40" width="40" height="40" rx="4" fill="var(--primary-glow)" fillOpacity="0.2" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="-60" y="-15" fill="var(--primary-glow)" fontSize="16" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Ry</text>
                    <rect x="-10" y="-30" width="40" height="90" rx="4" fill="var(--color-foreground)" fillOpacity="0.1" stroke="var(--color-foreground)" strokeWidth="2" />
                    <text x="10" y="20" fill="var(--color-foreground)" fontSize="16" fontFamily="sans-serif" textAnchor="middle">U</text>
                    <motion.rect
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        transform="translate(80, -20)"
                        x="-20" y="-20" width="40" height="40" rx="4" fill="var(--primary-glow)" fillOpacity="0.2" stroke="var(--primary-glow)" strokeWidth="2"
                    />
                    <text x="80" y="-15" fill="var(--primary-glow)" fontSize="16" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Ry</text>
                    <motion.path
                        d="M -60 -40 Q 10 -80 80 -40"
                        fill="transparent"
                        stroke="var(--primary-glow)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <text x="10" y="-60" fill="var(--primary-glow)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Tuning friction angle</text>
                    <rect x="130" y="-30" width="20" height="20" fill="var(--color-foreground)" stroke="var(--color-foreground)" strokeWidth="1" />
                    <path d="M 132 -20 Q 140 -30 148 -20" fill="transparent" stroke="black" strokeWidth="1" />
                    <line x1="140" y1="-20" x2="145" y2="-28" stroke="black" strokeWidth="1" />
                </motion.g>

                {/* Step 4: Speedup Proof */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSpeedup ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <rect x="-120" y="-60" width="240" height="120" rx="16" fill="var(--primary-glow)" fillOpacity="0.05" stroke="var(--primary-glow)" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="0" y="-20" fill="var(--primary-glow)" fontSize="24" fontFamily="sans-serif" textAnchor="middle">100% Guaranteed Hit</text>
                    <text x="0" y="5" fill="var(--color-foreground)" opacity="0.7" fontSize="12" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">0% OVERSHOOT</text>
                    <text x="0" y="35" fill="var(--primary-glow)" fontSize="18" fontFamily="sans-serif" textAnchor="middle">O(√N)</text>
                    <text x="0" y="50" fill="var(--color-foreground)" opacity="0.7" fontSize="10" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">OPTIMAL SPEEDUP MAINTAINED</text>
                </motion.g>

                {/* Step 5: Damping Schedule Comparison */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSchedule ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <line x1="-150" y1="120" x2="150" y2="120" stroke="var(--color-foreground)" strokeOpacity="0.1" />
                    <line x1="-150" y1="-80" x2="150" y2="-80" stroke="var(--primary-glow)" strokeOpacity="0.2" strokeDasharray="4 4" />
                    <motion.path
                        d="M -150 120 C -100 120, -50 -100, 0 80 C 50 200, 100 -50, 150 -80"
                        fill="transparent"
                        stroke="var(--color-foreground)"
                        strokeWidth="1.5"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isSchedule ? 1 : 0 }}
                        transition={{ duration: 2 }}
                    />
                    <text x="155" y="50" fill="var(--color-foreground)" fillOpacity="0.3" fontSize="10" fontFamily="monospace">Standard sinusoidal P_L(p)</text>
                    <motion.path
                        d="M -150 120 Q -50 -50, 0 -70 T 150 -80"
                        fill="transparent"
                        stroke="var(--primary-glow)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isSchedule ? 1 : 0 }}
                        transition={{ duration: 2.5, delay: 0.5 }}
                        style={{ filter: "drop-shadow(0px 0px 8px var(--primary-glow))" }}
                    />
                    <text x="0" y="-100" fill="var(--primary-glow)" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">Monotone LCU Schedule (q_n)</text>
                    <circle cx="150" cy="-80" r="4" fill="var(--primary-glow)" />
                </motion.g>

            </svg>

            {/* Context Overlays */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 max-w-[250px]">
                {isSouffle && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-red-500/80">
                        Blindly amplifying causes the probability to peak and then violently collapse.
                    </motion.div>
                )}
                {isDamping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Mathematical friction slows down the amplification exactly as it reaches the target.
                    </motion.div>
                )}
                {isBlockEncoding && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Simulating non-unitary friction inside a larger unitary operation.
                    </motion.div>
                )}
                {isLCU && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Dynamically rotating a single extra qubit to control the amount of damping.
                    </motion.div>
                )}
                {isSpeedup && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Solving the problem perfectly without paying a performance tax.
                    </motion.div>
                )}
                {isSchedule && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Monotone failure reduction (LCU) vs standard sinusoidal oscillations.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
