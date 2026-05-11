<p align="center">
  <a href="https://quantumamplification.github.io/QuantumAmplitudeAmplification/">
    <img alt="Launch the interactive experience" src="https://img.shields.io/badge/Launch-Interactive%20Visualizer-0ea5e9?style=for-the-badge">
  </a>
  <a href="https://zenodo.org/records/20054981">
    <img alt="Read the detailed survey" src="https://img.shields.io/badge/Read-Detailed%20Survey-f59e0b?style=for-the-badge">
  </a>
  <a href="https://quantumamplification.github.io/ampamp/">
    <img alt="Use the ampamp library" src="https://img.shields.io/badge/Use-ampamp%20Library-22c55e?style=for-the-badge">
  </a>
</p>

<h1 align="center">Quantum Amplitude Amplification</h1>

<p align="center">
  <strong>An interactive visual survey of amplitude amplification, from Grover's search to modern exact, fixed-point, oblivious, distributed, and QSVT-based frameworks.</strong>
</p>

<p align="center">
  <a href="https://quantumamplification.github.io/QuantumAmplitudeAmplification/">Interactive site</a>
  &nbsp;|&nbsp;
  <a href="https://zenodo.org/records/20054981">Detailed survey</a>
  &nbsp;|&nbsp;
  <a href="https://quantumamplification.github.io/ampamp/">ampamp documentation</a>
</p>

---

## What This Is

Quantum amplitude amplification is often introduced through dense linear algebra: reflections, phase oracles, diffusion operators, eigenphases, and success amplitudes. This project turns that machinery into an interactive visual language.

The site is designed as a bridge between three layers:

| Layer | Purpose |
| --- | --- |
| Intuition | Build a geometric feel for amplitudes, rotations, overshooting, damping, and exact convergence. |
| Survey | Connect each visualization to the historical and technical development of amplitude amplification. |
| Implementation | Point learners toward the companion `ampamp` library for practical quantum amplitude amplification workflows. |

The result is not just a Grover visualizer. It is a guided map of the amplitude amplification family tree.

---

## Quick Links

| Resource | Link |
| --- | --- |
| Interactive visualizer | https://quantumamplification.github.io/QuantumAmplitudeAmplification/ |
| Detailed survey | https://zenodo.org/records/20054981 |
| `ampamp` library docs | https://quantumamplification.github.io/ampamp/ |
| Glossary | https://quantumamplification.github.io/QuantumAmplitudeAmplification/glossary |

---

## Why It Matters

Amplitude amplification is the engine behind many quantum speedups. It starts with a simple idea: increase the probability of measuring a desired outcome while suppressing the rest. But the modern landscape is much richer than the basic Grover loop.

This visualizer helps answer questions like:

* Why does standard Grover amplification overshoot?
* How do exact and fixed-point methods avoid missing the target?
* What changes when the amplified operation is hidden inside a subroutine?
* How does amplitude estimation turn a quantum probability into a number?
* How can amplification be distributed across smaller quantum processors?
* Why does QSVT act like a unifying polynomial framework?

---

## Algorithm Map

| Module | Route | Core Idea |
| --- | --- | --- |
| Grover's Algorithm | `/grover` | The original quadratic search speedup through oracle and diffusion reflections. |
| Exact Amplitude Amplification | `/eqaa` | Phase adjustment that lands exactly on the target state. |
| Fixed-Point Amplitude Amplification | `/fpaa` | Monotonic amplification that avoids the "souffle problem" of overshooting. |
| Amplitude Estimation | `/ae` | Converts amplified success probability into a digital estimate. |
| Oblivious Amplitude Amplification | `/oblivious` | Amplifies the success of a subroutine without inspecting its internal state. |
| Fixed-Point Oblivious QA | `/foqa` | Combines oblivious amplification with fixed-point convergence. |
| Controlled QAA | `/cqaa` | Uses controlled amplification structure to transform detection into finding. |
| Distributed QAA | `/dqaa` | Splits search across smaller quantum processors while preserving speedup intuition. |
| Distributed Exact QAAA | `/deqaaa` | Performs exact distributed amplification over a multi-node quantum network. |
| QSVT | `/qsvt` | Reframes amplification as polynomial transformation of singular values. |
| Glossary | `/glossary` | Defines the recurring language used across the visual explanations. |

