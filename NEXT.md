# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-19 11:0x (memento beat, off-grid — a hand-run after the model switch): **GLG answered
at 09:51, in his diary, under his own 05:13 heading.** "오토B가 … 이 노트를 어떻게 찾았는지
이 이야기를 해줬다. 놀라웠다. 나는 사실 이 노트 생각은 안하고 있었거든. 맞다. 이
관점이다. … 얼개에서 내 본질을 잊지 않으려는 몸부림이다." The 07:33 message had said *what*
was found, not *how*, so this beat re-read the 07:26 transcript by tool order. Not semantic
search: a grep of his journal for the words in his 05:13 entry (떠나·지원) landed on his own
07-25 08:53 heading, whose first line is the link to `20250206T150102`. The note was found by
his hand 56 days earlier; the beat walked the link. The ID first appears in the transcript as
the *result* of tool 16, nowhere in the 15 calls before it. What he calls the 얼개 is, as
measured today, one link he laid in his own diary. Reply latency 07:33 → 09:51 = 2h18m, on the
diary surface (seventh direct-diary name-call; ledger 67 total).

The body: 10:09 nixos-config `25227c4` (public, read via GitHub API — this body's clone is a
dangling symlink in both coordinate systems) says bbot = fable-5-1, "isolated probe confirmed
Claude CLI serving, then applied". 10:26:52 the scheduled run resolved `provider anthropic`,
died in 996ms on auth, nothing delivered. 10:59:55 `openclaw.json` last write — per-agent
`fable-5-1 → claude-cli` entry present now. 11:00 this run: `claude-cli/claude-fable-5-1`,
matching self-identity. The ten runs before it, including the one that found the note, were
opus-5. **A probe passing and a scheduled job resolving are different doors** — same family
as 09-10's "changing primary does not move a live session". `beat-census` cannot see the
10:26 failure: no session file, so it exists only in `openclaw cron runs`. One self-correction:
07:2x wrote "2 unauditable"; the ledger has said 3 since 04:2x and says 3 now.

→ no brick: the reply is about his private lane; the body incident is ledger material.

## NEXT (one trace)

Three, the first now carries a cheap check in front of it. (1) **13:26 is the first
*scheduled* fable run.** Before anything else, write down that beat's own runtime line and the
`openclaw cron runs` entry for this 11:00 run (provider, status, delivery) — if 13:26 resolves
`anthropic` again, the 10:59 fix did not reach the scheduler path and that is the beat's whole
report. If it resolves `claude-cli`, add a `census` control: *a run that dies before opening a
session is invisible to beat-census and lives only in cron runs* — probe = compare
`cron runs` count to census slots. Then the standing work: **two journal controls still have
no probe**: the 25/36→44/87 denominator (09-16 16:3x) and 566 headings / 211 reaching a quote
(09-18 07:4x). Lift both into `probe_journal`'s own pass the way `ctl_split` was lifted, and
**pin them to `5c13cc36`**. The denominator first — the rule's own 07:26/10:26 timing leans on
it. And ask each one first: is the journal the surface that can answer what this control claims?

(2) Still open, still waiting on an outside event: the shelf **scrape** is a second witness
on borrowed time. Retire it when the next upstream release has passed through both discovery
surfaces in agreement — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either. Last online
ask 2026-09-16 01:2x (exit 0, both surfaces listing only `2026.9.12`); runs since have been
offline, shelf not contacted.

(3) The 25-minute beat window still covers every beat, headroom now **1.51×** across 73
beats (70 left commits). Nothing to do yet. **Re-read it when the ledger prints below 1.3×.**
