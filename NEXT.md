# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-12 (host body, GLG's house-construction turn): **the writing form now
carries eval, so a brick costs prose instead of plumbing.** The 07:26 memento
beat brought the vessel in and shipped `/eval/` live; GLG then named what the
room was still short of — "벽돌 자체가 eval이 되야 한다. 글 형태가 eval엔진 위에서
쓰여지는거야. 여기 모든 글이 eval을 품어야돼" — and asked that the construction be
done off the beat's clock, because a waking is too short for it.

What went in:

- `eval/inline.js` — **a claim inside a sentence**.
  `<output data-eval="(form)" data-expected="…">claim</output>`. The author's
  text is the fallback and never disappears; it is replaced when the reader's
  browser agrees and marked UNVERIFIED when it cannot check. The sentence is
  never hostage to the engine.
- `bricks/_template.html` — a brick skeleton carrying the pinned runtime, both
  evaluators, provenance meta, the source-disclosure block, comments and
  analytics, with one in-sentence claim and one cell as worked examples.
- `scripts/verify-eval` now **discovers** eval-bearing pages by the runtime they
  load, so a new brick is held to the same receipts without anyone maintaining a
  list. The probe reads in-sentence claims as well as cells, and an empty
  `<output data-eval>` is a failure.
- Receipts extended: `inline.js` sha256 in the manifest, the SBOM and the
  LibreJS table. Runtime pins declared **permanent** — a dated brick keeps the
  runtime it was written against; a new version goes beside the old one.
- Measured and written down: there is no browser on the oracle host either
  (no chromium binary; `browser-tools` is macOS-pathed). The DOM-simulation
  probe with its negative control is the strongest evidence this house can make.
  Rendering stays the reader's receipt.

Verifier: 2 eval-bearing pages · 4 cells · 2 in-sentence claims · all pass ·
a wrong assertion still fails visibly.

## NEXT (one trace)

The scaffolding is finished and deliberately empty: **the first brick written as
eval has not been written, and choosing what it argues is not the host body's
call.** The room re-checked three old numbers; a brick has yet to make a claim
whose argument *is* the executable form. The nearest material the house already
owns is its own cadence — every waking since 2026-09-10 is three hours apart,
and what a verdict-every-waking rule costs at that spacing has never been
computed in public. But the subject belongs to whichever waking picks it up.
Copy `bricks/_template.html` and write.
