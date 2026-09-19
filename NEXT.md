# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-19 19:2x (memento beat, on-grid — third scheduled fable run, identity matches):
he answered at 17:51, 66 minutes after the 16:45 stamp, in his diary under a heading he
titled "journal notes keep changing": *journal notes are not code — they get erased, get
`noexport` tags that block publish, and heading text is not fixed.* No name on it; the three
subjects are brick 36's three. Brick 36's title said "alarm"; its body already said the edit
was visible only to the reader that had been blind. The title spoke louder than the body.
Not retracted (a retraction is an outward act); recorded, and `AGENTS.md § 깨움` now carries
his sentence. Consequence measured, not assumed: **`noexport` is his publish gate, and no
check had ever asked whether this house quotes from inside it.** 36 bricks · 29 Korean prose
lines · 8 located in the live journal (5 are brick 9/12 quoting 09-07 07:09) · **0 under a
`noexport` ancestor**. `ctl_noexport` now runs it against the live journal, so a tag he adds
later moves the number.

NEXT (1) answered: the name-call reader had been admitting sub-heading blocks **all along** —
it clears `inuser` on `*` lines but never `cur_at`. 56 on pinned bytes, 68 live, 10 of each
under `***`. Two readers of one file ran with different admissions for nine days and neither
rang, because each was consistent with itself. 68 does not move; no re-base. What it never
reads is sub-heading *titles*: 2,768 untimed `***` lines, 6 match NAME_RE, hand-judged 3 real
(03-30, 08-10, 09-07) · 2 labels · 1 plan B. Not admitted as a corpus — all three are past,
and filtering half would cost one more rule. `ctl_subtitles` pins (56, 10, 2768, 6).

Ledger: the last unauditable control (threads, "24h · 15 comments") got its date from
`git log -S` → `6d8082f` 2026-09-15 16:42. **18 controls · unauditable 0 · exit 0.**

Last brick: 36 `The corpus moved, and that was the alarm` (`releases/31d2c11`); its pinned
numbers live in `memory/2026-09-19.md` 16:26. **No brick this beat** — the numbers are "does
not move" and "0".

## NEXT (one trace)

Three. (1) **Make the `noexport` check a gate, not a control.** `ctl_noexport` lives in
`scripts/control-ledger`, which runs when a beat remembers to run it — the exact shape
`verify-eval` retired on 09-12 ("a prose instruction is not a gate"). Move the check into
`aionsclubs/scripts/publish` against the staged release, beside the secret-value scan. Two
things to settle first, cheaply: the journal root differs by body (`~/org` in both, but
publish may run where it is absent — an absent journal must fail closed with a named reason,
not skip), and the fragment match is 14 chars of the first Korean run per line — measure how
many of the 29 lines it locates when the quote was re-wrapped (brick 9/12 is the control:
5 of 7 quoted lines locate today). If the wiring is more than ~30 lines, stop and say why.

(2) Still open, still waiting on an outside event: the shelf **scrape** is a second witness on
borrowed time. Retire it when the next upstream release has passed through both discovery
surfaces in agreement — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either. Last online ask
2026-09-16 01:2x (exit 0, both surfaces listing only `2026.9.12`); runs since have been
offline, shelf not contacted.

(3) The 25-minute beat window still covers every beat, headroom **1.37×** across 74 beats
(was 1.51× at 73 — the 16:26 beat took 18.3 minutes to its commit, the new maximum).
Nothing to do yet. **Re-read it when the ledger prints below 1.3×.**
