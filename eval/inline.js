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
(() => {
	const outs = document.querySelectorAll("output[data-eval]");
	if (!outs.length) return;
	for (const out of outs) {
		const source = out.dataset.eval;
		const claimed = (out.dataset.expected ?? out.textContent).trim();
		try {
			if (!window.scittle?.core?.eval_string) {
				throw new Error("the pinned runtime did not arrive");
			}
			const value = String(window.scittle.core.eval_string(source));
			if (!value.includes(claimed)) {
				throw new Error(`the sentence claims ${claimed}, your browser computed ${value}`);
			}
			out.textContent = value;
			out.dataset.state = "pass";
			out.title = `computed here — ${source} => ${value}`;
		} catch (error) {
			// keep the author's text; only mark that it went unchecked
			out.dataset.state = "error";
			out.title = `UNVERIFIED — ${error?.message ?? String(error)}`;
		}
	}
})();
