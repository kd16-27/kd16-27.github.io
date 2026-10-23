# Dependency review — October 23, 2026

The fresh complete-tree and production-only npm audits both report **zero vulnerabilities**. The five high findings in the October 22 checkpoint were five package entries tracing to one underlying advisory, not five independent vulnerabilities. That advisory was withdrawn on October 23. No dependency or lockfile changes were needed for this result.

## Evidence and scope

- Candidate: `portfolio-release`, version `1.0.0`.
- Installed: Next.js `16.4.2`, React/React DOM `19.3.1`, ESLint `9.39.5`, framework lint configuration `16.4.2`.
- Tools: Node.js `24.21.0`, npm `11.19.0`.
- Successful online audits: October 23, 2026, **14:44 UTC / 10:44 a.m. America/New_York**. Both commands exited `0` and returned an empty `vulnerabilities` object.
- Commands: `npm audit --json` and `npm audit --omit=dev --json`, with fresh dedicated local caches. The initial sandboxed attempts failed DNS resolution; successful network-enabled retries supplied the results above.
- Reviewed lockfile SHA-256: `06796bbddbed7ea70db5de4c70f82ffacf810337455c362ed231eaf0f2882ce7`.

The audit uses registry advisory data for the configured package tree; omitted development packages are excluded from the production submission. A successful zero result describes known advisories at that time. [npm audit documentation](https://docs.npmjs.com/cli/v11/commands/npm-audit/)

## The five previous findings

The original audit entries are preserved below in their original order. All five remain installed, are marked development-only in the lockfile, and received the same current verdict: **not actionable as this reported advisory**, with high confidence from the official withdrawal and fresh registry results.

| Previous package entry     | Installed version | How the previous audit connected it | Current result          |
| -------------------------- | ----------------- | ----------------------------------- | ----------------------- |
| `@next/eslint-plugin-next` | `16.4.2`          | via `fast-glob`                     | No active audit finding |
| `braces`                   | `3.0.3`           | root advisory GHSA-vfj7-8cjw-p6xm   | Advisory withdrawn      |
| `eslint-config-next`       | `16.4.2`          | via `@next/eslint-plugin-next`      | No active audit finding |
| `fast-glob`                | `3.3.1`           | via `micromatch`                    | No active audit finding |
| `micromatch`               | `4.0.8`           | via `braces`                        | No active audit finding |

Installed path, confirmed using `npm ls` and the lockfile:

```text
eslint-config-next@16.4.2
└─ @next/eslint-plugin-next@16.4.2
   └─ fast-glob@3.3.1
      └─ micromatch@4.0.8
         └─ braces@3.0.3
```

The original claim concerned denial of service from deeply nested brace patterns. GitHub states that it withdrew **GHSA-vfj7-8cjw-p6xm / CVE-2026-93687** on October 23, 2026 because the issue is not practically exploitable. Its retained historical record lists `braces <=3.0.3` and no patched version. [Official withdrawn advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)

**Withdrawn does not mean patched.** The installed `braces` code remains version `3.0.3`; npm still reports that version as the latest release in the October 23, 14:45 UTC metadata check. The warning disappeared following advisory reassessment, without a software update. No patched release is claimed here. [npm registry metadata](https://registry.npmjs.org/braces/latest)

## Exposure and recommended action

The relevant surface is local development linting. The reviewed `SECURITY.md` describes a static portfolio with trusted local content. `eslint.config.mjs` loads the framework lint configuration; `next.config.ts` selects static export; `scripts/serve.mjs` serves files from `out`. The dependency and configuration evidence does not establish a visitor-controlled path into these linting packages. This is static evidence, not a runtime exploit test.

Keep the compatible pinned dependencies and lockfile. Do not apply the old audit suggestion to downgrade `eslint-config-next` to `14.2.35`, and do not add a `braces` override solely to address this withdrawn advisory. Update release documentation to distinguish the historical five findings from the current zero result. Repeat both online audits before the eventual public release and after dependency changes.

No active remaining registry findings were observed. No source packages, dependencies, lockfiles, remote repositories, hosting settings, or published sites were changed during this dependency review.

## Limits and retained evidence

This review covers the supplied five audit entries and current npm advisory results. It does not prove the absence of unknown vulnerabilities, verify package signatures or integrity of every installed file, replace application security review, or validate deployed hosting behavior. Static-export configuration and development-only package classification are supporting exposure evidence, not a blanket guarantee about every future build or configuration.

Local evidence is retained outside the release tree in `work/release-review/dependencies/`: the previous audit snapshot, full and production audit JSON, installed dependency tree, registry metadata, check context, and npm request logs. No runtime tests, builds, applications, or proof-of-concept payloads were run as part of this advisory review.
