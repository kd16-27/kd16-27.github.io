# Historical manual accessibility, recruiter review and hosting plan

Historical audit of aecdbe9. The implementation findings below preserve their original observed state; see [current repair verification](ACCESSIBILITY_REPAIR_RELEASE_REPORT.md) for subsequent fixes and acceptance limits. The source-only hosting transition remains recorded here.

Reviewed October 23, 2026, against commit **aecdbe931c62c40eeea5df3f8e4273039fc20b52** and the local static preview at http://127.0.0.1:3117/. Draft PR #1 remains the candidate: https://github.com/kd16-27/kd16-27.github.io/pull/1.

This document and the two journal addenda are local review notes, not a new approved release revision. Application code, public content, PDF and workflows were not edited. No commit, push, merge, workflow dispatch, environment-rule change or deployment was performed. Earlier receipts and project checkpoints remain preserved. The initial audit was read-only; the owner subsequently approved and the agent completed the source-only transition recorded below.

## Authorized follow-up — current hosting state

After reviewing the separate authorization question, the owner explicitly answered **“Authorize hosting transition only.”** Only repository Settings → Pages → Source was changed: Deploy from a branch (main/root) → **GitHub Actions**. GitHub displayed “GitHub Pages source saved.” Reloading confirmed GitHub Actions persisted. Suggested workflow Configure buttons were not used.

Immediately before and after the change, the public homepage and stylesheet returned HTTP 200 with identical hashes listed in the rollback section. Actions still displayed only the single successful historical run 33534640713; no queued/running/new workflow appeared. The environment remained main-only, without required reviewers or timer, with the same administrator-bypass setting. PR #1 remained draft and unmerged at aecdbe931c62c40eeea5df3f8e4273039fc20b52; main remained 0e8b2bcc974fc3fc1aac17764914710e0b7300b8. No rollback was needed or performed.

The former main/root branch publisher is no longer the configured source. No automatic publisher was exercised as a test; a merge was not used to prove behavior. The candidate YAML remains manual-only. Future workflow/source changes require renewed review. **Source merge and public launch remain separately unapproved, with the accessibility findings below still open.**

Evidence: owner-local evidence `github-pages-approved-source-transition.png` (persisted GitHub Actions source) and owner-local evidence `GITHUB_PAGES_HOSTING_TRANSITION_RECEIPT.json` (transition receipt). The earlier manual-review receipt preserves the initial read-only state; this follow-up supersedes its hosting-source status without overwriting that historical record.

## Decision

Content review is suitable for owner consideration, with existing evidence boundaries intact. **Unqualified accessibility acceptance is not complete.** Two reproducible interface refinements are recommended before launch, and spoken screen-reader acceptance remains unverified. The earlier 24-unit/96-browser result is a preserved regression checkpoint, not a substitute for this additional review or a fresh full-suite run today.

The read-only hosting review is complete, followed by the separately authorized source-only transition above. Source merge and public launch should remain on hold until the remaining acceptance work is resolved or explicitly accepted by the owner.

Final read-only GitHub recheck confirms draft=true, merged=false, head aecdbe931c62c40eeea5df3f8e4273039fc20b52 and base 0e8b2bcc974fc3fc1aac17764914710e0b7300b8. Fresh local privacy verification includes the review notes: 100 source files and 267 text/PDF artifacts, zero restricted-data or retired-profile matches, only the sanitized résumé, matching PDF/source hashes, and all 67 earlier portfolio checkpoint files unchanged. Only this new report and the two journal addenda are local documentation changes; no app, content, PDF, test or workflow change was made.

## Manual and supplementary accessibility results

Browser plugin/skill is not listed; native CUA browser controls and the installed Playwright integration were used. Native Chrome review used a 960-pixel-wide content viewport, verified browser zoom of 100%, 200% and 300% (320 CSS pixels at 300%). A brief 400% stress view was below the supported 320 CSS-pixel width and is not a WCAG reflow pass/fail result. Browser zoom was restored to 100% afterward. This was agent-operated keyboard/visual review, not an independent human accessibility certification.

