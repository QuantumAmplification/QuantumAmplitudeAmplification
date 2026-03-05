"use client";

import { motion } from "framer-motion";

export function QSVTVisualization({ step }: { step: number }) {
    // Step 0: Matrices A to U Paradigm Shift
    // Step 1: Block Encoding
    // Step 2: Main QSVT Theorem (Alternating U, R, U-dagger)
    // Step 3: Polynomial Zoo Output
    // Step 4: Optimal Scaling Bounds

    const isParadigmShift = step === 0;
    const isBlockEncoding = step === 1;
    const isTheorem = step === 2;
    const isZoo = step === 3;
    const isOptimal = step === 4;

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm p-8">
            <svg viewBox="-200 -200 400 400" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10">

                {/* Step 0: The Big Idea: Functions on Matrices */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isParadigmShift ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <rect x="-120" y="-40" width="80" height="80" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" stroke="var(--color-foreground)" strokeWidth="2" strokeOpacity="0.5" />
                    <text x="-80" y="8" fill="var(--color-foreground)" fontSize="24" fontFamily="sans-serif" textAnchor="middle">A</text>
                    <text x="-80" y="65" fill="var(--color-foreground)" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.6">DATA</text>

                    <path d="M -30 0 L 30 0 L 20 -10 M 30 0 L 20 10" fill="transparent" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="0" y="-15" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">apply f(x)</text>

                    <rect x="40" y="-40" width="80" height="80" rx="8" fill="var(--primary-glow)" fillOpacity="0.1" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="80" y="8" fill="var(--primary-glow)" fontSize="24" fontStyle="italic" fontFamily="sans-serif" textAnchor="middle">f(A)</text>
                    <text x="80" y="65" fill="var(--primary-glow)" fontSize="12" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">RESULT</text>
                </motion.g>

                {/* Step 1: Block Encoding */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isBlockEncoding ? 1 : 0, scale: isBlockEncoding ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* The large Unitary U */}
                    <rect x="-110" y="-110" width="220" height="220" rx="12" fill="var(--color-foreground)" fillOpacity="0.02" stroke="var(--primary-glow)" strokeWidth="2" strokeDasharray="6 6" />
                    <text x="0" y="-125" fill="var(--primary-glow)" fontSize="18" fontFamily="sans-serif" textAnchor="middle">Quantum Operation (Unitary U)</text>

                    {/* The small embedded A */}
                    <rect x="-110" y="-110" width="100" height="100" rx="12" fill="var(--primary-glow)" fillOpacity="0.2" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="-60" y="-55" fill="var(--primary-glow)" fontSize="24" fontFamily="sans-serif" textAnchor="middle">Data A</text>

                    {/* The "Garbage" zones */}
                    <rect x="-5" y="-110" width="115" height="100" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" />
                    <text x="52" y="-55" fill="var(--color-foreground)" opacity="0.5" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Garbage</text>

                    <rect x="-110" y="-5" width="100" height="115" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" />
                    <text x="-60" y="52" fill="var(--color-foreground)" opacity="0.5" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Garbage</text>

                    <rect x="-5" y="-5" width="115" height="115" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" />
                    <text x="52" y="52" fill="var(--color-foreground)" opacity="0.5" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Garbage</text>
                </motion.g>

                {/* Step 2: Processing the Signal */}
                <motion.g
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isTheorem ? 1 : 0, x: isTheorem ? 0 : -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <line x1="-180" y1="0" x2="180" y2="0" stroke="var(--primary-glow)" strokeWidth="3" strokeOpacity="0.3" />

                    {/* Sequence blocks */}
                    {[-120, -40, 40, 120].map((x, i) => (
                        <motion.g key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                            <rect x={x - 24} y="-36" width="48" height="72" rx="8" fill="var(--color-foreground)" fillOpacity={0.05} stroke="var(--color-foreground)" strokeWidth="2" />
                            <text x={x} y="6" fill="var(--color-foreground)" fontSize="18" fontFamily="sans-serif" textAnchor="middle">{i % 2 === 1 ? "U†" : "U"}</text>

                            {/* R_phi blocks between */}
                            {i < 3 && (
                                <g transform={`translate(${x + 40}, 0)`}>
                                    <circle cx="0" cy="0" r="18" fill="var(--background)" stroke="var(--primary-glow)" strokeWidth="2" />
                                    <text x="0" y="4" fill="var(--primary-glow)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Rot</text>
                                </g>
                            )}
                        </motion.g>
                    ))}
                    <text x="185" y="6" fill="var(--primary-glow)" fontSize="20" fontFamily="sans-serif" textAnchor="start">...</text>

                    <motion.path
                        d="M -180 80 Q -100 120 0 80 T 180 80"
                        fill="transparent"
                        stroke="var(--primary-glow)"
                        strokeWidth="3"
                        strokeOpacity="0.5"
                        strokeDasharray="6 6"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <text x="0" y="110" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Sculpting the polynomial shape</text>
                </motion.g>

                {/* Step 3: One Algorithm To Rule Them All */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isZoo ? 1 : 0, scale: isZoo ? 1 : 0.8 }}
                    transition={{ duration: 0.6 }}
                >
                    <rect x="-60" y="-30" width="120" height="60" rx="12" fill="var(--color-foreground)" fillOpacity="0.05" stroke="var(--color-foreground)" strokeWidth="2" />
                    <text x="0" y="6" fill="var(--color-foreground)" fontSize="18" fontFamily="sans-serif" textAnchor="middle">QSVT Engine</text>

                    {/* Search (Step) */}
                    <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }}>
                        <path d="M -160 -80 L -120 -80 L -120 -40 L -80 -40" fill="transparent" stroke="var(--primary-glow)" strokeWidth="3" />
                        <text x="-120" y="-95" fill="var(--primary-glow)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Search</text>
                        <path d="M -110 -50 L -70 -20" fill="transparent" stroke="var(--color-foreground)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                    </motion.g>

                    {/* Simulation (Wave) */}
                    <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
                        <path d="M -20 -80 Q 0 -100 20 -80 T 60 -80" fill="transparent" stroke="var(--primary-glow)" strokeWidth="3" />
                        <text x="20" y="-95" fill="var(--primary-glow)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Simulation</text>
                        <path d="M 20 -60 L 0 -30" fill="transparent" stroke="var(--color-foreground)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                    </motion.g>

                    {/* Inversion (1/x) */}
                    <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}>
                        <path d="M 100 -40 Q 110 -40 110 -80" fill="transparent" stroke="var(--primary-glow)" strokeWidth="3" />
                        <text x="120" y="-95" fill="var(--primary-glow)" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Inversion</text>
                        <path d="M 105 -50 L 70 -20" fill="transparent" stroke="var(--color-foreground)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                    </motion.g>

                    <rect x="-100" y="80" width="200" height="40" rx="8" fill="var(--primary-glow)" fillOpacity="0.1" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="0" y="105" fill="var(--primary-glow)" fontSize="16" fontFamily="sans-serif" textAnchor="middle">Different Apps, Same Hardware</text>
                </motion.g>

                {/* Step 4: The Ultimate Limit */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOptimal ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <circle cx="0" cy="-20" r="80" fill="var(--primary-glow)" fillOpacity="0.05" stroke="var(--primary-glow)" strokeWidth="2" strokeDasharray="8 8" />
                    <text x="0" y="-30" fill="var(--primary-glow)" fontSize="40" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">1</text>
                    <text x="0" y="10" fill="var(--color-foreground)" opacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">EXTRA QUBIT</text>

                    <rect x="-120" y="80" width="240" height="40" rx="8" fill="var(--color-foreground)" fillOpacity="0.05" stroke="var(--color-foreground)" strokeWidth="1" />
                    <text x="0" y="105" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Provably Optimal Time Complexity</text>
                </motion.g>

            </svg>

            {/* Context Overlays */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 max-w-[250px]">
                {isParadigmShift && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-foreground/50">
                        Applying a mathematical function directly to a data matrix.
                    </motion.div>
                )}
                {isBlockEncoding && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Hiding non-unitary data inside a larger quantum operation.
                    </motion.div>
                )}
                {isTheorem && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Alternating operations &quot;sculpt&quot; the desired polynomial function.
                    </motion.div>
                )}
                {isZoo && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Same exact hardware, just different mathematical shapes.
                    </motion.div>
                )}
                {isOptimal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Saturating the absolute physical limits of computation.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
