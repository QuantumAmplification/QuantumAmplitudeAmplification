"use client";

import { useState } from "react";
import { DEQAAPedagogicalPanel } from "./DEQAAPedagogicalPanel";
import { DEQAAVisualization } from "./DEQAAVisualization";
import { Network, RotateCcw } from "lucide-react";

export function DEQAAModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">
            <div className="w-full mb-10 text-center flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                    <Network className="w-8 h-8 text-primary-glow opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">DEQAAA (2026)</h1>
                </div>
                <p className="text-foreground/60 max-w-2xl">
                    Distributed Exact Quantum Amplitude Amplification. Achieving deterministic 100% success across a multi-node quantum network through two-phase exact tuning.
                </p>

                {step === 3 && (
                    <button
                        onClick={() => setStep(0)}
                        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-xs uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset Network
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                <div className="w-full lg:w-1/2 flex justify-end">
                    <DEQAAPedagogicalPanel step={step} setStep={setStep} />
                </div>
                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <DEQAAVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