| Check                                  | Observed result                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page identity and meaningful rendering | Homepage, projects, experience and résumé rendered at their expected local routes; no framework overlay was observed.                                                                                                                                                                                                                                                 |
| First focus / skip link                | First Tab exposes a visible skip link. Enter then Tab reaches the first main-content action, bypassing the header. Focus outline is visible.                                                                                                                                                                                                                          |
| Project filters                        | Keyboard activation changes the specialty state and results. Search produced 0/10 and a helpful empty state; keyboard Reset filters restored 10/10 and cleared the specialty/query. The results count has role=status in source. Spoken announcement was not observed.                                                                                                |
| Timeline                               | Space collapsed the current role; Tab and Enter expanded the VCU role. Expanded state and details were exposed in the native accessibility tree; dates and school-term break remained available.                                                                                                                                                                      |
| Responsive navigation                  | Toggle opens and closes by keyboard and exposes expanded/collapsed state. Forward focus ordering needs refinement; see A11Y-01. Escape did not close it. This is a disclosure, not a modal, so a focus trap is not proposed.                                                                                                                                          |
| Zoom and narrow résumé                 | Résumé introduction, text and download controls remained available at 200% and 320 CSS pixels. This is sampled review, not every route at every magnification.                                                                                                                                                                                                        |
| Text spacing                           | Applied line height 1.5, paragraph spacing 2em, letter spacing .12em and word spacing .16em at 320px. Résumé and projects remained 320px wide. Experience extended to roughly 338px; see A11Y-02.                                                                                                                                                                     |
| Reduced motion                         | Supplementary browser check exposed the reduce preference, computed scroll behavior auto, and zero active CSS animation names on the homepage.                                                                                                                                                                                                                        |
| Case studies / runtime                 | Fresh rendered-text inspection of all ten case routes returned HTTP 200 and meaningful sections, with no pageerror events during that traversal. This is not a fresh execution of the underlying applications.                                                                                                                                                        |
| Download                               | Native browser completed the sanitized 5.5 KB PDF download. Existing text alternative and HTML résumé remain available. Current PDF hash matches the receipt.                                                                                                                                                                                                         |
| Screen reader                          | Native VoiceOver shortcut produced no observable acceptance result; direct VoiceOver app acquisition timed out. The utility was inspected without editing its preferences, then closed. No spoken output/rotor reading was captured. A subsequent Settings observation was interrupted by user activity; it was not continued. Screen-reader acceptance remains open. |

### A11Y-01 — responsive navigation focus ordering (recommended P2 refinement)

At 320px on /resume/, Tab to Open navigation, activate it, then press Tab. The next focus is Print résumé instead of a navigation link. Menu links appear earlier than the toggle in DOM order and are reachable with Shift+Tab, making the flow unexpectedly backward. This was observed natively at 200% and independently reproduced through Playwright at 320px. It is an operability/usability finding, not a blanket WCAG conformance verdict.

Relevant implementation: Header in components/ui.tsx, where nav precedes header-actions/mobile-toggle. Recommended fix: give the disclosure an associated controlled navigation ID; arrange responsive DOM/focus order so forward Tab enters visible links after the trigger, and add Escape dismissal with focus returned to the trigger. Avoid adding menu roles or a modal focus trap to ordinary site navigation. Preserve desktop order and hidden-link exclusion.

Acceptance test: at 320px and desktop zoom triggering mobile layout, Tab to trigger → Enter → Tab through all visible links in logical order → Escape returns focus to trigger; closed links are absent from the tab sequence; route selection closes the disclosure. Include a real keyboard regression, not just a click/visibility assertion.

Evidence: owner-local evidence `portfolio-manual-menu-focus.png` (expanded menu / next focus). The [W3C disclosure example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) explains ordinary navigation and keyboard interaction; it is guidance, not proof that copying a pattern establishes accessibility.

### A11Y-02 — Experience heading with wider text spacing (recommended P2 refinement)

At /experience/ with a 320px viewport and the spacing overrides above, the span containing “to systems engineering.” measures from x=20 to x=337.57. Horizontal document extent is approximately 338px. Résumé and projects did not show this overflow in the same sample. Source: PageIntro in components/sections.tsx and .page-intro h1 rules in app/globals.css.

Recommended fix: let long heading words wrap under user spacing overrides, for example through a suitably scoped overflow-wrap rule and flexible heading sizing; do not hide overflowing content to make the width assertion pass. Verify all shared PageIntro headings, both themes and actual browser zoom. Recheck that content remains readable rather than relying only on document width. The measurement alone does not establish loss of information or a full WCAG failure.

Evidence: owner-local evidence `portfolio-experience-text-spacing.png` (Experience with spacing overrides). The test values follow [W3C text-spacing guidance](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).

