"use client";

import { CQAAModule } from "@/components/cqaa/CQAAModule";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResourceLinks } from "@/components/ResourceLinks";

export default function CQAAPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col pt-32 pb-20 overflow-x-hidden">
            <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
                <Link 
                    href="/"
                    className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300 backdrop-blur-md"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-semibold opacity-70">Back to Landing</span>
                </Link>
            </div>
            <div className="fixed top-8 right-8 md:top-12 md:right-12 z-50 flex items-center gap-6">
                <ResourceLinks />
            </div>

            <CQAAModule />
        </main>
    );
}
