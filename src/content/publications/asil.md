---
title: "ASIL: Replacing Screenshot-and-Click with Structured State and Semantic Actions"
authors:
  - Rui Xie
  - Lu Chen
year: 2026
status: published
venueDisplay: Findings of EMNLP 2026
order: 0
role: First Author
summary: An agent-native interface that replaces screenshot-and-click control with structured software state and code-executable semantic actions, reaching 81.6 on GPT-5.4 under a 15-action budget versus 6.6 for screenshot GUI control under 50 steps.
selected: true
links:
  - label: Project Page
    href: https://sharryxr.github.io/ASIL/
  - label: Paper
    href: https://arxiv.org/abs/2608.26991
  - label: PDF
    href: https://sharryxr.github.io/ASIL/ASIL_EMNLP_2026_Findings.pdf
  - label: Code
    href: https://github.com/sharryXR/ASIL
  - label: Models
    href: https://huggingface.co/collections/sharryXR/asil-models-6a1e9faf39fe6ce4eb4626e1
  - label: Benchmark
    href: https://huggingface.co/datasets/sharryXR/asil-benchmark
  - label: Training Data
    href: https://huggingface.co/datasets/sharryXR/asil-training-data
---

ASIL studies GUI-agent failures as an interface mismatch rather than only a model-capability problem. The work exposes applications through structured observations and semantic actions, so agents can operate over software state, file formats, scripts, and service APIs instead of repeatedly grounding clicks in rendered screenshots.

The paper evaluates 300 single-application and 80 multi-application tasks across 15 real applications using shared task definitions, initial artifacts, and software-state validators. Closed models score above 80 with fewer than five actions per task; GPT-5.4 reaches 81.6 with a 15-action budget, compared with 6.6 for screenshot GUI control with 50 steps.

ASIL also provides a semi-automated software onboarding framework and compact traces for post-training. Under the structured modality, SFT and resource-limited on-policy RL raise Qwen3.5-2B from 58.0 to 74.4 and Qwen3.5-9B from 66.6 to 82.2. The paper was accepted to Findings of EMNLP 2026.
