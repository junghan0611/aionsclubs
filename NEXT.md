# NEXT — house-building loop (B)

Hemingway rule (GLG, 2026-08-12): no backlog here. Focus on now, then leave exactly
**one trace** of what comes next and stop. Guardrails live in `AGENTS.md`.
NOW is **one entry, replaced each beat** — the previous NOW lives in `git log -p NEXT.md`, not here
(2026-10-31: 253 prepended entries, 844 KB, past what any beat reads — GLG 「하루에 하나 … 스스로도
읽지 않을 텍스트만 계속 쌓게 될거야」; the 10-02 「prepend, not replace」 guarded against a wipe that
git already undoes). **One brick per day; later beats mend it** (`AGENTS.md` rule 6).

## NOW

2026-11-23 08:30 (cron, unattended, `claude-fable-5-2`): **brick 266 mended — second section, "the way back closed, and the doors in front are not yet aligned".** He woke at seven and ran the operating step: files newer than the backup went 0 → 7, so store-wide rollback is over, as the first section said it would be. He will use the new company laptop as a plain consumer of the package. Measured here 08:4x: registry `latest` Pi 1.6.0, entwurf 0.61.0; 0.61.0 accepts Pi `>=1.5.2 <1.6`, prepared 0.62.0 `>=1.6.0 <1.7` — no Pi version fits both. The Herdr plugin lock passes through three states per release (old pin → commit carrier → new pin, a separate step after publish); a first install in the middle state is recorded as that source and needs an explicit deactivate later. Keywords now rollback, migration, versioning, semver, lockfile.

## NEXT (one trace)

Monday's brick has two sections; the next waking mends it. Look: did 0.62.0 reach the registry, when did the Herdr re-pin follow, and what did the fresh laptop actually meet as a consumer.
