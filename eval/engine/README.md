# Adopted engine modules

This house does not decide what an assertion means. It takes that from
junghanacs.com's immutable engine shelf and says so here.

What this house adopted is recorded twice: `adopted.json` for machines and this
file for people. `scripts/verify-engine.mjs` reads the first one.

## claim-v1 — 2026-09-12

- **File:** `claim-v1.52803ba04b0bd6239e4a80ed2d51d53029cfb4c36a8ddae84e4de2f27e5227f1.js`
- **Fetched from:** `https://junghanacs.com/eval/engine/releases/2026.9.12/claim-v1.<sha256>.js`
- **Gated:** `scripts/verify-eval` (which `scripts/publish` runs against the staged
  release) calls `scripts/verify-engine.mjs`, which requires three things of every
  publish: the bytes hash to what `adopted.json` records *and* to the sha256 in the
  filename; every reference to a `claim-v1.<sha256>.js` path anywhere in the tree
  names that same hash; and the module still satisfies the shelf's own conformance
  fixture, **12/12 measured on each run** rather than quoted from the day of adoption.
- **License:** GPL-3.0-only. Corresponding source is the served unminified file.

### What the gate line above used to say

> **Verified:** … `scripts/verify-eval` re-checks it on every publish.

Measured 2026-09-13: `grep -n engine scripts/verify-eval` returned nothing. No
check touched this directory. The hash lived in a filename — and a filename
survives any edit to the bytes it names — while `verify-eval-cells.mjs` loaded the
module by that hardcoded path. Swapped bytes would have redefined what every
assertion in this house *means*, and all 33 published claims would still have
reported PASS. This is the same defect as the one the house published a brick
about the day before (`bricks/20260912-run-it-before-publish.html`: a prose
instruction is not a gate), written a second time, one directory over.

Proven to bite, on scratch copies, 2026-09-13:

| tampering | caught by |
| --- | --- |
| bytes edited, filename kept | hash vs `adopted.json` (exit 1) |
| one brick pointed at a different build | call-site scan names the file (exit 1) |
| semantics changed **and every hash re-pinned** | conformance `field-exact-rejects-containing-number` (exit 1) |
| adopted release older than the shelf's | `--online` shelf comparison, on every publish (exit 1) |
| the feed and the shelf page disagree | cross-check of the two discovery surfaces (exit 1) |
| shelf unreachable | reported as unobserved, exit 3, publish proceeds |

The third row is the one worth keeping: a consistent re-pin defeats every hash
check by construction, and only the fixture noticed that `scalar-exact` had
quietly become containment again.

## Watching the shelf

    node scripts/verify-engine.mjs --online

Releases are immutable and content-addressed, so comparing the vendored hash
against the *pinned* manifest can only ever agree with itself. The question worth
a network round trip is the other one: **has the shelf published a release this
house has not read?**

`verify-eval` runs it, so `publish` does. Until 2026-09-13 07:4x it did not: the
flag existed only as a line in this file and one in `AGENTS.md`, addressed to
whoever remembered — **the fifth time this house wrote a prose instruction where a
gate belonged, and it was written in the same hour spent teaching this flag a new
branch nothing would have executed.** The reason it was held back was real, and it
survives as a split rather than an exclusion, because the script already answers
two different questions:

| the shelf says | exit | publish |
| --- | --- | --- |
| we agree | 0 | proceeds |
| I cannot be reached | 3 | proceeds, and says so |
| I disagree with you | 1 | blocked |

A deploy that dies because a network died is a worse house. A deploy that never
asks is the house that published three bricks about not asking. `ENGINE_OFFLINE=1`
skips the round trip when you mean to.

The shelf has no machine-readable index of releases. Measured 2026-09-13, all of
`releases/`, `releases/index.json`, `latest.json`, and `releases/latest/manifest.json`
return 404, so the only discovery surface is the shelf page's own HTML, which this
check scrapes for `releases/<version>/` paths. If that page changes shape the check
fails loudly instead of reporting nothing found.

### The transition signal

This was carried upstream on 2026-09-13 and Homepage is building the feed. Do not
watch the scrape target, and do not describe it here: the page this check scrapes
is being turned into a generated surface by the same work, so any note about its
present shape is already expiring. **Watch one thing instead:**

    https://junghanacs.com/eval/engine/releases.json

`--online` branches on that status, so the arrival needs no edit here to be noticed:

**It arrived.** Measured 2026-09-13 07:4x: **200**, `cache-control:
public,max-age=0`, `access-control-allow-origin: *`. The scrape was not deleted —
the shelf page became a generated surface on the *same day*, and making the thing
that changed today the sole witness is how a watcher goes quietly blind. It stays
a second witness for at least one more release cycle. A status that is neither 404
nor 200 still fails: the signal itself has gone ambiguous and a person should read it.

A live feed that lists the adopted release **without** `manifestSha256` fails too.
The agreed schema's fourth record going missing is the whole point of the feed
going missing, and a note about it would be exactly the defect this house
published three bricks about in two days. `--online` runs outside `publish`, so
that loudness costs no deploy.

The path is deliberately *not* under `releases/`. Homepage's `static/_headers`
gives `/eval/engine/releases/*` a one-year `immutable` cache, which a discovery
feed must never receive — a feed that cannot change is not a feed. This house
proposed `releases/index.json` and was corrected upstream; the correction is
recorded because it is the kind this house keeps making, reasoning about another
repo's shape from outside it.

Published schema, as served:

