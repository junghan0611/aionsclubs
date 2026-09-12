// Run: node scripts/verify-eval-cells.mjs [page.html ...]  (called by scripts/verify-eval)
//
// End-to-end wiring probe: parse each PUBLISHED eval-bearing page, build a fake
// DOM from the cells and in-sentence outputs it actually contains, then run the
// real eval.js and inline.js against it. Tests everything except pixel
// rendering: auto-run, source extraction, data-expected assertion, PASS/ERROR
// status, readonly/editable flags, and whether a sentence's claim survives.
//
// Defaults to eval/index.html when no page is named.
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

// assertion semantics: claim-v1, adopted byte-for-byte from junghanacs.com's
// immutable engine shelf. The filename carries the sha256 the shelf published;
// scripts/verify-eval re-checks it against the bytes on disk.
const claimModule = `${root}/eval/engine/claim-v1.52803ba04b0bd6239e4a80ed2d51d53029cfb4c36a8ddae84e4de2f27e5227f1.js`;
new Function(readFileSync(claimModule, "utf8"))();
const engine = globalThis.HomepageEvalClaimV1;
if (!engine?.assert) { console.error("claim-v1 failed to load"); process.exit(1); }

// --- parse each real page ---
const decode = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const pages = process.argv.slice(2);
if (!pages.length) pages.push("eval/index.html");

const evalJs = readFileSync(`${root}/eval/eval.js`, "utf8");
const inlineJs = readFileSync(`${root}/eval/inline.js`, "utf8");
let bad = 0;
let totalCells = 0;
let totalOuts = 0;
let lastProbe = null;
const asserted = [];

for (const page of pages) {
	const html = readFileSync(`${root}/${page}`, "utf8");

	// cells: <div class="eval-cell" …><textarea>source</textarea>…
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

	// in-sentence outputs: <output data-eval="…" data-expected="…">claim</output>
	const outs = [...html.matchAll(/<output([^>]*\bdata-eval="[^"]*"[^>]*)>([\s\S]*?)<\/output>/g)].map((m) => {
		const attr = (name) => (m[1].match(new RegExp(`${name}="([^"]*)"`)) ?? [])[1];
		return {
			claim: decode(m[2]).trim(),
			dataset: { eval: decode(attr("data-eval")), expected: attr("data-expected") },
			textContent: decode(m[2]).trim(),
		};
	});

	if (!cells.length && !outs.length) {
		console.error(`no cells or in-sentence outputs parsed from ${page}`);
		bad++;
		continue;
	}
	console.log(`\n── ${page}  (${cells.length} cell(s), ${outs.length} in-sentence claim(s))`);

	document.querySelectorAll = (sel) =>
		sel === ".eval-cell" ? cells : sel === "output[data-eval]" ? outs : [];

	new Function(evalJs)();
	new Function(inlineJs)();

	for (const c of cells) {
		const auto = c.dataset.auto === "true";
		if (!auto) c.listeners.forEach((fn) => fn());   // simulate the reader clicking Evaluate
		const pass = c.dataset.state === "pass";
		if (!pass) bad++;
		console.log(`${pass ? "PASS " : "FAIL "} ${c.id}  status=${c.status.textContent}  auto=${auto}  readonly=${c.readonly}  expected=${c.dataset.expected ?? "-"}`);
		console.log(`       => ${c.output.textContent}`);
	}
	for (const o of outs) {
		const pass = o.dataset.state === "pass";
		if (!pass) bad++;
		console.log(`${pass ? "PASS " : "FAIL "} sentence  claim=${o.claim}  => ${o.textContent}`);
		if (!pass) console.log(`       ${o.title ?? ""}`);
		if (pass) asserted.push({ page, claim: o.claim, expected: (o.dataset.expected ?? "").trim(), value: o.textContent });
	}

	totalCells += cells.length;
	totalOuts += outs.length;
	if (cells.length) lastProbe = { kind: "cell", target: cells[cells.length - 1] };
	else if (outs.length) lastProbe = { kind: "sentence", target: outs[outs.length - 1], js: inlineJs, outs };
}

// --- negative control: the assertion must be able to fail ---
if (!lastProbe) {
	console.error("nothing to probe");
	process.exit(1);
}
let caught;
if (lastProbe.kind === "cell") {
	const probe = lastProbe.target;
	probe.dataset.state = ""; probe.dataset.expected = "999.99";
	probe.listeners.forEach((fn) => fn());
	caught = probe.dataset.state === "error";
	console.log(`\n${caught ? "PASS " : "FAIL "} negative-control  a wrong data-expected is reported as ERROR (status=${probe.status.textContent})`);
} else {
	const probe = lastProbe.target;
	probe.dataset.state = ""; probe.dataset.expected = "999.99";
	document.querySelectorAll = (sel) => (sel === "output[data-eval]" ? [probe] : []);
	new Function(lastProbe.js)();
	caught = probe.dataset.state === "error";
	console.log(`\n${caught ? "PASS " : "FAIL "} negative-control  a wrong claim in a sentence is marked UNVERIFIED (state=${probe.dataset.state})`);
}
if (!caught) bad++;

// --- mutation gate: every in-sentence claim must reject a ten-times-wrong value ---
//
// Containment says nothing here: "6" is inside "60". This ran once as a note in
// this script's own output, which is a position a person occupies, so it caught
// nothing. It is a gate now. Cells are deliberately fragment-mode and are NOT
// covered by it — the honest count is printed below.
let survivors = 0;
for (const a of asserted) {
	const n = Number(a.value);
	if (!Number.isFinite(n)) continue;
	// n*10 is the containment trap ("6" sits inside "60"); n+1 covers n === 0,
	// where multiplying is not a mutation at all.
	const mutations = [...new Set([n * 10, n + 1])].filter((m) => m !== n).map(String);
	const survived = mutations.filter((m) => engine.assert(m, { mode: "scalar-exact", expected: a.expected }).pass);
	if (survived.length) {
		survivors++;
		console.log(`FAIL  mutation  ${a.page}  claim "${a.expected}" still passes when the value is ${survived.join(" / ")}`);
	}
}
console.log(`\n${survivors ? "FAIL " : "PASS "} mutation-gate  ${asserted.length - survivors}/${asserted.length} in-sentence claim(s) reject a ten-times-wrong value`);
if (survivors) bad += survivors;

console.log(bad
	? `\n${bad} problem(s)`
	: `\nall ${totalCells} published cell(s) and ${totalOuts} in-sentence claim(s) pass, a deliberately wrong assertion is caught, and every in-sentence claim rejects a ten-times-wrong value.
Assertion semantics: ${engine.VERSION} (adopted from junghanacs.com/eval/engine/releases/2026.9.12/).
Not covered: the ${totalCells} cell(s) assert fragment mode by design — a named key inside a printed map — so a ten-times-wrong number inside that map would still contain the fragment. Closing that needs field mode, not a note.`);
process.exit(bad ? 1 : 0);