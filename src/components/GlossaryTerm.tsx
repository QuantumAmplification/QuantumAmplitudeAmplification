"use client";

import { GLOSSARY_TERMS } from "@/lib/glossary";

interface GlossaryTermProps {
    term: string;
    id: string;
}

export function GlossaryTerm({ term, id }: GlossaryTermProps) {
    const termData = GLOSSARY_TERMS.find(t => t.id === id);

    return (
        <span className="inline-flex items-center relative group">
            <button
                className="underline decoration-primary-glow/40 decoration-dotted underline-offset-4 hover:decoration-primary-glow/100 hover:text-primary-glow transition-all duration-300 mx-1 cursor-help"
            >
                {term}
            </button>

            {/* Tooltip */}
            {termData && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-background/95 backdrop-blur-xl border border-foreground/10 shadow-2xl rounded-2xl text-sm font-light leading-relaxed text-foreground opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none transition-all duration-300 z-[9999]">
                    <strong className="block font-medium text-primary-glow mb-1.5">{termData.term}</strong>
                    {termData.definition}
                    {/* Tooltip arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-foreground/10" />
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-background/95 -mt-[1px]" />
                </span>
            )}
        </span>
    );
}
