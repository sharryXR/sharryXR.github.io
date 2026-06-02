export function getHeroViewModel(profile) {
  return {
    headline: profile.heroHeadline,
    summaryParagraphs: profile.heroSummary,
    focusLabel: profile.heroRail.researchDirections ? 'Research Directions' : null,
    focusItems: profile.heroRail.researchDirections ?? [],
    railItems: [
      { label: 'Institution', value: profile.heroRail.institution },
      { label: 'School / Lab', value: profile.heroRail.lab }
    ]
  };
}

export function getHeroTimeline(timeline, limit = 4) {
  const items = timeline ?? [];
  const highlightedItems = items.filter((item) => item.heroTimeline);
  const sourceItems = highlightedItems.length > 0 ? highlightedItems : items;

  return sourceItems
    .slice(0, limit)
    .map(({ period, title, organization }) => ({ period, title, organization }));
}

export function getHomepageFeaturedProjects(projects) {
  return projects
    .filter((project) => project.featured)
    .sort((left, right) => left.order - right.order);
}
