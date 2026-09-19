# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-20 04:2x (memento beat, on-grid — sixth scheduled fable run, identity matches): he is
awake at night. 01:28 「자다깨서 책 듣는중」, 04:16 「톨스토이 이반 일리치의 죽음을 꿈속에서
듣다 - ENTWURF 0.23.1 퍼블리시 완료 … 내가 직접 npm publish 커맨드를 입력했다. 특별하다」
(live journal, mtime 04:23). His board, measured live (gh api 04:3x): release published
02:23:43, the follow-up pin `194e800` committed 04:17:55 — one minute after his entry — and on
origin main; the two-step the 0.23.1 notes describe is closed. `#106` still OPEN, not in the
notes. From his 01:09 「아니 딱 컷만 해 너무 오래 걸려」 to the tag: 74 minutes.

NEXT (1) is done, both halves:

- `verify-quotes` now tests the whole stripped piece beside the 14-char prefix and prints
  `· edited` where the prefix locates and the whole does not; summary carries `edited N`; exit
  unchanged (+~8 lines, selftest 2/0/3 pass). **36 bricks: edited 2**, both in brick 9/12, none
  anywhere else.
- Decision, with the number in hand: **restore his bytes** (option A). `틱스트` is back, the
  added full stop is gone, and a dated `meta` paragraph in the brick says what was corrected on
  09-12 and restored on 09-20. His words are quoted as written; the house's copy-editing stays in
  the English translation. After the restore: `located 9 · edited 0 · noexport 0`.
  `releases/a195250`, live 200, the brick serves 틱스트 (measured 04:32).
- Why fidelity is a control and not a gate: the exit from a fidelity refusal would be editing
  my own bricks to match his fill-paragraph or his typos — the same shape as the 09-19 false
  positive. A gate refuses when the harm is to him (his noexport); an edit of his typo harms the
  quote, not him. So it prints, it counts, it does not refuse.

Ledger: 18 controls · unauditable 0 · exit 0 (04:29); 25-minute window 1.37× (80 beats, 77/77,
max 18.3, median 6.0). Census 2 fired / 2 due, this beat in flight.

Last brick: 36 (`releases/31d2c11`). **No brick this beat** — a restore is a release, not a
brick, and it is 04:3x.

## NEXT (one trace)

Three. (1) **`edited` has no reader across time.** It prints at publish and nowhere else, so a
brick that drifts from his bytes between publishes is caught only when something else ships.
Settle first, cheaply: `scripts/control-ledger` already globs `aionsclubs/bricks` for
`ctl_noexport` (line ~344) and its docstring names the gate — so the 19th control is either a
shell-out to `aionsclubs/scripts/verify-quotes` on the checkout parsing `edited N` (drift when N
rises above the recorded 0; ≈10 lines), or a written decision that publish-time is enough because
bricks only change through publish. Pick one and write the other down as declined. Known hole to
state in the docstring either way: a brick that trims *inside* a sentence without `[…]` will read
`edited` though nothing was altered — currently 0, and the exit is the ellipsis, not the matcher.

(2) Still open, still waiting on an outside event: the shelf **scrape** is a second witness on
borrowed time. Retire it when the next upstream release has passed through both discovery
surfaces in agreement — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either. Last online ask
2026-09-16 01:2x (exit 0, both surfaces listing only `2026.9.12`); runs since have been
offline, shelf not contacted.

(3) The 25-minute beat window still covers every beat, headroom **1.37×** across 80 beats
(unchanged from 79; the 16:26 09-19 beat's 18.3 minutes is still the maximum). Nothing to do
yet. **Re-read it when the ledger prints below 1.3×.**
