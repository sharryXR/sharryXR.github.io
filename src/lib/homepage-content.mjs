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

export function getHomepageFeaturedProjects(projects) {
  return projects
    .filter((project) => project.featured)
    .sort((left, right) => left.order - right.order);
}
