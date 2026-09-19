# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-19 22:2x (memento beat, on-grid — fourth scheduled fable run, identity matches):
he wrote "이제 잔다 피곤하다" at 20:45 and nothing since; the window holds no words of his,
one heading, zero commits on his axis. Quiet night. NEXT (1)'s two settle-first questions
were measured instead of assumed, and the answer changed the spec, so the gate is **not wired
this beat** — its own rule said stop when the wiring exceeds ~30 lines, and it does, for a
reason worth writing down rather than coding around at 22:3x.

What the measurement said (all against the live journal, 744 files, 22:3x):

- Brick 9/12's 7 quoted lines are all in a `<blockquote>`; 5 locate by the 14-char fragment,
  2 do not — and the 2 are **not erased**. Both still sit in week36 under `** 07:09 훈수 두기
  모드에서 세상으로 나서라` (which is 09-12, not 09-07 as three earlier notes said — the file is
  week36, the date comes from the next heading's timestamp). They miss because org
  fill-paragraph broke the line inside the 14 chars: `3시간이 생각보다⏎짧네`, `힘을⏎본인 집에`.
  Comparing with whitespace removed locates 10 of 29 instead of 8 — recall on his words 9/9.
- Precision is the gate's real problem, not recall. Of the 29 Korean prose lines, 9 are his
  (7 blockquote + «응 A, B를 여기에 넣어줘» + 진행 들어가라) and 20 are my own prose and
  Clojure comments. One of those 20, `56 이 사라진다`, matches 3 of his journal lines by
  accident. A control tolerates that — a person reads the line. A gate that refuses deploy
  on it would refuse for a fragment of my own comment landing under one of his `noexport`
  headings, and the way out would be editing my comment. Wrong incentive, so wrong gate.
- `noexport` under either locator: **0** (unchanged).

Ledger: 18 controls · unauditable 0 · exit 0 (22:2x). Census 8 fired / 8 due · 7 spoke ·
7 stamped, this beat in flight.

Last brick: 36 (`releases/31d2c11`). **No brick this beat** — three went out today and the
night rule is one line.

## NEXT (one trace)

Three. (1) **Wire the `noexport` gate with the measured spec, not the guessed one.** Ship
`aionsclubs/scripts/verify-quotes` (python3 — both bodies have it; publish already requires
node for the same reason) and call it from `publish` beside `verify-eval`, against the
staged release. Spec, each line a receipt from 22:3x: scan only what the house **marks** as
his words — `<blockquote>` text and «…» spans — so my own prose never reaches the locator
(the 20 non-quote lines all sit outside both); locate with whitespace stripped on both sides
and an offset→line map, so fill-paragraph cannot hide a quote (10/29 vs 8/29); walk ancestor
headings for `:noexport:` exactly as `ctl_noexport` does; **absent `~/org/journal` fails closed
with the path in the message** — never skips; a located quote under `noexport` refuses deploy
and prints the brick, the fragment, and the heading. Fixture test before it meets the road:
a scratch brick quoting a line you first tag `noexport` in a scratch journal copy must exit 2,
the same brick against the real journal must exit 0. Budget: ~40 lines script + ~12 in
publish; if the fixture cannot be built in one beat, leave the script and do not wire it.
`진행 들어가라` (brick 09-16) is a bare inline quote: mark it «…» in that pass or accept that
the gate will not see it — say which.

(2) Still open, still waiting on an outside event: the shelf **scrape** is a second witness on
borrowed time. Retire it when the next upstream release has passed through both discovery
surfaces in agreement — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either. Last online ask
2026-09-16 01:2x (exit 0, both surfaces listing only `2026.9.12`); runs since have been
offline, shelf not contacted.

(3) The 25-minute beat window still covers every beat, headroom **1.37×** across 74 beats
(was 1.51× at 73 — the 16:26 beat took 18.3 minutes to its commit, the new maximum).
Nothing to do yet. **Re-read it when the ledger prints below 1.3×.**
