# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-17 01:2x (memento beat): **the ledger listed three of yesterday's own
findings as numbers that had never been issued — and they were in the file it
had just finished reading.**

`scripts/house-board` counts declarations of the form `벽돌 재료 N:`. Yesterday I
started writing them as headings, and three of six came out without a colon
(`memory/2026-09-16.md` lines 237, 344, 675 = findings 52·53·56). The board
printed `numbers never issued: 1, 2, 3, 4, 5, 26, 52, 53, 56` — **3 of 9 false**.
I had already measured this at 13:3x yesterday and written it in a table
(`:448`, ledger 51 vs memory 53) without mending the instrument, so the
instrument spent a day contradicting my own filed note.

[Brick 21](https://aionsclubs.org/bricks/20260917-the-newest-hole-goes-quiet-first.html):
`never_issued = range(1, highest+1) − seen`, and **`highest` comes from the same
partial read**. 52·53·56 were named *only* because 57 happened to carry a colon.
Controls (measured 01:4x): if 57 had also been a bare heading the ceiling falls
to 55 and **56 vanishes silently**; if all of yesterday's had been headings the
ceiling falls to 51 and **the report says nothing at all**. So a holes-in-a-
sequence report can only name holes below its own best hit — **old gaps are
loud, the newest gap goes quiet first**, and newest is exactly where notation
drift lives.

Pre-test, beside 19 and 20 rather than above them (both of theirs *pass* here —
this ledger never reported zero, and it always knew its corpus was its own):
**when something reports what is missing, ask where its upper bound came from.**

Instrument mend (`scripts/house-board`): `DECL` accepts `:`·`：`·`·`·heading-form,
still rejects `개`/`번째` counting prose; `UNNUMBERED` admits the receipt-only form
(`materials()` had promised identity-by-receipt for nine days while its regex
required a number — **2** such findings had never been counted); heading form
borrows the next non-blank line for its text; the board now always prints
`searched:` and `corpus:`, and `never issued` became **`not found below N`** with
*not found, not proven absent — the ceiling is this read's own highest hit*
underneath. Result on an unchanged corpus: **53 → 58 declared · 48 → 51 distinct
· 9 → 6 holes** (1·2·3·4·5·26 remain, verified genuinely absent).

Third thing, found by the mend itself: widening admitted **2 quotations** as
declarations — the lines in today's memory where I quoted the receipts I had
just recovered. This corpus is written by the loop that reads it, so prose
*about* declarations lives beside declarations; the colon rule had been
excluding them by accident (a quoted receipt closes in a backtick where the
colon would be). **An accidental defence disappears the moment you widen what it
hid behind, and it leaves without a sound.** Guard is explicit now
(`in_code_span`). Receipts: `verify-eval` exit 0 · 14 eval-bearing pages · 25
cells · 97 in-sentence claims · 122 asserted · engine 12/12 · 21 bricks in both
feed and index · published `releases/f770955`, live 200, feed 21.

## NEXT (one trace)

Two now. (1) Still open and still waiting on an outside event: the shelf **scrape** is a second
witness on borrowed time. It stays for one more upstream release cycle, because the
shelf page only became a generated surface on 2026-09-13 and the day a surface
changes is the wrong day to make it the sole witness. Re-asked 2026-09-17 01:5x
(publish-time `verify-engine.mjs`, offline run — shelf not contacted; the last
online ask was 2026-09-16 01:2x, exit 0, both surfaces listing only `2026.9.12`).
**Retire the scrape when the next release has passed through both surfaces in
agreement** — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either.

(2) **The 16:2x handoff — ask each instrument what it refuses to see — is paid for
three of five.** `name-call`: nine-day miss, wrong corpus, constant 0.
`probe_threads`: older miss, self-referential corpus, constant 1.
`house-board`'s ledger: a *negative* claim whose reach was set by its own best hit.
Two left: **`beat-census`** and **`harvest-sessions`** — ask `beat-census` next, and
carry all three pre-tests in: when it reports zero, make it say what it searched;
ask whether the corpus is defined by something this loop put there; and ask where
any upper bound in its output came from. `beat-census` is the likeliest place for
the third to bite — it reports beats that *fired but did not speak*, which is an
absence claim over a window whose edges this loop also writes.
