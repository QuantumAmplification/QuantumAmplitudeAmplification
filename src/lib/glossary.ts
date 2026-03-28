export const GLOSSARY_TERMS = [
    {
        id: "worst-case",
        term: "Worst-Case Complexity",
        definition: "Designing a system based entirely on the longest, hardest, and slowest possible scenario. Even if a task finishes instantly, you are forced to wait for the maximum timer to expire before moving on."
    },
    {
        id: "early-abort",
        term: "Early-Abort Structure",
        definition: "A system designed to let fast or easy tasks finish and exit the pipeline immediately, freeing up resources, rather than forcing them to wait for the slow tasks to finish."
    },
    {
        id: "clock-register",
        term: "Clock Register",
        definition: "A tiny stopwatch attached to a quantum branch. It keeps track of exactly what 'stage' of the algorithm that specific branch is currently on, so we know when it's done."
    },
    {
        id: "no-cloning",
        term: "No-Cloning Theorem",
        definition: "A fundamental law of quantum physics stating you cannot make a perfect copy of an unknown quantum state. You can't just 'save a backup file' before running a risky operation."
    },
    {
        id: "ancilla-qubit",
        term: "Ancilla Qubit",
        definition: "A 'helper' piece of data attached to the main quantum state. Even if the main state is a complete mystery, the engineer knows exactly what the Ancilla is, acting like a handle on a locked briefcase."
    },
    {
        id: "state-collapse",
        term: "State Collapse",
        definition: "The act of 'looking' at (measuring) a quantum superposition, which immediately forces it to randomly snap into a permanent, normal state. If you guess wrong, the original state is destroyed forever."
    },
    {
        id: "souffle-problem",
        term: "The Soufflé Problem",
        definition: "Grover's algorithm is like baking a soufflé. If you leave it in the oven (apply the algorithm) for too long, it literally collapses and your probability of success plummets. Real-world Quantum computers don't always know exactly when to pull it out."
    },
    {
        id: "chebyshev",
        term: "Chebyshev Polynomials",
        definition: "A famous sequence of mathematical polynomials (like a rollercoaster track of mathematical formulas that stay within a certain boundary). FPAA uses these specifically to carefully 'brake' the quantum rotation so it stops gently at the target."
    },
    {
        id: "error-tolerance",
        term: "Error Tolerance (δ)",
        definition: "The exact amount of 'wiggle room' or imperfection a quantum engineer is willing to accept. In FPAA, you define this limit upfront, and the algorithm mathematically guarantees it won't fail by more than this amount."
    },
    {
        id: "superposition",
        term: "Superposition",
        definition: "Like a spinning coin. While it spins, it's not just heads or tails—it's a blur of both at the same time. A quantum computer explores all these blurred possibilities at once."
    },
    {
        id: "oracle",
        term: "Oracle (Phase Flip)",
        definition: "Think of a bouncer at a club checking IDs. The Oracle instantly recognizes the 'Good' ID. When it finds it, it slaps a mathematical minus sign onto it to flag it for the next step."
    },
    {
        id: "amplitude",
        term: "Amplitude",
        definition: "The 'volume' or 'loudness' of a possibility. If the volume of the correct answer is turned all the way up, you're guaranteed to hear it (measure it) when you finally check."
    },
    {
        id: "interference",
        term: "Interference",
        definition: "Like noise-canceling headphones. If two sound waves peak at opposite times, they cancel out into silence. Quantum computers use this to 'cancel out' wrong answers."
    },
    {
        id: "state-vector",
        term: "State Vector",
        definition: "An arrow playing a game of hot-or-cold. The closer the arrow points to the 'Good' zone, the hotter (more likely) you are to find your answer."
    },
    {
        id: "phase-kickback",
        term: "Phase Kickback",
        definition: "The act of turning an answer's wave upside down. If a normal wave is a hill, the Oracle turns the correct answer into a valley so it stands out from the rest."
    },
    {
        id: "nisq",
        term: "NISQ (Noisy Intermediate-Scale Quantum)",
        definition: "The current era of quantum computers. They have a decent number of qubits, but they are 'noisy'—meaning they easily lose their quantum state (decoherence) and make errors because they lack perfect error correction."
    },
    {
        id: "fpaa",
        term: "Fixed-Point Amplitude Amplification (FPAA)",
        definition: "An advanced version of Grover's algorithm that guarantees you won't 'overshoot' the correct answer, no matter how many times you run the loop. It mathematically brakes itself when it finds the solution."
    },
    {
        id: "tensor-product",
        term: "Tensor-Product Decomposition",
        definition: "The mathematical ability to cleanly slice a large quantum state into completely independent, separate pieces without breaking it. Essential for distributing workloads across separate processors."
    },
    {
        id: "lucky-node",
        term: "Lucky Node",
        definition: "In a distributed quantum search, this is the specific computing node that actually contains the target answer in its search space. Since we don't know which one it is beforehand, the math guarantees its local probability is higher than the global average."
    },
    {
        id: "qubit-reduction",
        term: "Qubit Reduction",
        definition: "The strategy of cutting down the total number of qubits required on a single machine by splitting the problem up. Crucial for NISQ devices which physically don't have enough qubits to run the full monolithic problem."
    },
    {
        id: "qpe",
        term: "Quantum Phase Estimation (QPE)",
        definition: "An older, expensive quantum subroutine used to extract the eigenvalues of a matrix and write them out explicitly into a digital register. QSVT bypasses this need."
    },
    {
        id: "povm",
        term: "POVM (Positive Operator-Valued Measure)",
        definition: "A more generalized, realistic type of quantum measurement that isn't just a simple true/false binary collapse. It describes measurements that might be noisy or incomplete."
    },
    {
        id: "lcu",
        term: "Linear Combination of Unitaries (LCU)",
        definition: "A technique to build a complex quantum operation by adding together several simpler operations, much like mixing primary colors to get a specific shade."
    },
    {
        id: "block-encoding",
        term: "Block-Encoding",
        definition: "A mathematical trick to cleanly stick a non-quantum (non-unitary) matrix inside the top-left corner of a larger quantum (unitary) matrix so the quantum computer can process it."
    },
    {
        id: "qsp",
        term: "Quantum Signal Processing (QSP)",
        definition: "The single-qubit engine of QSVT. It alternates 'signal' and 'processing' rotations on just one qubit to trace out any mathematical polynomial shape you want."
    },
    {
        id: "amplitude",
        term: "Amplitude",
        definition: "A complex number in quantum mechanics that determines the probability of a specific outcome. The probability is the absolute square of the amplitude."
    },
    {
        id: "oracle",
        term: "Oracle",
        definition: "A 'black box' quantum operation that flags the answer we are looking for, usually by flipping its mathematical sign (phase). It can recognize the correct answer without telling us exactly what it is."
    },
    {
        id: "phase-kickback",
        term: "Phase Kickback",
        definition: "A quantum programming trick where applying an operation to a target qubit causes a phase shift that 'kicks back' to the control qubit, essentially tagging the state."
    },
    {
        id: "ae",
        term: "Amplitude Estimation (AE)",
        definition: "A core quantum algorithm that estimates the success probability of a process. It uses Amplitude Amplification to 'boost' the signal and then extracts the value into a digital register using Phase Estimation."
    },
    {
        id: "eqaa",
        term: "Exact Quantum Amplitude Amplification (EQAA)",
        definition: "A precise variant of AA that modifies the phase flip angle (instead of a static 180°). If the initial success probability is known, it can be tuned to hit exactly 100% success in one or more rotations."
    },
    {
        id: "phase-register",
        term: "Phase Register",
        definition: "A set of ancillary qubits used in Amplitude Estimation to store the binary representation of the phase. Think of it as a digital dial that shows the exact 'angle' of the quantum state."
    },
    {
        id: "qpe",
        term: "Quantum Phase Estimation",
        definition: "The 'readout' mechanism. It takes a rotating quantum state and, like a high-speed camera capturing a wheel's rotation, converts that motion into a readable number."
    },
    {
        id: "local-exact",
        term: "Local Exact Amplification (EQ_j)",
        definition: "The first phase of DEQAAA. Each independent quantum node performs a precise, tuned rotation to hit its local target with zero error before the global step begins."
    },
    {
        id: "global-exact",
        term: "Global Exact Step (EQ-hat)",
        definition: "The final 'stitching' step in DEQAAA. It applies a global phase shift across all nodes to correct any remaining misalignment, ensuring the total system success probability is exactly 1.0."
    },
    {
        id: "lcu-damping",
        term: "LCU Failure Reduction",
        definition: "A technique used in FOQA to ensure that success probability never 'backslides'. Unlike the oscillatory nature of Grover, LCU handles failure using a monotone schedule, making it highly robust."
    },
    {
        id: "cqaa-overlap",
        term: "Constant Overlap State",
        definition: "The core physics of CQAA. It uses a controlled circuit to ensure that the marked state maintains a constant, non-vanishing overlap with the principal eigenvector, enabling faster finding in sparse graphs."
    }
];
