"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function OAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    const STEPS = [
        {
            title: "The One-Shot Problem",
            text: (
                <>
                    In standard Grover's search, you start with a blank slate. If you mess up, you just wipe it and start over. But in Oblivious Amplitude Amplification, someone hands you a mysterious, unknown quantum state. If you try to guess what's inside and fail, the state undergoes <GlossaryTerm term="State Collapse" id="state-collapse" />. Because of the <GlossaryTerm term="No-Cloning Theorem" id="no-cloning" />, you can't make backups. You only get one shot.
                </>
            ),
            example: "Real Life: Imagine a bomb squad handed a highly sensitive, entirely enclosed black box. If they cut the wrong wire, it explodes. They can't just 'reload a save file' or ask for another identical bomb. The process is irreversible.",
            equation: "|\\psi\\rangle \\to \\begin{cases} |A_1\\rangle & \\text{success} \\\\ |A_0\\rangle & \\text{failure (destroyed)} \\end{cases}"
        },
        {
            title: "The Missing Pivot",
            text: (
                <>
                    As we saw with Grover, moving probability toward the target requires geometrically "pivoting" (mathematically known as reflection) around a known center axis. But if the input state is completely unknown, you don't know where the center is. Trying to reflect across an invisible, unknown axis is mathematically impossible.
                </>
            ),
            example: "Real Life: Imagine trying to draw a perfect circle with a compass, but you have a blindfold on and you don't know where the metal needle is planted on the paper. You cannot pivot without knowing your anchor point.",
            equation: "R_{|\\psi\\rangle} = I - 2|\\psi\\rangle\\langle\\psi| \\; \\text{(Impossible to synthesize)}"
        },
        {
            title: "The Helper Tag (Ancilla Padding)",
            text: (
                <>
                    The solution requires an algebraic loophole. We pad the unknown mystery state with a string of known zeros, called the <GlossaryTerm term="Ancilla Qubit" id="ancilla-qubit" /> register (<InlineMath math="|0^l\rangle" />). Why do 0's help? Because these known zeros force the underlying math into a rigid structure where the top-left block of the matrix (<InlineMath math="M_{TL}" />) locks in and acts exactly like a simple identity matrix (<InlineMath math="pI" />).
                </>
            ),
            example: "Real Life: You still have the mysterious, sensitive black box, but you weld a standard, metal handle to the top of it (the 0's). You don't know anything about the bomb inside, but you perfectly mathematically understand the handle.",
            equation: "M = \\begin{bmatrix} M_{TL} & * \\\\ * & * \\end{bmatrix}, \\; M_{TL} = pI"
        },
        {
            title: "The Oblivious Trick",
            text: (
                <>
                    The breakthrough! We don't need to synthesize a reflection across the entire unknown state (which is impossible). Instead, we reflect <strong>only</strong> across the known 0's of the Ancilla tag (<InlineMath math="|0^l\rangle" />). Because of that identity block (<InlineMath math="pI" />), pivoting the tag mathematically forces the entire attached mystery state to amplify identically with it, achieving OAA without ever looking inside to trigger a <GlossaryTerm term="State Collapse" id="state-collapse" />.
                </>
            ),
            example: "Real Life: You don't need to know the bomb's layout to move it. You firmly grasp the known metal handle (the 0's) and smoothly pivot it. Wherever the handle goes, the heavy black box natively follows flawlessly.",
            equation: "R_{|0^l\\rangle} = I - 2|0^l\\rangle\\langle 0^l| \\otimes I_{\\text{data}}"
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
