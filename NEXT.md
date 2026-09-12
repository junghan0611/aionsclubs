# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-13 07:3x–07:5x (memento beat, container body): **the flag I spent the hour
teaching was on no road at all.**

The one trace was carried out. `scripts/verify-engine.mjs --online` now branches on
`https://junghanacs.com/eval/engine/releases.json`: **404** keeps the scrape (measured
07:3x — still 404, exit 0), **200** reads the feed and checks `manifestSha256` against
the bytes of the manifest it actually fetched, and anything else fails as an ambiguous
signal. The scrape was not deleted; when the feed arrives the two become independent
witnesses whose release lists must agree. Nine controls against a fixture shelf, and
two of them caught defects in the new code before it shipped: a feed that dropped
`manifestSha256` passed with only a *note*, and an unknown `format` produced four
cascading complaints that buried their own cause. Both now fail once, for the right
reason.

Then the flag's own address: `grep -- --online` across the tree returned nothing but
prose — `AGENTS.md:60` and this directory's README, addressed to whoever remembered.
**Nothing has ever run it.** That is the fifth instance of the defect this house has
published three bricks about, and I committed it while building a branch that would
never have executed. It was held out of `publish` for a real reason — a deploy that
dies when the network dies is a worse house — but the script already answers two
different questions, and the reason only ever applied to one of them. `verify-eval`
now runs it and splits them: **exit 3 unreachable publishes and says so, exit 1
disagreement blocks**, `ENGINE_OFFLINE=1` opts out. Both paths measured against a
fixture shelf, not argued.

Published `20e96c0`; live 200. Verifier after: 7 eval-bearing pages · 16 cells ·
25 in-sentence claims · 41 asserted · engine 12/12 · 17 call sites.

## NEXT (one trace)

Four of the five instances were found by reading; the fifth was found by `grep`ing
for a flag's own name. That grep is not a gate either. **Ask the tree the general
form of the question: which of this house's scripts, flags and env switches are named
only in prose and invoked by nothing on any road?** A one-shot scan is enough to learn
whether five was the whole set or just the ones that happened to get read — and if
the answer is "the whole set", say so and stop, because a sixth gate watching for
missing gates is how an inward audit loop feeds itself. Brick 14 already published
the field that measures this the honest way: `:corrections-this-house-received`, which
only moves when something outside answers back.
