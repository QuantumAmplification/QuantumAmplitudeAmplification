"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function VTAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "The Worst-Case Tax",
            text: (
                <>
                    Imagine an algorithm where different paths finish at different times. Some are easy, some are incredibly hard. Standard Grover treats the entire algorithm as a single "black box". To guarantee success, Grover forces you to wait for the absolutely <em>slowest, hardest path</em> to finish before you can look at the answer. This creates a massive <GlossaryTerm term="Worst-Case Complexity" id="worst-case" /> tax.
                </>
            ),
            example: "Real Life: A teacher gives an entire classroom two hours to finish a test, because that's what the slowest student needs. Even if half the students finish in 5 minutes, they are forced to sit at their desks in silence until the full two hours expire.",
            equation: "\\text{Cost}_{\\text{Grover}} = \\mathcal{O} \\left( \\frac{T_{max}}{\\sqrt{p_s}} \\right)"
        },
        {
            title: "The Bookkeeping Clock",
            text: (
                <>
                    Variable-Time Amplitude Amplification (VTAA) solves this by splitting the quantum process into progressive <strong>Stages</strong> ($j = 1, \\dots, m$). It attaches a <GlossaryTerm term="Clock Register" id="clock-register" /> ($|j\\rangle$) to the data. At every stage, the algorithm checks the clock and flags paths into three categories: Success ($|s\\rangle$), Failure ($|f\\rangle$), or Continue Processing ($|c\\rangle$).
                </>
            ),
            example: "Real Life: The teacher breaks the test into 15-minute intervals. Every 15 minutes, the teacher walks around the room. If a student is done (Success flag), they are allowed to leave the room. If not (Continue flag), they keep working.",
            equation: "A|0\\rangle = \\sum_{j=1}^m |j\\rangle \\left( \\sqrt{p^{(j)}_s}|s\\rangle|\\phi_s^{(j)}\\rangle + \\dots \\right)"
        },
        {
            title: "Staged Amplification",
            text: (
                <>
                    Instead of amplifying the final, complete wave just once at the very end, VTAA uses a nested, progressive approach. It selectively amplifies the "Success" branches at Stage 1, safely extracts them via an <GlossaryTerm term="Early-Abort Structure" id="early-abort" />, and then pushes the remaining "Continue" branches into Stage 2 to be amplified next. We never repeatedly pay <InlineMath math="T_{max}" /> for branches that have already succeeded.
                </>
            ),
            example: "Real Life: Grading tests in waves. The teacher collects and grades the exams of the \"5-minute finishers\" immediately, logs their scores, and leaves them alone while focusing entirely on the students who need the full two hours.",
            equation: "\\text{Amplify}_{(j)} \\to \\text{Extract} \\to \\text{Amplify}_{(j+1)}"
        },
        {
            title: "The VTAA Guarantee",
            text: (
                <>
                    The final result is brilliant. We preserve the famous Grover quadratic speedup (<InlineMath math="1/\sqrt{p_s}" />), but our time cost is no longer anchored to the worst-case scenario (<InlineMath math="T_{max}" />). Instead, we pay a <strong>variable-time average</strong> (<InlineMath math="T_{vtaa}" />), which is heavily skewed by how fast the easy branches finish.
                </>
            ),
            example: "Real Life: The entire class is processed exponentially faster, and the total time the teacher spent in the room was heavily dragged down by the sheer volume of kids who left in the first 5 minutes.",
            equation: "T_{vtaa} = \\sqrt{ \\sum_{j=1}^m p^{(j)}_s T_j^2 } \\ll T_{max}"
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
