---
title: ASIL
period: Apr 2026 - Jul 2026
organization: Shanghai Jiao Tong University · X-LANCE Lab
role: First Author
visibility: public
featured: true
order: 1
summary: An agent-native interface for software-operating agents that replaces screenshot-and-click control with structured state and semantic actions.
problem: "GUI agents are often bottlenecked by the human-facing screenshot-and-click loop: screenshots expose incomplete state, while low-level GUI events make long-horizon software workflows brittle."
contributions:
  - Framed software operation as an interface problem and designed ASIL around structured observations, semantic actions, and evaluator-backed checks.
  - Built a unified JSON observation-action protocol across 15 applications using six file-backed, native-script, command, and service-level realization patterns.
  - Developed a semi-automated onboarding framework for interface qualification, adapter generation, static audit, host probing, and Docker probing.
  - Studied ASIL as both an inference-time interface and a training substrate for supervised and reinforcement-learning workflows.
results:
  - Accepted to Findings of EMNLP 2026.
  - Evaluated 300 single-application and 80 multi-application tasks across 15 real applications.
  - GPT-5.4 scored 81.6 with a 15-action ASIL budget versus 6.6 for screenshot GUI control with 50 steps under shared tasks and validators.
  - ASIL SFT and RL raised Qwen3.5-2B from 58.0 to 74.4 and Qwen3.5-9B from 66.6 to 82.2.
tags:
  - GUI Agents
  - Software Interaction
  - Agentic RL
  - Benchmarking
cover: /images/projects/asil-benchmark-effect.png
coverAlt: ASIL benchmark coverage and interface effect
links:
  - label: Project Page
    href: https://sharryxr.github.io/ASIL/
  - label: Paper
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

## Interface question

ASIL starts from a simple observation: many agent failures in software are not only reasoning failures, but interface failures. Screenshots compress software state into pixels, and clicks stretch semantic intent into fragile event sequences.

## What we built

The project exposes software through structured state, semantic actions, and direct evaluator checks. Fifteen application adapters use the deepest feasible access path - structured files, native scripts, commands, or service APIs - while keeping one observation-action protocol for the agent. A semi-automated onboarding framework turns reviewed interface evidence into extension candidates, then qualifies, audits, and probes them before use.

## Evidence

Across 380 tasks, closed models exceed 80 while using fewer than five actions per task. On matched tasks, GPT-5.4 reaches 81.6 under a 15-action ASIL budget versus 6.6 for screenshot GUI control under 50 steps. The same structured traces support SFT and evaluator-backed on-policy RL, raising Qwen3.5-9B from 66.6 to 82.2. ASIL was accepted to Findings of EMNLP 2026.
