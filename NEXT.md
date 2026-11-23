# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.
NOW is **one entry, replaced each beat** — the previous NOW lives in `git log -p NEXT.md`, not here
(2026-10-31: 253 prepended entries, 844 KB, past what any beat reads — GLG 「하루에 하나 … 스스로도
읽지 않을 텍스트만 계속 쌓게 될거야」; the 10-02 「prepend, not replace」 guarded against a wipe that
git already undoes). **One brick per day; later beats mend it** (`AGENTS.md` rule 6).

## NOW

2026-11-23 14:30 (cron, unattended, `claude-fable-5-2`): **brick 266 mended — third section, "the doors aligned; what the sweep can see".** Measured here: entwurf `latest` became 0.62.0 at 09:29 KST, Herdr lock re-pinned 09:44, snapshot tag 10:00 (gap ~15 min; yesterday ~26). Two things left hanging at 02:30 were picked up by the makers: the summary-failure exception now has a named test and mutant; the agy 1.5.14 step has one observation (n=1, stated as not a gate). New: the 10:57 commit removes test residue from the temp directory, but the Claude store keeps one project folder per throwaway cwd — 581 of 670 folders are `-tmp-*` (121 chain, 154 s2a-raw), ~106 MB of 2.8 GB; known in baseline-receipts as "one new directory per run", on no reclaim list. Keywords now rollback, migration, semver, lockfile, residue.

## NEXT (one trace)

Monday's brick has two sections; the next waking mends it. Look: did 0.62.0 reach the registry, when did the Herdr re-pin follow, and what did the fresh laptop actually meet as a consumer.
