// SPDX-License-Identifier: GPL-3.0-only
// Corresponding source: this unminified file.
//
// Assertion semantics come from claim-v1 (eval/engine/README.md), not from this
// file. A cell asserts `fragment` — it names a key and its value inside a larger
// printed map, deliberately — unless the author writes data-claim="scalar-exact",
// in which case the whole printed value must equal the claim.
(() => {
	const render = (cell) => {
		const source = cell.querySelector("textarea").value;
		const output = cell.querySelector(".eval-output");
		const status = cell.querySelector(".eval-status");
		const expectError = cell.dataset.expectError === "true";
		const originalConsoleError = console.error;
		if (expectError) console.error = () => {};
		cell.dataset.state = "running";
		status.textContent = "RUNNING";
		try {
			if (!window.scittle?.core?.eval_string) {
				throw new Error("scittle.core.eval_string is unavailable");
			}
			const value = String(window.scittle.core.eval_string(source));
			if (expectError) throw new Error("the deliberately invalid form unexpectedly succeeded");
			const expected = cell.dataset.expected;
			if (expected) {
				const engine = window.HomepageEvalClaimV1;
				if (!engine?.assert) {
					throw new Error("claim-v1 did not arrive, so nothing here is asserted");
				}
				const mode = cell.dataset.claim === "scalar-exact" ? "scalar-exact" : "fragment";
				const verdict = engine.assert(value, { mode, expected });
				if (!verdict.pass) {
					throw new Error(`unexpected result (${verdict.code}): expected ${expected}, received ${value}`);
				}
			}
			output.textContent = value;
			cell.dataset.state = "pass";
			status.textContent = "PASS";
		} catch (error) {
			const message = error?.message ?? String(error);
			output.textContent = `ERROR: ${message}`;
			if (expectError && !message.includes("unexpectedly succeeded")) {
				cell.dataset.state = "pass";
				status.textContent = "EXPECTED ERROR";
			} else {
				cell.dataset.state = "error";
				status.textContent = "ERROR";
			}
		} finally {
			console.error = originalConsoleError;
		}
	};

	document.querySelectorAll(".eval-cell").forEach((cell) => {
		cell.querySelector("button").addEventListener("click", () => render(cell));
		if (cell.dataset.auto === "true") render(cell);
	});
})();
