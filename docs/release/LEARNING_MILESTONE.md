# Portfolio learning milestone — October 23, 2026

This milestone records the architecture available to study and a path to demonstrate independent maintenance. Codex generated substantial implementation, documentation, and verification work from Kaden’s requirements and project accounts. Delivered code and AI-run checks do not by themselves establish Kaden’s independent programming proficiency. Owner practice should be recorded with its date, changed artifact, observed result, explanation, and level of assistance.

## Follow one content record through the application

Start with `content/portfolio.ts`. It defines the profile, typed content records, schemas, and filtering helpers. `content/additional-projects.ts` and `content/milestones.ts` separate additional cases and dated milestones. TypeScript checks how code uses values; Zod checks actual content values when the module is imported. A field being a valid string does not establish the truth of its claim, so evidence review remains a human responsibility.

Route templates under `app/` turn records into pages. `app/page.tsx` composes the home page, while `app/layout.tsx` provides the shared shell and metadata. Dynamic-looking routes such as `app/projects/[slug]/page.tsx` enumerate known slugs for static generation. Changing a record can affect a card, detail page, filters, metadata, sitemap, and résumé-related statements; trace those dependencies before editing.

React components under `components/` render the reusable UI. Client components hold interactive state for search, filters, theme, and expanded content. Derived filter results should be calculated from current selections so a second stored result cannot drift out of sync. The current public application has no database, authenticated dashboard, inference endpoint, or GitHub-writing service.

The visual system lives primarily in `app/globals.css`, with Tailwind/PostCSS supporting the styling setup. Shared colors, focus outlines, responsive containers, reduced-motion behavior, labels, and native button/link semantics all affect usability. A page looking correct in one screenshot does not establish keyboard access or a narrow-screen layout.

## Understand the build and hosting boundary

`next.config.ts` selects static export and trailing-slash routes. During a production build, Next.js renders the known pages into HTML and writes deployable assets to `out/`. Server Components in this mode run during the build; their name does not imply that a live application server exists after publication. Browser JavaScript supplies the selected interactive controls. [Next.js static-export documentation](https://nextjs.org/docs/app/guides/static-exports)

`scripts/postbuild.mjs` adds the résumé text download and checks exported internal links/assets. Review generated downloads as carefully as page content: a second copy of a résumé claim can become stale. `scripts/serve.mjs` previews the static artifact on loopback and is distinct from a public hosting service. Metadata, sitemap, robots, and the final approved origin must agree before publication. Local noindex and an unlisted URL do not supply authentication.

Host behavior also matters. GitHub Pages does not become a dynamic Next.js backend, and header files intended for other providers are not automatically honored there. Public deployment requires an approved source revision, correct origin/path handling, working deep links/downloads and 404 behavior, and verification on the actual host. The release gate and deployment documentation are authoritative for the prepared workflow; this milestone does not activate it.

## Know what each check establishes

| Check or evidence                   | What to explain                                                   | What it does not prove                                      |
| ----------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| Formatting                          | Consistent source presentation                                    | Correct behavior                                            |
| TypeScript                          | Declared types and component contracts agree                      | Truth of a career claim or validity of every external value |
| ESLint                              | Configured framework, React, and code rules pass                  | Complete correctness or security                            |
| Vitest                              | Content constraints and helper behavior match meaningful examples | Every browser or deployed hosting path works                |
| Static build and postbuild          | Routes generate and inspected asset links resolve                 | Public host configuration is correct                        |
| Playwright                          | Real browser interactions work in the configured scenarios        | All devices and all human workflows are covered             |
| axe and manual accessibility review | Selected automated rules and human navigation checks              | Universal assistive-technology compatibility                |
| npm advisory audit                  | Registry reports for the reviewed dependency tree at that time    | Absence of unknown vulnerabilities                          |
| Artifact and commit hashes          | The reviewed files can be identified                              | That their content is correct or approved to publish        |

Read current scripts in `package.json` before running checks. `npm run validate` combines the configured local quality checks; browser tests are a separate script. Use the exact results in the current release report for pass/fail status and scope. This document intentionally makes no final test-count or release-completion claim.

## Independent practice exercises

Use a disposable local copy. Keep changes and evidence out of the public release until reviewed. Stop before any push, account connection, or deployment.

1. **Trace a project.** Select one real content record and identify its schema, card, route, filter result, and public evidence link. Draw the file flow in your own words. Explain why source availability differs from a deployed result.
2. **Make a bounded content edit.** Change a harmless description without increasing the claim. Run relevant checks, inspect the generated page, and confirm the source record and download still agree. Record the exact diff and reason.
3. **Demonstrate a schema failure.** Introduce an invalid status or contradictory delivery label, observe the failing check, explain which invariant rejects it, then restore the valid value. Do not weaken the schema to make the exercise pass.
4. **Reason about filters.** Predict the result of combining search, specialty, and delivery filters before opening the page. Compare the prediction with the helper and browser behavior; explain logical AND and reset behavior.
5. **Review accessibility.** Navigate with a keyboard, operate the menu and filters, change theme, and inspect a narrow viewport. Explain focus visibility, a meaningful link name, `aria-expanded`, and why each solves a different problem. Record any limitation rather than declaring universal accessibility.
6. **Verify a generated download.** Build locally, inspect the résumé download and a project deep link, and request an unknown route. Distinguish visible 404 text from the HTTP status and explain why an exported artifact must be checked after generation.
7. **Read one test critically.** Describe the behavior it protects, the realistic failure it catches, and what it misses. Add or revise a meaningful assertion only when the exercise changes a real invariant; avoid tests that merely repeat implementation text.
8. **Rehearse a release without publishing.** Identify the approved origin, source revision, artifact hash, privacy review, current checks, and rollback artifact. Explain which human approval is still required and how a later file change affects it.

## Record assistance honestly

Use separate evidence levels: **AI-produced** means the agent created or ran the work; **guided practice** means Kaden performed it with explanations or suggestions; **independent demonstration** means Kaden completed and explained a bounded task without step-by-step generation. Reviewing generated code is valuable practice but does not automatically promote it to independent demonstration.

For each exercise, record: date; goal; files changed; your prediction; observed output; checks performed; what you can explain; what required help; and the next task you can repeat independently. Repeating a task later without prompts provides stronger learning evidence than copying a successful command once. Keep private evidence local and publish only an owner-approved summary.

A suitable future milestone is a small, independently explained content or UI change with a meaningful check, an inspected local artifact, and an honest assistance note. Do not invent hours practiced, completion dates, test counts, skill levels, or employer outcomes. The six intelligent additions in `FUTURE_INTELLIGENCE_DESIGN.md` remain future plans and are not accomplishments delivered by this static release.
