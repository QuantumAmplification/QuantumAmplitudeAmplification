"use client";

import { useState } from "react";
import { QSVTPedagogicalPanel } from "./QSVTPedagogicalPanel";
import { QSVTVisualization } from "./QSVTVisualization";
import { Layers, RotateCcw } from "lucide-react";

export function QSVTModule() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 h-full">

            {/* Header / Intro */}
            <div className="w-full mb-10 text-center flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-8 h-8 text-primary-glow opacity-80" />
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight">Quantum Singular Value Transformation</h1>
                </div>
                <p className="text-foreground/60 max-w-2xl">
                    The Grand Unification of Quantum Algorithms. A surprisingly simple way to build almost any quantum program by taking a matrix and applying a mathematical function to it.
                </p>

                {step === 4 && (
                    <button
                        onClick={() => setStep(0)}
                        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors text-xs uppercase tracking-widest"
                    >
                        <RotateCcw className="w-3 h-3" /> Reconstruct Polynomial
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center h-full">
                {/* Clickable Card Interface Left Side */}
                <div className="w-full lg:w-1/2 flex justify-end">
                    <QSVTPedagogicalPanel step={step} setStep={setStep} />
                </div>

                {/* Reacting Visualization Right Side */}
                <div className="w-full lg:w-1/2 flex justify-start">
                    <div className="w-full max-w-lg">
                        <QSVTVisualization step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
