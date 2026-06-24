---
title: "GUIDE: Resolving Domain Bias in GUI Agents through Real-Time Web Video Retrieval and Plug-and-Play Annotation"
authors:
  - Rui Xie
  - Zhi Gao
  - Chenrui Shi
  - Zirui Shang
  - Lu Chen
  - Qing Li
year: 2026
status: published
venueDisplay: ECCV 2026
role: First Author
summary: A training-free, plug-and-play framework that retrieves task-relevant tutorial videos and distills transferable planning and grounding knowledge for domain-specific GUI agents, yielding +4.47 to +7.48 point gains on OSWorld without modifying agent parameters.
selected: true
links: []
---

GUIDE is motivated by a recurring failure mode in GUI agents: they struggle when software workflows and interface conventions fall outside the distribution of their pretraining data. Rather than retraining the whole agent, the project focuses on retrieving external knowledge at run time and converting that knowledge into agent-usable guidance.

The system combines video retrieval, automatic annotation, and agent-side integration. It uses task-aware search over tutorial videos, extracts structured hints about procedure and interface interaction, and injects those hints into downstream agent execution without changing the underlying agent architecture.

On OSWorld, GUIDE works as an architecture-agnostic, plug-and-play component for both multi-agent systems and single-model agents, delivering +4.47 to +7.48 percentage-point success-rate gains and fewer execution steps without any parameter updates. The paper was accepted to ECCV 2026.
