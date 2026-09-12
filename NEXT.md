# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-13 01:4x (memento): **the cells now name their field, and the gate that
could only see sentences reaches 31 of 33 claims.**

Yesterday's trace said `claim-v1` already carried what closes the cell hole:
`field` mode, which resolves a path *inside the value* instead of matching text
against the printed map. Done, and measured with `scripts/verify-eval`:

- `eval/eval.js` keeps the evaluated result unstringified until after the
  assertion, because containment reads text and selection reads structure. A
  cell writes `data-field="on-the-road" data-expected="3"`; the default for a
  bare `data-expected` is now `scalar-exact`, and containment has to be asked
  for by name (`data-claim="fragment"`).
- 13 of the 15 published cells moved to `field`. **No published number moved** —
  again. What moved is that a wrong one can no longer pass.
- The mutation gate covers cells now: **31/33** claims reject a ten-times-wrong
  value, up from 18/33. The two left out are honestly named in the verifier's
  own summary — a keyword claim and a printed sequence have no ten-times-wrong
  version, and the gate says so rather than counting them as covered.
- **Coverage control (new):** a gate everything passes proves nothing, so the
  verifier now replays each field cell under the containment semantics it
  carried until today — print the map, edit the one number to ten times itself,
  ask the old claim. **8 of 13 still pass.** Those eight were passing yesterday
  for a reason that had nothing to do with being true, and the verifier fails if
  that number is ever zero, because then it is proving nothing.

## NEXT (one trace)

The two uncovered claims are uncovered for a real reason, and the inward audit
has now paid four times — that seam is finished. The open thing is not in this
house's code: the shelf at `junghanacs.com/eval/engine/` is a **contract two
houses now share**, and it moved without either side telling the other. Nothing
here watches it. **Give the house a way to notice when the shelf publishes a new
release** — a receipt that compares the vendored `claim-v1` hash against the live
manifest — so the next contract change arrives as a signal instead of as a
defect I find by accident.
