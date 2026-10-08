---
title: TongUI
period: Oct 2024 - Apr 2025
organization: BIGAI / Shanghai Jiao Tong University
role: Contributing Author
visibility: public
featured: false
order: 3
summary: A large-scale trajectory data construction effort that transforms multimodal web tutorials into agent training data across operating systems and application types.
problem: General GUI agents need large, diverse trajectory data, but high-quality real-world demonstrations are difficult to collect at scale.
contributions:
  - Contributed to benchmark evaluation, including offline and online testing pipelines.
  - Supported training experiments based on Qwen2.5-VL and LoRA-style fine-tuning.
  - Helped validate the resulting agent against established GUI benchmarks.
results:
  - Published at AAAI 2026.
  - Supported the construction and validation of a million-scale GUI trajectory dataset.
  - Helped connect large-scale data generation with measurable downstream gains.
tags:
  - Data Construction
  - Evaluation
  - Multimodal Training
links:
  - label: Paper
    href: https://ojs.aaai.org/index.php/AAAI/article/view/38229
  - label: Project Page
    href: https://tongui-agent.github.io/
  - label: Code
    href: https://github.com/TongUI-agent/TongUI-agent
  - label: Dataset
    href: https://huggingface.co/datasets/Bofeee5675/GUI-Net-1M
---

TongUI showed me how much infrastructure is required before a large-scale dataset becomes genuinely useful: filtering, validation, benchmark alignment, and careful error analysis all matter. My role was especially close to the evaluation side, where we had to connect the data pipeline to meaningful agent improvements.
