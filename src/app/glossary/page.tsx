import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { ResourceLinks } from "@/components/ResourceLinks";

const TERMS = [
    {
        id: "superposition",
        term: "Superposition",
        definition: "A property of quantum systems where they can exist in multiple different states simultaneously until they are observed. Imagine a spinning coin—while it spins, it isn't just heads or tails; it's a blur of both."
    },
    {
        id: "oracle",
        term: "Oracle (Phase Flip)",
        definition: "A theoretical black box function in a quantum computer that can recognize a correct answer. It doesn't tell you where the answer is, it just acts as a definitive 'Yes' or 'No' checker. In Amplitude Amplification, it flips the mathematical sign (phase) of the correct answer."
    },
    {
        id: "amplitude",
        term: "Amplitude",
        definition: "The 'size' or 'loudness' of a specific quantum state's wave. Squaring the amplitude gives you the probability of actually finding the system in that state when you finally measure it."
    },
    {
        id: "interference",
        term: "Interference",
        definition: "Waves can add together to grow larger (constructive) or cancel each other out (destructive). Quantum algorithms use interference to shrink the amplitudes of wrong answers and grow the amplitude of the right answer."
    },
    {
        id: "state-vector",
        term: "State Vector",
        definition: "An arrow in a mathematical space that points to the current probability of all possible answers. Rotating this arrow closer to the 'Good' axis increases your chance of getting the right answer."
    },
    {
        id: "phase-kickback",
        term: "Phase Kickback",
        definition: "A quantum math trick where the Oracle flips the sign (from positive to negative) of the amplitude belonging to the correct answer. This negative sign flags the answer so the algorithm can amplify it later."
    }
];

export default function GlossaryPage() {
    return (
        <div className="relative min-h-screen flex flex-col bg-background selection:bg-primary-glow/20 selection:text-foreground">
            <header className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 backdrop-blur-md bg-background/80 border-b border-foreground/5">
                <div className="flex flex-col gap-1 hover:opacity-100 transition-opacity">
                    <Link href="/" className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-all font-semibold">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Survey
                    </Link>
                    <div className="flex flex-col mt-2">
                        <h1 className="text-sm font-semibold tracking-widest uppercase opacity-80">Amplitude Amplification</h1>
                        <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mt-1">Glossary</h2>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <ResourceLinks />
                    <ThemeToggle />
                </div>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto min-h-screen pt-40 pb-20 px-6">
                <div className="flex items-center gap-4 mb-12 border-b border-foreground/10 pb-10">
                    <BookOpen className="w-8 h-8 opacity-50" />
                    <h1 className="text-5xl font-light tracking-tight">Terminology</h1>
                </div>

                <div className="flex flex-col gap-10">
                    {TERMS.map((item) => (
                        <div key={item.id} id={item.id} className="scroll-mt-40 p-6 rounded-2xl border border-foreground/5 bg-foreground/[0.01]">
                            <h3 className="text-2xl font-medium mb-4 text-primary-glow">{item.term}</h3>
                            <p className="text-foreground/70 leading-relaxed font-light text-lg">
                                {item.definition}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
