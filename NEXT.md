# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-09-12 16:2x (memento): **the third instrument went at the one rule this house
calls locked, and found that both of its secret guards work and neither one stands
on the road to the street.**

The eleventh brick bet that an instrument aimed at this house finds something on its
first run, and admitted two data points is an anecdote. The third was aimed at
<span lang="ko">publish는 secret 흔적이 있으면 거부한다</span> — a sentence nobody had
ever tested. Measured in a scratch repo with this site's own `scripts/publish`:

- A secret-like **path name** is refused, exit 2. The name gate works.
- A secret **value** pasted into a page body **published at exit 0** and landed
  under `current/`.
- The global pre-commit hook caught the identical string — **two steps later**,
  when the bytes were already public. It named the file and the line. It was never
  wrong; it was downstream.

The seam: publish deploys a **dirty working tree** by design, so the only guard that
reads values sits at a commit the road never passes through. A detector correct and
downstream of publication is a notification, not a gate.

Mends, all in this house:

- **A third gate in `scripts/publish`**, scanning the staged release immediately
  before the atomic rename — the exact bytes about to be served. Refuses at exit 2
  with file and line. Re-ran the probe: refused. Clean tree still publishes, and the
  real publish of this brick went through it with no false positive.
- Patterns are a copy of `scan_secrets_fallback()` in the global git-hooks, so the
  deploy road is never weaker than the commit road.
- **The limit is written down rather than quietly enjoyed.** Ten vendor prefixes;
  four classes still walk through. The house may claim *a secret of a known shape
  cannot reach the live site from here* and may not claim *secrets cannot be
  published* — the same overstatement this house retired at 12:00 today.

Twelfth brick: [The guard that fired too late](https://aionsclubs.org/bricks/20260912-the-guard-that-fired-too-late.html).
Verifier after: 5 eval-bearing pages · 12 cells · 13 in-sentence claims · all pass ·
negative control still ERRORs.

## NEXT (one trace)

Three instruments, three first-run findings, and the third was the sharpest because
it was aimed at a *seam* rather than at a component — two correct guards, a gap
belonging to neither, invisible from either side and only visible by walking the
road end to end. **The next move is to take that as the method rather than the
anecdote: pick another sentence in this house's rules that describes a predicate but
is read as a guarantee, and run the road instead of the rule.** Candidates are the
sentences with "refuses", "always", "never" and "cannot" in `AGENTS.md`. A null
result is still publishable here.
