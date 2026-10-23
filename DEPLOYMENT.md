# Deployment preparation — launch approval pending

## Recommendation and current state

Use the existing kd16-27/kd16-27.github.io repository and GitHub Pages. Next.js exports every required route and asset to static files; filters, theme, navigation and diagrams run in the browser. No required feature needs a persistent server, runtime secret or paid host. Vercel adds no required capability for this release. Any future authenticated dashboard, inference API or private processing needs a separately approved backend.

Draft PR #1 holds the owner-authorized development branch codex/portfolio-release-preparation-20261023. It retains the original README-only history based on 0e8b2bcc974fc3fc1aac17764914710e0b7300b8, preserves the original README, and builds on reviewed commit 292b1868460ff8d4fc749791da8482c56f6863ed. Branch refinements are authorized; main merge, hosting changes and public launch are not.

Earlier portfolio and application copies remain outside this repository. The local pre-push guard restricts uploads pending explicit authorization; it is not a hosted branch-protection policy.

## Existing hosting and merge side effects

A read-only normal-browser check of repository Settings → Pages on October 23 confirms **Deploy from a branch**, branch **main**, directory **/ (root)**, with HTTPS enforced. The last displayed deployment is historical run 33534640713. The original public README homepage remains served. No setting was changed.

**Updating main can trigger that existing branch-based publication.** The candidate's manual-only workflows do not disable it. Do not merge on the assumption that deployment will wait for a manual dispatch.

## Repeatable local build

Use Node 24 and npm ci --ignore-scripts, then formatting/types/lint/unit checks, npm run build:pages, npm run verify:export -- --public and the Chromium browser suite. Review both full and production dependency audits. The unchanged lockfile pins dependencies. Supported webpack static export writes out/, with trailing-slash routes, custom 404 and .nojekyll.

npm run build instead creates a local review export with noindex and loopback metadata. Public builds accept only the exact intended GitHub Pages HTTPS origin. Neither command publishes or modifies hosting.

## Approval sequence

1. Owner reviews the complete candidate, safe résumé, exact PR head and remaining evidence/accessibility limits. Any later source change requires appropriate checks/review.
2. **Before any merge, obtain explicit approval for the existing Pages-source transition.** Record current source/settings, public response, deployed commit/artifact and rollback state.
3. Only after that approval, switch the existing source to GitHub Actions **without dispatching a deployment**. Verify the legacy main/root branch publisher is no longer active and the current site remains preserved. If preservation or trigger behavior cannot be established, stop before merge and resolve it with the owner.
4. Check github-pages environment/branch restrictions and review protections available without a paid upgrade; record any limitation and agreed manual gate.
5. Obtain **separate explicit merge approval** for the reviewed PR head, then merge only that revision. Record and verify the resulting main commit/tree. Deployment remains undispatched.
6. Rebuild/verify the exact resulting main revision. Obtain authorization for any desired hosted quality-check run; do not silently add automatic push/PR triggers. Record final artifact hash and test evidence.
7. Obtain **separate explicit public-launch approval** for that exact main commit/artifact and replacement of the landing page. Only then dispatch Owner-approved GitHub Pages release on main with the confirmation input and required environment review.
8. Verify the real public URL, HTTPS, all ten cases, responsive/keyboard navigation, direct routes, genuine 404, PDF/text downloads and PDF hash, canonical/OG/JSON-LD/robots/sitemap, outgoing links and actual response headers. Record the deployment run and terminal result.

All candidate workflow actions are pinned. Build uses contents/pages-read permissions; only the deploy job requests pages-write and OIDC. Its explicit main/confirmation checks and successful quality gates are additional safeguards, not owner approval. Candidate YAML has no push/PR trigger; the current legacy publisher above remains active until an authorized transition is completed.

## Headers and rollback

GitHub Pages does not apply public/_headers or vercel.json. Preview-server CSP and other headers are local verification behavior, not proof of hosted protection. Inspect actual hosted responses after an authorized launch. The static site provides no server authentication or data collection.

Preserve deployment history and rollback evidence before replacement. If acceptance fails, report the exact issue and obtain approval to restore the previously reviewed artifact/commit through a deployment. Do not reset or erase history, rewrite Integrity baseline evidence or point the public site at a private lab/employer system.

See [complete checklist](docs/release/LAUNCH_CHECKLIST.md), [current report](docs/release/FINAL_CANDIDATE_REPORT.md), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Next.js static export](https://nextjs.org/docs/app/guides/static-exports).
