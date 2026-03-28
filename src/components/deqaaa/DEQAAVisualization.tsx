"use client";

import { motion } from "framer-motion";

export function DEQAAVisualization({ step }: { step: number }) {
    // Step 0: Initial low probabilities across nodes
    // Step 1: Phase 1 - Local Exact EQ_j (each node hits its local 1.0)
    // Step 2: Phase 2 - Global Exact (Final stitching to global 1.0)
    // Step 3: Success!

    const nodes = [
        { id: 1, p: step === 0 ? 0.2 : 1.0 },
        { id: 2, p: step === 0 ? 0.35 : 1.0 },
        { id: 3, p: step === 0 ? 0.15 : 1.0 },
    ];

    const globalP = step < 2 ? 0.4 : 1.0;

    return (
        <div className="relative w-full h-full min-h-[450px] flex flex-col items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm p-10">
            
            {/* Local Nodes Grid */}
            <div className="grid grid-cols-3 gap-8 mb-16 w-full max-w-sm">
                {nodes.map((node) => (
                    <div key={node.id} className="flex flex-col items-center gap-4">
                        <div className="relative w-12 h-40 bg-foreground/5 rounded-2xl border border-foreground/10 overflow-hidden">
                            <motion.div
                                initial={{ height: "0%" }}
                                animate={{ height: `${node.p * 100}%` }}
                                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                className={`absolute bottom-0 w-full rounded-t-xl ${node.p === 1 ? 'bg-primary-glow shadow-[0_0_15px_rgba(var(--color-primary-glow),0.5)]' : 'bg-foreground/20'}`}
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-tighter opacity-40 font-mono">Node {node.id}</div>
                    </div>
                ))}
            </div>

            {/* Global Aggregator Path */}
            <div className="relative w-full flex items-center justify-center mb-8">
                <svg width="200" height="40" viewBox="0 0 200 40" className="opacity-20 translate-y-[-10px]">
                    <motion.path
                        d="M 30 0 Q 100 40 170 0"
                        fill="transparent"
                        stroke="var(--color-foreground)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                </svg>
                <div className="absolute -top-4 text-[10px] uppercase tracking-[0.2em] opacity-30">Global Stitching</div>
            </div>

            {/* Global Success Bar */}
            <div className="w-full max-w-xs flex flex-col items-center gap-4">
                <div className="relative w-full h-12 bg-foreground/5 rounded-2xl border border-foreground/10 overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${globalP * 100}%` }}
                        transition={{ type: "spring", stiffness: 40, damping: 20, delay: step === 2 ? 0.5 : 0 }}
                        className={`absolute left-0 h-full rounded-r-xl transition-colors duration-500 ${globalP === 1 ? 'bg-primary-glow shadow-[0_0_20px_rgba(var(--color-primary-glow),0.6)]' : 'bg-foreground/30'}`}
                    />
                    {step >= 2 && (
                         <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-white/20"
                         />
                    )}
                </div>
                <div className="flex justify-between w-full px-2">
                    <div className="text-[10px] uppercase tracking-widest opacity-40 font-semibold">Total System Probability</div>
                    <div className="text-xs font-mono text-primary-glow">{Math.round(globalP * 100)}%</div>
                </div>
            </div>

            {/* Step Indicators */}
            <div className="absolute bottom-6 right-8 flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.2em] font-mono">
                <div className={`flex items-center gap-2 transition-opacity ${step >= 1 ? 'opacity-100 text-primary-glow' : 'opacity-20'}`}>
                    <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-primary-glow shadow-[0_0_5px_var(--primary-glow)]' : 'bg-foreground'}`} /> Phase 1: Local EQ
                </div>
                <div className={`flex items-center gap-2 transition-opacity ${step >= 2 ? 'opacity-100 text-primary-glow' : 'opacity-20'}`}>
                    <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-primary-glow shadow-[0_0_5px_var(--primary-glow)]' : 'bg-foreground'}`} /> Phase 2: Global EQ
                </div>
            </div>

            {/* Hardware Label */}
            <div className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 text-[9px] uppercase tracking-widest opacity-40">
                Network Architecture: 2026 Survey
            </div>
        </div>
    );
}
