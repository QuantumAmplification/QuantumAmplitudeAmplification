"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath } from "react-katex";
import { GlossaryTerm } from "./GlossaryTerm";

export function PedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    // Generate the steps inside the component so we can use JSX (for the GlossaryTerm components)
    const STEPS = [
        {
            title: "What is Superposition?",
            text: (
                <>
                    In classical computing, a bit is either 0 or 1. A classical search has to pick one record at a time to check it. In quantum computing, we can put our memory into a state where it is "exploring" all possible values simultaneously. This is called <GlossaryTerm term="superposition" id="superposition" />. If we have n bits, there are N = 2^n possible combinations. The state |A⟩ represents an equal superposition of all of them.
                </>
            ),
            example: "Real Life: Imagine looking for a specific friend in a dark crowded stadium. A classical computer checks one seat at a time with a tiny flashlight. A quantum computer turns on the stadium floodlights for a split second, lighting up every single seat at once.",
            equation: "|A\\rangle = \\frac{1}{\\sqrt{N}} \\sum_x |x\\rangle"
        },
        {
            title: "Good vs Bad States",
            text: (
                <>
                    Let's say a function checks if an item is the one we want. This separates our puzzle into two groups: the "Good" states and the "Bad" states. Geometrically, we can treat the Bad states as the horizontal axis and the Good states as the vertical axis. Because there are so few Good states, our initial equal superposition |A⟩ starts very close to the horizontal axis, at a small angle.
                </>
            ),
            example: "Real Life: Think of a massive deck of cards where you are looking for the only King of Spades. The King is the 'Good' state. Every other card in the deck belongs to the massive pile of 'Bad' states.",
            equation: "|A\\rangle = \\cos \\frac{\\theta}{2} |\\text{Bad}\\rangle + \\sin \\frac{\\theta}{2} |\\text{Good}\\rangle"
        },
        {
            title: "The Phase Flip",
            text: (
                <>
                    The quantum computer applies an <GlossaryTerm term="Oracle" id="oracle" />, a checker that recognizes the Good state. If it sees it, it performs a <GlossaryTerm term="phase kickback" id="phase-kickback" />, it flips the mathematical sign. Geometrically, it reflects our <GlossaryTerm term="state vector" id="state-vector" /> across the Bad states axis. The <GlossaryTerm term="amplitude" id="amplitude" /> of the correct answer is now negative.
                </>
            ),
            example: "Real Life: It's like finding a needle in a haystack by passing a giant magnet over it. The magnet doesn't pull the needle out immediately, but it permanently magnetizes (flags) the needle so it behaves differently than the hay going forward.",
            equation: "O_f = 2|\\text{Bad}\\rangle\\langle\\text{Bad}| - I"
        },
        {
            title: "Amplitude Amplification",
            text: (
                <>
                    The second part is the Diffusion operator, which reflects our vector across the original equal superposition |A⟩. Because the correct answer's amplitude was negative, this reflection swings the vector up. By using <GlossaryTerm term="interference" id="interference" />, it amplifies the Good state and shrinks the Bad ones. This combination is the Grover operator.
                </>
            ),
            example: "Real Life: Imagine dropping a pebble in a pond exactly as someone drops a heavy rock. If timed perfectly, the ripples collide. The waves of the useless water shrink into nothing (destructive interference), but the wave carrying your target grows into a massive splash (constructive interference).",
            equation: "R = 2|A\\rangle\\langle A| - I"
        },
        {
            title: "Geometric Rotation",
            text: (
                <>
                    Each application of the Grover operator (G) rotates the vector towards the Good state by an angle. After each step, the probability of measuring the correct answer grows. After a few applications, our state |ψ_k⟩ is rotated strongly upwards.
                </>
            ),
            example: "Real Life: Think of tuning an old, fuzzy radio dial. With every click of the dial (Grover operator), the static noise of the 'Bad' stations gets quieter, and the clear song of your 'Good' station gets louder and sharper.",
            equation: "G|A\\rangle = \\cos \\frac{3\\theta}{2} |\\text{Bad}\\rangle + \\sin \\frac{3\\theta}{2} |\\text{Good}\\rangle"
        },
        {
            title: "Perfect Alignment",
            text: (
                <>
                    We stop when the vector aligns perfectly with the Good vertical axis. If we keep going, we'll overshoot (like boiling over a pot). The math shows that the perfect alignment happens exponentially faster than a classical computer could ever check.
                </>
            ),
            example: "Real Life: Think of riding a swing. You have to pump your legs at the exact right moment to go higher. If you pump your legs at the wrong time (doing too many rotations), you'll kill your momentum and stop dead. Stop while you're at the very peak!",
            equation: "k = \\left\\lfloor \\frac{\\pi}{4} \\sqrt{\\frac{N}{M}} \\right\\rfloor"
        }
    ];

    const current = STEPS[step];
    const isFirst = step === 0;
    const isFinal = step === STEPS.length - 1;

    return (
        <div className="flex flex-col h-full justify-between w-full max-w-lg relative z-20 bg-foreground/[0.01] p-8 rounded-3xl border border-foreground/5 shadow-sm">

            {/* Step Counter */}
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

            {/* Navigation Arrows */}
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
