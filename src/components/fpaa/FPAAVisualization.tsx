"use client";

import { motion } from "framer-motion";

export function FPAAVisualization({ step }: { step: number }) {
    // If we are in the first two steps, show the Souffle Problem probability curve
    if (step < 2) {
        return <LineGraph step={step} />;
    }
    // If we are in step 3 or later, show the geometric State Vector visualizing the "brakes"
    return <VectorGraph step={step} />;
}

// -------------------------------------------------------------------------------------------------
// 1) PROBABILITY GRAPH (STEPS 0 & 1)
// -------------------------------------------------------------------------------------------------
function LineGraph({ step }: { step: number }) {
    const width = 450;
    const height = 450;
    const padding = 60;

    const graphWidth = width - (padding * 2);
    const graphHeight = height - (padding * 2);

    const iterMax = 30;
    const pointsGrover = [];
    const pointsFPAA = [];

    // Simulate Grover curve: sin^2(c * x)
    for (let i = 0; i <= iterMax; i++) {
        const prob = Math.pow(Math.sin(i * 0.25), 2);
        const x = padding + (i / iterMax * graphWidth);
        const y = padding + graphHeight - (prob * graphHeight);
        pointsGrover.push(`${x},${y}`);
    }

    // Simulate FPAA curve (plateaus near 1 after a certain point)
    for (let i = 0; i <= iterMax; i++) {
        let prob = 0;
        if (i < 8) {
            prob = Math.pow(Math.sin(i * 0.15), 2);
        } else {
            prob = 0.95 + (Math.sin(i * 1.5) * 0.02);
        }
        const x = padding + (i / iterMax * graphWidth);
        const y = padding + graphHeight - (prob * graphHeight);
        pointsFPAA.push(`${x},${y}`);
    }

    const showGrover = step >= 0;
    const showFPAA = step >= 1;

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm">
            <svg width="450" height="450" viewBox="0 0 450 450" className="overflow-visible z-10 pointer-events-none">
                {/* Axes Background Grid */}
                <line x1={padding} y1={padding + graphHeight} x2={padding + graphWidth} y2={padding + graphHeight} stroke="var(--axis-color)" strokeWidth="1" />
                <line x1={padding} y1={padding} x2={padding} y2={padding + graphHeight} stroke="var(--axis-color)" strokeWidth="1" />

                <line x1={padding} y1={padding} x2={padding + graphWidth} y2={padding} stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                <text x={padding - 10} y={padding + 4} fill="var(--color-foreground)" fillOpacity="0.5" fontSize="11" fontFamily="sans-serif" textAnchor="end">1.0 (100%)</text>
                <text x={padding - 10} y={padding + graphHeight + 4} fill="var(--color-foreground)" fillOpacity="0.5" fontSize="11" fontFamily="sans-serif" textAnchor="end">0.0</text>

                <text x={padding + (graphWidth / 2)} y={padding + graphHeight + 25} fill="var(--color-foreground)" fillOpacity="0.8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Number of Iterations (k / L)</text>

                <g transform={`translate(${padding - 40}, ${padding + (graphHeight / 2)})`}>
                    <text x="0" y="0" transform="rotate(-90)" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Success Probability</text>
                </g>

                <motion.polyline
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: showGrover ? 1 : 0, opacity: showGrover ? (showFPAA ? 0.2 : 0.8) : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    points={pointsGrover.join(" ")}
                    fill="none" stroke="var(--color-foreground)" strokeWidth="2" strokeDasharray="4 4"
                />

                <motion.polyline
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: showFPAA ? 1 : 0, opacity: showFPAA ? 1 : 0 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                    points={pointsFPAA.join(" ")}
                    fill="none" stroke="var(--primary-glow)" strokeWidth="3"
                    style={{ filter: "drop-shadow(0px 0px 8px rgba(var(--color-primary-glow), 0.5))" }}
                />
            </svg>

            <div className="absolute top-6 right-6 flex flex-col gap-2 text-xs font-mono">
                <div className={`flex items-center gap-2 transition-opacity ${showGrover ? (showFPAA ? 'opacity-40' : 'opacity-100') : 'opacity-0'}`}>
                    <div className="w-3 h-0.5 bg-foreground border border-foreground border-dashed" /> Standard Grover
                </div>
                <div className={`flex items-center gap-2 transition-opacity ${showFPAA ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-3 h-1 bg-primary-glow rounded-full shadow-[0_0_5px_rgba(var(--color-primary-glow),0.5)]" /> YLC Fixed-Point
                </div>
            </div>
        </div>
    );
}

// -------------------------------------------------------------------------------------------------
// 2) STATE VECTOR GRAPH (STEPS 2, 3, 4)
// -------------------------------------------------------------------------------------------------
function VectorGraph({ step }: { step: number }) {
    // Step 2: Varying angles (arrow is rotating up smoothly)
    // Step 3: Chebyshev Squeeze (arrow is very close to 90, actively being constrained)
    // Step 4: Stable convergence (arrow locks perfectly at 90, impossible to overshoot)
    let targetAngle = 10;
    if (step === 2) targetAngle = 50;
    if (step === 3) targetAngle = 82;
    if (step >= 4) targetAngle = 90;

    const RADIUS = 180;
    const vectorX = RADIUS * Math.cos((targetAngle * Math.PI) / 180);
    const vectorY = -RADIUS * Math.sin((targetAngle * Math.PI) / 180);

    const origX = RADIUS * Math.cos((10 * Math.PI) / 180);
    const origY = -RADIUS * Math.sin((10 * Math.PI) / 180);

    const isSuccess = step >= 4;

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

                <text x="190" y="20" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="end">Bad States |A₀⟩</text>
                <text x="10" y="-190" fill="var(--color-foreground)" fillOpacity="0.8" fontSize="14" fontFamily="sans-serif" textAnchor="start">Good States |A₁⟩</text>

                {/* Danger Zone: Standard Grover Overshoot */}
                <path d="M 0 -200 A 200 200 0 0 0 -180 -85" fill="none" stroke="red" strokeWidth="2" strokeOpacity="0.15" strokeDasharray="4 4" />
                <text x="-30" y="-140" fill="red" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif" textAnchor="end">Grover Overshoot Zone</text>

                {/* Original State |A> */}
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

                {/* Current State Vector line: Notice the heavily damped spring physics! */}
                <motion.line
                    x1={0} y1={0}
                    animate={{ x2: vectorX, y2: vectorY }}
                    // We use stiff damping to reflect the mathematical 'brakes' engaging
                    transition={{ type: "spring", stiffness: 20, damping: 25 }}
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
                    Braked Exactly at 90°
                </motion.div>
            )}
        </div>
    );
}
