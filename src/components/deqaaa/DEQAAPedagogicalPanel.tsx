"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function DEQAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "Beyond Hardware Limits",
            text: (
                <>
                    Modern quantum processors are limited in size (qubit count) and depth (coherence time). <GlossaryTerm term="Distributed Quantum Amplitude Amplification" id="dqaa" /> solves this by breaking one massive search into smaller pieces and running them across a network of processors. But standard distributed search often has small residual errors.
                </>
            ),
            example: "2026 Advance: DEQAAA introduces 'Exact' tuning to the distributed model, ensuring that every independent node and the final combined result have exactly zero failure rate.",
            equation: "P_{global} = \\sin^2((2\hat{J}+1)\\Theta_{agg})"
        },
        {
            title: "Phase 1: Local EQ_j",
            text: (
                <>
                    In Phase 1, every node <InlineMath math="j" /> calculates a specific phase angle <InlineMath math="\phi_j" /> based on its local success probability <InlineMath math="p_j" />. By running a local <GlossaryTerm term="Exact AA" id="eqaa" /> routine, each node hits its local target with exactly 100% precision.
                </>
            ),
            example: "Math: The local phase is tuned such that the rotation lands perfectly on the vertical axis, correcting for the specific local 'overshoot' of that hardware node.",
            equation: "\\phi_j = 2 \\arcsin \\left( \\frac{\\sin(\\pi/(4J_j + 6))}{\\sqrt{p_j}} \\right)"
        },
        {
            title: "Phase 2: Global EQ-hat",
            text: (
                <>
                    Once the local nodes are ready, a <strong>Global Exact Step</strong> is applied across the entire network. This composite operator <InlineMath math="\widehat{EQ}" /> handles the 'stitching' of the results. It applies a final global phase correction to ensure the aggregate state is perfectly aligned.
                </>
            ),
            example: "Result: A deterministic 'Masterkey'. The 2026 Survey shows this two-phase approach is the most efficient way to use multi-node quantum hardware for search.",
            equation: "\\widehat{EQ} = \\mathcal{B} R_{|0\rangle^{\otimes n}}^{\hat{\phi}} \\mathcal{B}^\dagger R_{f}^{\hat{\phi}}"
        },
        {
            title: "Deterministic Mastery",
            text: (
                <>
                    DEQAAA transforms distributed search from a probabilistic guess into a direct measurement. It proves that even with noisy, smaller hardware, we can achieve perfect results by controlling quantum interference across the entire network with surgical precision.
                </>
            ),
            example: "Complexity: The survey confirms this maintains the optimal √N speedup while providing the reliability required for production-grade quantum cryptography.",
            equation: "P_{Success} \\equiv 1.0"
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
