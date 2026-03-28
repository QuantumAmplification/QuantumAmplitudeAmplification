"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function CQAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "The Detection Problem",
            text: (
                <>
                    In standard <GlossaryTerm term="Quantum Amplitude Amplification" id="amplitude-amplification" />, we often focus on finding the state. But what if we just need to <strong>detect</strong> if a target state exists within a complex subroutine? <GlossaryTerm term="CQAA" id="cqaa" /> (2017) provides an elegant hardware-efficient shortcut.
                </>
            ),
            example: "Legacy Approach: Requires full AA iterations to boost probability. CQAA Approach: Uses a controlled circuit to create a specific mathematical symmetry.",
            equation: "U_{CQAA} = |0\\rangle\\langle 0| \\otimes I + |1\\rangle\\langle 1| \\otimes U"
        },
        {
            title: "Controlled Architecture",
            text: (
                <>
                    By adding a single <strong>Control Qubit</strong> to the oracle or subroutine <InlineMath math="U" />, we change the fundamental physics of the system. Instead of simply magnifying waves, we are now looking for the <strong>(+1)-eigenvector</strong> of the combined operation.
                </>
            ),
            example: "Hardware: This requires the ability to turn a standard quantum operator into a controlled one, which is a standard primitive in modern cross-platform quantum computing.",
            equation: "|U_0\\rangle = \\frac{1}{\\sqrt{2}}(|0, init_{\\perp}\\rangle - |\\tilde{1}, g\\rangle)"
        },
        {
            title: "Constant Overlap Secret",
            text: (
                <>
                    The magic of CQAA is that this specific eigenvector <InlineMath math="|U_0\rangle" /> is guaranteed to contain the target state <InlineMath math="|g\rangle" /> with a <strong>constant overlap of exactly 1/2</strong>, regardless of the initial search space size.
                </>
            ),
            example: "Impact: You don't need to know the initial probability 'p' or the number of targets. Detection becomes a fixed-cost operation rather than a variable-iteration search.",
            equation: "|\\langle g | U_0 \\rangle|^2 = 1/2"
        },
        {
            title: "Efficiency Gains",
            text: (
                <>
                    Because the overlap is constant (50%), we can detect the target state with high probability using only a few measurements, bypassing the need for the deep iteration counts required by Grover or FPAA in certain detection-heavy tasks.
                </>
            ),
            example: "Survey Note: Table VI highlights CQAA as the best choice for 'Detection-first' pipelines where overshoot susceptibility is less critical than setup time.",
            equation: "P(g|U_0) = 0.5"
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
                    <h3 className="text-3xl font-light tracking-tight text-foreground/90 font-serif italic">
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
