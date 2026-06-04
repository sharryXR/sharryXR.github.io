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
    { label: 'Institution', value: 'Shanghai Jiao Tong University (SJTU)' },
    { label: 'Lab', value: 'X-LANCE Lab' }
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
      period: 'May 2026 - Present',
      title: 'Research Intern',
      organization: 'Alibaba · Qwen Agent Post-Training Group'
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

test('homepage source uses a compact left profile column and moves research directions into the main copy', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(source.includes('hero-content-grid'));
  assert.ok(source.includes('hero-title-stack'));
  assert.ok(source.includes('hero-profile-column'));
  assert.ok(source.includes('hero-profile-card'));
  assert.ok(!source.includes('<aside class="panel hero-side"'));
  assert.ok(source.indexOf('hero-profile-card') < source.indexOf('hero-timeline-card'));
  assert.ok(source.indexOf('hero-title-stack') < source.indexOf('hero-focus-card'));
  assert.ok(source.indexOf('hero-focus-card') < source.indexOf('hero-actions'));
  assert.ok(source.includes('hero-focus-card'));
  assert.ok(source.includes('hero.railItems'));
  assert.ok(source.includes('hero-summary-stack'));
  assert.ok(source.includes('hero-focus-list'));
});

test('hero styles stack the left profile card vertically with a larger portrait', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('.hero {\n  display: block;'));
  assert.ok(source.includes('.hero-content-grid {'));
  assert.ok(source.includes('.hero-title-stack {'));
  assert.ok(source.includes('grid-template-columns: minmax(255px, 0.43fr) minmax(0, 1.57fr);'));
  assert.ok(source.includes('grid-template-areas: \"profile title\";'));
  assert.ok(source.includes('grid-area: profile;'));
  assert.ok(source.includes('grid-area: title;'));
  assert.ok(source.includes('.hero-main {\n  display: grid;\n  gap: 0.9rem;\n  align-content: start;'));
  assert.ok(source.includes('.hero-profile-column {\n  display: grid;\n  gap: 0.85rem;\n  align-content: start;'));
  assert.ok(source.includes('.hero-profile-card {'));
  assert.ok(source.includes('grid-template-columns: 1fr;'));
  assert.ok(source.includes('gap: 0.62rem;'));
  assert.ok(source.includes('padding: 0.72rem;'));
  assert.ok(source.includes('justify-items: center;'));
  assert.ok(source.includes('width: min(100%, 160px);'));
  assert.ok(source.includes('max-height: 229px;'));
  assert.ok(source.includes('.hero-profile-card .hero-rail-list {\n  width: 100%;'));
  assert.ok(source.includes('.hero-profile-card .hero-rail-item {\n  margin: 0;'));
  assert.ok(source.includes('min-height: 18.25rem;'));
});

test('hero styles keep the profile column and main copy top-aligned in one panel', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('align-items: start;'));
  assert.ok(source.includes('.hero-copy {\n  display: grid;'));
  assert.ok(!source.includes('.hero-copy,\n.hero-side {\n  height: 100%;'));
});

test('profile highlights agentic RL and current internship timeline', () => {
  assert.ok(profile.heroSummary.some((paragraph) => paragraph.includes('Qwen mainline models')));
  assert.ok(profile.heroSummary.some((paragraph) => paragraph.includes('computer-use')));
  assert.ok(!profile.heroSummary.some((paragraph) => paragraph.includes('foundation-model agents')));
  assert.ok(!profile.heroSummary.some((paragraph) => paragraph.includes('Qwen Foundation Model Team')));
  assert.ok(profile.heroSummary.some((paragraph) => paragraph.includes('Since May 2026')));
  assert.deepEqual(profile.heroRail.researchDirections, ['GUI agents', 'LLM agents', 'Agentic RL', 'AGI']);
  assert.deepEqual(profile.researchInterests, ['GUI agents', 'LLM agents', 'Agentic RL', 'AGI']);

  assert.ok(
    timeline.some((item) =>
      item.period === 'May 2026 - Present' &&
      item.title === 'Research Intern' &&
      item.organization === 'Alibaba · Qwen Agent Post-Training Group' &&
      item.summary.includes('post-training for agent capabilities in Qwen mainline models') &&
      item.summary.includes('computer-use task testing')
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
