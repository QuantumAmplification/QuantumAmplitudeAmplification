"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";

export function FOQAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "1. The Core Problem: The \"Soufflé\" Effect",
            text: (
                <>
                    Standard quantum amplitude amplification (like Grover's algorithm) works by repeatedly applying a unitary operator to increase the probability of finding a target state. However, it suffers from the <strong>soufflé problem</strong>: if you don't know exactly how many iterations to run, the probability amplitude overshoots the target and begins to decrease.
                </>
            ),
            example: "You have to stop at the exact right moment, or the \"soufflé\" collapses. This is even worse in oblivious amplitude amplification, where the exact initial state or overlap is unknown.",
            equation: "P_{target} = \\sin^2((2k + 1)\\theta)"
        },
        {
            title: "2. The Solution: Fixed-Point Damping",
            text: (
                <>
                    To solve this overshooting problem, researchers developed <strong>"fixed-point" algorithms</strong>. These introduce a mathematical equivalent of friction or damping. As the state gets closer to the target, the iterations apply less "push."
                </>
            ),
            example: "Eventually, the state settles precisely at the target probability of 1. You can keep running the algorithm indefinitely without worrying about overshooting. This merges perfectly with oblivious amplitude amplification.",
            equation: "\\text{Push} \\to 0 \\text{ as } P_{target} \\to 1"
        },
        {
            title: "3. The Implementation Challenge",
            text: (
                <>
                    There is a major hurdle in quantum mechanics: all standard quantum gates are unitary (perfectly reversible), meaning they cannot naturally simulate "friction" or damping (which is non-unitary). To get around this, we use <strong>Block Encoding</strong>.
                </>
            ),
            example: "We take the non-unitary, damped mathematical operation we want to perform and embed it into the top-left block of a much larger, perfectly unitary matrix.",
            equation: "U = \\begin{pmatrix} \\text{Damped Op} & \\dots \\\\ \\dots & \\dots \\end{pmatrix}"
        },
        {
            title: <>4. The Circuit Design: LCU &amp; <InlineMath math="R_y" /></>,
            text: (
                <>
                    To physically build this expanded unitary matrix, the paper uses a <strong>Linear Combination of Unitaries (LCU)</strong>. The brilliant part is its high efficiency: it requires only one extra <strong>ancilla qubit</strong>. To control the exact amount of "friction," the circuit applies an <InlineMath math="R_y" /> gate to that single ancilla.
                </>
            ),
            example: "By dynamically tuning the angle of this R_y rotation loop by loop, the algorithm applies the perfect amount of damping. Measuring the ancilla at the end forces the non-unitary operation onto the data qubits.",
            equation: "\\text{LCU: } \\sum c_i U_i \\text{ via } R_y(\\theta_k)"
        },
        {
            title: "5. Performance and Proof",
            text: (
                <>
                    The biggest risk of adding "friction" to a quantum algorithm is losing the quantum speedup. If it slows down too much, it becomes no better than a classical computer. The major theoretical contribution of FOQA is the rigorous proof that it <strong>maintains the optimal quadratic speedup</strong>.
                </>
            ),
            example: "It still requires only O(√N) queries to the quantum oracle to find the target state in a search space of size N, while guaranteeing we never overshoot the target.",
            equation: "\\text{Complexity} = \\mathcal{O}(\\sqrt{N})"
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
