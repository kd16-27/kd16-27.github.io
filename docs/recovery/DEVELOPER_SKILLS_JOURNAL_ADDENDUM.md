# Developer skills journal addendum — October 26, 2026

Owner-directed recovery readiness milestone, supplementary to the preserved portfolio skills journal. This separate path keeps recovery staging independent of unmerged portfolio source and avoids an add/add conflict with its existing journal.

Prepared an AI-assisted, recovery-only local Git candidate based on original main. The candidate adds fixed legacy HTML/CSS and a manual workflow rather than rebuilding the new portfolio or relying on an expired deployment artifact. Exact commit references identify reviewed content; fixed hashes identify bytes; uploaded artifacts are replaceable deployment bundles rather than the only backup.

The workflow's prepare job validates the owner-supplied revision in an environment variable, checks out that exact revision without persistent credentials, checks the two-file site and hashes, then uploads it. The restore job requires the prepare result, Pages/OIDC permissions and the existing deployment environment. Shared concurrency prevents overlapping recovery/portfolio jobs from running simultaneously, but operators still need to avoid competing queued publications. No paid service or external runtime is introduced.

Exercises in disposable local copies: alter one character of copied HTML and confirm the real hash-check step rejects it; explain why changing its expected hash defeats the check. Compare a commit ID, branch name, SHA-256 file digest and artifact expiry. Explain why GitHub Actions Source can separate a source merge from publication, why workflow_dispatch must be on the default branch, and why an owner approval phrase is not a configured reviewer gate. Do not dispatch, merge or edit production settings as practice.

Firefox, spoken assistive testing and PDF reading-order acceptance remain unresolved follow-ups. This records guided AI-assisted release engineering practice, not independent owner mastery, new professional qualifications or a completed hosted recovery. Existing journals, project checkpoints, baselines and deployments are preserved.
