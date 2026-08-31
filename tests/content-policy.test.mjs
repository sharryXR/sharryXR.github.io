import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

import {
  formatPublicationDisplay,
  getVisibleProjects,
  isPublicProject,
  sortPublications
} from '../src/lib/content-policy.mjs';

test('under review publications suppress target venues in public display', () => {
  const publication = {
    status: 'under-review',
    venueDisplay: 'Target Venue 2026'
  };

  assert.deepEqual(formatPublicationDisplay(publication), {
    label: 'Under Review',
    venue: null
  });
});

test('accepted publications keep their venue labels', () => {
  const publication = {
    status: 'published',
    venueDisplay: 'AAAI 2026'
  };

  assert.deepEqual(formatPublicationDisplay(publication), {
    label: 'AAAI 2026',
    venue: 'AAAI 2026'
  });
});

test('only explicitly public projects appear in public listings', () => {
  const projects = [
    { slug: 'guide', visibility: 'public' },
    { slug: 'mattoolbench', visibility: 'public' },
    { slug: 'draft-project', visibility: 'private' }
  ];

  assert.deepEqual(
    getVisibleProjects(projects).map((project) => project.slug),
    ['guide', 'mattoolbench']
  );
});

test('project visibility defaults to private', () => {
  assert.equal(isPublicProject({ slug: 'draft-project' }), false);
});

test('publications sort by year, explicit order, then title', () => {
  const publications = [
    { title: 'Zeta', year: 2026, order: 2 },
    { title: 'Alpha', year: 2025, order: 0 },
    { title: 'Beta', year: 2026, order: 1 },
    { title: 'Gamma', year: 2026 }
  ];

  assert.deepEqual(
    sortPublications(publications).map((publication) => publication.title),
    ['Beta', 'Zeta', 'Gamma', 'Alpha']
  );
});

test('ASIL publication exposes its accepted venue and public resources', async () => {
  const source = await readFile(
    new URL('../src/content/publications/asil.md', import.meta.url),
    'utf8'
  );

  assert.match(source, /^status: published$/m);
  assert.match(source, /^venueDisplay: Findings of EMNLP 2026$/m);
  assert.match(source, /^role: First Author$/m);
  assert.match(source, /authors:\n  - Rui Xie\n  - Lu Chen/m);
  assert.match(source, /https:\/\/arxiv\.org\/abs\/2608\.26991/);
  assert.match(source, /https:\/\/sharryxr\.github\.io\/ASIL\//);
  assert.match(source, /https:\/\/github\.com\/sharryXR\/ASIL/);
  assert.match(source, /https:\/\/huggingface\.co\/datasets\/sharryXR\/asil-benchmark/);
  assert.match(source, /https:\/\/huggingface\.co\/datasets\/sharryXR\/asil-training-data/);
});

test('MatToolBench publication is now public-facing under review', async () => {
  const source = await readFile(
    new URL('../src/content/publications/mattoolbench.md', import.meta.url),
    'utf8'
  );

  assert.match(source, /^status: under-review$/m);
  assert.doesNotMatch(source, /statusLabel: In Preparation|^status: in-preparation$/m);
});

test('Qwen-CUA technical report records group authorship and core contribution', async () => {
  const source = await readFile(
    new URL('../src/content/publications/qwen-cua.md', import.meta.url),
    'utf8'
  );

  assert.match(source, /^title: "Qwen-CUA: Native Computer Use for \(almost\) Everything"$/m);
  assert.match(source, /authors:\n  - "Qwen Team & XLang Lab"/m);
  assert.match(source, /^status: published$/m);
  assert.match(source, /^venueDisplay: arXiv Technical Report, 2026$/m);
  assert.match(source, /^role: Core Contributor$/m);
  assert.match(source, /https:\/\/arxiv\.org\/abs\/2608\.02352/);
});

test('ASIL project is featured with the benchmark-effect cover asset', async () => {
  const source = await readFile(
    new URL('../src/content/projects/asil.md', import.meta.url),
    'utf8'
  );
  const cover = new URL('../public/images/projects/asil-benchmark-effect.png', import.meta.url);

  assert.match(source, /^featured: true$/m);
  assert.match(source, /^order: 1$/m);
  assert.match(source, /https:\/\/arxiv\.org\/abs\/2608\.26991/);
  assert.match(source, /^cover: \/images\/projects\/asil-benchmark-effect\.png$/m);
  assert.ok((await stat(cover)).size > 100000);
});

test('completed research projects expose their final periods', async () => {
  const [asil, guide, mattoolbench] = await Promise.all([
    readFile(new URL('../src/content/projects/asil.md', import.meta.url), 'utf8'),
    readFile(new URL('../src/content/projects/guide.md', import.meta.url), 'utf8'),
    readFile(new URL('../src/content/projects/mattoolbench.md', import.meta.url), 'utf8')
  ]);

  assert.match(asil, /^period: Apr 2026 - Jul 2026$/m);
  assert.match(guide, /^period: Mar 2025 - Apr 2026$/m);
  assert.match(mattoolbench, /^period: Oct 2025 - May 2026$/m);
});
