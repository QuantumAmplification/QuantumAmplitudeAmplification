"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function DQAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "Architectural Distribution",
            text: (
                <>
                    Standard amplitude amplification for a search space of size <InlineMath math="N=2^n" /> requires an <InlineMath math="n" />-qubit register. On <GlossaryTerm term="NISQ" id="nisq" /> hardware, this is difficult to maintain coherently. DQAA solves this by <strong>Partitioning the Search Space</strong>. The global <InlineMath math="n" />-qubit problem is divided into <InlineMath math="2^j" /> sub-functions using a <InlineMath math="j" />-bit prefix, and distributed across multiple quantum computers operating on only <InlineMath math="n-j" /> suffix qubits each.
                </>
            ),
            example: "Real Life: Instead of forcing one giant supercomputer to search a database of size N, we split the database into multiple smaller shards and assign each shard to a smaller, cheaper computer to search simultaneously.",
            equation: "\\text{Subspace Size} = 2^{n-j} \\quad \\text{Nodes} = 2^j"
        },
        {
            title: "The «Lucky Node» Theorem",
            text: (
                <>
                    A massive obstruction in distributed search is that you don't know which node actually holds the answer, meaning local success probabilities (<InlineMath math="a_k" />) are completely unknown, even if the global probability (<InlineMath math="a" />) is known. DQAA overcomes this mathematically: because the global probability is a weighted average of local ones, <strong>at least one local system</strong> (the "<GlossaryTerm term="lucky node" id="lucky-node" />") must meet or exceed the global average.
                </>
            ),
            example: "Convexity Argument: If the average grade in a class is 85%, there must exist at least one student who scored 85% or higher. They are our 'lucky node'.",
            equation: "\\exists k \\in \\{1..2^j\\} : a_k \\ge a"
        },
        {
            title: "Parallel FPAA & Chebyshev Phases",
            text: (
                <>
                    Each of the <InlineMath math="2^j" /> nodes independently executes <GlossaryTerm term="Fixed-Point Amplitude Amplification (FPAA)" id="fpaa" /> using the global success probability <InlineMath math="a" /> as a lower-bound parameter. Crucially, instead of standard Grover phases, DQAA uses varying phases based on <strong><GlossaryTerm term="Chebyshev polynomials" id="chebyshev" /></strong>. This ensures monotonic convergence toward the target state, avoiding the dreaded "overshooting" problem when the exact number of solutions is unknown.
                </>
            ),
            example: "Algorithmic Implementation: Every computer runs a localized search loop at the same time. The Chebyshev mathematically guarantees they won't spin past the answer if they find it early.",
            equation: "l = \\Theta \\left( \\frac{1}{\\sqrt{a}} \\log\\left(\\frac{2}{\\epsilon}\\right) \\right)"
        },
        {
            title: "Zero-Communication Speedup",
            text: (
                <>
                    The architecture perfectly scales. We gain significant <strong><GlossaryTerm term="Qubit Reduction" id="qubit-reduction" /></strong> (<InlineMath math="n \to n-j" />). It requires <em>zero quantum communication</em> between nodes, only classical concatenation at the end (combining the prefix <InlineMath math="i_k" /> with measured suffix <InlineMath math="x_k" />). The parallel execution depth perfectly matches the optimal <InlineMath math="\\mathcal{O}(1/\\sqrt{a})" /> runtime of monolithic algorithms.
                </>
            ),
            example: <>The tradeoff: the initial state preparation A must admit a strict <GlossaryTerm term="tensor-product decomposition" id="tensor-product" /> <InlineMath math="A=A_1 \otimes A_2" />. Keeping j small prevents an exponential explosion in processors.</>,
            equation: "A = A_{\\text{prefix}} \\otimes A_{\\text{suffix}}"
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
