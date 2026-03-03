"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function QSVTPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "The Core Paradigm Shift",
            text: (
                <>
                    Prior to QSVT, quantum algorithms relied on incredibly diverse physical intuitions like geometric rotations (Grover) or explicit eigenvalue extraction via <GlossaryTerm term="Quantum Phase Estimation (QPE)" id="qpe" />. QSVT completely replaces these with <strong>Functional Calculus on Matrices</strong>. Nearly every quantum speedup can be viewed as applying a scalar function <InlineMath math="f" /> to the spectrum of a matrix <InlineMath math="A" />. Designing an algorithm reduces to the simple classical task of finding a polynomial <InlineMath math="P(x)" /> that approximates the target function.
                </>
            ),
            example: "In-Situ Transformation: Unlike QPE, which writes eigenvalues into a separate digital register, QSVT transforms the singular values directly within the amplitudes of the original state without needing large ancillary storage.",
            equation: "\\sigma_i \\to P(\\sigma_i) \\approx f(\\sigma_i)"
        },
        {
            title: "Structural Building Blocks",
            text: (
                <>
                    QSVT operates through two components. First is <strong><GlossaryTerm term="Block-Encoding" id="block-encoding" /></strong>: To manipulate a non-unitary matrix <InlineMath math="A" /> on a quantum computer, it&apos;s embedded into the top-left corner of a larger unitary <InlineMath math="U" />. Second is <strong><GlossaryTerm term="Quantum Signal Processing (QSP)" id="qsp" /></strong>: A single-qubit engine that interleaves a &quot;signal&quot; rotation with &quot;processor&quot; rotations to synthesize bounded polynomial transformations.
                </>
            ),
            example: "Quantum Data Ingestion: Mixed states, POVMs, and sparse classical matrices can all be transformed into block-encodings, allowing complex operator arithmetic via Linear Combinations of Unitaries (LCU).",
            equation: "U = \\begin{pmatrix} A/\\alpha & \\cdot \\\\ \\cdot & \\cdot \\end{pmatrix}"
        },
        {
            title: "The Main QSVT Theorem",
            text: (
                <>
                    The framework elevates <GlossaryTerm term="QSP" id="qsp" /> to large Hilbert spaces. A <GlossaryTerm term="block-encoding" id="block-encoding" /> <InlineMath math="U" /> decomposes the entire space into independent two-dimensional invariant subspaces, one for each singular value <InlineMath math="\sigma_i" />. By alternating applications of <InlineMath math="U" />, <InlineMath math="U^\dagger" />, and multi-qubit reflections <InlineMath math="R_\phi" />, the QSP polynomial logic is applied in parallel to every singular value simultaneously.
                </>
            ),
            example: "Parity Rules: Odd-degree polynomials map right singular vectors to left singular vectors; even-degree polynomials stay entirely within the original space.",
            equation: "U_{QSVT} = \\prod (R_{\\phi_k} U) (R_{\\phi_{k-1}} U^\\dagger) \\dots"
        },
        {
            title: "The Algorithm Zoo Unified",
            text: (
                <>
                    QSVT provides a single, unified method to construct optimal circuits for foundational tasks. <br /><br />
                    • <strong>Search</strong> approximates the sign function (<InlineMath math="sgn(x)" />). <br />
                    • <strong>Hamiltonian Sim</strong> maps <InlineMath math="e^{-ixt}" /> using Jacobi-Anger expansions. <br />
                    • <strong>Matrix Inversion (HHL)</strong> approximates <InlineMath math="1/x" /> on a gapped interval.
                </>
            ),
            example: "Quantum Walks: Finding hitting times or spectral gaps is reframed merely as detecting the singular value 1 using a thresholding polynomial.",
            equation: "P(x) \\approx \\begin{cases} sgn(x), & \\text{Search} \\\\ e^{-ixt}, & \\text{Simulation} \\\\ 1/x, & \\text{Inversion} \\end{cases}"
        },
        {
            title: "Architectural Optimality",
            text: (
                <>
                    QSVT represents the pinnacle of current algorithm design. It provides massive <strong>Spatial Efficiency</strong>, requiring only <InlineMath math="\mathcal{O}(1)" /> ancilla qubits (compared to the <InlineMath math="\mathcal{O}(\log 1/\epsilon)" /> required by <GlossaryTerm term="QPE" id="qpe" />). It achieves <strong>Temporal Optimality</strong> with linear scaling in time and logarithmic scaling in precision, saturating the absolute information-theoretic bounds derived from Markov&apos;s inequality.
                </>
            ),
            example: "The Bottleneck (The Input Problem): While the transformation is optimal, constructing the initial block-encoding for dense classical data remains the primary challenge in the field.",
            equation: "\\text{Cost} = \\mathcal{O} \\left( t + \\log \\frac{1}{\\epsilon} \\right)"
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
