"use client";

import { useState } from "react";
import { DQAAPedagogicalPanel } from "./DQAAPedagogicalPanel";
import { DQAAVisualization } from "./DQAAVisualization";
import { RotateCcw, Share2 } from "lucide-react";

export function DQAAModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">

            {/* Header / Intro */}
            <div className="w-full mb-10 text-center flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                    <Share2 className="w-8 h-8 text-primary-glow opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">Distributed Quantum AA</h1>
                </div>
                <p className="text-foreground/60 max-w-2xl">
                    Shatter the hardware limits of the NISQ era. Redistribute the computational workload of standard amplitude amplification across multiple smaller quantum processors without losing the optimal quadratic speedup.
                </p>

                {step === 3 && (
                    <button
                        onClick={() => setStep(0)}
                        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-xs uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3 h-3" /> Re-Distribute Workload
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                {/* Clickable Card Interface Left Side */}
                <div className="w-full lg:w-1/2 flex justify-end">
                    <DQAAPedagogicalPanel step={step} setStep={setStep} />
                </div>

                {/* Reacting Visualization Right Side */}
                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <DQAAVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
