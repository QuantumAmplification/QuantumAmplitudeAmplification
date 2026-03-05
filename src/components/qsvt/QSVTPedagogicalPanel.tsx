"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function QSVTPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "1. The Big Idea: Functions on Matrices",
            text: (
                <>
                    Imagine you have a grid of numbers (a matrix) representing your problem. What if you could just apply a mathematical function—like squaring it, finding its inverse, or stepping it—directly to that matrix? QSVT does exactly this. It replaces dozens of confusing, custom quantum algorithms with one simple framework that just applies a polynomial function to your data.
                </>
            ),
            example: "Instead of building a specific quantum circuit to solve a specific problem, we just find a polynomial equation that matches the function we want to apply.",
            equation: "\\text{Data } A \\xrightarrow{\\text{ QSVT }} \\text{Result } f(A)"
        },
        {
            title: "2. The Quantum Trick: Block Encoding",
            text: (
                <>
                    There's a catch: Quantum computers can only run &quot;Unitary&quot; operations (rotations that preserve all information). But our data matrix <InlineMath math="A" /> usually isn't Unitary. The solution is remarkably clever: we just take a larger Unitary matrix and hide our data matrix inside its top-left corner! This is called a <strong><GlossaryTerm term="Block-Encoding" id="block-encoding" /></strong>.
                </>
            ),
            example: "It's like wrapping a fragile package (our non-unitary data) in a larger, sturdy box (a unitary matrix) so the quantum computer can safely process it.",
            equation: "U = \\begin{pmatrix} A/\\alpha & \\text{Garbage} \\\\ \\text{Garbage} & \\text{Garbage} \\end{pmatrix}"
        },
        {
            title: "3. Processing the Signal",
            text: (
                <>
                    Now that our data is inside a quantum operation, how do we apply our function? We &quot;sandwich&quot; our block-encoded data between special, tunable quantum rotations called the <strong><GlossaryTerm term="Quantum Signal Processor (QSP)" id="qsp" /></strong>. By carefully choosing the angles for these rotations, we can mathematically sculpt the final output into almost any shape we want!
                </>
            ),
            example: "Think of it like an equalizer on a stereo. The block-encoding is the raw audio signal, and the alternating rotations are the knobs we turn to boost or cut specific frequencies.",
            equation: "\\text{Output} = \\text{Rotate} \\to \\text{Apply } U \\to \\text{Rotate} \\to \\text{Apply } U^\\dagger \\dots"
        },
        {
            title: "4. One Algorithm to Rule Them All",
            text: (
                <>
                    This single framework can replicate almost every major quantum algorithm. You just change the &quot;shape&quot; of the function you are applying!
                    <br /><br />
                    • <strong>Grover's Search</strong> is just applying a function shaped like a step. <br />
                    • <strong>Quantum Simulation</strong> is applying a wave-like (sine/cosine) function. <br />
                    • <strong>Solving Linear Equations (HHL)</strong> is applying an inverse (<InlineMath math="1/x" />) function.
                </>
            ),
            example: "QSVT proves that most quantum algorithms aren't fundamentally different; they are just different polynomials plugged into the exact same machinery.",
            equation: "f(x) \\approx \\begin{cases} sgn(x), & \\text{Search} \\\\ e^{-ixt}, & \\text{Simulation} \\\\ 1/x, & \\text{Inversion} \\end{cases}"
        },
        {
            title: "5. The Ultimate Limit",
            text: (
                <>
                    Not only is QSVT elegant, but it is also mathematically optimal. It achieves the absolute best possible performance allowed by the laws of physics, and it does so using very little extra quantum memory (ancilla qubits). It represents the absolute pinnacle of current algorithm design.
                </>
            ),
            example: "The real challenge now isn't inventing new algorithms, but figuring out how to efficiently load our classical data into the initial Block-Encoding.",
            equation: "\\text{Extra Qubits Required} = \\mathcal{O}(1)"
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
                    className="flex flex-col gap-6 flex-1 min-h-[400px]"
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
