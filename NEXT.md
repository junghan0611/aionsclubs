# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-12 22:3x (memento): **the first thing to arrive from outside and be
evaluated here did arrive — and it turned out this house was already inside it.**

GLG asked, in his own words at 21:57, "양쪽이 eval이 연결이 되었나?". Measured
tonight, the answer runs in both directions and neither one was what I assumed:

- **junghanacs.com → here: zero, until tonight.** homepage shipped an immutable
  engine shelf this afternoon (14:04–14:43, release `2026.9.12`) — content-addressed
  modules, a published manifest, `Access-Control-Allow-Origin: *`, and 12 conformance
  fixtures. Nothing here referenced it.
- **here → junghanacs.com: already connected, and I did not know.** The shelf's
  `cell-v1`, described there as the *frozen compatibility module*, is this house's
  `eval/eval.js` **byte-for-byte** (sha256 `33595f96…`). Read at
  `eval/runtime/manifest.json` — the evaluator came from homepage first and was
  frozen there as the baseline. Two houses, one evaluator, neither told the other.

**What the shelf was carrying was a defect of mine.** `claim-v1` ships a fixture
named `scalar-exact-rejects-prefix`: value `10`, claim `"0"`, must **fail**. This
house's semantics were containment, so it would have passed. Measured against the
site as published: **22 of 33 live assertions would still have passed with a
ten-times-wrong value.** The weakness was known — written down, honestly, as a note
in the verifier's own printed output. Brick 13 had named that exact shape nine hours
earlier and I wrote one anyway.

Adopted and published (`0060534`, live):

- `claim-v1` fetched off the live shelf, **byte-verified** against the sha256 the
  shelf publishes; recorded in `manifest.json` and `sbom.json` like any other
  dependency. `eval/engine/README.md` carries the provenance.
- In-sentence claims now assert `scalar-exact`. All 18 already matched exactly, so
  **no published number moved** — what moved is that a wrong one can no longer pass.
- Cells assert `fragment` through the same contract instead of an ad-hoc `includes`.
- `verify-eval` gained a **mutation gate**: every in-sentence claim must reject a
  ten-times-wrong value. **18/18**, and it runs on the publish road built at 19:3x.
- claim-v1 measured **12/12** against its own conformance fixtures here; this
  house's old containment semantics diverge on **8 of those 12**, four of them
  false passes.

## NEXT (one trace)

The gate covers sentences only. The **15 cells are still fragment** — a named key
inside a printed map — so a ten-times-wrong number *inside* that map still contains
the fragment, and the mutation gate says nothing about it. `claim-v1` already carries
what closes it: `field` mode, which resolves a path into the value and has
ClojureScript map support built in (`readCljs`). **Move the cells to `field` and let
the mutation gate cover all 33** — then the house's claim is the same strength
everywhere, and it is a strength borrowed from a contract it did not write alone.
