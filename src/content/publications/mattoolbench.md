---
title: "MatToolBench: Benchmarking Multimodal Agents in Real-World Materials Science Workflows"
authors:
  - Mei Wu
  - Rui Xie
  - Runyu Zhang
  - Yuqiang Li
  - Tianfan Fu
  - Bo Chen
  - Kai Yu
  - Xin Chen
  - Lu Chen
year: 2026
status: preprint
venueDisplay: arXiv Preprint, 2026
role: Co-first Author
summary: A real-environment benchmark with 204 tasks across 10 materials science tools, covering GUI operation, OriginPro scripting, and database queries, with expert-defined partial-credit scoring.
selected: true
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

MatToolBench evaluates multimodal agents in a Windows 11 environment across GUI operation, OriginPro scripting, and materials database queries, with additional diagnostic tasks for cross-tool workflows.

Domain experts define fine-grained scoring criteria, and the GUI evaluator achieves an average F1 of 0.98. Across seven evaluated models, the highest success rates are 25% for GUI tasks and 45% for code tasks, exposing gaps in specialized workflow knowledge and artifact handoff.
