# Portfolio developer skills journal

## October 22–23, 2026 — audit, preservation and local improvements

Owner: Kaden Diaz, founder/technical project owner and developer. The owner supplied requirements, professional history, project identity corrections, public-content constraints and local-copy authorization. Codex performed the implementation and automated checks. Independent owner practice and mastery are not presumed.

| Area                          | Delivered learning artifact                                            | Current learning evidence                                 | Independent exercise                                             |
| ----------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- |
| Source control/preservation   | Remote commit inventory, original source hashes, isolated local copies | Implementation reviewed; owner practice pending           | Compare baseline hashes and name only intended changes           |
| TypeScript/runtime validation | Project delivery schema and URL/date guards                            | 14 portfolio unit tests; code assistance explicit         | Reject an unsupported claim, then explain the failure            |
| React state                   | Intersecting project filters and complete reset                        | Real browser interaction checks                           | Add one filter without duplicating derived state                 |
| CSS/accessibility             | Preserved design, theme contrast fix, narrow-layout checks             | Browser/axe tests; human screen-reader acceptance pending | Complete a keyboard-only journey at narrow width                 |
| APIs/data modeling            | Curated public GitHub evidence; Base44 schema audit                    | Read-only connected sources and local schema checks       | Explain a schema default versus enforced authorization           |
| Python/data validation        | AV quantities and Cloud normalized input limits                        | Real unit/endpoint tests in separate copies               | Add a boundary case with a hand-calculated expectation           |
| CLI/reporting                 | Integrity companion and lab dry-run tool                               | Real fixture/subprocess tests                             | Observe exit status on drift without rewriting baseline          |
| Tokenization                  | Vector incomplete-fence fix                                            | Local ordinary unit suite; no release implication         | Add a CRLF unfinished-fence regression                           |
| Deployment/security           | Static export, pinned versions, manual CI proposal, host review guide  | Build and local checks; no public deployment              | Explain canonical URLs, response headers and rollback separately |

Record your own practice below with date, exact files changed, command/result, what you understood, what still confused you, and whether you completed the exercise independently. Do not convert delivered AI-assisted code into a claim of independent proficiency. Vector's original skills journal and development plans remain untouched.

## October 23 — release preparation milestone

- **TypeScript / JavaScript:** getSiteConfig validates a public origin rather than trusting arbitrary environment values. Build scripts set non-secret mode/origin and the export checker inspects the actual generated metadata. Exercise: add a failing test for an origin with credentials; explain why an exact allowlist rejects it.
- **React / content architecture:** the résumé page is rendered at build time from content/resume.json; the text generator and optional PDF tool use the same source. Hash receipts catch stale PDF/source pairs. Exercise: edit one safe sentence in a disposable copy, observe the receipt failure, regenerate and inspect both PDF pages.
- **Testing / debugging:** unit checks establish content invariants; browser interactions establish filters, navigation and downloads; axe checks automated accessibility; visual review checks real layout. Exercise: trace one failure from browser output to its component/data source without weakening the expected behavior.
- **DevOps / source control:** local branch retains upstream history, pinned manual workflows keep publication explicit, and Pages hosts the verified static artifact. Exercise: explain build versus push versus merge versus deployment and identify which step exposes public source.
- **AI engineering:** future assistant and draft pipelines are designed around approved evidence, abstention, server-side authorization and human publication review. No model service is activated. Exercise: create five unsupported-qualification questions and write the required abstaining answers.

Exact fresh results are in docs/release/RELEASE_VERIFICATION.md. These are AI-assisted delivered artifacts; owner-independent practice has not yet been demonstrated. Record date, files, observation and independent/guided status when exercises are completed.

## October 23 — recruiter presentation and authoritative identity

