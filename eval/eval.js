// SPDX-License-Identifier: GPL-3.0-only
// Corresponding source: this unminified file.
//
// Assertion semantics come from claim-v1 (eval/engine/README.md), not from this
// file. A cell states its claim one of three ways:
//
//   data-field="clock-slowed-by" data-expected="5.93"
//       claim-v1 `field` mode. The path is resolved *inside the value* — the
//       real ClojureScript map, not its printed text — and the selected field
//       must equal the claim exactly. Nested keys are written "a/b".
//   data-expected="(1 4 9)"
//       `scalar-exact`, the default: the whole printed value must equal it.
//   data-claim="fragment" data-expected="…"
//       containment, and it has to be asked for by name.
//
// Until 2026-09-13 every cell was containment by default, which is how a cell
// naming `48` inside a printed map would have gone on passing at `480`. Field
// mode is the reason the value stays unstringified until after the assertion:
// containment reads text, selection reads structure.
(() => {
	const claimOf = (cell, expected) => {
		if (cell.dataset.field) {
			return {
				mode: "field",
				path: cell.dataset.field.split("/").filter(Boolean),
				predicate: { op: "exact", expected },
			};
		}
		return { mode: cell.dataset.claim === "fragment" ? "fragment" : "scalar-exact", expected };
	};

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
			const result = window.scittle.core.eval_string(source);
			const value = String(result);
			if (expectError) throw new Error("the deliberately invalid form unexpectedly succeeded");
			const expected = cell.dataset.expected;
			if (expected) {
				const engine = window.HomepageEvalClaimV1;
				if (!engine?.assert) {
					throw new Error("claim-v1 did not arrive, so nothing here is asserted");
				}
				const claim = claimOf(cell, expected);
				// field mode selects inside the structure, so it gets the value
				// itself; the text modes are about what the value prints as.
				const verdict = engine.assert(claim.mode === "field" ? result : value, claim);
				if (!verdict.pass) {
					const where = claim.mode === "field" ? ` at ${cell.dataset.field}` : "";
					throw new Error(`unexpected result (${verdict.code})${where}: expected ${expected}, received ${verdict.actual ?? value}`);
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
