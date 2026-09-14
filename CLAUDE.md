# Harness

Rules this repo's build actually followed, written down so they keep being
followed. Not a wishlist — each one exists because a real decision needed it.

## Content rules (the ones that matter most)

- **Never state that a divination system has a confirmed predictive
  mechanism.** Omens, astrology, tarot, the I Ching and numerology each get a
  plain statement of what they mechanically are (a noticing-and-selective-
  memory habit, a Barnum-effect personality script, a projective symbol set,
  a genuine random draw, digit arithmetic) before any account of what they're
  taken to be. Astrology's page is the sharpest test: it says plainly that
  controlled studies matching astrologers to strangers by birth data alone
  have not found accuracy above chance, and does not soften that to make the
  topic more entertaining. `spec/course-framing.test.ts` checks each
  divination week for its own specific hedge, not one disclaimer pasted
  everywhere.
- **Every interactive component discloses its own mechanism, in the same
  place a user reads the output.** `OracleGenerator`'s "How this works"
  `<details>` is not optional decoration — it is the component's whole
  reason for existing over a plain random-line script. Never build an
  activity that could be mistaken for a working supernatural power.
- **No engagement dark patterns.** No streaks, no daily push reminders, no
  invented urgency, no result gated behind sharing it. The homepage's visit
  counter is the one persistent piece of state on the site, and it's
  disclosed (Week 12) and inert if it fails (private browsing) rather than
  degraded silently.
- **Visual design is archival and diagrammatic, never mystical iconography,
  and never a symbol the site itself doesn't name.** The dot-grid atmosphere,
  the case-file numbering and the recurring ◇ mark are dressing the site as
  a place where a pattern gets filed and dated, not revered — no glow, no
  crystal, no zodiac symbol, nothing that asks to be read as a working sign.
  Any recurring mark gets named and explained on the site itself (Week 12,
  `/approach/`) rather than left for a visitor to wonder about indefinitely —
  the same disclosure rule the interactive components follow, applied to the
  whole site.

## Technical rules

- **Vanilla JS only, scoped by `data-*` attribute, never an element ID.**
  No client framework is installed; every interactive component's `<script>`
  queries `[data-component-name]` so more than one instance can sit on the
  same page without colliding.
- **Keep `activity` (and similar per-kind payloads) as a loose Zod schema:**
  require only the fields every kind shares (`kind`, `prompt`) and let the
  rest ride `.loose()`. A new interaction kind should only ever touch its
  own component and the one content file that uses it, never the shared
  schema.
- **A schema change and the content that depends on it land in the same
  commit; unrelated content changes don't.** Content commits are grouped by
  what they're evidence of (a whole week's lectures, the four assessments,
  the six workshops), not by file-save order.
- **`pnpm check` must pass before a commit, not just before a report.** Run
  it after any schema, frontmatter, or route change — a broken `related:`
  reference, an unquoted YAML colon, or a heading-order slip is far cheaper
  to find immediately than after twelve more files repeat the same mistake.
- **Every custom `spec/*.test.ts` asserts a contract, not an implementation
  detail**, and reads it from `dist/api/**/*.json` or rendered HTML rather
  than importing source content — so a test keeps working if the content is
  rewritten, and fails for the right reason if the contract is actually
  broken.

## Process rules

- **`PROCESS.md` is written once real commit history exists to cite, not
  before.** Its citations are real SHAs, checked mechanically by
  `pnpm check:evidence` — never invent a citation for a commit that doesn't
  exist, and never backdate the account to describe a tidier sequence of
  events than what the log actually shows.
