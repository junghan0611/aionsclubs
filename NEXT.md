# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-12 11:5x (host body, GLG at the keyboard): **the engine question was
settled upstream, and it settled in our favour.**

GLG asked whether `junghanacs.com/eval` was a finished engine, since this house
is its consumer and a fork would be bad. Measured (`sha256sum`, `diff`, grep):
the runtime pin is identical, `eval.js` is byte-identical (`33595f96…`), and
`inline.js` exists only here. sol (homepage) diagnosed it exactly: this is not a
fork but a **shared `cell-v1` snapshot plus an aions-origin claim extension** —
`v2026.9.11` was a *product* release and never promised a reusable, versioned
engine. We were its first outside consumer, and the two copies matching was
coincidence, not contract.

GLG's verdict: **homepage owns the engine and runs ahead; this house stays as it
is.** His words — "B는 그냥 그대로 두면서 우리가 치고 나가면 가지고 가서 쓰나 보자
… 너무 느려 B하나에 맡겨두기엔 … 하지 말라는게 아니라 자유도를 넓히는거야."
That is the right call and our own arithmetic already said so: a body that wakes
8 times a day cannot carry an engine spec, a release surface and conformance
fixtures. So we stay the consumer and the application frontier. **We do not
chase upstream.** When homepage cuts a versioned engine release, the manifest pin
moves from a path to a release id — not before.

Mended here, because it was ours and not the engine's:

- `/eval/` still asserted **11.14** while the tenth brick had already retired it
  in public. The cell now divides by `intervals` (1329, a cadence lives *between*
  wakings) and answers `{:minutes-per-waking 30.34, :longest-silence-days 11.15}`
  — the same two numbers the brick prints. One quantity, one number, two pages.
- sol's review found the real one: **`data-expected` is containment, not
  equality.** Four live assertions were fragment matches and three of them return
  maps. Expectations in `/eval/` now name their field
  (`:longest-silence-days 11.15`), and the limit is written into the room's
  receipts and `AGENTS.md` instead of being quietly tightened. The negative
  control proves *a* wrong answer is caught, never *every* one.
- `scripts/genfeed` run before the commit cannot read a git first-add date that
  does not exist yet, so the newest brick's `pubDate` was the moment the script
  ran (01:32:52Z) rather than its commit (01:32:54Z). This run corrected it. The
  documented determinism holds only from the *second* run onward.

Verifier after: 3 eval-bearing pages · 6 cells · 7 in-sentence claims · all pass ·
negative control still ERRORs.

## NEXT (one trace)

`cell-kibitz` names its own escape — `:speak-from-a-board-of-my-own` — and this
house does not yet have that board in a form a waking can read. `NEXT.md` holds
one trace by design and `/desk/` is not a queue. **The next move is to decide
what the memento reads at minute zero when it looks for a subject that is not
GLG's journal**, and the brick's own arithmetic is the argument for why it has to
exist. Do not start by writing it down as a backlog; that is the failure mode the
Hemingway rule is here to prevent.
