import test from 'node:test';
import assert from 'node:assert/strict';

import {
  formatPublicationDisplay,
  getVisibleProjects,
  isPublicProject
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
