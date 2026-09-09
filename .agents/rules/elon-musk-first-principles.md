---
trigger: always_on
---

# Elon Musk First Principles & The Algorithm Rules

Apply Elon Musk's First Principles thinking and 5-Step Engineering Algorithm to problem decomposition, architectural decisions, code reviews, and refactoring in this workspace.

## Question The Question & Requirements
- **Make Requirements Less Dumb:** Question every requirement and assumption, regardless of who provided it or how standard it seems. Do not solve the wrong problem or treat requirements as immutable laws. Unpack the true underlying goal before accepting the prescribed solution.
- **Name-Attached Ownership:** Every requirement, constraint, or design decision must trace back to a verifiable technical need or specific owner, never to vague justifications like "industry standard," "best practice," or "how everyone else does it."
- **Physics-Level Reductionism:** Ground technical decisions in fundamental software constraints (network latency, memory footprint, CPU cycles, state mutations, rendering costs) rather than superficial software trends or framework dogmas.

## The Deletion Bias (Delete Before Optimizing)
- **Delete Unnecessary Code & Steps:** If you are not occasionally deleting something that turns out to be needed later (and having to restore roughly 10% back), you are not deleting aggressively enough. The cleanest, most bug-free code is code that does not exist.
- **Reject "Just-In-Case" Complexity:** Actively remove speculative layers, unused props, redundant intermediate state, over-generalized helpers, and dead abstractions. Every retained line of code carries an ongoing maintenance and cognitive tax.

## Strict Order of Execution (The 5-Step Algorithm)
- **Never Optimize What Should Be Deleted:** Strictly adhere to the order of engineering: Question requirements → Delete parts/processes → Simplify & optimize → Accelerate cycle time → Automate. The most catastrophic engineering failure mode is optimizing, refactoring, or automating a subsystem that should have been deleted altogether.
- **Optimize the Core Path:** Only optimize code that has survived rigorous requirement questioning and deletion. Focus optimization strictly on the fundamental bottleneck.

## Reasoning From First Principles vs. Analogy
- **Reject Blind Analogy:** Do not copy design patterns, architectural boilerplate, or third-party dependencies simply because another project or popular framework uses them. Construct the minimal direct solution from basic building blocks.
- **Zero-Base State & Logic:** Build features up from raw canonical facts. Ask: "What is the absolute minimum state and computation necessary to produce this output?" Strip away all incidental baggage.

## Fast Feedback & Inner Loop Velocity
- **Accelerate Cycle Time:** Prioritize short iteration loops (fast local typechecking, instant test feedback, deterministic diagnostics). Fast feedback exposes wrong assumptions before they calcify into tech debt.
- **Automate Only Stable Ground:** Do not automate flaky, unverified, or rapidly shifting manual flows. Automation scales the underlying process; automating a broken flow merely scales errors faster.

## Anti-Tunnel Vision & Global System Thinking
- **End-to-End System Horizon (No Local Maximums):** Never fall into feature tunnel vision where making a local sub-component compile or pass tests is mistaken for completing the feature. Always zoom out to inspect horizontal consistency across sibling modules, real-world user scale, and full pedagogical workflows (e.g., enabling users to "debug" and learn from errors rather than just outputting a score).
- **Scale by Default (Reject the N=1 Trap):** Never build monolithic or hardcoded single-instance data models when the domain inherently requires a collection. When designing practice studios, always structure the data contracts and UI for multiple test editions (`Đề 1`, `Đề 2`, `Đề 3`...) with dedicated switchers from the outset.
- **Architectural Parity Invariant:** When introducing a cleaner pattern or directory structure to one module (e.g., `src/features/<skill>/data/`), immediately audit and refactor existing sibling modules to maintain uniform structural parity. Never leave legacy monolithic files stranded behind.
