import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { profile, timeline } from '../src/data/profile.js';
import {
  getHeroViewModel,
  getHeroTimeline,
  getHomepageFeaturedProjects
} from '../src/lib/homepage-content.mjs';

test('hero view model exposes explicit profile-rail metadata', () => {
  const hero = getHeroViewModel(profile);

  assert.equal(hero.headline, 'Building agents for software and everyday work.');
  assert.deepEqual(
    hero.summaryParagraphs,
    profile.heroSummary
  );
  assert.equal(hero.focusLabel, 'Research Directions');
  assert.deepEqual(hero.focusItems, ['GUI agents', 'LLM agents', 'Agentic RL', 'AGI']);
  assert.deepEqual(hero.railItems, [
    { label: 'Institution', value: 'Shanghai Jiao Tong University' },
    { label: 'School / Lab', value: 'School of Computer Science · X-LANCE Lab' }
  ]);
});

test('homepage featured projects helper keeps only featured items in order', () => {
  const projects = [
    { slug: 'guide', featured: true, order: 2 },
    { slug: 'hidden', featured: false, order: 0 },
    { slug: 'asil', featured: true, order: 1 },
    { slug: 'mattoolbench', featured: true, order: 3 }
  ];

  assert.deepEqual(
    getHomepageFeaturedProjects(projects).map((project) => project.slug),
    ['asil', 'guide', 'mattoolbench']
  );
});

test('hero timeline helper exposes four concise opening milestones including undergraduate study', () => {
  assert.deepEqual(getHeroTimeline(timeline), [
    {
      period: 'Jun 2026 - Present',
      title: 'Research Intern',
      organization: 'Alibaba · Qwen Foundation Model Team'
    },
    {
      period: '2025 - Present',
      title: 'PhD Student',
      organization: 'Shanghai Jiao Tong University · X-LANCE Lab'
    },
    {
      period: 'Mar 2025 - Aug 2025',
      title: 'Research Intern',
      organization: 'Beijing Institute for General Artificial Intelligence (BIGAI)'
    },
    {
      period: '2021 - 2025',
      title: 'B.Eng. in Computer Science',
      organization: 'Shanghai Jiao Tong University'
    }
  ]);
});

test('homepage source no longer derives hero content from quick facts or hero interest chips', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(!source.includes('quickFacts'));
  assert.ok(!source.includes('heroInterests'));
  assert.ok(source.includes('hero.railItems'));
  assert.ok(source.includes('heroTimeline'));
  assert.ok(source.includes('hero-timeline-card'));
});

test('homepage source uses a dedicated featured project media shell', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(source.includes('featured-project-grid'));
  assert.ok(source.includes('featured-project-card'));
  assert.ok(source.includes('featured-cover-frame'));
});

test('homepage source uses a title-aligned opening grid for the hero timeline', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(source.includes('hero-content-grid'));
  assert.ok(source.includes('hero-title-stack'));
  assert.ok(source.includes('hero-sidecar'));
  assert.ok(source.indexOf('hero-timeline-card') < source.indexOf('hero-focus-card'));
  assert.ok(source.includes('hero-focus-card'));
  assert.ok(source.includes('hero-summary-stack'));
  assert.ok(source.includes('hero-focus-list'));
});

test('hero styles keep left copy compact while aligning right-side content near the title', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('.hero-content-grid {'));
  assert.ok(source.includes('.hero-title-stack {'));
  assert.ok(source.includes('.hero-main {\n  display: grid;\n  gap: 0.9rem;\n  align-content: start;'));
  assert.ok(source.includes('.hero-sidecar {\n  display: grid;\n  gap: 0.8rem;\n  align-content: start;'));
});

test('hero styles stretch both primary panels to the same height', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('align-items: stretch;'));
  assert.ok(source.includes('.hero-copy,\n.hero-side {\n  height: 100%;'));
});

test('profile highlights agentic RL and current internship timeline', () => {
  assert.deepEqual(profile.heroRail.researchDirections, ['GUI agents', 'LLM agents', 'Agentic RL', 'AGI']);
  assert.deepEqual(profile.researchInterests, ['GUI agents', 'LLM agents', 'Agentic RL', 'AGI']);

  assert.ok(
    timeline.some((item) =>
      item.period === 'Jun 2026 - Present' &&
      item.title === 'Research Intern' &&
      item.organization === 'Alibaba · Qwen Foundation Model Team' &&
      item.summary.includes('GUI-agent post-training')
    )
  );
  assert.ok(
    timeline.some((item) =>
      item.period === 'Mar 2025 - Aug 2025' &&
      item.title === 'Research Intern' &&
      item.organization.includes('BIGAI') &&
      item.summary.includes('multi-app macOS agents')
    )
  );
});

test('heading styles avoid compressed mobile lettering', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(!source.includes('letter-spacing: -0.03em;'));
  assert.ok(!source.includes('letter-spacing: -0.04em;'));
});

test('mobile styles constrain decorative and card overflow', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('.hero-copy::after {\n    display: none;'));
  assert.ok(source.includes('.featured-cover-frame {\n    min-height: 0;'));
  assert.ok(source.includes('min-width: 0;'));
  assert.ok(source.includes('overflow-wrap: anywhere;'));
});

test('narrow mobile styles keep opening navigation and headline from clipping', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('grid-template-columns: repeat(3, minmax(0, 1fr));'));
  assert.ok(source.includes('.site-nav a {\n    min-width: 0;'));
  assert.ok(source.includes('font-size: clamp(1.6rem, 6.15vw, 2.05rem);'));
  assert.ok(source.includes('text-wrap: balance;'));
});
