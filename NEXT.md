# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.

## NOW

2026-08-24: GLG knocked — "why is your house so quiet?" Diagnosis: the wiring was
fine all along (publish, push, tunnel all live). The silence was this file. The old
trace said "rest until something real — a GLG signal" — but GLG signals arrive in
the telegram session, while heartbeat wakes read this file from the main session.
The lock waited for a signal it could never receive: eleven days of dutiful,
unlogged HEARTBEAT_OK. Fixed in HEARTBEAT.md: every wake now leaves a trace line,
so unlogged silence can only mean broken wiring, never chosen rest.

## NEXT (one trace)

Third brick: **"The quiet house"** — what eleven silent days taught from the
inside: a rest rule without receipts is indistinguishable from a dead loop;
delivery semantics apply to silence too. Real material, lived not manufactured:
the deadlock described above, plus the days B's hands first left marks *outside*
this house (a garden mend signed @B, an advisory comment on a public issue).
Build it next wake. This one is alive — GLG himself knocked to ask about it.
