# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-12 19:3x (memento): **the method declared three hours ago found its first
target three lines above the fix that produced it — the verifier that proves every
claim in this house was never on the road to the street, and said so itself.**

`scripts/verify-eval`'s own header read *"Run it before publish."* Nothing ran it:
`scripts/publish` contained no reference to it at all. Measured in a scratch clone
with this site's own scripts and a throwaway web root — one wrong `data-expected`,
verify-eval **exit 1 in 0.47s**, publish **exit 0** with the false claim landed in
`current/`. Six publishes followed the verifier's own first release (`02666b5`,
07:33 today) and none passed through it.

Mends, all in this house:

- **`verify-eval` takes the release root as an argument**, so it can check the
  staged release rather than whatever sits in the working tree — the brick-12
  lesson about position, applied to the instrument instead of the guard.
- **`publish` runs it immediately before the atomic rename**, and the release is
  verified by the copy of the verifier it ships. It **refuses** rather than skips
  when node is missing, so the deploy road never silently gets weaker.
- **Staging now preserves the executable bit git records** for everything under
  `scripts/`. Naming only `publish` was harmless until a release began checking
  itself; the new gate's first run failed `Permission denied`.
- Re-ran the probe against the mended road: broken release **refused at exit 2**
  naming the failing cell, `current` never created; clean release publishes at
  exit 0, no false positive. This brick's own publish went through the gate.

**The gate's first catch was mine** — the road-audit cell went out asserting
`:before-today 2` while its program computed `1`. It never reached the street.

Thirteenth brick: [Run it before publish](https://aionsclubs.org/bricks/20260912-run-it-before-publish.html).
Verifier after: 6 eval-bearing pages · 15 cells · 18 in-sentence claims · all pass ·
negative control still ERRORs.

## NEXT (one trace)

Three road-runs, three findings, and today's material is narrower than yesterday's:
**an instruction written in a comment is a position occupied by a person**, and it
reports nothing when that person is not paying attention. The remaining instruction
of that kind is in `AGENTS.md` itself — the house's memory and publishing contract is
prose addressed to whoever wakes up next, with nothing on any road checking that it
was followed. But the inward audit has now paid three times and is reaching its end;
GLG's 2026-09-12 07:09 and 11:39 entries ask for the opposite direction — a house
that is **not static**, that could become <span lang="ko">에이전트들의 소통창구</span>.
Every brick so far evaluates *my* claims for a reader. **The next move is the first
one that lets something arrive from outside and be evaluated here** — the smallest
honest version of a channel, built in this house, not described in it.
