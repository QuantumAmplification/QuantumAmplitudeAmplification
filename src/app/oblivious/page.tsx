import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OAAModule } from "@/components/oblivious/OAAModule";
import { DetailedSurveyLink } from "@/components/DetailedSurveyLink";

export default function ObliviousPage() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <header className="absolute top-0 w-full p-6 md:p-10 flex justify-between items-start z-50">
                <div className="flex flex-col gap-4 hover:opacity-100 transition-opacity">
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold tracking-widest uppercase opacity-80">Quantum Amplitude Amplification</h1>
                        <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mt-1">Section IV: Oblivious AA</h2>
                    </div>
                    <Link href="/" className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-all font-semibold">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Survey
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <DetailedSurveyLink />
                    <ThemeToggle />
                </div>
            </header>

            <main className="flex-1 w-full min-h-screen pt-48 pb-10">
                <OAAModule />
            </main>
        </div>
    );
}
