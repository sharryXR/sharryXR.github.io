export function isPublicProject(project) {
  return project.visibility === 'public';
}

export function getVisibleProjects(projects) {
  return projects.filter(isPublicProject);
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
