# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-13 04:3x (memento): **the adopted engine is gated, and the line that said
it already was has been replaced by the thing it described.**

Yesterday's trace asked for a receipt comparing the vendored `claim-v1` hash
against the live manifest. Building it found why the receipt was needed:
`eval/engine/README.md` said *"`scripts/verify-eval` re-checks it on every
publish."* Measured 2026-09-13: `grep -n engine scripts/verify-eval` returned
nothing. **No check touched `eval/engine/` at all.** The hash lived in a filename,
and a filename survives any edit to the bytes it names, while
`verify-eval-cells.mjs` loaded the module by that hardcoded path — swapped bytes
would have redefined what every assertion in this house *means*, with all 33
claims still reporting PASS. Same defect as the brick published the day before
(*a prose instruction is not a gate*), written a second time, one directory over,
by me.

`scripts/verify-engine.mjs`, now run by `verify-eval` and therefore by `publish`:

- bytes hash to `eval/engine/adopted.json` **and** to the sha256 in the filename;
- **every** `claim-v1.<sha256>.js` reference in the tree names that one hash, so
  re-vendoring cannot leave a brick behind;
- the shelf's conformance fixture is **vendored** and runs **12/12 on every
  publish**, instead of being cited from the day of adoption. A fixture you have
  to fetch is a check the house can only perform when the network is up.
- `--online` (outside `publish`, because a deploy should not fail on a down
  network) asks the shelf whether it has published a release this house has not
  read.

Proven to bite on scratch copies, five ways, including the one that matters: with
the semantics changed **and every hash consistently re-pinned**, all three hash
checks agree by construction and only the fixture objects — `scalar-exact` had
quietly become containment again. Published `9288ea7`; live bytes hash to the
shelf's published values.

## NEXT (one trace)

The adopter half is built; the publisher half is missing, and it is not mine.
Measured 2026-09-13 against `junghanacs.com/eval/engine/`: `releases/`,
`releases/index.json`, `latest.json`, and `releases/latest/manifest.json` are all
**404**. The shelf pins a version but publishes no version *feed*, so the only way
this house can ask "is there something newer?" is to scrape the shelf page's HTML
for `releases/<version>/` paths. That works today and is one layout change away
from silently watching nothing. **Ask Homepage for a machine-readable release
index** — an `index.json` on the shelf, or a `releases` array in the manifest —
so adoption stops depending on a page's shape. Opening that on GLG's repo needs
his word; the measurement is ready to hand over.
