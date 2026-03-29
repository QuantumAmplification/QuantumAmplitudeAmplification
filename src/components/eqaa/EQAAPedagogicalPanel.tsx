"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function EQAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "Solving the Overshoot",
            text: (
                <>
                    In standard Grover's algorithm, each rotation is a fixed size (usually 180° flips). Because of this, the vector often skips <em>over</em> the perfect 90° target, like a car that can only move in 10-meter increments trying to park exactly on a line. This leads to the <GlossaryTerm term="Soufflé Problem" id="souffle-problem" />.
                </>
            ),
            example: (
                <>
                    Analogy: Imagine a clock that only has an hour hand. You can't point to exactly 3:30; you'll always be slightly before or after it.
                </>
            ),
            equation: "P_{success} = \\sin^2((2k+1)\\theta) < 1.0"
        },
        {
            title: "The Phase-Flip Lever",
            text: (
                <>
                    <GlossaryTerm term="Exact Quantum Amplitude Amplification (EQAA)" id="eqaa" /> fixes this by changing the <strong>size</strong> of the final rotation. Instead of a hard 180° flip, we use a specifically tuned angle <InlineMath math="\phi" />. This acts like a steering wheel that can make tiny, precise adjustments as we approach the target.
                </>
            ),
            example: (
                <>
                    Real Life: It's the difference between a light switch (On/Off) and a dimmer switch. We can dim the final rotation to land exactly where we want.
                </>
            ),
            equation: "\\phi = 2 \\arcsin\\left(\\frac{1}{\\sin((2k+1)\\theta)}\\right)"
        },
        {
            title: "The Perfect Hit",
            text: (
                <>
                    By calculating the phase <InlineMath math="\phi" /> based on the initial state, we can guarantee a <strong>100% success probability</strong>. The vector doesn't just get close—it aligns perfectly with the vertical axis. We no longer need to worry about 'over-baking' the quantum state.
                </>
            ),
            example: (
                <>
                    Result: A mathematical guarantee. If you run the algorithm exactly <InlineMath math="k" /> times with phase <InlineMath math="\phi" />, you will find the answer every single time.
                </>
            ),
            equation: "P_{success} \\equiv 1.0"
        },
        {
            title: "Efficiency & Precision",
            text: (
                <>
                    EQAA is just as fast as Grover's algorithm but provides much higher reliability for specific tasks like quantum cryptography or exact search. It shows that quantum algorithms can be both fast <em>and</em> perfectly precise if we control the phases with enough care.
                </>
            ),
            example: (
                <>
                    Conclusion: We've upgraded from a 'high-probability' tool to a 'deterministic' solution, all by refining our control over quantum interference.
                </>
            ),
            equation: "N_{steps} \\approx \\frac{\\pi}{4\\theta}"
        }
    ];

    const current = STEPS[step];
    const isFirst = step === 0;
    const isFinal = step === STEPS.length - 1;

    return (
        <div className="flex flex-col h-full justify-between w-full max-w-lg relative z-20 bg-foreground/[0.01] p-8 rounded-3xl border border-foreground/5 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-primary-glow shadow-[0_0_8px_rgba(var(--color-primary-glow),0.8)]" : "bg-foreground/10"}`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col gap-6 flex-1 min-h-[350px]"
                >
                    <h3 className="text-3xl font-light tracking-tight text-foreground/90">
                        {current.title}
                    </h3>

                    <div className="text-base text-foreground/70 leading-relaxed font-light">
                        {current.text}
                    </div>

                    {current.example && (
                        <div className="p-4 rounded-xl bg-primary-glow/[0.05] border border-primary-glow/20 text-sm font-light leading-relaxed text-foreground/80 italic shadow-[0_0_15px_rgba(var(--color-primary-glow),0.05)]">
                            {current.example}
                        </div>
                    )}

                    {current.equation && (
                        <div className="mt-auto p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5 text-primary-glow shadow-[0_0_15px_rgba(var(--color-primary-glow),0.05)] w-full overflow-x-auto text-sm">
                            <BlockMath math={current.equation} />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="pt-8 mt-6 border-t border-foreground/5 flex items-center justify-between">
                <button
                    onClick={() => !isFirst && setStep(step - 1)}
                    disabled={isFirst}
                    className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${isFirst ? 'opacity-30 cursor-not-allowed' : 'bg-foreground/5 hover:bg-foreground/10 active:scale-95 text-foreground'}`}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono uppercase tracking-widest text-foreground/40">
                    Step {step + 1} of {STEPS.length}
                </div>

                <button
                    onClick={() => !isFinal && setStep(step + 1)}
                    disabled={isFinal}
                    className={`group relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ${isFinal ? 'opacity-30 cursor-not-allowed' : 'bg-primary-glow text-background hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--color-primary-glow),0.4)]'}`}
                >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}
