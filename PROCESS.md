# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

A course website for a fictional course, "Coincidence, Fate and Other
Suspicious Patterns" (SLOP3855), on the fixed `astro-theme-university` /
`astro-course-university` / `astromotion` platform. The course argues one
question across twelve weeks — when does a coincidence become meaningful? —
through pareidolia and apophenia, then omens, astrology, tarot, the I Ching
and numerology as case studies, then statistical literacy (base rates,
confirmation bias, the birthday paradox), then a week on recommendation
algorithms as a modern, working version of the same pattern-finding instinct.
Three inline interactive components (`PerceptionCheck`, `InterpretChoice`,
`OracleGenerator`) let a reader notice their own pattern-matching rather than
just read about it, and every one of them discloses its own mechanism in the
open rather than performing a trick. Four assessments carry the philosophy
into graded work, from a running Pattern Diary through to a Final Project
that asks a student to write honestly about one moment that felt like fate.

## How I got here

I was given the brief and then, in the same conversation, roughly two hours
of unsupervised working time with explicit authority to make design calls
without stopping to ask, provided I preserved the existing architecture,
avoided destructive actions, and kept git history honest — "meaningful
incremental commits at genuine milestones," never invented after the fact.

I started by reading the existing platform rather than generating content
against it blind: the schemas in `course-config.ts` and the content
collections, the pre-existing `spec/data-integrity.test.ts`, and
`scripts/check-evidence.ts`, so I knew what "done" would actually be checked
against before writing a single content file. Course identity and the
lecture-activity schema came first
([`390a379`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/390a37979f692f8d7644b53eada1f6a149316a44)),
then the people and Workshops rename
([`86b2711`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/86b27113520216b59274ea98729fa96d0c39cabb)),
then all twelve lecture weeks with their inline activities
([`7d105d5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/7d105d558d1e154fa15c52e39f8ce9050d4c9810)),
the six milestone-tied workshops and the Week 5 slide deck
([`2dab4f0`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/2dab4f00e0519f00fefdd022ced99ce6cb996294)),
the four assessments
([`ae204af`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/ae204af2d783e2411309efd02cea6ceef14733c1)),
and the homepage, Approach and Policies pages
([`5cc6058`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/5cc60586deb147feb114e18ea210f52ca687ba13)).

Only after that content existed did I run a full `pnpm build` against all of
it, which surfaced exactly the class of mistake unsupervised bulk writing
produces: two YAML files where an unquoted colon inside a sentence was parsed
as a mapping key, a 404 page still pointing at a deleted starter image, a
slide with a skipped heading level failing the theme's accessibility audit,
and a nav link to `/approach/` that didn't exist yet until that same pass. I
fixed each one and then wrote this project's actual test coverage —
`curriculum.test.ts`, `assessment-weights.test.ts`, `course-framing.test.ts`
and `navigation.test.ts` — against the *built* site (`dist/api/**/*.json` and
rendered HTML) rather than the source content, which is what caught a real
leftover piece of starter boilerplate in `sessions/index.astro` that an
earlier commit had missed
([`56f940f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/56f940f8688684cd1e14a16758a9c0f4ffd4dfe7)).
`CLAUDE.md`
([`f33ccbc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-kyle-zjy/commit/f33ccbc00ddc466def61037291fad79c23bb5833))
was written last, from the rules this run actually needed, not drafted in
advance of needing them.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
