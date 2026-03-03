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

                {/* Step 0: Paradigm Shift - f(A) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isParadigmShift ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <rect x="-60" y="-60" width="120" height="120" rx="10" fill="transparent" stroke="var(--color-foreground)" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="4 4" />
                    <text x="0" y="-10" fill="var(--color-foreground)" fontSize="30" fontStyle="italic" fontFamily="sans-serif" textAnchor="middle">A</text>
                    <text x="0" y="30" fill="var(--primary-glow)" fontSize="16" fontFamily="sans-serif" textAnchor="middle">P(x) ≈ f(x)</text>
                </motion.g>

                {/* Step 1: Block Encoding */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isBlockEncoding ? 1 : 0, scale: isBlockEncoding ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* The large Unitary U */}
                    <rect x="-100" y="-100" width="200" height="200" rx="8" fill="transparent" stroke="var(--primary-glow)" strokeWidth="2" />
                    <text x="-70" y="-115" fill="var(--primary-glow)" fontSize="24" fontFamily="sans-serif" textAnchor="middle">U</text>

                    {/* The small embedded A */}
                    <rect x="-100" y="-100" width="80" height="80" rx="8" fill="var(--primary-glow)" fillOpacity="0.2" stroke="var(--primary-glow)" strokeWidth="1" />
                    <text x="-60" y="-50" fill="var(--primary-glow)" fontSize="20" fontFamily="sans-serif" textAnchor="middle">A/α</text>

                    {/* The rest of the matrix (ancilla garbage) */}
                    <circle cx="40" cy="-60" r="3" fill="var(--color-foreground)" opacity="0.3" />
                    <circle cx="60" cy="-60" r="3" fill="var(--color-foreground)" opacity="0.3" />
                    <circle cx="80" cy="-60" r="3" fill="var(--color-foreground)" opacity="0.3" />

                    <circle cx="-60" cy="40" r="3" fill="var(--color-foreground)" opacity="0.3" />
                    <circle cx="-60" cy="60" r="3" fill="var(--color-foreground)" opacity="0.3" />
                    <circle cx="-60" cy="80" r="3" fill="var(--color-foreground)" opacity="0.3" />

                    <circle cx="40" cy="40" r="3" fill="var(--color-foreground)" opacity="0.3" />
                    <circle cx="60" cy="60" r="3" fill="var(--color-foreground)" opacity="0.3" />
                    <circle cx="80" cy="80" r="3" fill="var(--color-foreground)" opacity="0.3" />
                </motion.g>

                {/* Step 2: The Main QSVT Theorem (Alternating sequence) */}
                <motion.g
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isTheorem ? 1 : 0, x: isTheorem ? 0 : -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <line x1="-180" y1="0" x2="180" y2="0" stroke="var(--color-foreground)" strokeWidth="2" strokeOpacity="0.2" />

                    {/* Sequence blocks */}
                    {[-100, -20, 60].map((x, i) => (
                        <motion.g key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        >
                            <rect x={x - 20} y="-40" width="40" height="80" rx="4" fill={i % 2 === 0 ? "var(--primary-glow)" : "var(--color-foreground)"} fillOpacity={i % 2 === 0 ? 0.2 : 0.1} stroke={i % 2 === 0 ? "var(--primary-glow)" : "var(--color-foreground)"} strokeWidth="2" strokeOpacity={0.8} />
                            <text x={x} y="5" fill={i % 2 === 0 ? "var(--primary-glow)" : "var(--color-foreground)"} fontSize="14" fontFamily="sans-serif" textAnchor="middle">{i === 1 ? "U†" : "U"}</text>

                            {/* R_phi blocks between */}
                            {i < 2 && (
                                <g transform={`translate(${x + 40}, 0)`}>
                                    <circle cx="0" cy="0" r="15" fill="var(--background)" stroke="var(--primary-glow)" strokeWidth="1" strokeDasharray="2 2" />
                                    <text x="0" y="4" fill="var(--primary-glow)" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Rφ</text>
                                </g>
                            )}
                        </motion.g>
                    ))}
                    <text x="140" y="5" fill="var(--primary-glow)" fontSize="20" fontFamily="sans-serif" textAnchor="middle">...</text>
                </motion.g>

                {/* Step 3: Polynomial Zoo */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isZoo ? 1 : 0, scale: isZoo ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Coordinate system */}
                    <line x1="-120" y1="80" x2="120" y2="80" stroke="var(--axis-color)" strokeWidth="1" />
                    <line x1="0" y1="-80" x2="0" y2="120" stroke="var(--axis-color)" strokeWidth="1" />

                    {/* Animated Polynomial approximation of sgn(x) curve */}
                    <motion.path
                        d="M -100 120 C -60 120, -20 120, -5 80 C 0 0, 5 40, 20 40 C 60 40, 100 40, 120 40"
                        fill="transparent"
                        stroke="var(--primary-glow)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isZoo ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0px 0px 8px var(--primary-glow))" }}
                    />

                    {/* Ideal sgn(x) step function behind it */}
                    <path
                        d="M -100 120 L 0 120 L 0 40 L 120 40"
                        fill="transparent"
                        stroke="var(--color-foreground)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.5"
                    />

                    <text x="-80" y="-40" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">P(x) ≈ sgn(x)</text>
                </motion.g>

                {/* Step 4: Optimal Bounds */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOptimal ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <rect x="-100" y="-60" width="200" height="120" rx="16" fill="var(--primary-glow)" fillOpacity="0.05" stroke="var(--primary-glow)" strokeWidth="1" strokeDasharray="4 4" />

                    <text x="0" y="-20" fill="var(--primary-glow)" fontSize="24" fontFamily="sans-serif" textAnchor="middle">O(1)</text>
                    <text x="0" y="5" fill="var(--color-foreground)" opacity="0.7" fontSize="12" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2">ANCILLA QUBITS</text>

                    <text x="0" y="35" fill="var(--primary-glow)" fontSize="14" fontFamily="sans-serif" textAnchor="middle">t + log(1/ε)</text>
                    <text x="0" y="50" fill="var(--color-foreground)" opacity="0.7" fontSize="10" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">TIME COMPLEXITY</text>
                </motion.g>

            </svg>

            {/* Context Overlays */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 max-w-[200px]">
                {isParadigmShift && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-foreground/50">
                        Algorithms redefined as polynomial transformations of singular values.
                    </motion.div>
                )}
                {isBlockEncoding && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Data Ingestion: Embedding classical matrices into quantum unitaries.
                    </motion.div>
                )}
                {isTheorem && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Alternating Operator Sequence computing P(x) in parallel.
                    </motion.div>
                )}
                {isZoo && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Grover search synthesized via a steep odd polynomial approximating the sign function.
                    </motion.div>
                )}
                {isOptimal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Saturating information-theoretic lower bounds.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