- **Shared content architecture:** HTML, text and PDF use content/resume.json. Highlights and project-status fields keep outcome and delivery evidence distinct. Exercise: add an evidence-backed highlight in a disposable copy and trace it through all three formats without inventing an outcome.
- **JavaScript / TypeScript interoperation:** professional-links.mjs and resume-text.mjs expose typed contracts through .d.mts files. TypeScript caught the initially missing declaration (TS7016); the declaration fixed the contract without disabling strict checks. Exercise: change a helper call to pass the wrong type and explain the error.
- **URL/API boundaries:** the current approved LinkedIn identity is independent of a browser session. URL parsing checks protocol, host, path, credentials and query data; escaped metadata is inspected too. Exercise: explain why a prefix comparison cannot distinguish two similar profile slugs, then test a misleading URL.
- **Testing and debugging:** publication-copy regressions initially failed as intended. Independent review caught a case-sensitive owner-reported assertion; a case-insensitive assertion preserves the evidence requirement while allowing normal sentence capitalization. Exercise: reproduce the failure and explain why deleting the assertion would lose protection.
- **Build and PDF artifacts:** postbuild rejects unapproved LinkedIn profiles in exported text; the PDF generator validates its source identity and produces a checksum receipt. Exercise: change JSON without regenerating the PDF, observe the receipt failure, regenerate and inspect both pages.
- **Source control and release:** reviewed commits update the same draft branch. Publishing source, merging main and deploying a website remain separate actions. Exercise: compare the prior and new commit and identify which files affect visible content, test coverage and release documentation.

Codex implemented and verified this milestone from owner direction. Record owner-led practice separately with date, exact files, prediction, observed result and guidance level. No profile edits/posts, account deletion, paid AI activation or public website launch is an accomplishment of this work.

## October 23 — manual acceptance and read-only hosting review

Reviewed candidate aecdbe9 without changing application code, public copy, PDF or workflow definitions. Detailed results and proposed wording are in docs/release/MANUAL_ACCESSIBILITY_CONTENT_AND_HOSTING_REVIEW.md. These local notes are not a new release commit, source merge or public launch.

- **React and keyboard architecture:** Header in components/ui.tsx renders navigation before the mobile toggle. Manual opening followed by forward Tab reaches the page action instead of navigation links; earlier visibility tests did not detect the ordering. Exercise: in a disposable copy, fix disclosure order/focus, associate the controlled navigation, and prove forward Tab and Escape behavior without adding a modal trap.
- **CSS and adaptable text:** PageIntro in components/sections.tsx and its stylesheet rules were tested with wider text spacing at 320px. Experience extends to about 338px while the sampled résumé/projects remain 320px. Exercise: preserve visible text while fixing wrapping, then inspect every shared intro in both themes; hiding overflow is not a solution.
- **Test boundaries:** Native keyboard, visual inspection, accessibility trees, Playwright checks and spoken assistive acceptance answer different questions. Native VoiceOver acceptance could not be established; the PDF remains untagged. Exercise: record an actual screen-reader journey through headings, a filter status, disclosure and download, with browser/tool versions and observed announcements.
- **Content architecture and PDF:** Suggested résumé phrasing is kept separate from approved content. Any adopted edit must flow through shared JSON, HTML/text generation, PDF rendering and the checksum receipt. Exercise: explain why a readable visual PDF can still have poor logical reading order or non-clickable links.
- **DevOps:** Read-only Pages settings confirm main/root branch publication; existing github-pages restriction permits main only, without required reviewers. Workflow_dispatch YAML does not disable the legacy publisher. Exercise: explain source transition, source merge and artifact deployment as three independently approved changes.
- **Recovery:** Preserved the current public homepage/stylesheet and original source archive with hashes. Historical deployment artifacts are unavailable; post-merge restoration cannot blindly reuse main/root. Exercise: choose a safe pre-merge versus post-merge recovery path and list the settings, source and artifact checks before requesting approval.

The new manual checks found two refinements despite the prior 24-unit/96-browser checkpoint. Codex performed the agent-operated review and drafted suggestions; owner-independent practice and screen-reader acceptance remain unrecorded. During this initial read-only phase, no hosting source, protection rule, public deployment, paid service or LinkedIn account content was changed.

### Subsequent owner-approved hosting transition

The owner explicitly approved only changing Pages Source to GitHub Actions. Codex changed that setting and confirmed it persisted after reload; the existing homepage and stylesheet hashes stayed identical and Actions retained only the historical successful deployment. PR #1/main and environment rules stayed unchanged; no dispatch, merge or launch occurred. The transition receipt is retained separately from the earlier read-only receipt.

Exercise: compare the before/after source screenshots and response hashes. Explain why “GitHub Actions source” is not a deployment, why a manual workflow definition is not a run, and why changing back to main/root after a future merge could publish unintended content. Do not perform this exercise on production settings. Source merge, public launch and any rollback require their own explicit approval.

