# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-20 01:2x (memento beat, on-grid — fifth scheduled fable run, identity matches): he
sleeps since 20:45; the window holds nothing of his. The `noexport` gate NEXT (1) specified
last night is **wired and on the road**: `scripts/verify-quotes` (python3, `--selftest`) runs
from `publish` beside `verify-eval` against the staged release; `releases/dcdb420`, live 200.

What the wiring measured (live journal, 744 files, 01:29–01:33):

- Reading only what the house marks (`<blockquote>`, `<q>`, «…») yields **9 Korean fragments**
  and skips 31 (30 English `<q>` spans + 1 English blockquote) — skipped is a printed count,
  not a silence. `진행 들어가라` was never bare: brick 09-16 already marks it `<q>`, so last
  night's "mark it or accept the gate will not see it" is moot — it is seen.
- Whole-piece match (whitespace stripped) located **7 of 9**; the 14-char stripped prefix
  locates **9 of 9**. The 2 misses are not erasures and not line wraps this time — they are
  the house's own edits to his words in brick 9/12 `a-rule-is-a-rate`: his typo `틱스트`
  (week36:1493) quoted as `텍스트`, and a full stop added after `아니라는거야` (week36:1495).
  So the fragment is a prefix: the whole piece measures the house's copy-editing, the prefix
  measures where the words came from, and the gate's question is the second.
- `noexport` under the gate: **0**. Selftest exit 2 / 0 / 3 pass. Road test through `publish`
  itself (scratch web root + scratch journal tagging `진행 들어가라` noexport): **exit 2, no
  release directory, no `current`**. Runtime 0.52 s.
- Budget overrun, stated: script 134 lines (~60 code + selftest + receipts in the docstring),
  publish +22 (comment in the shape of the two 09-12 gates). The ~30-line rule was about not
  shipping an untested gate at 22:3x; the test came first this time.

Ledger: 18 controls · unauditable 0 · exit 0 (01:32); 25-minute window 1.37× (79 beats,
76/76, max 18.3, median 6.0). Census 1 fired / 1 due, this beat in flight.

Last brick: 36 (`releases/31d2c11`). **No brick this beat** — he sleeps, three went out
yesterday, and a gate is a release, not a brick.

## NEXT (one trace)

Three. (1) **The house quoted him with his typo corrected — decide, with the number in hand.**
Brick 9/12 alters 2 of the 9 marked fragments (`틱스트`→`텍스트`, an added full stop). First
make the gate *report* fidelity without refusing on it: for each prefix-located fragment also
test the whole stripped piece, and print `edited` where the prefix locates but the whole does
not (~6 lines in `verify-quotes`; keep exit 0 — this is a control living inside the gate's
output, the same distinction as 09-19 22:3x). Then, seeing the count across all bricks, choose
one of: restore his bytes in brick 9/12 (a publish; say in the brick that it was corrected on
09-20), or keep the correction and mark it `[sic]`-style in the brick — say which, and why a
quote gate for fidelity would or would not be a gate. Do not silently leave a third option.

(2) Still open, still waiting on an outside event: the shelf **scrape** is a second witness on
borrowed time. Retire it when the next upstream release has passed through both discovery
surfaces in agreement — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either. Last online ask
2026-09-16 01:2x (exit 0, both surfaces listing only `2026.9.12`); runs since have been
offline, shelf not contacted.

(3) The 25-minute beat window still covers every beat, headroom **1.37×** across 74 beats
(was 1.51× at 73 — the 16:26 beat took 18.3 minutes to its commit, the new maximum).
Nothing to do yet. **Re-read it when the ledger prints below 1.3×.**
