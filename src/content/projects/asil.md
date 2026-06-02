---
title: ASIL
period: May 2026 - Present
organization: Shanghai Jiao Tong University · X-LANCE Lab
role: First Author
visibility: public
featured: true
order: 1
summary: An agent-native interface for software-operating agents that replaces screenshot-and-click control with structured state and semantic actions.
problem: "GUI agents are often bottlenecked by the human-facing screenshot-and-click loop: screenshots expose incomplete state, while low-level GUI events make long-horizon software workflows brittle."
contributions:
  - Framed software operation as an interface problem and designed ASIL around structured observations, semantic actions, and evaluator-backed checks.
  - Built adapters and benchmark tasks across real applications using file-backed, scripting, and service-level access paths.
  - Studied ASIL as both an inference-time interface and a training substrate for supervised and reinforcement-learning workflows.
results:
  - Evaluated ASIL across a 380-task benchmark spanning single-application and multi-application software workflows.
  - Showed a large interface effect over screenshot-driven GUI control under shared task definitions and validators.
  - Connected structured software traces to post-training workflows for software-operating agents.
tags:
  - GUI Agents
  - Software Interaction
  - Agentic RL
  - Benchmarking
cover: /images/projects/asil-benchmark-effect.png
coverAlt: ASIL benchmark coverage and interface effect
links: []
---

## Interface question

ASIL starts from a simple observation: many agent failures in software are not only reasoning failures, but interface failures. Screenshots compress software state into pixels, and clicks stretch semantic intent into fragile event sequences.

## System direction

The project exposes software through structured state, semantic actions, and direct evaluator checks. Different applications can use different access paths, including structured files, native scripting, and service APIs, while keeping a common observation-action protocol for the agent.

## Research value

This makes software operation easier to inspect, verify, and reuse for training. The same traces that support inference-time execution can also feed supervised learning and evaluator-backed post-training loops.
