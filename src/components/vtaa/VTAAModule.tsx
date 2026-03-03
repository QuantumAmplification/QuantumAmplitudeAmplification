"use client";

import { useState } from "react";
import { VTAAPedagogicalPanel } from "./VTAAPedagogicalPanel";
import { VTAAVisualization } from "./VTAAVisualization";
import { RotateCcw } from "lucide-react";

export function VTAAModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">

            {/* Header / Intro */}
            <div className="w-full mb-10 text-center flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Variable-Time Amplitude Amplification</h1>
                <p className="text-foreground/60 max-w-2xl">
                    Stop paying the worst-case tax. Learn how VTAA achieves quadratic speedups based on the <em>average</em> stopping time by selectively extracting fast branches.
                </p>

                {step === 3 && (
                    <button
                        onClick={() => setStep(0)}
                        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-xs uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3 h-3" /> Retry Algorithm
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                {/* Clickable Card Interface Left Side */}
                <div className="w-full lg:w-1/2 flex justify-end">
                    <VTAAPedagogicalPanel step={step} setStep={setStep} />
                </div>

                {/* Reacting Visualization Right Side */}
                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <VTAAVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
