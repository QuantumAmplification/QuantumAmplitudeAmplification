# Quantum Amplitude Amplification: The Algorithm Visualizer

[**Launch the Interactive Experience**](https://quantumamplification.github.io/QuantumAmplitudeAmplification/)

[**Read the Detailed Survey**](https://zenodo.org/records/20054981) · [**Use the ampamp Library**](https://quantumamplification.github.io/ampamp/)

## The Vision
Most quantum algorithms are often treated as "black boxes" of complex linear algebra. This project strips away the abstraction. We provide a unified visual and mathematical language to simplify and understand the quantum algorithms.

This isn't just a search visualizer; it is a platform for decomposing complex quantum speedups into intuitive geometric rotations. When you are ready to move from intuition to implementation, the companion `ampamp` documentation shows how to use the library for quantum amplitude amplification workflows.

---

## Simplifying the Blackbox

This repository provides interactive walkthroughs and visual logic for the most critical advancements in amplitude amplification:

* **Grover's Algorithm (1996):** The exponential search method that started it all.
* **Exact Amplitude Amplification (2000):** Phase-adjusted amplification that lands exactly on the target state.
* **Fixed-Point Amplitude Amplification (2014):** Solving the "over-magnification" problem when the number of target states is unknown.
* **Amplitude Estimation (2000):** Turning amplified quantum probability into a readable numerical estimate.
* **Oblivious Amplitude Amplification (2014):** Amplifying success probabilities without needing to know the internal workings of the subroutine.
* **Fixed-Point Oblivious Amplitude Amplification (2022):** Combining oblivious amplification with fixed-point convergence.
* **Controlled Quantum Amplitude Amplification (2017):** Turning detection into finding with controlled amplification structure.
* **Variable Time Amplitude Amplification (2010):** Optimizing compute time by extracting fast processes early.
* **Distributed Quantum Amplitude Amplification (2025):** Scaling across multiple quantum processors to overcome modern hardware limits.
* **Distributed Exact Quantum Amplitude Amplification (2026):** Exact distributed amplification across a multi-node quantum network.
* **Quantum Singular Value Transformation (2018):** The "ultimate masterkey" that unifies nearly all known quantum algorithms into one elegant mathematical framework.

---

## Features
* **Unified Geometric Interface:** See how different SOTA algorithms map onto the same geometric rotation principles.
* **Interactive State Manipulation:** Adjust qubit counts and oracle parameters to see the immediate impact on the Hilbert space.
* **Step-by-Step Deconstruction:** Break down complex algorithms into individual gate applications and reflections.
* **Real-time Probability Mapping:** Watch the "Mean" shift as the diffusion operator acts on the system.

---

## Resources

* **Interactive site:** https://quantumamplification.github.io/QuantumAmplitudeAmplification/
* **Detailed survey:** https://zenodo.org/records/20054981
* **ampamp library documentation:** https://quantumamplification.github.io/ampamp/

---

## Local Development

```bash
npm install
npm run dev
npm run build
```

The app is configured for GitHub Pages export with `basePath: "/QuantumAmplitudeAmplification"`. Production builds are self-contained and do not fetch Google Fonts at build time.
