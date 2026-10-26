# Authoritative LinkedIn identity — October 23, 2026

The sole owner-approved current profile is **https://www.linkedin.com/in/kaden-diaz-3236b4411/**. Use this identity for portfolio pages, résumé downloads, metadata, professional links and future work. Do not substitute another account based on the browser's signed-in identity.

The owner has retired a separate account. This workflow confirmed that Chrome was signed into that retired identity through its View Profile destination, then signed out as requested. The signed-out welcome page was verified. No profile edits, posts, messages, account closure, merging or deletion were performed by this workflow. No evidence of earlier agent-made changes to that account was discovered; this is not a complete account-change-history audit.

The current approved profile was visually confirmed in a normal Chrome session before logout. Its name/title and destination matched; no unapproved profile details were imported. Logged-out access may show LinkedIn's authentication wall.

## Enforcement

- content/professional-links.mjs holds the canonical current URL and pure validation helpers.
- profile.linkedin imports that constant; the shared résumé JSON must match it.
- Unit tests reject the retired account, other profile slugs, unsafe URL credentials and tracking/query variants, including escaped metadata.
- Postbuild checks HTML, text, JavaScript, JSON, XML and SVG exports.
- PDF generation requires the approved identity. The PDF/source receipt and extracted-text review confirm the generated download.
- Browser checks cover links and Person sameAs metadata.

The audit covered workspace portfolio/project source and documentation, generated text, PDF extraction and preserved source archives, while excluding Git internals, dependencies, caches and traces. Immutable checkpoints stay unchanged. No old-profile references were found in that scope.

Account edits/posts always require a new explicit owner instruction. If a session is discovered using the retired account, sign out without changing or deleting it, under the owner's current instruction. Closing the retired account is reserved to the owner through LinkedIn's official process.

Draft PR #1 remains a development review only. This identity policy grants no merge, deployment, paid-service or automation authorization.
