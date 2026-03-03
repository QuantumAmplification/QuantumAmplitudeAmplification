"use client";

import { motion } from "framer-motion";

export function VTAAVisualization({ step }: { step: number }) {
    // Stage 1: The Worst-Case Tax. All tasks (fast and slow) move together to the very end of the line.
    // Stage 2: Bookkeeping Clock. The timeline is split into stages.
    // Stage 3 & 4: Staged Amplification & Guarantee. Fast tasks drop down into a "Success" bucket early. Slow tasks continue.

    const isWorstCase = step === 0;
    const showStages = step >= 1;
    const doStagedExtraction = step >= 2;

    const pipelineWidth = 350;
    const startX = -175;

    // We have 4 tasks. Task 1 finishes at stage 1, Task 2 at stage 2, Task 3 & 4 at stage 3.
    const tasks = [
        { id: 1, color: "var(--primary-glow)", finishStage: 1, yOffset: -30 },
        { id: 2, color: "var(--color-foreground)", finishStage: 2, yOffset: -10 },
        { id: 3, color: "var(--color-foreground)", opacity: 0.6, finishStage: 3, yOffset: 10 },
        { id: 4, color: "var(--color-foreground)", opacity: 0.4, finishStage: 3, yOffset: 30 },
    ];

    const getXForTask = (task: any) => {
        if (isWorstCase) {
            // In worst case, ALL tasks go to the very end of the line (Stage 3).
            return startX + pipelineWidth;
        }
        if (doStagedExtraction) {
            // In staged extraction, they stop at their respective finish stages.
            return startX + ((task.finishStage / 3) * pipelineWidth);
        }
        // In step 1 (Bookkeeping), they just wait at the start while the grid overlays.
        return startX;
    };

    const getYForTask = (task: any) => {
        if (doStagedExtraction) {
            // "Drop down" into the success bucket
            return task.yOffset + 80;
        }
        return task.yOffset;
    };

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-background/50 rounded-3xl border border-foreground/10 overflow-hidden shadow-sm">
            <svg viewBox="-240 -150 480 300" className="w-full h-full max-w-[450px] max-h-[450px] overflow-visible z-10 pointer-events-none">

                {/* Master Timeline Axis */}
                <line x1={startX} y1="0" x2={startX + pipelineWidth} y2="0" stroke="var(--axis-color)" strokeWidth="1" strokeDasharray="4 4" />
                <text x={startX} y="-60" fill="var(--color-foreground)" fillOpacity="0.5" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Start</text>

                {/* Worst Case Timer Line */}
                <line x1={startX + pipelineWidth} y1="-50" x2={startX + pipelineWidth} y2="100" stroke="red" strokeWidth="2" strokeOpacity={isWorstCase ? 0.4 : 0.1} strokeDasharray="2 2" />
                <text x={startX + pipelineWidth} y="-60" fill="red" fillOpacity={isWorstCase ? 0.8 : 0.3} fontSize="12" fontFamily="sans-serif" textAnchor="middle">Worst-Case Timer</text>

                {/* The Bookkeeping Stages */}
                {showStages && (
                    <>
                        <line x1={startX + (pipelineWidth / 3)} y1="-40" x2={startX + (pipelineWidth / 3)} y2="100" stroke="var(--primary-glow)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
                        <text x={startX + (pipelineWidth / 3)} y="-50" fill="var(--primary-glow)" fillOpacity="0.8" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Stage 1 Clock</text>

                        <line x1={startX + (2 * pipelineWidth / 3)} y1="-40" x2={startX + (2 * pipelineWidth / 3)} y2="100" stroke="var(--color-foreground)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2" />
                        <text x={startX + (2 * pipelineWidth / 3)} y="-50" fill="var(--color-foreground)" fillOpacity="0.5" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Stage 2 Clock</text>
                    </>
                )}

                {/* Success Bucket Base Line */}
                {doStagedExtraction && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <rect x={startX} y="80" width={pipelineWidth} height="40" fill="url(#successGradient)" opacity="0.1" rx="8" />
                        <text x="0" y="115" fill="var(--primary-glow)" fillOpacity="0.6" fontSize="12" fontStyle="italic" fontFamily="sans-serif" textAnchor="middle">
                            Early-Abort "Success" Extraction Zone
                        </text>
                    </motion.g>
                )}

                <defs>
                    <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="100%" stopColor="var(--primary-glow)" />
                    </linearGradient>
                </defs>

                {/* Tasks Racing */}
                {tasks.map((task) => (
                    <motion.circle
                        key={task.id}
                        r="6"
                        fill={task.color}
                        opacity={task.opacity || 1}
                        initial={{ cx: startX, cy: task.yOffset }}
                        animate={{
                            cx: getXForTask(task),
                            cy: getYForTask(task)
                        }}
                        transition={{
                            cx: { duration: isWorstCase ? 3 : (task.finishStage), ease: "linear" },
                            cy: { duration: 0.8, delay: task.finishStage - 0.2, type: "spring" } // Drop down right as it hits the stage line
                        }}
                        style={task.id === 1 ? { filter: "drop-shadow(0px 0px 8px var(--primary-glow))" } : {}}
                    />
                ))}

            </svg>

            {/* Context Overlays */}
            <div className="absolute top-6 left-6 flex flex-col gap-1 max-w-[200px]">
                {isWorstCase && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-red-500/80">
                        Warning: All tasks waiting for the slowest branch.
                    </motion.div>
                )}
                {doStagedExtraction && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-mono text-primary-glow">
                        Optimization: Faster tasks extracted safely at early stages. Average time reduced.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
