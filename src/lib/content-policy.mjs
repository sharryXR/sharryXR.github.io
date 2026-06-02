export function isPublicProject(project) {
  return project.visibility === 'public';
}

export function getVisibleProjects(projects) {
  return projects.filter(isPublicProject);
}

export function sortPublications(publications) {
  return [...publications].sort((left, right) => {
    const yearDelta = right.year - left.year;
    if (yearDelta !== 0) {
      return yearDelta;
    }

    const orderDelta = (left.order ?? 999) - (right.order ?? 999);
    if (orderDelta !== 0) {
      return orderDelta;
    }

    return left.title.localeCompare(right.title);
  });
}

export function formatPublicationDisplay(publication) {
  if (publication.status === 'under-review') {
    return {
      label: 'Under Review',
      venue: null
    };
  }

  return {
    label: publication.venueDisplay ?? publication.statusLabel ?? publication.status ?? '',
    venue: publication.venueDisplay ?? null
  };
}