## October 23 — final accessibility repairs and review-branch preparation

Owner authorized implementation, regression checks and reviewed commits to the same development branch, while retaining separate merge and deployment approvals. Codex implemented the repairs; owner-independent coding/assistive-testing proficiency is not inferred.

- **DOM and React:** Header uses the existing link data for desktop/mobile presentations. Only the active presentation is exposed; the mobile trigger now precedes its links naturally. Refs target DOM controls, state controls the disclosure, and handlers distinguish Escape/link closure (restore focus) from ordinary focus exit (continue into content). No positive tabindex or focus trap is used.
- **Debugging events:** A regression exposed browser blur occurring before a breakpoint change event. The handler retains only the newly hidden focus target long enough to move to the visible navigation control. Exercise: explain the observed event order and why focusing the first header link on every resize would steal unrelated focus.
- **CSS:** Flexible heading-word wrapping and journal-link wrapping replace overflow without clipping. Independent review found a 681px boundary gap, addressed with narrow desktop header spacing and new 680/681 coverage. Exercise: remove one scoped rule in a disposable copy and identify the exact layout assertion it breaks.
- **Contrast and responsiveness:** Removed navigation color interpolation after the wider matrix caught a transient low-contrast theme color. Actual native Chrome 200% zoom was checked separately from CSS viewport simulations; zoom was restored afterward.
- **Tests:** Original menu and Experience defects failed first. Additional failures exposed journal-link overflow and the desktop boundary. The new suite exercises actual keyboard behavior, focus restoration, dimensions, both themes and axe with spacing overrides. Exact final counts and limitations belong in docs/release/ACCESSIBILITY_REPAIR_RELEASE_REPORT.md.
- **Release/security:** Existing public facts, résumé/PDF checksum, approved LinkedIn identity and ten case boundaries are retained. The launch checklist now records the already completed GitHub Actions source transition. Merge, hosted workflow dispatch, public launch, further hosting/environment changes and paid services remain unapproved.

See DEVELOPER_WALKTHROUGH.md for file/function explanations and short exercises. Spoken screen-reader acceptance remains pending until an actual usable assistive session is recorded; the PDF remains untagged with HTML/text alternatives. Owner-led practice should record date, exact edit, prediction, observed result and guidance level.

## October 26 — release acceptance and recoverability

Codex prepared a local recovery archive for the former Pages homepage/stylesheet, preserving exact public bytes and checking hashes after fresh extraction. Its verifier rejects deliberate changes; a loopback preview resolves the original query-string stylesheet. An inactive manual restoration template validates a fixed file set and exact reviewed content revision before direct artifact upload, avoiding the new portfolio build. No template was installed or executed remotely.

Targeted actual Safari checks exercised accordion state, 320/390px layouts, theme, mobile Option-Tab/Escape/focus, search narrowing, Integrity evidence and résumé controls. Firefox was unavailable. VoiceOver activation timed out and remained inactive, so spoken acceptance is still pending. Normal Chrome rechecked the approved LinkedIn destination. Twenty-four unit tests were rerun, along with ten route and actual PDF HTTP/hash checks. The full 132 Chromium checks/builds/audits remain October 23 evidence; October 26 push and acceptance dates do not change that history.

Concepts: a content hash identifies bytes, while a successful local preview proves only bounded local behavior. A deployment artifact is different from source and from the workflow that uploads it. A template's manual trigger is a procedural control, not a required reviewer. Recovery needs an approved artifact, a usable deployment path and post-restoration verification; an expired historical artifact is not a plan.

Exercises in a disposable extracted package: run verify.py, change one character of its copied index.html and confirm rejection, then discard that disposable copy. Explain why changing expected hashes defeats integrity checking. Trace how the stylesheet URL's query string resolves to the captured file. Compare Safari's preview canvas scale with actual browser zoom, and write a spoken-test record only after observing real announcements. Do not install/run the recovery template or change production settings as an exercise.

Owner-independent implementation, assistive testing proficiency, issuer verification and production reliability are not inferred. Original applications/checkpoints and baseline evidence remain preserved. Exact acceptance limits and the recovery digest are in docs/release/RELEASE_ACCEPTANCE_20261026.md.
