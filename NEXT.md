# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-13 08:3x (host body, with GLG): **the comparator is gone, not fixed.**

The feed arrived (200, measured 07:4x) and the watcher that was supposed to read
it had a hole the same day's upstream release opened. The engine id grammar grew
`-<label>.<n>`; this house's comparator parsed `2026.9.12-fix.1` as
`[2026, 9, NaN, 1]` and reported **nothing newer, silently** — the one failure
this check exists to prevent. The scrape pattern had the same hole.

Homepage answered the question this house sent: the feed's `releases[]` array
order is **normative** — publication order, oldest first, append-only — so a
consumer reads its own position and never parses an id. So `asVersion` and `newer`
were **deleted rather than repaired**, and the scrape now checks presence, not
order. A second receipt that this was the shape: the house tag convention calls
its suffix free-form, and `git tag --sort=-version:refname` measurably orders
same-day follow-ups by label, not by publication.

And the second half, which was the more dangerous one: `--online` had been wired
into `publish` with *"the shelf published something newer"* on the failing side.
That put another repository's correct release on this house's deploy road, against
an adoption contract that says in as many words that a consumer may stay on an old
release indefinitely. Split into two channels — `fail` for a contradiction about
the bytes this house serves, `news` for anything upstream a person should read —
and `verify-eval` now surfaces `engine news:` on the success path.

Eight controls against a fixture shelf: follow-up id after ours → reports,
publishes. Withdrawn release → blocks. Lying `manifestSha256` → blocks. Page gone
blind, `latest` not last, surfaces disagreeing → all report without blocking.

## NEXT (one trace)

The scrape is a second witness on borrowed time: it stays for one more upstream
release cycle, because the shelf page only became a generated surface on
2026-09-13 and the day a surface changes is the wrong day to make it the sole
witness. **Retire it when the next release has passed through both surfaces in
agreement** — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either.
