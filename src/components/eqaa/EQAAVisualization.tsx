"use client";

import { motion } from "framer-motion";

export function EQAAVisualization({ step }: { step: number }) {
    // Rotation logic
    // Step 0: Grover overshoot (85 degrees then skips over to 100)
    // Step 1: Introducing the tuned phase (vector at 60)
    // Step 2: Perfect alignment (vector at 90 exactly)
    // Step 3: Sustained perfection
    
    let groverAngle = 10;
    let eqaaAngle = 10;
    
    if (step === 0) {
        groverAngle = 105; // The overshoot
        eqaaAngle = 10;
    } else if (step === 1) {
        groverAngle = 105;
        eqaaAngle = 60;
    } else if (step >= 2) {
        groverAngle = 105;
        eqaaAngle = 90; // The perfect hit
    }

    const RADIUS = 180;
    const gX = RADIUS * Math.cos((groverAngle * Math.PI) / 180);
    const gY = -RADIUS * Math.sin((groverAngle * Math.PI) / 180);
    
    const eX = RADIUS * Math.cos((eqaaAngle * Math.PI) / 180);
    const eY = -RADIUS * Math.sin((eqaaAngle * Math.PI) / 180);

    const isSuccess = step >= 2;

    return (
        <div className="relative w-full h-full min-h-[450px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm">
            <svg viewBox="-240 -240 480 480" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10 pointer-events-none">
                <defs>
                    <marker id="arrowhead-grover" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="rgba(255, 0, 0, 0.4)" />
                    </marker>
                    <marker id="arrowhead-eqaa" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto">
                        <polygon points="0,0 12,5 0,10" fill="var(--primary-glow)" />
                    </marker>
                </defs>

                {/* Axes */}
                <line x1="-200" y1="0" x2="200" y2="0" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="-200" x2="0" y2="200" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="2 2" />

                <text x="190" y="20" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="end">Bad States |A₀⟩</text>
                <text x="10" y="-190" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="start">Good States |A₁⟩</text>

                {/* Target Line (90 degrees) marker */}
                <line x1="0" y1="0" x2="0" y2="-210" stroke="var(--primary-glow)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

                {/* Standard Grover (Overshot) - Only visible to show contrast */}
                <motion.line
                    x1={0} y1={0}
                    animate={{ x2: gX, y2: gY }}
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                    stroke="red"
                    strokeWidth="2"
                    strokeOpacity="0.2"
                    markerEnd="url(#arrowhead-grover)"
                />
                <motion.text
                    x={gX - 10} y={gY - 10} fill="red" fillOpacity="0.3" fontSize="10" fontFamily="monospace" textAnchor="end"
                >
                    Standard Grover (Overshot)
                </motion.text>

                {/* EQAA Vector */}
                <motion.line
                    x1={0} y1={0}
                    animate={{ x2: eX, y2: eY }}
                    transition={{ type: "spring", stiffness: 40, damping: 20 }}
                    stroke="var(--primary-glow)"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead-eqaa)"
                    style={{ filter: "drop-shadow(0px 0px 8px rgba(var(--color-primary-glow), 0.5))" }}
                />
                
                {isSuccess && (
                     <motion.circle
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        cx="0" cy="-180" r="30"
                        fill="none" stroke="var(--primary-glow)" strokeWidth="1"
                    />
                )}

                {/* Center dot */}
                <circle cx="0" cy="0" r="4" fill="var(--color-foreground)" />
            </svg>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40">
                    <div className="w-3 h-0.5 bg-red-500/40" /> Classical Limit Skip
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary-glow">
                    <div className="w-3 h-1 bg-primary-glow rounded-full" /> Exact Tune
                </div>
            </div>

            {isSuccess && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-6 left-6 px-4 py-2 bg-primary-glow/10 border border-primary-glow/30 text-primary-glow rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-md"
                >
                    Perfect 100% Alignment
                </motion.div>
            )}
        </div>
    );
}
