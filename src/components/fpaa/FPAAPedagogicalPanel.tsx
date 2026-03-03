"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { GlossaryTerm } from "../GlossaryTerm";

export function FPAAPedagogicalPanel({ step, setStep }: { step: number, setStep: (s: number) => void }) {
    // 5 pedagogical steps based on the YLC FPAA survey notes
    const STEPS = [
        {
            title: "The Soufflé Problem",
            text: (
                <>
                    When you use standard Grover's algorithm, the math acts like a steering wheel turning at a constant speed. The chance of finding your answer goes up to 100%, but if you keep turning, it <strong>falls right back down</strong>. If you don't know exactly when to stop, you'll miss the answer. This fatal flaw is called the <GlossaryTerm term="Soufflé Problem" id="souffle-problem" />.
                </>
            ),
            example: "Real Life: Imagine baking a soufflé. If you leave it in the oven too long, it collapses. If you pull it out too early, it's raw. Grover's algorithm forces you to guess the exact perfect second to pull the soufflé out of the oven.",
            equation: "\\text{Probability} \\propto \\sin^2 \\left( \\frac{(2k+1)\\theta}{2} \\right)"
        },
        {
            title: "Fixed-Point Guarantee",
            text: (
                <>
                    Fixed-Point Amplitude Amplification (FPAA) fixes this. The YLC algorithm redesigned the math so that instead of endlessly spinning, it naturally <strong>brakes and stops</strong> at the correct answer. It guarantees your success rate will stay extremely high (above 1 - <GlossaryTerm term="Error Tolerance (δ)" id="error-tolerance" />²), no matter how long you let it run.
                </>
            ),
            example: "Real Life: We redesign the oven so it physically cannot exceed 160 degrees. It takes a tiny bit of extra math to build, but now you can leave the soufflé in the oven forever and it will never burn or collapse.",
            equation: "P_L(\\lambda) \\ge 1 - \\delta^2"
        },
        {
            title: "Varying the Angles",
            text: (
                <>
                    Instead of a flat 180° flip every time, FPAA uses angles that change as it runs. The rotations start off slow, speed up in the middle, and then gently slow down as you get closer to the perfect vertical alignment. It acts like a mathematical "saddle" that catches the arrow before it overshoots.
                </>
            ),
            example: "Real Life: Think of a car coming to a stop sign. A standard Grover algorithm slams on the brakes (huge jolt, risking skidding past the line). FPAA is a skilled driver smoothly easing onto the brake pedal to roll to a perfect, soft stop.",
            equation: "G(\\alpha, \\beta) = -R_\\lambda(\\alpha)O_f(\\beta)"
        },
        {
            title: "The Chebyshev Squeeze",
            text: (
                <>
                    These changing angles aren't random. They are calculated using <GlossaryTerm term="Chebyshev Polynomials" id="chebyshev" />. Think of these polynomials as shock absorbers. As the arrow tries to wobble past the 100% mark, the math aggressively absorbs the bounce, firmly locking the arrow onto the vertical "Good" axis.
                </>
            ),
            example: "Real Life: It's like putting premium shock-absorbers on a bumpy truck. Every time the truck hits a pothole (probability oscillation), the shocks instantly dampen the bounce so the cargo bed stays flawlessly flat.",
            equation: "P_L(\\lambda) = 1 - \\delta^2 T_L^2 \\left( \\frac{\\sqrt{1-\\lambda}}{\\gamma} \\right)"
        },
        {
            title: "Stable Convergence",
            text: (
                <>
                    The result is a quantum search that is as fast as Grover's algorithm (<InlineMath math="\mathcal{O}(1 / \sqrt{\lambda})" />), but completely immune to over-rotating. You get the famous quantum speedup without having to guess when to pull the measurement out of the oven.
                </>
            ),
            example: "Real Life: We get straight to our destination exactly as fast as a sports car, but with the indestructible, crash-proof chassis of a tank. Fast, but totally idiot-proof.",
            equation: "L \\ge \\mathcal{O} \\left( \\frac{\\log(2/\\delta)}{\\sqrt{\\lambda}} \\right)"
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
