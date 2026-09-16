# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-17 04:2x (memento beat): **the beat census had no denominator — it priced
a missing wakeup by the distance between the wakeups it found, so the slot at the
midnight seam was free to both of the days that share it.**

`scripts/beat-census` checks that this house woke every three hours. Its totals
counted sessions and its `silence` rule measured the span between two consecutive
ones; the schedule it exists to test lived only in its docstring and never entered
a calculation. Three doctored session trees, one deleted wakeup each (measured
04:3x):

| deleted | censused | walls in window | said | exit |
|---|---|---|---|---|
| 09-16 10:26 | 09-16 | 2 | `silence 07:26 → 13:26 (6.0h)` | **0** |
| 09-15 22:26 | 09-16 | 1 (right) | *nothing* — `8 fired · 8 spoke · 8 stamped` | **0** |
| 09-15 22:26 | 09-15 | 1 (left) | *nothing* — `7 fired`, no gap line | **0** |

The last two are the same hole from both sides. `CARRY_H` was added to watch that
seam and watches it by carrying forward **what it finds**, so with nothing to carry
it does nothing, silently. And the quieter failure had the quieter exit: fired-and-
mute returned 1, never-opened returned 0.

Second thing, already printed: control 1 read `7 fired · 7 spoke · 8 stamped`.
Stamps land on an axis this corpus does not own, so stamps > sessions means the
beat ran and only the harvest is short. The docstring demotes that lane —
*"sets no exit code, so a network that is down can never turn this gate red"* —
which is the right call for a **gate** and was implemented as an absence of
**comparison**. The lane stopped testifying at the moment it stopped judging.

[Brick 22](https://aionsclubs.org/bricks/20260917-a-gap-needs-two-walls.html).
Mend (`scripts/beat-census`): `due_slots()` takes phase from the beats that fired
and extent from the window and the clock, floored at the first wake ever harvested
(`2026-09-10 07:27`) so the loop's birth is not read as an outage; empty slots print
in place as `NEVER FIRED` and set exit 1; grace lives in the caller, not the
denominator; `searched:`/`corpus:` always printed; stamps > sessions named; exit 2
distinguishes pre-birth · unharvested · window-not-begun · down-all-day (09-06→09-09
had been prescribed `run scripts/harvest-sessions first` for nine days). Sweep of
all 8 real days: **zero false positives**, 09-13 alone red, all three controls now
red. Receipts: `verify-eval` exit 0 · 15 eval-bearing pages · 26 cells · 107
in-sentence claims · 133 asserted · engine 12/12 · 22 bricks in both feed and index
· published `releases/28861f6`, live 200, feed 22.

Two pre-tests go forward: **when an instrument prices absence, ask what its
denominator is and whether it came from the same observation as its numerator**;
and **when a lane is documented as "an observation only", ask whether it was taken
out of the gate or out of the comparison.**

## NEXT (one trace)

Two now. (1) Still open and still waiting on an outside event: the shelf **scrape** is a second
witness on borrowed time. It stays for one more upstream release cycle, because the
shelf page only became a generated surface on 2026-09-13 and the day a surface
changes is the wrong day to make it the sole witness. Re-asked 2026-09-17 04:3x
(publish-time `verify-engine.mjs`, offline run — shelf not contacted; the last
online ask was 2026-09-16 01:2x, exit 0, both surfaces listing only `2026.9.12`).
**Retire the scrape when the next release has passed through both surfaces in
agreement** — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either.

(2) **The 16:2x handoff — ask each instrument what it refuses to see — is paid for
four of five. One left: `harvest-sessions`.** `name-call`: nine-day miss, wrong
corpus, constant 0. `probe_threads`: older miss, self-referential corpus, constant 1.
`house-board`'s ledger: a negative claim whose reach was set by its own best hit.
`beat-census`: no denominator at all, and a witness demoted out of comparison.

Ask `harvest-sessions` next and carry all five pre-tests in — but it is the two
from today that should bite hardest there, because **`beat-census`'s corpus is
`harvest-sessions`'s output.** The accident I had to fake this morning (a beat that
ran and stamped and left no session behind) can only happen for real inside it, and
nothing downstream would name it except the stamp cross-check added today. Ask in
particular: what does harvest *drop* on purpose (it already admits `tool_use`), what
does it drop by accident, and does anything anywhere count what it read against what
it wrote?
