import Link from "next/link";
import { AMPAMP_DOCS_URL } from "@/lib/links";

const DEFAULT_CLASS_NAME =
    "hidden md:flex text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity font-semibold border border-foreground/10 px-4 py-2 rounded-full hover:bg-foreground/5";

export function AmpampDocsLink({ className = DEFAULT_CLASS_NAME }: { className?: string }) {
    return (
        <Link
            href={AMPAMP_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            Use ampamp
        </Link>
    );
}