```json
{ "format": 1,
  "note": "discovery only; adopt an exact release and verify its artifact hashes.",
  "latest": "2026.9.12",
  "releases": [ { "release": "2026.9.12",
    "manifest": "/eval/engine/releases/2026.9.12/manifest.json",
    "manifestSha256": "…",
    "modules": [ {"id": "claim-v1", "sha256": "…"} ] } ] }
```

`latest` is a notification, never an adoption trigger — this house adopts an exact
release or none. `manifestSha256` adds a fourth independent record of one byte
string to the three in `adopted.json`.

### There is no version comparator here, on purpose

There was one, and it was wrong within the hour. The upstream id grammar grew a
same-day follow-up form on 2026-09-13 (`YYYY.M.D[-<label>.<n>]`), and this
house's comparator read `2026.9.12-fix.1` as `[2026, 9, NaN, 1]` and answered
**"nothing newer" — silently**, the one failure mode this check exists to prevent.
The scrape's pattern had the same hole: digits and dots only, so a follow-up was
invisible on the page too.

The repair is not a better parser. Homepage declared the feed's `releases[]` array
order **normative** — publication order, oldest first, append-only — so a consumer
answers "is there anything newer?" by **its own position in that array** and never
parses a release id. In their words: the sort rule is how the publisher builds an
order, not a procedure a consumer re-implements. This check now also reports when
`latest` is not the last array element, because that is the guarantee the position
read rests on.

That this is the right shape has a second receipt, and it moved the same morning.
The house tag convention the grammar grew from calls its suffix **free-form**
(`agent-config skills/tag-release/SKILL.md`), and the listing command that skill
recommends, `git tag --sort=-version:refname`, measurably orders same-day
follow-ups by label rather than by publication: tag `v2026.9.12-fix.1` and
`v2026.9.12-docs.2`, and git puts `fix.1` above `docs.2` though `n` says otherwise
(measured 2026-09-13, `versionsort.suffix` unset). That measurement went to the
skill's steward, and as of `agent-config cc52950` the skill says so itself —

> With multiple free-form same-day suffixes, this is not publication order or
> stable release chronology; consumers needing a total order must carry an
> explicit ordered identifier.

— so this paragraph no longer describes a gap, it records why the disclaimer
exists. The explicit ordered identifier that sentence asks for is exactly what the
upstream feed carries: the array. There is no correct comparator to write here,
only a position to read.

### What blocks a publish, and what only reports

`--online` runs inside `verify-eval`, so a failure here stops a deploy. Only a
**contradiction** earns that:

| | |
| --- | --- |
| **fail, exit 1** | the manifest reports a different release · an adopted module hash differs · the vendored conformance hash differs · the feed's `manifestSha256` does not match the fetched bytes · the adopted release is **withdrawn** from the feed or the page |
| **news, exit 0** | the feed lists releases **after** ours · `latest` is not the last array element · the shelf page changed shape · the two discovery surfaces disagree |

An upstream release this house has not read is **news, not corruption.** The
adoption contract says so in as many words — *a consumer can remain on an old
release indefinitely* — and a gate that stops this house's press because another
repository did something correct has handed over the key.

Eight controls against a fixture shelf, measured 2026-09-13: the follow-up id that
used to vanish now reports and publishes; a withdrawn release and a lying
`manifestSha256` both block.

### Why

Before this, both of the house's assertions — `data-expected` on a cell and on an
in-sentence `<output>` — were **containment**: the computed value had to *contain*
the claim. That was written down, honestly, as a note in the verifier's own output:

> Note: data-expected is containment, not equality — a wrong value that contains
> the expected text still passes.

A note is a position a person occupies. Measured on 2026-09-12 against the site as
published: of 33 live assertions, **22 would still have passed if the computed value
were ten times wrong** — `"6"` sits inside `"60"`.

### What changed

- In-sentence claims now assert `scalar-exact`. All 18 already matched exactly, so
  no published number moved; what moved is that a wrong one can no longer slip past.
  A sentence that genuinely wants containment must now say `data-claim="fragment"`.
- Cells went through the same contract instead of an ad-hoc `includes`, and an empty
  claim is rejected rather than trivially true.
- `scripts/verify-eval` gained a mutation gate: every in-sentence claim must reject
  a ten-times-wrong value. It ran at 18/18 on adoption.

### Then, 2026-09-13

Cells moved from `fragment` to `field`: 13 of 15 name a path *inside* the value
(`data-field="on-the-road"`), so a ten-times-wrong number in a printed map no longer
passes by being contained. The mutation gate reaches **31 of 33** claims, and the two
it cannot reach — a keyword and a printed sequence, which have no ten-times-wrong
version — are named in the verifier's own summary instead of being counted as covered.
The default for a bare `data-expected` is now `scalar-exact`; containment has to be
asked for by name.

### Upstream

`cell-v1` on the same shelf is this house's `eval/eval.js` as it stood before today,
byte-for-byte (sha256 `33595f96…`); the evaluator came from junghanacs.com in the
first place and was frozen there as the compatibility baseline. The runtime pin
(scittle `d16f6ed9…`) is the same file in both houses. The conformance fixture for
`claim-v1` is now **vendored here too**
(`conformance-v1.1b1967a4….json`, 12 cases) rather than cited from the shelf: a
fixture that has to be fetched is a check this house can only perform when the
network is up, and adoption is supposed to be verifiable without asking Homepage
anything. It runs on every publish, 12/12.
