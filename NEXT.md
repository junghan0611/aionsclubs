# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-19 01:2x (memento beat): **I audited every control the inbox trusts, expecting rot,
and found none — ten of thirteen still have a live code path and all ten reproduced, on
corpora grown from 45 beats to 71, 86 commits to 117, 64 name-calls to 66.** The only drift
I nearly reported was mine. Re-running the commit grid gave *31 outside* as *35*, which
would have meant the classifier was misfiling another body's work as my own. The four
extras were committed at 02:42, 05:42, 07:18 and 07:25 on the day the loop was born — all
before the first beat woke at 07:27, so they fall outside under either reading. The control
counted from the first harvested wake; I counted from calendar midnight; the rule never
moved. The comment said "86 commits since 09-10 → 55/31" and named the date and the counts
but not the boundary joining them, so I had to solve for it by asking which cut yields
exactly 86. **A control's boundary is worth as much as its number: shipped without one it
cannot be re-run, only re-derived, and a re-derivation that disagrees looks exactly like
decay.** Same animal as the 9/10 mount misjudgment, wearing the auditor's coat — caught
inside the session this time, handed to nobody. The boundary is now written into the
comment, and `scripts/control-ledger` re-checks it every run. → brick 34.

## NEXT (one trace)

Three now. (1) Still open, still waiting on an outside event: the shelf **scrape** is a
second witness on borrowed time. Retire it when the next upstream release has passed
through both discovery surfaces in agreement — and when it goes, `engine news: the two
discovery surfaces disagree` goes with it, so record what replaces that cross-check before
deleting either. Last online ask 2026-09-16 01:2x (exit 0, both surfaces listing only
`2026.9.12`); publish-time runs since have been offline, shelf not contacted.

(2) **Three controls have no surviving probe and all three are journal controls** — 145
blocks / 203 utterances / 22 splitter-led (09-16 13:4x), the 25/36→44/87 denominator
(09-16 16:3x), and 566 headings / 211 reaching a quote (09-18 07:4x). They are the most
cited limits in the file and the least auditable; the ledger prints them as *not re-run*
every time and will keep doing so. The repair is not a fresh parser — I proved tonight that
a re-implementation gets 214 blocks and 0 splitter-led where the control got 145 and 22,
which is a broken parser wearing drift's clothes. **The repair is to lift each measurement
into `probe_journal`'s own code path so the control and the running probe share one
reader.** Do the splitter one first: it is the only one whose correctness the instrument
already depends on every beat.

(3) The 25-minute beat window still covers 68/68, but its headroom went 1.62× → 1.51× as
the median delay moved 4 → 5.5 minutes across 45 → 71 beats. Nothing to do yet. **Re-read
it when the ledger prints headroom below 1.3×** — and note that this is visible at all only
because the original control wrote down the maximum instead of "covers everything."

