// Run: node scripts/verify-eval-cells.mjs   (called by scripts/verify-eval)
//
// End-to-end wiring probe: parse the PUBLISHED eval page, build a fake DOM from
// the cells it actually contains, then run the real eval.js against it.
// Tests everything except pixel rendering: auto-run, source extraction,
// data-expected assertion, PASS/ERROR status, readonly/editable flags.
import { readFileSync } from "node:fs";
const noop = () => {};
globalThis.window = globalThis;
globalThis.self = globalThis;

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const runtime = `${root}/eval/runtime/scittle.d16f6ed9b4f83be00e3ddebd848db1a8e397a3f9389e0ba3402c62f5193439e6.js`;
const el = () => ({ addEventListener: noop, appendChild: noop, setAttribute: noop, style: {}, textContent: "", dataset: {}, querySelectorAll: () => [], querySelector: () => null });
globalThis.document = {
	addEventListener: noop, createElement: el, createTextNode: el,
	getElementsByTagName: () => [], querySelectorAll: () => [], querySelector: () => null,
	head: el(), body: el(), documentElement: el(), readyState: "complete",
};
new Function(readFileSync(runtime, "utf8"))();
if (!globalThis.scittle?.core?.eval_string) { console.error("runtime failed to load"); process.exit(1); }

// --- parse the real page ---
const html = readFileSync(`${root}/eval/index.html`, "utf8");
const decode = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const blocks = html.split('<div class="eval-cell"').slice(1);
const cells = blocks.map((block) => {
	const head = block.slice(0, block.indexOf(">"));
	const attr = (name) => (head.match(new RegExp(`${name}="([^"]*)"`)) ?? [])[1];
	const ta = block.match(/<textarea[^>]*>([\s\S]*?)<\/textarea>/);
	const listeners = [];
	const output = { textContent: "" }, status = { textContent: "" };
	const button = { addEventListener: (_, fn) => listeners.push(fn) };
	return {
		id: attr("id"), listeners, output, status,
		dataset: {
			auto: attr("data-auto"), editable: attr("data-editable"),
			expectError: attr("data-expect-error"), expected: attr("data-expected"),
		},
		readonly: /<textarea[^>]*\breadonly\b/.test(block),
		querySelector: (sel) => ({ textarea: { value: decode(ta[1]) }, ".eval-output": output, ".eval-status": status, button }[sel] ?? null),
	};
});
if (!cells.length) { console.error("no cells parsed from the page"); process.exit(1); }
document.querySelectorAll = (sel) => (sel === ".eval-cell" ? cells : []);

// --- run the real evaluator ---
new Function(readFileSync(`${root}/eval/eval.js`, "utf8"))();

let bad = 0;
for (const c of cells) {
	const auto = c.dataset.auto === "true";
	if (!auto) c.listeners.forEach((fn) => fn());   // simulate the reader clicking Evaluate
	const pass = c.dataset.state === "pass";
	if (!pass) bad++;
	console.log(`${pass ? "PASS " : "FAIL "} ${c.id}  status=${c.status.textContent}  auto=${auto}  readonly=${c.readonly}  expected=${c.dataset.expected ?? "-"}`);
	console.log(`       => ${c.output.textContent}`);
}

// --- negative control: the assertion must be able to fail ---
const probe = cells[cells.length - 1];
probe.dataset.state = ""; probe.dataset.expected = "999.99";
probe.listeners.forEach((fn) => fn());
const caught = probe.dataset.state === "error";
console.log(`${caught ? "PASS " : "FAIL "} negative-control  a wrong data-expected is reported as ERROR (status=${probe.status.textContent})`);
if (!caught) bad++;

console.log(bad ? `\n${bad} problem(s)` : `\nall ${cells.length} published cells pass, and a wrong assertion fails visibly`);
process.exit(bad ? 1 : 0);
