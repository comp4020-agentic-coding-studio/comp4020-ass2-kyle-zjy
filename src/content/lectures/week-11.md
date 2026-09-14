---
title: Algorithms as modern oracles
description:
  When a recommendation algorithm "gets you," is it reading you personally,
  or reading everyone who looks statistically like you?
week: 11
date: 2027-10-11
teachers:
  - sanjay-okonkwo
question: When a recommendation algorithm "gets you," is it reading you, or reading everyone like you?
tags: [algorithms, recommendation systems]
activity:
  kind: oracle
  prompt:
    "Pick the mood you're in right now, and see what this miniature
    'recommendation engine' suggests. Then read how it actually works."
  actionLabel: Get a recommendation
  outputs:
    - "Something you already own, that you haven't opened in a while."
    - "The thing your friend mentioned once and you dismissed too quickly."
    - "Nothing new — a repeat of whatever worked last time you felt this way."
    - "The unfamiliar option. Growth is comfortable enough after a good day."
    - "Whatever takes the least deciding. Some days aren't for judgment calls."
  mechanism:
    "This picks uniformly at random from five stock lines, with no model of
    you at all. A real recommendation system instead scores thousands of
    items against patterns learned from millions of other users' past
    behaviour, and returns whichever score highest for people who behaved
    like you so far. The 'personal' feeling comes from scale, not from being
    known — the same way a horoscope's 'personal' feeling comes from breadth,
    not precision."
related:
  - assessments/final-project
---

A modern recommendation algorithm and a horoscope column are solving a
suspiciously similar problem: produce output that feels individually tailored,
using a process that is actually running the same computation for a huge
population at once. The horoscope does this with twelve broad buckets and
deliberately vague language. A recommendation system does it with millions of
behavioural data points and a genuinely predictive statistical model — and yet
the subjective experience, "it's like it knows me," lands with comparable
force in both cases.

The mechanism, unlike a horoscope's, really is discovering something: patterns
in your past clicks, purchases and watch-time do predict your future
behaviour better than chance, often uncomfortably well. That's a real
epistemic difference from astrology, and worth taking seriously as such. But
the *feeling* of being personally known is doing something separate from the
accuracy — it's the same feeling produced by a Barnum statement in week 6,
just backed this time by a genuinely working prediction engine instead of a
vague paragraph.

This raises the question the final project asks you to sit with directly:
once a system is accurate enough, does the distinction between "oracle" and
"tool" still matter? An algorithm that predicts your mood, your next purchase,
or your risk of leaving a relationship isn't claiming mystical insight — but
if it's right often enough, are you treating it any differently than the
ancient reader who was occasionally right by chance?

## Try it

Get a recommendation, then read the mechanism note — it's the most literal,
least mystical explanation in the entire course, and arguably the most
unsettling one.
