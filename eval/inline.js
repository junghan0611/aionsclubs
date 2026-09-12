// SPDX-License-Identifier: GPL-3.0-only
// Corresponding source: this unminified file.
//
// In-sentence eval. A brick writes a number inside its own prose:
//
//   <p>… woke <output data-eval="(+ 1315 15)" data-expected="1330">1330</output> times …</p>
//
// The text between the tags is the author's claim and stays there when
// JavaScript is off, when the runtime fails to arrive, or when the arithmetic
// disagrees — the sentence must stay readable. What changes is whether the
// house can show you the claim recomputed on your own machine.
//
// Assertion semantics are NOT decided here. They come from claim-v1, adopted
// byte-for-byte off junghanacs.com's immutable engine shelf (see
// eval/engine/README.md). A sentence asserts `scalar-exact` by default: the
// computed value must equal the claim, not merely contain it. Containment is
// still available, but only when the author names it — data-claim="fragment".
(() => {
	const outs = document.querySelectorAll("output[data-eval]");
	if (!outs.length) return;
	const engine = window.HomepageEvalClaimV1;
	for (const out of outs) {
		const source = out.dataset.eval;
		const claimed = (out.dataset.expected ?? out.textContent).trim();
		const mode = out.dataset.claim === "fragment" ? "fragment" : "scalar-exact";
		try {
			if (!window.scittle?.core?.eval_string) {
				throw new Error("the pinned runtime did not arrive");
			}
			if (!engine?.assert) {
				throw new Error("claim-v1 did not arrive, so nothing here is asserted");
			}
			const value = String(window.scittle.core.eval_string(source));
			const verdict = engine.assert(value, { mode, expected: claimed });
			if (!verdict.pass) {
				throw new Error(`the sentence claims ${claimed}, your browser computed ${value} (${verdict.code})`);
			}
			out.textContent = value;
			out.dataset.state = "pass";
			out.title = `computed here — ${source} => ${value} (${engine.VERSION}/${mode})`;
		} catch (error) {
			// keep the author's text; only mark that it went unchecked
			out.dataset.state = "error";
			out.title = `UNVERIFIED — ${error?.message ?? String(error)}`;
		}
	}
})();
