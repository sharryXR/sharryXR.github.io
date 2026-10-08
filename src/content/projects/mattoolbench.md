---
title: MatToolBench
period: Oct 2025 - May 2026
organization: Shanghai Jiao Tong University / Suzhou Laboratory
role: Co-first Author
visibility: public
featured: true
order: 3
summary: A real-environment benchmark with 204 tasks across 10 materials science tools, spanning GUI operation, OriginPro scripting, database queries, and diagnostic cross-tool workflows.
problem: Multimodal agents are usually measured on general-purpose software, leaving a major gap in our understanding of how they perform in scientific tools and professional workflows.
contributions:
  - Led the design of a benchmark spanning 204 tasks across 10 materials science tools and three interaction modalities.
  - Built isolated Windows 11 execution environments with standardized reset and evaluation hooks.
  - Helped define expert-guided partial-credit scoring and modality-specific evaluation for GUI states, exported figures, and database query outputs.
results:
  - Evaluated seven multimodal models; the best GUI and code task success rates reached only 25% and 45%, respectively.
  - Validated the GUI evaluation pipeline with an average F1 of 0.98.
  - Identified failures in domain-specific workflow knowledge and cross-tool artifact handoff.
tags:
  - Benchmarking
  - Real-Environment Evaluation
  - Scientific Software
  - Agent Infrastructure
cover: /images/projects/mattoolbench-runner.png
coverAlt: MatToolBench execution architecture
links:
  - label: Project Page
    href: https://mattoolbench.github.io/
  - label: Paper
    href: https://arxiv.org/abs/2609.37053
  - label: PDF
    href: https://arxiv.org/pdf/2609.37053
  - label: Code
    href: https://github.com/meiwu5/MatToolBench
---

## Benchmark scope

The 204 tasks comprise 100 GUI tasks, 16 OriginPro plotting tasks, 80 code-based database queries, and eight diagnostic mixed workflows. GUI tools include JADE, Avantage, VESTA, DigitalMicrograph, and Materials Studio; code tasks cover Materials Project, OQMD, OPTIMADE, and pymatgen.

## Systems contribution

The benchmark is not only a task list. It also depends on a stable runner, environment reset logic, and evaluation interfaces that match the outputs of different software systems. I spent much of my effort on that systems layer so the benchmark could scale beyond manually curated demos.

## Research value

The results show that success on general software benchmarks does not reliably transfer to scientific workflows. Failures involve specialized operational knowledge, sparse pretraining coverage, cross-tool artifact handoff, and critical software states exposed only visually.
