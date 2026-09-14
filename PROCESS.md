# Process overview

Written for a marker: how this submission got from the brief to the harness
behind it. Citations are the evidence — nothing here is asserted without
one.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

A course website for a fictional course, "Coincidence, Fate and Other
Suspicious Patterns" (SLOP3855), on the fixed `astro-theme-university` /
`astro-course-university` / `astromotion` platform. It argues one question
across twelve weeks — when does a coincidence become meaningful? — through
pareidolia, omens, astrology, tarot, the I Ching and numerology, then
statistical literacy, then recommendation algorithms as a modern version of
the same instinct. Three interactive components (`PerceptionCheck`,
`InterpretChoice`, `OracleGenerator`) let a reader notice their own
pattern-matching, each disclosing its mechanism in the open. Four
assessments carry the philosophy into graded work, ending in a Final Project
asking a student to write honestly about one moment that felt like fate.

## How I got here

I was given the brief and roughly two hours of unsupervised working time,
with authority to make design calls without stopping to ask, provided I
preserved the architecture, avoided destructive actions, and committed at
real milestones rather than inventing history afterward.

I read the platform first — schemas, content collections,
`spec/data-integrity.test.ts`, `scripts/check-evidence.ts` — so I knew what
"done" meant before writing content. Course identity and the activity schema
came first
([`390a379`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/390a37979f692f8d7644b53eada1f6a149316a44)),
then people and the Workshops rename
([`86b2711`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/86b27113520216b59274ea98729fa96d0c39cabb)),
then all twelve lecture weeks
([`7d105d5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/7d105d558d1e154fa15c52e39f8ce9050d4c9810)),
the six workshops and Week 5 deck
([`2dab4f0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/2dab4f00e0519f00fefdd022ced99ce6cb996294)),
the four assessments
([`ae204af`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/ae204af2d783e2411309efd02cea6ceef14733c1)),
and the homepage, Approach and Policies pages
([`5cc6058`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/5cc60586deb147feb114e18ea210f52ca687ba13)).

A full `pnpm build` then surfaced what unsupervised writing produces:
unquoted YAML colons, a 404 to a deleted image, a skipped heading, a nav
link to a missing page. I fixed each and wrote real test coverage against
the *built* site, catching leftover boilerplate an earlier commit missed
([`56f940f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/56f940f8688684cd1e14a16758a9c0f4ffd4dfe7)).
`CLAUDE.md`
([`f33ccbc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/f33ccbc00ddc466def61037291fad79c23bb5833))
came last, from rules this run actually needed.

## The visual redesign

The platform's default look was a generic bright-orange template — no work
for a course about reading meaning into plain material. A later
pass restyled it into an "archive of unexplained patterns" identity — a
gold/navy palette checked by hand against WCAG AA, a serif for headings, a
diagrammatic `hr`, case-file framing — without touching a route, schema, or
any text the existing specs assert on. Tokens and typography came first
([`cf7e69d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/cf7e69df085c1d4b9b33789de6726cda8961a5ef)),
since nearly everything else derives from those properties. Lecture pages
and activity components gained an optional kicker label from data already
on the page
([`f397ffb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/f397ffb775c747f53875cb43fe9b7139dc81f0c3)).
Listings picked up the same framing
([`2c5e70d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/2c5e70d0a477dd8c980d1ff09aa330b96a6acedf)),
then the homepage, gaining an always-visible "Coincidence?" section rather
than anything script-gated
([`18c15f0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/18c15f0dd1fc1fbd0bab6386e09caa42142fb5c5)).

Restyling raised a real content problem: Approach's "why the visuals look
this way" section claimed the site avoided mystical symbols — false, once
the new atmosphere and mark existed on the page stating it. That section, a
Week 12 addition naming the mark, and `CLAUDE.md`'s own rule were rewritten
on disclosure grounds instead of deleting the sentence
([`fecb793`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/fecb79372da7cdda8ef998cf6e9af73b27465e1e)).
`pnpm check` and `pnpm check:evidence` stayed green throughout.

## Before you ship

`pnpm check:evidence` verifies that citations resolve to real commits and
that `CLAUDE.md` is there — that the account is traceable, not that it is
good; that's the marker's call. Images aren't checked: a broken one is
visible the moment this file renders on GitHub.
