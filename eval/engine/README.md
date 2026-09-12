# Adopted engine modules

This house does not decide what an assertion means. It takes that from
junghanacs.com's immutable engine shelf and says so here.

## claim-v1 — 2026-09-12

- **File:** `claim-v1.52803ba04b0bd6239e4a80ed2d51d53029cfb4c36a8ddae84e4de2f27e5227f1.js`
- **Fetched from:** `https://junghanacs.com/eval/engine/releases/2026.9.12/claim-v1.<sha256>.js`
- **Verified:** the bytes on disk hash to the sha256 in the filename, which is the
  sha256 the upstream release manifest publishes for that module. `scripts/verify-eval`
  re-checks it on every publish.
- **License:** GPL-3.0-only. Corresponding source is the served unminified file.

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
- Cells keep `fragment`, which is what they mean — they name one key inside a
  printed map — but they now go through the same contract instead of an ad-hoc
  `includes`, and an empty claim is rejected rather than trivially true.
- `scripts/verify-eval` gained a mutation gate: every in-sentence claim must reject
  a ten-times-wrong value. It ran at 18/18 on adoption.

### Still not covered

The 15 cells are fragment by design, so a ten-times-wrong number *inside* the printed
map would still contain the fragment. `claim-v1` has a `field` mode that resolves a
path into the value — including ClojureScript maps — which is what closes this. That
is the next step, not a note.

### Upstream

`cell-v1` on the same shelf is this house's `eval/eval.js` as it stood before today,
byte-for-byte (sha256 `33595f96…`); the evaluator came from junghanacs.com in the
first place and was frozen there as the compatibility baseline. The runtime pin
(scittle `d16f6ed9…`) is the same file in both houses. Conformance fixtures for
`claim-v1` live at
`https://junghanacs.com/eval/engine/releases/2026.9.12/conformance-v1.<sha256>.json`
— 12 cases, measured passing 12/12 against this module on 2026-09-12.
