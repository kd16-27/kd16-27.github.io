# Recovery readiness and release follow-ups — October 26, 2026

The existing portfolio review candidate remains 8aabe4b61d8789d3ba543692390db5edcd5af4e4 in Draft PR #1. This independent local recovery candidate starts at original main 0e8b2bcc974fc3fc1aac17764914710e0b7300b8. Its additive paths have no overlap with PR #1's additions/changes. It neither imports nor edits the portfolio application.

## Approval summary

**Changes required before merging PR #1: none established by this recovery review.** Pages already uses GitHub Actions and the portfolio workflow definitions are manual-only. Source merge and public launch remain separate approval gates. Recheck settings/queue and the exact resulting source immediately before an approved merge.

**Recommended source staging before first launch:** separately review and approve the recovery-only candidate's eight added files: the manual workflow, original homepage/stylesheet, capture receipt, rollback instructions, this readiness note and the two learning-record addenda. A workflow must be installed on the default branch before it can be dispatched. Staging this candidate is distinct from running it; neither staging nor runtime approval has been granted.

This staging may happen before or after PR #1's separately approved source merge. If staging happens first, verify that the approved patch includes only the recovery additions and then reassess PR #1 against updated main. Do not replace the public website, change Pages source/environment rules or dispatch any workflow as part of source staging.

**Actual recovery:** separately approve the exact recovery content SHA and the production restoration dispatch. The workflow builds a new artifact from saved files and checks their fixed hashes. It does not depend on historical run33534640713's expired artifact. See recovery/homepage/README.md for the operator procedure.

**Portfolio launch:** separately approve the exact resulting main revision/artifact after its production build/quality checks, owner content acceptance and read-only source/environment/queue recheck. A merge approval is insufficient.

## Unresolved follow-up tasks

| Task                            | Evidence and honest status                                                                                                                          | Acceptance route                                                                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-01 Firefox                    | No installed Firefox application/cached Firefox engine was available in the October 26 acceptance pass. Unverified.                                 | Run targeted navigation, focus, filters, spacing and résumé checks when available, or record owner acceptance of this first-release limitation.                                                          |
| F-02 Spoken screen reader       | VoiceOver activation timed out and subsequently was not running. No usable VoiceOver/NVDA spoken journey was completed.                             | Record real announcements, versions and outcomes for headings, landmarks, menu state/focus, filter counts/empty state, timeline and résumé/contact links, or explicitly accept the temporary limitation. |
| F-03 PDF accessibility          | Sanitized PDF is untagged; logical reading order/PDF-UA acceptance remains unverified.                                                              | Preserve HTML/text alternatives; independently review a tagged PDF improvement and its regenerated checksum before substituting it.                                                                      |
| F-04 Wider browser/device scope | Safari received targeted actual-browser checks, not a complete automated Safari suite. Physical-device acceptance was not performed.                | Complete broader checks as practical, or record the owner's bounded first-release acceptance.                                                                                                            |
| F-05 Evidence boundaries        | Credential/lab artifacts, Base44 runtime scope and original Integrity PowerShell execution remain pending; baseline discrepancy remains documented. | Keep current labels; improve evidence independently without inventing qualifications/outcomes or rewriting baselines.                                                                                    |
| F-06 Hosted recovery            | Candidate is local only; no hosted installation/run has occurred.                                                                                   | Obtain separate source-staging approval, then production recovery approval only if recovery is needed.                                                                                                   |

These are unresolved tasks, not failed implementation repairs and not automatic claims of complete accessibility. They do not silently block a source-only merge; the owner must review/accept first-release limitations before public launch. No WCAG/PDF-UA certification, new credential, new project outcome or production-recovery result is claimed.

The original October 23 full portfolio regression/build/audit dates and October 26 supplemental acceptance dates remain unchanged. New recovery-only test results belong to the dated owner handoff; do not count them as another full portfolio regression.