### Remaining assistive acceptance

Use a working VoiceOver/Safari or VoiceOver/Chrome setup, or NVDA with a supported browser. Record browser/screen-reader versions and the actual announcements. Check: heading/landmark navigation; mobile disclosure and focus return; project filter status and empty-state announcements; timeline expanded/collapsed state and dates; résumé HTML/text, contact links and PDF alternatives. Record each issue and resolution. Automated axe, DOM trees and visual review cannot close this item. Additional Safari/Firefox and physical touch-device coverage was not completed here.

## Public-content and recruiter assessment

The presentation accurately prioritizes Mid-Level AV Systems Engineer experience, networked AV troubleshooting and mentoring, while software, cloud/infrastructure and AI growth remain project/lab/learning work. The completed NVX story is the clearest outcome and appears before experience in the résumé. No new technical outcome, credential, employer endorsement, deployment or performance metric was introduced.

Approved values remain: Geospatial and Cloud Analytics (GCA); KadenDiaz1627@gmail.com; “Active DoD Secret Security Clearance.”; and only https://www.linkedin.com/in/kaden-diaz-3236b4411/. Current title/dates remain June 2026–Present. Prior Junior/Intern roles remain grouped May 2025–June 2026 with the school-term break, without invented transition dates. Certifications, vendor training and coursework remain distinct and owner-reported. No CS degree is inferred from coursework.

All ten rendered case studies were read, including objective, contributions, implementation, results, evidence and next steps:

| Case                         | Assessment and retained boundary                                                                                                                                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Crestron NVX troubleshooting | Strong completed AV outcome; owner-reported, generic diagram, no workplace ticket/configuration or independent incident proof.                                                                                               |
| OptiPlex Linux laboratory    | Useful infrastructure practice; installed monitoring is owner-reported pending artifacts, without uptime or alert reliability claims.                                                                                        |
| Vector Learning              | Founder/product direction is appropriate; current public feature scope, adoption and AI capabilities remain unverified or planned.                                                                                           |
| Rack restoration             | Component recovery remains in progress, without a complete rack/UPS/end-to-end success claim.                                                                                                                                |
| AV Portfolio Suite           | Local calculation prototype with 14 local checks; dashboard/commissioning data remain simulated and upstream source is distinct from the improved copy.                                                                      |
| Cloud/DevOps learning        | Learning track with records pending; no completed internship project, professional cloud operation or issued credential inferred.                                                                                            |
| Engineering portfolio        | Static local implementation with explicit AI assistance; owner-independent coding proficiency and public deployment remain separate. New findings qualify its accessibility wording.                                         |
| AV Integrity Lab             | Separate Python companion's 19 CLI checks do not establish a fresh PowerShell run. Hash-prefix discrepancy 209AB01F versus baseline 1197A628 and historical PASS evidence remain documented; no baseline/evidence rewritten. |
| Cloud Task Suite             | Improved local copy's 34 SQLite checks remain separate from historical 31 checks/25 tuned cases; no independent accuracy benchmark, AWS or other runtime claim.                                                              |
| AV Operations Command Center | Existing Base44 prototype and seven inspected schemas; no inferred frontend stack, working access controls, public deployment or completed operations workflow.                                                              |

Generic illustrations remain labeled conceptual/simulated, without employer topology, private addressing, staff/contact records or restricted details. The generic simulated-dashboard graphic used for Integrity/Base44 is safe but could be replaced later with a more relevant conceptual visual. No LinkedIn profile edit/post/account-management action was performed here.

### Sanitized résumé assessment and optional phrasing

Both PDF pages were visually reviewed: clear single-column hierarchy, readable text, no observed clipping, and a relevant first-page outcome. Two pages are reasonable for the broad engineering/project profile; a later job-specific AV version could shorten project coverage without deleting evidence limits. Do not promote every learning topic into a job title or professional proficiency claim.

Suggested replacements below are **drafts only**, not applied to HTML, JSON, text or PDF:

