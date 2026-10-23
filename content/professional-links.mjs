/** Sole owner-approved LinkedIn identity. URL validation is independent of login state. */
export const approvedLinkedIn =
  "https://www.linkedin.com/in/kaden-diaz-3236b4411/";
export function isApprovedLinkedInProfile(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "www.linkedin.com" &&
      url.pathname.replace(/\/+$/, "") === "/in/kaden-diaz-3236b4411" &&
      !url.username &&
      !url.password &&
      !url.port &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}
export function linkedInProfiles(text) {
  const normalized = text.replace(/\\\//g, "/");
  return [
    ...normalized.matchAll(
      /https?:\/\/[^/\s]*linkedin\.com\/in\/[^\s"'<>\\)\]]+/gi,
    ),
  ].map((match) => match[0].replace(/[.,;]+$/, ""));
}
export function assertApprovedLinkedInProfiles(text, label = "content") {
  if (linkedInProfiles(text).some((url) => !isApprovedLinkedInProfile(url)))
    throw new Error("Unapproved LinkedIn profile in " + label);
}
