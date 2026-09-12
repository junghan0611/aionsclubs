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
			id: attr("id"), listeners, output, status, source: decode(ta[1]),
			dataset: {
				auto: attr("data-auto"), editable: attr("data-editable"),
				expectError: attr("data-expect-error"), expected: attr("data-expected"),
				field: attr("data-field"), claim: attr("data-claim"),
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
		const names = c.dataset.field ? `${c.dataset.field}=` : "";
		console.log(`${pass ? "PASS " : "FAIL "} ${c.id}  status=${c.status.textContent}  auto=${auto}  readonly=${c.readonly}  expected=${names}${c.dataset.expected ?? "-"}`);
		console.log(`       => ${c.output.textContent}`);
		if (pass && c.dataset.expected) {
			asserted.push({
				page, kind: "cell", id: c.id, source: c.source,
				expected: c.dataset.expected.trim(),
				field: c.dataset.field, claim: c.dataset.claim,
			});
		}
	}
	for (const o of outs) {
		const pass = o.dataset.state === "pass";
		if (!pass) bad++;
		console.log(`${pass ? "PASS " : "FAIL "} sentence  claim=${o.claim}  => ${o.textContent}`);
		if (!pass) console.log(`       ${o.title ?? ""}`);
		if (pass) asserted.push({ page, kind: "sentence", id: o.claim, expected: (o.dataset.expected ?? "").trim(), value: o.textContent });
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

// --- mutation gate: every numeric claim must reject a ten-times-wrong value ---
//
// Containment says nothing here: "6" is inside "60". This ran once as a note in
// this script's own output, which is a position a person occupies, so it caught
// nothing. It became a gate on 2026-09-12, but only over sentences — the cells
// were still containment and the gate was silent about all fifteen. Since
// 2026-09-13 a cell names its field, so the same gate reaches them.
//
// A sentence is mutated at the value; a cell is mutated at the claim, because
// the number lives inside a real ClojureScript map that cannot be edited from
// out here. For `op: "exact"` the two are the same test — equality is
// symmetric — and doing it at the claim also exercises the path resolution
// that field mode depends on.
let survivors = 0;
let covered = 0;
const uncovered = [];
for (const a of asserted) {
	const isCell = a.kind === "cell";
	const anchor = isCell ? a.expected : a.value;
	const n = Number(anchor);
	if (!Number.isFinite(n) || anchor === "") {
		uncovered.push(`${a.kind} ${a.id} (${a.claim === "fragment" ? "fragment" : "non-numeric"})`);
		continue;
	}
	covered++;
	// n*10 is the containment trap ("6" sits inside "60"); n+1 covers n === 0,
	// where multiplying is not a mutation at all.
	const mutations = [...new Set([n * 10, n + 1])].filter((m) => m !== n).map(String);
	const survived = mutations.filter((m) => {
		if (!isCell) return engine.assert(m, { mode: "scalar-exact", expected: a.expected }).pass;
		const value = globalThis.scittle.core.eval_string(a.source);
		const path = a.field.split("/").filter(Boolean);
		return engine.assert(value, { mode: "field", path, predicate: { op: "exact", expected: m } }).pass;
	});
	if (survived.length) {
		survivors++;
		console.log(`FAIL  mutation  ${a.page}  ${a.kind} claim "${a.expected}" still passes at ${survived.join(" / ")}`);
	}
}
console.log(`\n${survivors ? "FAIL " : "PASS "} mutation-gate  ${covered - survivors}/${covered} numeric claim(s) reject a ten-times-wrong value`);
if (uncovered.length) console.log(`       not mutable: ${uncovered.join(", ")}`);
if (survivors) bad += survivors;

// --- coverage control: the gate must not be vacuous ---
//
// A gate that everything passes proves nothing until you show what it rejects.
// Every field cell here used to claim `:key value` against the map's printed
// text, so this replays that: print the result, edit the one number to ten
// times itself, and ask the old containment semantics whether the old claim
// still holds. Each survivor is a claim that was passing yesterday for a
// reason that had nothing to do with being true.
let wouldHaveSurvived = 0;
let replayed = 0;
for (const a of asserted.filter((x) => x.kind === "cell" && x.field)) {
	const n = Number(a.expected);
	if (!Number.isFinite(n)) continue;
	const printed = String(globalThis.scittle.core.eval_string(a.source));
	const key = a.field.split("/").pop();
	const site = new RegExp(`(:${key}\\s+)${a.expected.replace(".", "\\.")}\\b`);
	if (!site.test(printed)) continue;   // not the shape the old claim asserted
	replayed++;
	// same rule as the gate: ten times, except at zero where that is not a
	// mutation at all. Yesterday this degenerate case slipped through once.
	const wrong = n === 0 ? n + 1 : n * 10;
	const tenTimesWrong = printed.replace(site, `$1${wrong}`);
	const oldClaim = `:${key} ${a.expected}`;
	if (engine.assert(tenTimesWrong, { mode: "fragment", expected: oldClaim }).pass) {
		wouldHaveSurvived++;
		console.log(`       ${a.id}: containment would still pass "${oldClaim}" at ${wrong}`);
	}
}
const controlOk = wouldHaveSurvived > 0;
console.log(`${controlOk ? "PASS " : "FAIL "} coverage-control  ${wouldHaveSurvived}/${replayed} replayed cell(s) would still have passed under the containment semantics they carried until 2026-09-13`);
if (!controlOk) {
	console.log("       the gate rejected nothing it did not already reject, so it is proving nothing here");
	bad++;
}

console.log(bad
	? `\n${bad} problem(s)`
	: `\nall ${totalCells} published cell(s) and ${totalOuts} in-sentence claim(s) pass, a deliberately wrong assertion is caught, and ${covered} of the ${asserted.length} published claim(s) reject a ten-times-wrong value.
Assertion semantics: ${engine.VERSION} (adopted from junghanacs.com/eval/engine/releases/2026.9.12/).
${uncovered.length ? `Not covered: ${uncovered.join(", ")} — a claim with no number in it has no ten-times-wrong version, so the gate says nothing about ${uncovered.length === 1 ? "it" : "them"} and does not pretend to.` : "Every published claim is numeric and every one of them is mutated."}`);
process.exit(bad ? 1 : 0);