import { FOQAModule } from "@/components/foqa/FOQAModule";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DetailedSurveyLink } from "@/components/DetailedSurveyLink";

export default function FOQAPage() {
    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary-glow/20 selection:text-foreground">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 backdrop-blur-md bg-background/80 border-b border-foreground/5">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-xs uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 transition-all border border-transparent hover:border-foreground/10 px-4 py-2 rounded-full hover:bg-foreground/5"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex flex-col hidden sm:flex">
                        <h1 className="text-sm font-semibold tracking-widest uppercase opacity-80">Quantum Amplitude Amplification</h1>
                        <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mt-1">Section V: FOQA</h2>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <DetailedSurveyLink />
                </div>
            </header>

            {/* Main Interactive Essay Region */}
            <main className="flex-1 w-full pt-32 pb-20 flex flex-col items-center overflow-x-hidden">
                <FOQAModule />
            </main>
        </div>
    );
}
