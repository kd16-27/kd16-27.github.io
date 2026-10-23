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
