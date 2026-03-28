"use client";

import { useState } from "react";
import { CQAAPedagogicalPanel } from "./CQAAPedagogicalPanel";
import { CQAAVisualization } from "./CQAAVisualization";
import { Cpu, RotateCcw } from "lucide-react";

export function CQAAModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">
            <div className="w-full mb-10 text-center flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                    <Cpu className="w-8 h-8 text-primary-glow opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">CQAA (2017)</h1>
                </div>
                <p className="text-foreground/60 max-w-2xl">
                    Controlled Quantum Amplitude Amplification. Using controlled circuit architectures to transform search into a state detection problem with constant overlap.
                </p>

                {step === 3 && (
                    <button
                        onClick={() => setStep(0)}
                        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-xs uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3 h-3" /> Reset Circuit
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                <div className="w-full lg:w-1/2 flex justify-end">
                    <CQAAPedagogicalPanel step={step} setStep={setStep} />
                </div>
                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <CQAAVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
