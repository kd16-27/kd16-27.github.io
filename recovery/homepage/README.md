# Original homepage recovery

This directory preserves the two exact public files captured on October 26, 2026 and matched against the October 23 baseline. The historical deployment artifact is not needed: a recovery run creates a new artifact from these Git-tracked files.

| File                      | Bytes | SHA-256                                                          |
| ------------------------- | ----- | ---------------------------------------------------------------- |
| site/index.html           | 2030  | 3ba378ea7c564b60fc653e415a2c3ab688e04a32adf2f5475d0060cbe69efc07 |
| site/assets/css/style.css | 76559 | 38ec41b2a4c4765872f17ff3b131f560da97704113ee4f7dc884a643c8628fca |

The HTML remains unchanged, including its stylesheet query string, canonical links, original whitespace and SRI-pinned external AnchorJS script. Do not autoformat the captured site files: three historical HTML blank lines contain trailing spaces, and changing them changes the approved recovery hash. The reference copy of that public script is retained in the owner's original local recovery package. Recovery uploads only the two files above; capture.json and these instructions are not published as website assets. This restores the former homepage and stylesheet, not portfolio pages, all historical URLs or GitHub's response headers/error pages.

## What the pieces mean

- **Commit:** a permanent Git reference to the reviewed recovery files. Record the full 40-character recovery candidate SHA from the owner handoff; use that exact SHA as recovery_commit after it has been approved and made available in this repository. Do not use a moving branch name or assume the old README-only commit contains built HTML/CSS.
- **GitHub Actions workflow:** .github/workflows/legacy-homepage-recovery.yml describes the manual restoration steps. It must first be reviewed and installed on the default branch, main. Merely merging a workflow_dispatch-only definition does not dispatch it.
- **Artifact:** the new bundle uploaded by that run from recovery/homepage/site. The restore job publishes that bundle; it does not compile Next.js or retrieve an expired historical bundle. If a bundle expires, another separately approved recovery run can regenerate it from the same Git files.

## Source staging, without launch

This local recovery-only branch is based on original main 0e8b2bcc974fc3fc1aac17764914710e0b7300b8. It adds new recovery paths and does not include unmerged portfolio source. No remote is configured in the local candidate, and a local hook refuses pushes.

After separate approval, publish/review the exact recovery candidate and merge only its additive patch into main. That installs the files/manual definition; it does not restore or launch anything. Leave Pages Source as GitHub Actions, keep the existing main-only github-pages environment and do not dispatch a workflow. This staging can be reviewed before or after the portfolio source merge, but should be complete before the first public portfolio launch so no emergency source installation is required.

If the platform rewrites commit IDs during integration, record an approved reachable commit that contains these exact files, compare the hashes and use that approved full SHA. Do not assume a locally reviewed SHA exists on GitHub after a squash/cherry-pick. Recheck PR #1 for mergeability after any separately approved main update.

## Actual rollback — separate production authorization required

1. Describe the launch problem and obtain explicit approval to replace the public portfolio with this captured original homepage. Approval to stage recovery source or merge the portfolio is not approval to restore production.
2. Confirm the installed recovery workflow matches the reviewed definition, the recorded recovery commit exists in this repository, Pages Source remains GitHub Actions, the main-only environment is unchanged and no conflicting publication run is queued/running.
3. Open repository Actions → Owner-approved legacy homepage recovery → Run workflow. Select main, enter the exact approved 40-character recovery_commit and the required approval phrase. Perform this final dispatch only after production approval.
4. The prepare job checks the commit reference, rejects symbolic links/unexpected files, checks both fixed SHA-256 values and uploads a fresh Pages artifact. The restore job waits for that result and uses the existing github-pages environment to publish it. A failed check stops before publication.
5. Record the workflow run, content commit, main workflow revision and deployed artifact/result. Fetch the public homepage and original stylesheet URL, compare the two hashes above and check HTTPS and visual presentation. If verification fails, report it; do not change expected hashes, disable protections or switch Pages to main/root.

The workflow shares portfolio-pages concurrency with the proposed portfolio release workflow and does not cancel a running deployment. Avoid dispatching competing publications. A required phrase is a procedural check, not an enforced human-reviewer identity gate. Existing environment rules and repository permissions still apply; no security setting is changed by this source patch.

## Limits and follow-ups

Hosted staging, workflow dispatch and restoration have not been performed. Local syntax, guard, negative-fixture and artifact/merge checks establish preparation only; hosted execution may still fail for permission, environment, service or dependency reasons. Recheck action availability and environment rules at the time of use.

The exact original HTML retains a public CDN dependency for optional heading anchors. Basic HTML/CSS can render without it; offline self-containment would require a separately reviewed HTML change. This does not preserve uptime, server state, redirects or every original endpoint.

Firefox acceptance, spoken VoiceOver/NVDA acceptance and the portfolio PDF's tagging/reading-order limitations remain unresolved follow-up tasks, as recorded in docs/recovery/READINESS_AND_FOLLOW_UPS.md. None passed merely because recovery is ready.

Official references reviewed October 26, 2026: [manual workflow execution](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow), [custom GitHub Pages workflows and artifact/environment requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), and [upload-pages-artifact](https://github.com/actions/upload-pages-artifact).
