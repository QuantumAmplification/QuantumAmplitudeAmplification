"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function AEPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "Beyond Simple Search",
            text: (
                <>
                    Grover's algorithm tells us <em>where</em> the answer is. But what if we want to know <em>how many</em> answers are there? <GlossaryTerm term="Amplitude Estimation (AE)" id="ae" /> turns the search process into a measurement. It allows us to calculate the success probability <InlineMath math="a" /> with high precision.
                </>
            ),
            example: "Real Life: Instead of just finding a needle in a haystack, we want to estimate the percentage of the haystack that is made of needles.",
            equation: "a = \\sin^2(\\theta)"
        },
        {
            title: "The Quantum Readout",
            text: (
                <>
                    To extract the information, we attach a second set of qubits called a <GlossaryTerm term="Phase Register" id="phase-register" />. We use the Amplitude Amplification operator as a 'clock'. Each time the clock ticks, it rotates the state vector, and the register records how much it has moved.
                </>
            ),
            example: "Analogy: Imagine a water meter. As water (probability) flows through the pipe, the dials on the meter turn to record the total volume.",
            equation: "\\mathcal{Q} |\\Psi\\rangle = e^{i2\\theta} |\\Psi\\rangle"
        },
        {
            title: "Phase Estimation",
            text: (
                <>
                    We apply the AA operator in superposition across the entire register. This creates a massive interference pattern. By using <GlossaryTerm term="Quantum Phase Estimation" id="qpe" />, we 'freeze' the rotation into a specific binary number that represents the angle <InlineMath math="\theta" />.
                </>
            ),
            example: "Visual: Think of a strobe light flashing on a rotating fan. If the strobe is timed perfectly, the fan appears to stand still. Phase estimation finds that perfect timing.",
            equation: "|\\tilde{k}\\rangle = \\text{QFT}^\\dagger \\sum e^{i2\\pi k \\phi} |k\\rangle"
        },
        {
            title: "The Sine-Squared Map",
            text: (
                <>
                    Now that we have the angle <InlineMath math="\theta" /> in our digital register, we simply apply the classical mapping <InlineMath math="\sin^2(\theta)" />. This gives us the estimate of the success probability <InlineMath math="a" />. The more qubits we have in our register, the more precise our estimate becomes.
                </>
            ),
            example: "Result: We've converted a purely quantum, blurred state into a hard, classical number sitting in our computer's memory.",
            equation: "\\tilde{a} = \\sin^2\\left(\\frac{\\pi \\tilde{k}}{M}\\right)"
        },
        {
            title: "Quadratic Speedup",
            text: (
                <>
                    AE provides a massive speedup over classical sampling. To get the same precision, a classical computer would need <InlineMath math="1/\epsilon^2" /> samples. AE only needs <InlineMath math="1/\epsilon" /> quantum operations. This is the foundation of quantum finance and chemistry simulations.
                </>
            ),
            example: "Impact: A calculation that would take 1,000,000 classical trials can be done in just 1,000 quantum steps.",
            equation: "N_{queries} = \\mathcal{O}\\left(\\frac{1}{\\epsilon}\\right)"
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
                    className="flex flex-col gap-6 flex-1 min-h-[380px]"
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
