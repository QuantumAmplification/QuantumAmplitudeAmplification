"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { FOQAPedagogicalPanel } from "./FOQAPedagogicalPanel";
import { FOQAVisualization } from "./FOQAVisualization";

export function FOQAModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">

            {/* Header / Intro */}
            <div className="w-full mb-10 text-center flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-8 h-8 text-primary-glow opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">Fixed-Point Oblivious Amplitude Amplification</h1>
                </div>
                <p className="text-foreground/60 max-w-2xl">
                    Merging fixed-point damping with oblivious amplification to solve the "soufflé" problem. Hit the target state precisely without overshooting, maintaining the absolute optimal quantum speedup.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                {/* Clickable Card Interface Left Side */}
                <div className="w-full lg:w-1/2 flex justify-end">
                    <FOQAPedagogicalPanel step={step} setStep={setStep} />
                </div>

                {/* Reacting Visualization Right Side */}
                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <FOQAVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
