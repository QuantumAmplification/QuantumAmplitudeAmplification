"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { ArrowRight, Search, Target, CheckCircle2 } from "lucide-react";
import { GlossaryTerm } from "@/components/GlossaryTerm";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background selection:bg-primary-glow/20 selection:text-foreground">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 backdrop-blur-md bg-background/80 border-b border-foreground/5">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold tracking-widest uppercase opacity-80">Quantum Amplitude Amplification</h1>
          <h2 className="text-xs uppercase tracking-[0.2em] opacity-40 mt-1">from First Principles</h2>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="hidden md:flex text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity font-semibold border border-foreground/10 px-4 py-2 rounded-full hover:bg-foreground/5">
            Read Detailed Survey
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Intro - Extremely simple first principles */}
      <section className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-40 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/[0.01] backdrop-blur-sm text-xs uppercase tracking-widest text-foreground/60 mb-8">
          <Target className="w-3 h-3" /> Finding The Answer
        </div>

        <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 text-foreground">
          How to find a needle <br /><span className="italic font-serif opacity-70">in a haystack.</span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/70 font-light max-w-3xl leading-relaxed">
          Imagine a puzzle with a million pieces. Only one piece is the <strong>&quot;Good&quot;</strong> piece that solves the puzzle. The remaining 999,999 are <strong>&quot;Bad&quot;</strong> pieces.
        </p>
      </section>

      {/* Basic Explanation Cards */}
      <section className="w-full max-w-4xl mx-auto px-6 py-10 flex flex-col gap-12">

        {/* Classical vs Quantum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl border border-foreground/10 bg-foreground/[0.02]">
            <div className="flex items-center gap-4 mb-6 text-foreground/80">
              <Search className="w-6 h-6" />
              <h3 className="text-2xl font-light">The Classical Way</h3>
            </div>
            <p className="text-foreground/60 leading-relaxed font-light">
              A normal computer has to check each piece one by one. &quot;Is this Good? No. Is this Good? No.&quot; On average, it will have to check half of the pieces before finding the right one. This takes a very long time.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-primary-glow/20 bg-primary-glow/5 shadow-[0_0_30px_rgba(var(--color-primary-glow),0.05)]">
            <div className="flex items-center gap-4 mb-6 text-primary-glow">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-2xl font-light">The Quantum Way</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed font-light">
              A quantum computer creates a <GlossaryTerm term="Superposition" id="superposition" />. It holds all million pieces in its memory at the exact same time. It gives every piece a wave. But right now, all waves are the same size. If you look, you&apos;ll still get a random answer.
            </p>
          </div>
        </div>

        {/* The Core Concept */}
        <div className="p-10 rounded-3xl border border-foreground/10 bg-foreground/[0.01] mt-8 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-light mb-6">Amplitude Amplification</h3>
          <p className="text-lg text-foreground/60 leading-relaxed font-light">
            This is where the magic happens. We use an algorithm that behaves like a magnifying glass. Over several steps, it <strong>shrinks</strong> the waves of the Bad pieces and <strong>amplifies</strong> the wave of the Good piece. Eventually, the Good piece is so overwhelmingly loud that when you finally look, you are almost guaranteed to find it immediately.
          </p>
        </div>
      </section>

      {/* Algorithms Tracker / Grid */}
      <section className="w-full bg-foreground/[0.02] border-t border-foreground/5 py-24 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold opacity-50 mb-4">The Evolution of the magnifying glass</h2>
            <h3 className="text-3xl font-light">Explore the Algorithms</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AlgorithmCard
              title="Grover's Algorithm (1996)"
              desc="The very first quantum search method. Finds the Good piece exponentially faster."
              href="/grover"
            />
            <AlgorithmCard
              title="Exact Amplitude Amplification (2000)"
              desc="Hitting the bullseye every time. Modifying the phase flip to guarantee a 100% success rate without overshooting."
              href="/eqaa"
            />
            <AlgorithmCard
              title="Fixed-Point Amplitude Amplification (2014)"
              desc="What if we don't know exactly how many Good pieces there are? FPAA stops over-magnifying."
              href="/fpaa"
            />
            <AlgorithmCard
              title="Amplitude Estimation (2000)"
              desc="Turning search into a measurement. Using AA to estimate exactly how many good pieces are in the haystack."
              href="/ae"
            />
            <AlgorithmCard
              title="Oblivious Amplitude Amplification (2014)"
              desc="Amplifying the success probability of any quantum subroutine, even without knowing how it works internally."
              href="/oblivious"
            />
            <AlgorithmCard
              title="Fixed-Point Oblivious Amplitude Amplification (2022)"
              desc="Merging fixed-point damping with oblivious amplification to hit a target state without overshooting, maintaining optimal quantum speedup."
              href="/foqa"
            />

            <AlgorithmCard
              title="CQAA (2017)"
              desc="Controlled Amplitude Amplification. Transforming detection into finding with constant overlap physics."
              href="/cqaa"
            />
            <AlgorithmCard
              title="Distributed Quantum Amplitude Amplification (2025)"
              desc="Redistributing the heavy workload of amplitude amplification across multiple smaller quantum processors."
              href="/dqaa"
            />
            <AlgorithmCard
              title="DEQAAA (2026)"
              desc="The two-phase exact distributed masterkey. Achieving 100% success across a multi-node quantum network."
              href="/deqaaa"
            />
            <AlgorithmCard
              title="Quantum Singular Value Transformation (2018)"
              desc="The ultimate masterkey. Combines everything into one elegant math trick."
              href="/qsvt"
            />
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="w-full bg-background py-24 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold opacity-50 mb-4">Benchmark Comparison</h2>
            <h3 className="text-3xl font-light italic font-serif">Survey Table VI: Performance Metrics</h3>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-foreground/10 bg-foreground/[0.01] backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                  <th className="p-6 text-xs uppercase tracking-widest font-semibold opacity-60">Framework</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-semibold opacity-60">Overshoot?</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-semibold opacity-60">Requires Exact p?</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-semibold opacity-60">Query Complexity</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                <ComparisonRow name="Standard Grover" overshoot="Yes" exact="Yes" complexity="\mathcal{O}(1/\sqrt{p})" />
                <ComparisonRow name="Fixed-Point AA" overshoot="No" exact="No" complexity="\mathcal{O}(\frac{1}{\sqrt{p}} \log \frac{2}{\delta})" />
                <ComparisonRow name="Oblivious AA" overshoot="Yes" exact="Yes" complexity="\mathcal{O}(1/\sqrt{p})" />
                <ComparisonRow name="Exact AA" overshoot="No" exact="Yes" complexity="Exact k \text{ steps}" />
                <ComparisonRow name="DEQAAA" overshoot="No" exact="Yes" complexity="\text{Two-Phase Global Exact}" />
                <ComparisonRow name="Variable-Time AA" overshoot="No" exact="No" complexity="\mathcal{O}(\frac{1}{\sqrt{p}} \sqrt{\sum p_j T_j^2})" />
                <ComparisonRow name="QSVT" overshoot="No" exact="No" complexity="\mathcal{O}(\frac{1}{\sqrt{p}} \log \frac{1}{\epsilon})" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 text-center text-[10px] uppercase tracking-[0.3em] font-light border-t border-foreground/5">
        <p className="opacity-40 mb-6">© 2026 Quantum Amplitude Amplification Survey Project</p>
        <div className="opacity-50 space-y-2">
          <p className="font-semibold">Authors</p>
          <p className="flex flex-wrap justify-center gap-2 items-center">
            <a href="mailto:mithilesh.kumar@krea.edu.in" className="hover:text-primary-glow transition-colors cursor-pointer">
              Mithilesh Kumar
            </a>
            <span className="text-foreground/30">•</span>
            <a href="mailto:varun_daiya.sias25@krea.ac.in" className="hover:text-primary-glow transition-colors cursor-pointer">
              Varun Daiya
            </a>
            <span className="text-foreground/30">•</span>
            <a href="mailto:yusuf_tahir.sias25@krea.ac.in" className="hover:text-primary-glow transition-colors cursor-pointer">
              Yusuf Tahir
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function ComparisonRow({ name, overshoot, exact, complexity }: { name: string, overshoot: string, exact: string, complexity: string }) {
  const isGood = overshoot === "No";
  return (
    <tr className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
      <td className="p-6 font-medium text-foreground/90">{name}</td>
      <td className={`p-6 ${isGood ? 'text-primary-glow font-medium' : 'text-red-500/60'}`}>{overshoot}</td>
      <td className="p-6 text-foreground/60">{exact}</td>
      <td className="p-6 text-foreground/80 font-mono">
        <InlineMath math={complexity} />
      </td>
    </tr>
  );
}

function AlgorithmCard({ title, desc, href }: { title: string, desc: string, href: string }) {
  return (
    <Link href={href}>
      <div className="group relative h-full flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 bg-primary-glow/5 shadow-lg shadow-primary-glow/10 border border-primary-glow/30 hover:bg-primary-glow/10">
        <div>
          <div className="flex justify-between items-start mb-6">
            <h4 className="text-xl font-medium tracking-tight text-foreground/90">{title}</h4>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed font-light mb-8">
            {desc}
          </p>
        </div>
        <div className="flex justify-end text-foreground/30 group-hover:text-foreground transition-colors group-hover:translate-x-1 duration-300">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
