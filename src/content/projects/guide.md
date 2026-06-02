---
title: GUIDE
period: Mar 2025 - Present
organization: Shanghai Jiao Tong University / BIGAI
role: First Author
visibility: public
featured: true
order: 2
summary: A plug-and-play framework for reducing planning and grounding bias in domain-specific GUI agents by retrieving and distilling task-relevant tutorial knowledge.
problem: General GUI agents degrade sharply in domain-specific software because they lack procedural knowledge and interface-specific grounding cues.
contributions:
  - Designed a video-retrieval pipeline that narrows large tutorial collections into task-relevant evidence.
  - Built an automatic annotation stage that extracts transferable planning and grounding hints from tutorial snippets.
  - Integrated the resulting knowledge into downstream agent execution without retraining the target agent.
results:
  - Improved domain-task performance in both single-model and multi-agent settings.
  - Reduced execution failures caused by missing software-specific knowledge.
  - Framed a practical path for augmenting agents with external procedural evidence at inference time.
tags:
  - GUI Agents
  - Retrieval-Augmented Systems
  - Grounding
  - Planning
cover: /images/projects/guide-framework.png
coverAlt: GUIDE framework overview
links: []
---

## Why it mattered

Many GUI agents fail not because they are incapable of reasoning in general, but because they do not know the conventions of a particular software domain. That gap shows up in two places: they cannot plan the right procedure, and they cannot ground the right interface targets.

## What we built

GUIDE tackles that gap through a run-time knowledge pipeline. It retrieves task-relevant tutorial videos, filters them to likely matches, and converts them into structured hints that can be consumed by a downstream agent. The design goal was to create something agent-agnostic and practical, not a one-off system tied to a single base model.

## What I focused on

I led the project direction, problem framing, and core system design. That included the retrieval pipeline, the annotation logic, and the way the resulting knowledge is exposed to agent execution as planning and grounding guidance.