| Current area               | Cleaner proposed wording, preserving scope                                                                                                                                                                                                                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile                    | Mid-Level AV Systems Engineer focused on federal and enterprise AV/VTC integration, networked AV troubleshooting and technician mentoring. Founder and lead developer of Vector Learning, developing software, infrastructure, cloud and AI engineering skills through personal labs and AI-assisted projects. Active DoD Secret Security Clearance. |
| NVX highlight              | Diagnosed conflicting encoder/decoder roles in a Crestron NVX video path, corrected the source configuration and guided technician verification to restore video. Retain the adjacent completed owner-reported evidence label.                                                                                                                       |
| Current-role second bullet | Diagnose signal-flow, HDCP/EDID and connectivity issues; support AV drawings, bills of materials, service coordination and technician mentoring.                                                                                                                                                                                                     |
| OptiPlex project           | Personal Ubuntu, SSH and KVM/QEMU lab with owner-reported Prometheus, Grafana and Uptime Kuma installations; supporting artifacts and operational validation pending.                                                                                                                                                                                |
| Cloud Task Suite           | Flask/SQLite prototype for duplicate review, protected records, atomic reservations and source-labeled retrieval; 34 tests passed in a separate improved local copy.                                                                                                                                                                                 |
| Base44 project             | Base44 AV operations prototype with seven reviewed entity schemas; live workflows and public deployment remain unverified.                                                                                                                                                                                                                           |
| Portfolio project          | AI-assisted Next.js, React and TypeScript portfolio with ten case studies, evidence filtering and automated checks; locally tested. Owner-led practice remains recorded separately in the journal.                                                                                                                                                   |

Keep the prior-role combined date range/break and credentials evidence note. Preserve the exact approved employer/contact/clearance. If any draft is adopted, regenerate all three résumé formats, inspect both PDF pages and reverify the source/PDF receipt and actual downloaded bytes.

PDF limitation: it is selectable text but untagged, without a logical structure tree or clickable URI annotations. Extracted order begins with the footer, so visual readability does not establish screen-reader reading order or PDF/UA. Keep HTML/text alternatives prominent; tagged-PDF remediation and clickable professional links are useful follow-up work. The PDF was not modified or regenerated in this review.

Current PDF SHA-256: **32ed7a02d818466f91f9fd893414cff16eaa34b5d3cc8b6088c02e258207d025**.

## Read-only GitHub Pages findings

Observed directly in the authenticated normal browser on October 23:

| Item                     | Existing setting/evidence                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Source                   | Deploy from a branch                                                                                                      |
| Publishing target        | main, / (root)                                                                                                            |
| Public URL               | https://kd16-27.github.io/                                                                                                |
| Domain/HTTPS             | No custom domain entered; default-domain HTTPS enforced                                                                   |
| Last deployment          | Successful pages build and deployment run 33534640713, September 1, 2026; commit 0e8b2bcc974fc3fc1aac17764914710e0b7300b8 |
| Historical artifact      | Run shows Artifacts –; downloadable historical artifact not confirmed                                                     |
| github-pages environment | Selected branches/tags: main only; 1 branch, 0 tags                                                                       |
| Reviewer/timer           | Required reviewers unchecked; wait timer unchecked; administrator bypass checked                                          |
| Secrets/variables        | Environment UI reports none; no secret values inspected                                                                   |

The source dropdown was expanded read-only to confirm GitHub Actions is offered, then dismissed without selection. No setting was saved. owner-local evidence `github-pages-read-only-settings.png` (Settings evidence) and owner-local evidence `github-pages-existing-protection-rules.png` (existing protections) are retained.

