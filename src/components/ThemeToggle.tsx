"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 dark:bg-foreground/10 hover:bg-foreground/10 dark:hover:bg-foreground/20 transition-colors duration-300 backdrop-blur-md border border-foreground/10"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 0 : 180,
                    scale: isDark ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-[#00F0FF] drop-shadow-cyan" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? -180 : 0,
                    scale: isDark ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-[#FFB000] drop-shadow-amber" />
            </motion.div>
        </button>
    );
}