---

## Experience Design

The site is built around a repeated learning rhythm:

1. Read a short conceptual step.
2. Watch the associated state, register, or network visualization respond.
3. Move through the algorithm one reflection, phase shift, or amplification stage at a time.
4. Jump to the detailed survey for mathematical depth.
5. Jump to the `ampamp` docs when you are ready to use the library.

The interface favors quiet, high-contrast visuals, mathematical notation, and compact controls. Each section uses the same core vocabulary so learners can compare algorithms rather than relearn the UI.

---

## Feature Highlights

* **Interactive algorithm walkthroughs:** Step through each method as a sequence of visual transformations.
* **Unified geometric framing:** See amplitude amplification as rotations, reflections, damping, and convergence.
* **Inline math rendering:** KaTeX keeps equations readable without overwhelming the interface.
* **Glossary-linked explanations:** Important terms are introduced in context and explained without leaving the flow.
* **Resource navigation:** Every major page links to the detailed survey and the `ampamp` library documentation.
* **Static export:** The app is configured for GitHub Pages deployment.
* **Offline-safe production build:** The project uses a system font stack, so builds do not fetch Google Fonts.

---

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Math rendering | KaTeX via `react-katex` |
| Icons | Lucide React |
| Theme | `next-themes` |
| Deployment target | Static export for GitHub Pages |

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production export:

```bash
npm run build
```

Run TypeScript checks:

```bash
npx tsc --noEmit
```

The project uses:

```ts
basePath: "/QuantumAmplitudeAmplification"
```

So when running exported or deployed pages, routes live under that GitHub Pages path.

---

## Project Structure

```text
src/
  app/
    page.tsx              Home page and algorithm grid
    ae/                   Amplitude Estimation route
    cqaa/                 Controlled QAA route
    deqaaa/               Distributed Exact QAAA route
    dqaa/                 Distributed QAA route
    eqaa/                 Exact AA route
    foqa/                 Fixed-Point Oblivious QA route
    fpaa/                 Fixed-Point AA route
    glossary/             Shared terminology route
    grover/               Grover route
    oblivious/            Oblivious AA route
    qsvt/                 QSVT route
    vtaa/                 Variable-Time AA route
  components/
    ae/                   Amplitude Estimation panels and visualization
    cqaa/                 Controlled QAA panels and visualization
    deqaaa/               Distributed Exact QAAA panels and visualization
    dqaa/                 Distributed QAA panels and visualization
    eqaa/                 Exact AA panels and visualization
    foqa/                 FOQA panels and visualization
    fpaa/                 FPAA panels and visualization
    oblivious/            OAA panels and visualization
    qsvt/                 QSVT panels and visualization
    vtaa/                 VTAA panels and visualization
    ResourceLinks.tsx     Shared survey and ampamp documentation links
  lib/
    glossary.ts           Shared glossary content
    links.ts              Canonical external resource URLs
```

---

## Companion Library: `ampamp`

This visualizer explains the concepts. The companion `ampamp` documentation shows how to put amplitude amplification ideas to work in code.

Use the docs when you want to:

* Move from visual intuition to implementation.
* Explore reusable amplitude amplification primitives.
* Connect the survey's algorithmic variants to practical workflows.
* Build experiments around Grover-style amplification, amplitude estimation, and related techniques.

Library documentation: https://quantumamplification.github.io/ampamp/

---

## Survey Reference

The detailed survey provides the mathematical and historical foundation behind the visual modules:

https://zenodo.org/records/20054981

Use it for proofs, formal definitions, citations, and deeper comparisons between the algorithms.

---

## Authors

* Mithilesh Kumar
* Varun Daiya
* Yusuf Tahir

---

## Build Notes

This repository is configured for static export:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/QuantumAmplitudeAmplification",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

The app avoids build-time font downloads, which keeps CI and GitHub Pages builds more reliable. Turbopack root inference is pinned in `next.config.ts` so the build resolves this repository as the project root even if parent directories contain other lockfiles.

GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`. The workflow installs dependencies with `npm ci`, runs `npm run build`, preserves `.nojekyll`, uploads the generated `out/` directory, and deploys it through the official Pages artifact flow.

---

## License

No open-source license file is currently included. Please contact the authors before reusing or redistributing the source outside the survey project.
