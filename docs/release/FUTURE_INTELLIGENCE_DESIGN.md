# Future portfolio intelligence — proposed design

Prepared October 23, 2026. **All six additions below are planned and unimplemented.** This document does not activate an AI service, GitHub integration, dashboard, reminder, publication job, or paid account. The current release remains a static portfolio. Design review and a separate implementation request come before product changes.

## Intent and architectural choice

Help Kaden maintain an accurate portfolio from approved evidence, with a visible distinction between professional experience, personal practice, AI assistance, and future plans. Every public statement should have a reviewable source and owner approval. Automation should reduce drafting effort without becoming an authority on accomplishments.

Proposed approach: keep the public Next.js static export and add local draft tooling first. Introduce a separate authenticated service only if the owner later approves private dashboard access or AI inference. This preserves a small public surface and makes the new server responsibilities explicit. Request-dependent authentication and dynamic APIs cannot be supplied by the existing static export alone. [Next.js static-export guidance](https://nextjs.org/docs/app/guides/static-exports)

Alternatives considered: manually maintained static records require the least infrastructure and remain the default; a fully dynamic portfolio could consolidate editing and AI but adds operational, privacy, and cost responsibilities. The separate-service approach is a recommendation, not an owner-approved platform choice. No provider, model, database, subscription, domain purchase, or budget is selected.

Proposed state flow:

```text
approved evidence → private/local draft → source and confidentiality review
→ owner-approved content patch → QA on exact revision
→ separate publication approval → published static artifact
```

## 1. Verified-source experience assistant

Purpose: answer questions about public projects and skills using only an owner-approved corpus. A source record should include its stable ID, public URL or approved excerpt, revision/hash, reviewed date, claim scope, and evidence class. Employer documents, private repositories, original résumé PDFs, credentials with private identifiers, and lab network details stay outside the public corpus.

Proposed flow: validate a bounded question; retrieve approved passages; generate a concise answer; check each factual claim against the retrieved sources; return citations beside supported claims. A citation should identify the actual project page or source revision, not merely the portfolio homepage. Retrieval similarity is not proof. The system should say “I don’t have verified evidence for that” when support is absent, conflicting, stale, or insufficient. Source unavailability must not silently become a confident answer.

Treat source text and visitor questions as untrusted data. Neither may override the source allowlist, reveal private evidence, run tools, change content, or authorize GitHub writes. Keep model credentials exclusively on the server; never put them in public environment variables, generated HTML, browser bundles, or local storage. Add input/output bounds, request limits, timeouts, an off switch, and approved spending limits before enabling inference. Default to no retained visitor conversation; any later retention requires a documented purpose and deletion policy.

Acceptance examples: an unsupported employment-date question abstains; a simulation stays labeled a simulation; an AI-generated implementation is not described as independent mastery; conflicting evidence produces uncertainty; a prompt asking for private documents is refused without disclosing those documents. Run an approved evaluation set before enabling access. A static curated Q&A is the no-inference fallback.

## 2. Approval-only GitHub milestone drafting

Purpose: turn selected public development evidence into drafts the owner can verify. Start with an explicit repository allowlist and manually supplied public commit/PR URLs. A future read-only importer may retrieve only those approved repositories; it should not enumerate private repositories or use a visitor token.

Each draft should retain repository, immutable revision, event date, review date, changed files, relevant check evidence, AI-assistance disclosure, proposed claim, and limitations. A merged commit proves a code change, not deployed behavior, hardware commissioning, or owner competence. Repeated imports should use repository plus revision as a stable key and update the existing draft rather than publish duplicates. Repository text cannot issue instructions to the importer.

Default output is a local/private draft and a proposed content diff. Owner approval is required before any GitHub write, including opening a draft PR. A later approved GitHub App should have only the permissions needed for that named operation; drafting, merging, and deploying remain separate actions. Never auto-merge, auto-publish, or grant deployment authority to a content summarizer. No webhook, schedule, app installation, or token is provisioned here.

Acceptance examples: a commit without check evidence cannot become “tested”; rejected drafts remain unpublished; a repeated import does not duplicate a milestone; changing an approved draft invalidates its approval; revoking repository access fails closed.

## 3. Sanitized system diagrams

Purpose: explain system reasoning without exposing workplace or home network details. Use authored logical models with generic device roles, conceptual connections, and a visible “conceptual” or “sanitized” label. Keep illustrative signal paths distinct from verified physical commissioning evidence.

A future diagram record should contain purpose, audience, logical nodes/edges, legend, source/evidence class, owner review, and a public-safe export. Exclude actual IP/MAC addresses, hostnames, serials, credentials, floor plans, customer identifiers, access routes, and sensitive rack/configuration exports. Build the public model from safe facts rather than applying cosmetic redaction to an operational drawing. Imported SVG must be treated as untrusted content and sanitized or replaced with an authored safe rendering.

Acceptance: inspect both the visible diagram and its text/SVG metadata; provide a text description and readable mobile layout; label simulated telemetry; confirm the diagram makes no unsupported claim about a live environment.

## 4. Evidence-based credential tracking

Purpose: maintain certification and vendor-training records without treating them as interchangeable. Proposed fields include name, issuer, type, status, evidence class, earned/expiry dates when verified, public verification link when approved, last review date, and an owner note. Preserve unknown values as unknown. Do not calculate expiration or mark completion from enrollment, a course bookmark, or generated text.

Keep certificate files, private certificate numbers, account information, and study notes in private storage. Publish only approved summaries and safe issuer links. Proposed reminders generate private drafts; no calendar entry, email, scheduled run, or external notification is created without a later request. A certificate date becoming stale should trigger review rather than silently rewrite the public record.

Acceptance: training is labeled training; a planned credential cannot appear earned; missing dates remain explicit; public links contain no secret query strings; changing an expiry date records its evidence and reviewer.

## 5. Private owner dashboard

Purpose: review drafts, source freshness, credential evidence, approvals, and QA results. Private records must live in a separate service or remain local. Do not export private drafts into `out`, public JSON, source maps, or browser bundles.

Real server authentication must establish the owner identity, and server authorization must check ownership and permission on every protected request, file, and mutation. Deny access by default. A hidden route, noindex, JavaScript password prompt, shared value in a static file, or browser-only role check cannot protect dashboard data. This follows the distinction between authentication and authorization and the requirement to validate access for each request. [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

Before implementation, choose an owner-approved identity mechanism with MFA/passkey support, secure session handling, logout/revocation, CSRF protection for cookie-authenticated mutations, restricted caching, and server-held integration secrets. Keep audit entries for approvals and changes without copying secret evidence into logs. Minimize stored data, define backup/deletion behavior, and separate preview access from publication permission.

Acceptance: unauthenticated and unauthorized requests return no private data; direct resource URLs enforce authorization; expired/revoked sessions fail; draft content never enters the public artifact; secret scans pass; failed authorization cannot cause a write. Until these controls are built and verified, the owner workflow stays local.

## 6. QA and human publication gates

Proposed gates apply to an immutable source revision and generated artifact: evidence/claim review; confidentiality review; formatting, types, lint and meaningful tests; static build/link/download checks; desktop/mobile/keyboard/accessibility review; dependency and secret review; owner review of the public preview and résumé; then a separate approval for the named destination and audience. Record exact commands, results, artifact hash, reviewer, and limitations. Do not substitute a historical pass for the release under review.

GitHub deployment review can be a supporting control only after the repository environment and permitted branches are configured and their availability verified. A workflow mentioning an environment does not establish that a reviewer is configured. Prefer disabling deployment over bypassing an unavailable protection. [GitHub deployment review guidance](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/review-deployments)

A changed content patch, dependency set, origin, résumé, or artifact invalidates the corresponding approval. Keep the last approved artifact and rollback instructions. QA passing never authorizes a push, merge, or launch by itself. Publication must identify the exact revision, artifact, origin, audience, and owner approval.

## Suggested order and unresolved decisions

Begin with local milestone drafts, credential schemas, and sanitized diagrams. Validate their evidence and approval records before adding authenticated storage. Consider AI only after the source corpus and abstention evaluation are reliable. Decide provider, identity recovery, data retention, reviewer availability, spending limits, and allowed public source domains before implementing the server additions. These decisions remain open; this design grants no operational authorization.