An update/merge to main can cause the current branch publisher to rebuild and publish. Manual-only candidate YAML does not disable that dynamic publisher. GitHub Actions appearing in historical run history also does not prove the source has already switched. GitHub documents [branch publication and source selection](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

The current .github/workflows/ci.yml and pages.yml have workflow_dispatch only, with no push/PR triggers. The deploy workflow additionally checks main and the explicit confirmation string; that input is a procedural gate, not identity-based approval. GitHub does not associate Pages with just one selected workflow, so inspect any future publishing workflow as well. No existing required-reviewer gate should be claimed.

### Reviewed transition procedure — approval 1 subsequently executed above

1. Recheck PR head, unchanged main, current live bytes, source/HTTPS, deployment history and any queued/in-progress Pages runs. Retain the backup receipt. Do not merge while a legacy publishing run could race the transition.
2. In repository Settings → Pages → Build and deployment → Source, select **GitHub Actions** in place of Deploy from a branch. Treat that selection itself as the settings mutation; do not select it during a read-only review or assume a later Save is the only action.
3. Do not choose Configure on a suggested workflow, add a template, enable an automatic trigger, run/re-run a workflow, change environment rules, change the domain or unpublish the site. No new service is necessary.
4. Reload settings and verify Source is GitHub Actions. Inspect Actions/deployments for unexpected queued/running publishers, re-read environment main-only restriction, and verify the existing live page and stylesheet still match the recorded checksums. Site preservation is an acceptance condition, not a guaranteed claim before the change.
5. If the site changes, a publisher is queued unexpectedly or preservation cannot be verified, stop before merge and report the observed state. Cancellation, republishing, a reviewer-rule change or rollback is a separate consequential action requiring authorization.

This switches the publishing mechanism, not the candidate into production. A later merge will add manual workflow definitions to main, but must not dispatch them. The [custom-workflow requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) explain artifact upload, environment and deployment permissions.

### Rollback and recovery — documented, not executed

Read-only backups are in the owner-local portfolio-current-site-backup/ directory (index.html, stylesheet and receipt.json), and the owner-local portfolio-current-site-source-before-transition.zip preserves the original README-only source commit. The captured homepage remains HTTP 200, 2,030 bytes, SHA-256 **3ba378ea7c564b60fc653e415a2c3ab688e04a32adf2f5475d0060cbe69efc07**. Stylesheet SHA-256 is **38ec41b2a4c4765872f17ff3b131f560da97704113ee4f7dc884a643c8628fca**. The stylesheet has no additional URL dependencies; HTML retains its existing external AnchorJS CDN reference. These are captured public responses, not the original complete Pages build artifact.

**Before merge:** if the transition needs reversing, obtain explicit restoration approval. First confirm main still equals 0e8b2bcc974fc3fc1aac17764914710e0b7300b8 and no conflicting deployment is pending. Only then restore Source → Deploy from a branch, main, / (root), and Save if presented. This can trigger a rebuild/publication of the legacy landing page; it is not a read-only undo. Check the resulting deployment and live content. If main has advanced, do not use this procedure.

**After merge or launch:** never restore main/root blindly, because main will contain new portfolio source. Preferred recovery is an explicitly reviewed Actions deployment of the preserved safe landing-page artifact (or another known-good approved artifact), leaving main/history intact and Source on GitHub Actions. The current release workflow always builds the portfolio and has no arbitrary rollback-artifact input; this recovery route needs a reviewed rollback procedure/workflow before use. Do not assume re-running the historical run works: its artifact is absent and its old source lacks the new workflow. A source-only Jekyll rebuild might differ from the captured bytes.

If Actions recovery is unavailable, an alternative requiring explicit branch-creation/settings/publication approval is a dedicated rollback branch at the preserved original source commit, then Pages branch publication from that branch/root. The environment currently permits main only; any additional branch rule must be separately reviewed/approved. Do not create this branch, expand access, reset main, force-push or delete deployment history as part of the read-only review.

For either recovery, record the approval, exact source/artifact hash, run, terminal result and live response. Verify HTTPS, landing-page content, assets and absence of unintended new portfolio routes; clearing old portfolio routes/404 behavior must be checked after restoring a minimal artifact. Keep the defective candidate for diagnosis. A rollback is itself a production deployment, not already authorized by launch approval. GitHub's [deployment-history guide](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/view-deployment-history) describes where to inspect associated commits, statuses and logs.

## Three separate authorization gates

1. **Hosting transition only:** explicit authorization to change this repository's Pages Source from branch/main/root to GitHub Actions and perform read-only verification. No merge, dispatch, environment-rule change or launch is included. Any restoration needs its own explicit approval unless the owner explicitly includes the precise pre-merge restoration contingency.
2. **Source merge only:** request separately after the transition is verified and the owner has reviewed the exact final PR head plus acceptance findings. Recommend resolving the two interface findings and screen-reader acceptance before approving that final head. A later refinement changes the commit being approved. Merge approval does not authorize dispatch or launch.
3. **Public launch only:** request separately for the exact resulting main commit and verified artifact after content approval, affected regression/privacy checks, accessible alternatives and a usable reviewed recovery route. Only then may the manual release workflow be dispatched. Any hosted quality-only run also needs authorization under the existing plan.

The initial review request authorized none of these changes. Subsequent explicit approval authorized only gate 1, now completed and verified above. Gates 2 and 3 remain unapproved; rollback/environment changes are also unapproved. PR #1 remains draft and unmerged. No paid service or unapproved automation was activated.
