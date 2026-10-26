# Deployment preparation — launch approval pending

## Recommendation and current state

Use the existing kd16-27/kd16-27.github.io repository and GitHub Pages. Next.js exports every required route and asset to static files; filters, theme, navigation and diagrams run in the browser. No required feature needs a persistent server, runtime secret or paid host. Vercel adds no required capability for this release. Any future authenticated dashboard, inference API or private processing needs a separately approved backend.

Draft PR #1 holds the owner-authorized development branch codex/portfolio-release-preparation-20261023. It retains the original README-only history based on 0e8b2bcc974fc3fc1aac17764914710e0b7300b8 and builds on reviewed checkpoints 292b186 and aecdbe9. The initial README remains in history. Branch refinements/updates and the completed source-only hosting transition are authorized; main merge, workflow dispatch, further hosting changes and public launch are not.

Earlier portfolio and application copies remain outside this repository. The local pre-push guard restricts uploads pending explicit authorization; it is not a hosted branch-protection policy.

## Completed hosting transition and current state

A read-only normal-browser audit on October 23 first identified Deploy from a branch → main → / (root). The owner then separately authorized only the transition to **GitHub Actions**, which was saved and verified after reload. The public homepage and stylesheet remained byte-identical; Actions retained only historical run 33534640713. No template, workflow run, environment change, merge or portfolio launch accompanied the transition.

The previous branch publisher is no longer the configured source. Reconfirm the source before any merge; a future change back to branch/main/root would reconnect main updates to automatic publication. The existing github-pages environment permits main only, with required reviewers and wait timer unchecked and administrator bypass checked. Manual owner approval remains a procedural gate, not a configured required-reviewer rule. HTTPS remains enforced and no custom domain is configured.

## Repeatable local build

Use Node 24 and npm ci --ignore-scripts, then formatting/types/lint/unit checks, npm run build:pages, npm run verify:export -- --public and the Chromium browser suite. Review both full and production dependency audits. The unchanged lockfile pins dependencies. Supported webpack static export writes out/, with trailing-slash routes, custom 404 and .nojekyll.

npm run build instead creates a local review export with noindex and loopback metadata. Public builds accept only the exact intended GitHub Pages HTTPS origin. Neither command publishes or modifies hosting.

## Approval sequence

1. Owner reviews the complete candidate, safe résumé, exact PR head and remaining evidence/accessibility limits. Any later source change requires appropriate checks/review.
2. Read-only recheck the already approved/completed GitHub Actions source transition, existing live content, historical deployment and main-only environment restrictions. Preserve the original transition receipt and rollback snapshots. Do not repeat the settings change or add a reviewer/rule without approval.
3. Resolve or explicitly accept outstanding accessibility and evidence limits. Spoken screen-reader acceptance stays pending until an actual usable session; DOM/axe and zoom checks do not establish it.
4. Review the recovery plan before public launch. Historical artifact downloads are unavailable; the current workflow is not an arbitrary-artifact rollback tool. Prepare/review a usable recovery route under separate authorization before relying on one.
5. Obtain **separate explicit merge approval** for the reviewed PR head, then merge only that revision. Record and verify the resulting main commit/tree. Deployment remains undispatched.
6. Rebuild/verify the exact resulting main revision. Obtain authorization for any desired hosted quality-check run; do not silently add automatic push/PR triggers. Record final artifact hash and test evidence.
7. Obtain **separate explicit public-launch approval** for that exact main commit/artifact and replacement of the landing page. Only then dispatch Owner-approved GitHub Pages release on main with the confirmation input and any separately approved environment review.
8. Verify the real public URL, HTTPS, all ten cases, responsive/keyboard navigation, direct routes, genuine 404, PDF/text downloads and PDF hash, canonical/OG/JSON-LD/robots/sitemap, outgoing links and actual response headers. Record the deployment run and terminal result.

All candidate workflow actions are pinned. Build uses contents/pages-read permissions; only the deploy job requests pages-write and OIDC. Its explicit main/confirmation checks and successful quality gates are additional safeguards, not owner approval. Candidate YAML has no push/PR trigger and was not changed by these accessibility repairs. No workflow is to be dispatched during review.

## Headers and rollback

October 26 acceptance update: a verified owner-local homepage/stylesheet recovery archive and inactive direct-artifact recovery template are now prepared. Fresh extraction, tamper rejection, local styled preview and template hash-validation checks passed. No recovery workflow/content revision is installed remotely and no hosted recovery was executed. Review/approve any installation and the exact production restoration separately. The [acceptance addendum](docs/release/RELEASE_ACCEPTANCE_20261026.md) records checksums, dependencies and remaining setup limits; the package README contains the stage-by-stage procedure. These local preparation results do not authorize changing Pages source or dispatching a workflow.

GitHub Pages does not apply public/_headers or vercel.json. Preview-server CSP and other headers are local verification behavior, not proof of hosted protection. Inspect actual hosted responses after an authorized launch. The static site provides no server authentication or data collection.

Preserve deployment history and rollback evidence before replacement. If acceptance fails, report the exact issue and obtain approval to restore the previously reviewed artifact/commit through a deployment. Do not reset or erase history, rewrite Integrity baseline evidence or point the public site at a private lab/employer system.

Before merge, restoring branch/main/root is only an option after explicit restoration approval and verification that main still equals the original 0e8b2bcc974fc3fc1aac17764914710e0b7300b8. After merge, do not restore main/root blindly: it will contain portfolio source. Prefer a separately reviewed/approved deployment of the safe prior artifact, preserving main/history. See the stage-specific [rollback plan](docs/release/MANUAL_ACCESSIBILITY_CONTENT_AND_HOSTING_REVIEW.md). Local captures preserve the prior homepage/stylesheet and README-only source; they are not the original complete Pages build artifact.

See [complete checklist](docs/release/LAUNCH_CHECKLIST.md), [current repair report](docs/release/ACCESSIBILITY_REPAIR_RELEASE_REPORT.md), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Next.js static export](https://nextjs.org/docs/app/guides/static-exports).
