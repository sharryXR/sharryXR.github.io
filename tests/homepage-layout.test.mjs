import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { profile } from '../src/data/profile.js';
import {
  getHeroViewModel,
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
  assert.deepEqual(hero.focusItems, ['GUI agents', 'LLM agents', 'RL', 'AGI']);
  assert.deepEqual(hero.railItems, [
    { label: 'Institution', value: 'Shanghai Jiao Tong University' },
    { label: 'School / Lab', value: 'School of Computer Science · X-LANCE Lab' }
  ]);
});

test('homepage featured projects helper keeps only featured items in order', () => {
  const projects = [
    { slug: 'secondary', featured: true, order: 5 },
    { slug: 'hidden', featured: false, order: 0 },
    { slug: 'primary', featured: true, order: 1 }
  ];

  assert.deepEqual(
    getHomepageFeaturedProjects(projects).map((project) => project.slug),
    ['primary', 'secondary']
  );
});

test('homepage source no longer derives hero content from quick facts or hero interest chips', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(!source.includes('quickFacts'));
  assert.ok(!source.includes('heroInterests'));
  assert.ok(source.includes('hero.railItems'));
});

test('homepage source uses a dedicated featured project media shell', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(source.includes('featured-project-grid'));
  assert.ok(source.includes('featured-project-card'));
  assert.ok(source.includes('featured-cover-frame'));
});

test('homepage source uses a left-side hero body layout to reduce empty space', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.ok(source.includes('hero-body'));
  assert.ok(source.includes('hero-sidecar'));
  assert.ok(source.includes('hero-focus-card'));
  assert.ok(source.includes('hero-summary-stack'));
  assert.ok(source.includes('hero-focus-list'));
});

test('hero styles stretch both primary panels to the same height', async () => {
  const source = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.ok(source.includes('align-items: stretch;'));
  assert.ok(source.includes('.hero-copy,\n.hero-side {\n  height: 100%;'));
});
