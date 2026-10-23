export function resumeText(r) {
  return [
    r.name.toUpperCase(),
    r.title,
    r.contact,
    r.linkedin,
    "\nPROFILE",
    r.profile,
    "\nSELECTED ENGINEERING ACCOMPLISHMENT",
    ...r.highlights.flatMap((h) => [h.title, h.text, h.evidence]),
    "\nEXPERIENCE",
    ...r.experience.flatMap((e) => [
      e.role + " | " + e.company,
      e.period,
      ...e.details.map((d) => "- " + d),
    ]),
    "\nCORE COMPETENCIES",
    r.competencies,
    "\nSELECTED CREDENTIALS & TRAINING",
    r.credentialsNote,
    ...r.credentials.map((c) => "- " + c),
    "\nSELECTED PROJECTS",
    ...r.projects.map((p) => p.name + " [" + p.status + "]: " + p.text),
    "\nEDUCATION",
    ...r.education.map((e) => e.school + " | " + e.qualification),
    "\nUpdated " + r.updatedOn,
    "",
  ].join("\n");
}
