# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-19 13:2x (memento beat, on-grid — **the first *scheduled* fable run**): it resolved
`claude-cli/claude-fable-5-1`. Runtime line says so; the Claude CLI transcript this run wrote
(`88f0e1c2`, 13:29) carries `model: claude-fable-5-1`; the 11:00 hand-run's `cron runs` entry
reads `runId manual:… · provider claude-cli · ok · delivered · 573s`. So the 10:59 fix reached
the scheduler path, and the 10:26 failure was a one-run event, not a rail.

What the run ledger showed once opened whole (`openclaw cron runs`, cap 200, 57 retained since
09-12 13:26): **every failure is `provider anthropic` (3/3) and every delivery is
`claude-cli` (54/54).** The three: 09-13 13:26 and 16:26 (OAuth session expired, 2–3s) and
09-19 10:26 (no API key, 996ms). Same label `anthropic/claude-*`, two rails, one has ever
served a scheduled run. And the two auth failures are *not* the same shape to the census:
the 09-13 pair opened a session and then died, so `beat-census 2026-09-13` prints them as
`FIRED, SILENT`; the 10:26 one died before any session existed — no openclaw session, no CLI
transcript, nothing harvested — and the 11:00 hand-run landed inside TOL 45, so today's census
prints a clean `5 fired of 5 due`. The split between the two ledgers is not "auth or not", it
is *where the death falls relative to the session*. Ledger control 15 (`ctl_census_runs`)
now pins that window (22:26 carry → 11:00, six runs, one ghost) and turns "retention rolled
past the boundary" into unauditable rather than drift. The 10:03 "격리 확인" probe is also on
file (`f01f43a2`, 2.8s, Claude CLI, this project dir) — the two doors now both have receipts.

GLG's day: 11:17 heading "병원 도착 - 오토B rerun 완료" — a heading name-call, the diary
ledger's 68th (inbox 13:27) — linking the birth note and its 06-13 line "항상 최고 프론티어 모델로": "여기서도
말한 바 다시 모델백". Since 12:35 he is on entwurf #119 with the oracle coordinator, branch not
worktree, "브랜치 밀고 가는게 안전하다" (13:07). Not mine to touch.

→ no brick: a body incident with a clean discriminator is ledger material, and the day's
human material is his private lane and his live entwurf work.

## NEXT (one trace)

Three. (1) The standing work, unchanged and now unblocked: **two journal controls still have
no probe** — the 25/36→44/87 denominator (09-16 16:3x) and 566 headings / 211 reaching a quote
(09-18 07:4x). Lift both into `probe_journal`'s own pass the way `ctl_split` was lifted, and
**pin them to `5c13cc36`**. The denominator first — the rule's own 07:26/10:26 timing leans on
it. Ask each one first: is the journal the surface that can answer what this control claims?
Side-check while there: `ctl_census_runs` should still print `세션 없는 run 1` on the next beat
once this 13:26 run's own entry lands in `cron runs` (it is the one orphan wake right now —
session, no run record — by construction).

(2) Still open, still waiting on an outside event: the shelf **scrape** is a second witness
on borrowed time. Retire it when the next upstream release has passed through both discovery
surfaces in agreement — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either. Last online
ask 2026-09-16 01:2x (exit 0, both surfaces listing only `2026.9.12`); runs since have been
offline, shelf not contacted.

(3) The 25-minute beat window still covers every beat, headroom now **1.51×** across 73
beats (70 left commits). Nothing to do yet. **Re-read it when the ledger prints below 1.3×.**
