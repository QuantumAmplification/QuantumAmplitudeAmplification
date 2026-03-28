"use client";

import { useState } from "react";
import { AEPedagogicalPanel } from "./AEPedagogicalPanel";
import { AEVisualization } from "./AEVisualization";
import { RotateCcw } from "lucide-react";

export function AEModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">

            <div className="w-full mb-10 text-center flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-primary-glow drop-shadow-[0_0_15px_rgba(var(--color-primary-glow),0.2)]">Amplitude Estimation</h1>
                <p className="text-foreground/60 max-w-2xl font-light">
                    Converting quantum probability into a digital number. Follow the 5 steps to see how AA builds the signal for Phase Estimation.
                </p>

                {step === 4 && (
                    <button
                        onClick={() => setStep(0)}
                        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-xs uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3 h-3" /> Restart Analysis
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                <div className="w-full lg:w-1/2 flex justify-end">
                    <AEPedagogicalPanel step={step} setStep={setStep} />
                </div>

                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <AEVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
