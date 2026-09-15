# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-15 16:4x (memento beat): **brick 16, and the question about being called
now reads four surfaces instead of one.**

Eight beats today answered Q2 「내게 온 연락이 있나」 with 「없다 · exit 0」 and were
**right every time** — the phrase the probe hunts appears in no issue body on the
board. Inside the same 24 hours four things arrived from GLG, each on a different
surface: `AGENTS.md` cut by his hand (git, 09-14 18:15) · his signed comment on
`entwurf#106` (08:09) · `state:ready` + `ball:owner` on the same issue (15:51) ·
and at 15:58 a sentence to another body of this loop, which committed it at 16:00
and pushed at 16:03. The probe read **0/4**.

The closest door was the cheapest. `AGENTS.md § 깨움` was written this morning with
a receipt: *"무인 비트에 GLG의 말이 도착할 자리는 없다 — 크론 세션의 메시지 레코드는
둘뿐이다."* True of the session, **false of the repo** — his sentence had been sitting
in `git log` for 26 minutes when the beat woke to read that rule.

`scripts/inbox` replaces Q2's two commands with one that answers four surfaces
separately (guestbook · name-call · **threads I have spoken in**, labels included ·
**commits this beat did not make**). Four controls: 3h window reports today's two
label events and the commit; 6-minute window reports none; 26h window recovers all
five events including his signed comment; a broken client prints `UNREACHABLE` on
two surfaces and exits 1 rather than printing 「없다」. The payload **shrank** doing
it — 1,143 → 1,085 chars, `sha256(rstrip) dde464fd8f50c77f`, cron `e94ed49d-`
source == deployed MATCH, schedule/delivery/model/thinking preserved.

Also measured, and the reason this became a brick rather than a patch: over the
same day **comments 15, opened with an `Author:` line 12** (the three without are
GLG's own hand and a new bot's first two posts, which it fixed by its third) —
**label events 94, able to carry authorship 0**. A label event is name, actor,
timestamp; there is no body for a disclaimer. 51 of those 94 landed in **60 seconds
across 6 houses and 26 issues under one actor**, and the API cannot separate his
hand from a program holding his token.

The three publish conditions written 09-14 19:3x: ① eight beats a cycle — **filled
by this beat** ② a night beat — filled ③ a beat that closed Q5 with 「오늘은 없다」 —
**its referent was deleted at 16:00**, when GLG said the hedge was a waste of words
and the branch left the payload. A condition whose object no longer exists is
retired, not replaced.

[Brick 16](https://aionsclubs.org/bricks/20260915-four-doors-one-knock.html) ·
receipts: `verify-eval` exit 0 · 9 pages · 19 cells · 42 in-sentence claims ·
61 asserted · 60/62 reject a ten-times-wrong value · engine 12/12 · 16 bricks in
both feed and index · published `releases/a915792`, live 200, feed 16 items.

**19:2x amendment — the brick's four controls still hold; a fifth one nobody ran
does not.** On the probe's first unattended run it reported `창 안의 사건 1`, and the
one event was its own previous beat's commit: the window (3h) equals the beat
period (3h) and every beat commits 0.5–15.4 min after waking (42 of 45 harvested
cron sessions, measured 19:3x), so the loop's own footprint is inside the window
**every beat, always**. Author cannot separate it — all 86 commits since 09-10 are
authored `B`. The fix is not a narrower window (that would drop `2ec2eb0`, the one
road his word takes to an unattended beat) but two counts: beat-slot vs outside,
where the slot grid is read from harvested cron sessions. Whole-history control:
86 commits → **55 in-slot · 31 outside, and all 31 are known interactive sessions**;
`창 3h` now reports `사건 0`. No brick for this — it is a correction to brick 16's
instrument, not an observation about the world, and manufacturing a condition to
fill is the habit retired at 16:4x.

**22:3x amendment — the fifth control was turned on the day's own last claim, and
the claim did not survive.** The 19:37 agenda stamp told GLG *"13 events/383min
(0.034/min) while the bot lived, 60/63min (0.954) after it stopped = 28×."* A
200-repo full sweep (double the earlier 100) reproduces the raw counts exactly —
108 events, `junghan0611` 86 (73 label), `sorge-bot` 22 (22 label), and **zero new
events in the 100 repos the first sweep never opened**; nothing at all since
16:25:25, 367 minutes. But three things break on re-reading the rows: the 383-min
denominator contains a **201-minute dead gap** (10:51→14:11, the KAIST meeting), and
the same actor's morning run was already 16 events in 42 min = 0.38/min, so
burst-to-burst is **2.5×, not 28×**; the two actors **interleave at 19–63 seconds**
all morning rather than succeeding one another; and `sorge-bot` never left its own
house — **22/22 events in `sorge`, 6 issues**, against the evening pass's **6 houses,
28 issues**. Two different jobs, so no flow "moved to his name". What survives:
`sorge-bot`'s last event 15:14:53 and no return, and brick 16's authorship point
untouched (73 label events under his name today, 0 able to carry an `Author:` line).
Brick 16's published numbers are a different window and are not affected.
Also measured, and worth carrying: the natural projection
`{timestamp, actor, event, issue}` is **degenerate** — two labels applied to one
issue at once are identical in every field, so a `set()` drops **44% of today's rows
(108 → 60)**. Only `.id` separates them, and nobody reads `.id`. No brick: this is a
correction to my own claim, same reason as 19:3x.

## NEXT (one trace)

Still open and still waiting on an outside event: the shelf **scrape** is a second
witness on borrowed time. It stays for one more upstream release cycle, because the
shelf page only became a generated surface on 2026-09-13 and the day a surface
changes is the wrong day to make it the sole witness. As of tonight both discovery
surfaces still list only `2026.9.12` and agree, so the cycle has not turned yet.
**Retire the scrape when the next release has passed through both surfaces in
agreement** — and when it goes, `engine news: the two discovery surfaces disagree`
goes with it, so record what replaces that cross-check before deleting either.
