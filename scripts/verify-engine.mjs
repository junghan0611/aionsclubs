// Verify what this house adopted from junghanacs.com's engine shelf.
//
//   node scripts/verify-engine.mjs            offline: bytes, call sites, conformance
//   node scripts/verify-engine.mjs --online   also ask the shelf what it publishes now
//
//   exit 0  in sync (offline run says: the adopted bytes are the adopted bytes)
//   exit 1  drift — a hash, a call site, or a conformance case does not match
//   exit 3  --online could not reach the shelf; the offline part still ran and passed
//
// Why this file exists. `eval/engine/README.md` said, in its own Verified line,
// that "scripts/verify-eval re-checks it on every publish". Measured 2026-09-13:
// `grep -n engine scripts/verify-eval` → no match. Nothing re-checked the
// vendored module at all. Its hash lived in a filename that any edit would keep,
// and `verify-eval-cells.mjs` loaded it by that hardcoded path — so swapped bytes
// would have redefined what every assertion in the house *means* while all 33
// claims still reported PASS. That is the same defect as the one this house
// published a brick about on 2026-09-12 (a prose instruction is not a gate),
// written a second time, one directory over, by me.
//
// The shelf publishes immutable content-addressed releases, so comparing the
// vendored hash against the *pinned* manifest can only ever agree with itself.
// The question worth asking over the network is the other one: has the shelf
// published a release this house has not looked at? There is no machine-readable
// answer to that — measured 2026-09-13, `releases/`, `releases/index.json`,
// `latest.json`, and `releases/latest/manifest.json` are all 404 — so the only
// discovery surface is the shelf page's own HTML. Scraping it is not elegance;
// it is the honest report that the contract has no index yet.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const online = process.argv.includes("--online");
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const problems = [];
const notes = [];
const fail = (msg) => problems.push(msg);

const adopted = JSON.parse(readFileSync(`${root}/eval/engine/adopted.json`, "utf8"));

// 1. every vendored artifact hashes to what adopted.json records, and the
//    filename pins that same hash. Two independent records of one byte string.
const artifacts = [
	...adopted.modules.map((m) => ({ what: m.id, ...m })),
	{ what: `conformance-v1 (${adopted.conformance.contract})`, ...adopted.conformance },
];
for (const a of artifacts) {
	let bytes;
	try {
		bytes = readFileSync(`${root}/${a.file}`);
	} catch {
		fail(`${a.what}: adopted file is missing: ${a.file}`);
		continue;
	}
	const have = sha256(bytes);
	if (have !== a.sha256) fail(`${a.what}: bytes hash ${have}, adopted.json records ${a.sha256}`);
	if (!a.file.includes(a.sha256)) fail(`${a.what}: filename does not pin its recorded hash: ${a.file}`);
}

// 2. no reference anywhere in the house names a different engine build. This is
//    what makes re-vendoring safe: a forgotten page is named, not discovered later.
const claimHash = adopted.modules.find((m) => m.id === "claim-v1")?.sha256;
const referenced = new Map();
const skip = new Set([".git", "node_modules", "licenses"]);
const walk = (dir) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (skip.has(entry.name)) continue;
		const path = `${dir}/${entry.name}`;
		if (entry.isDirectory()) { walk(path); continue; }
		if (!/\.(html|js|mjs|json|md|xml|css)$/.test(entry.name)) continue;
		if (statSync(path).size > 4_000_000) continue;
		for (const [, hash] of readFileSync(path, "utf8").matchAll(/claim-v1\.([0-9a-f]{64})\.js/g)) {
			if (!referenced.has(hash)) referenced.set(hash, []);
			referenced.get(hash).push(path.slice(root.length + 1));
		}
	}
};
walk(root);
for (const [hash, where] of referenced) {
	if (hash !== claimHash) fail(`references a non-adopted claim-v1 build ${hash.slice(0, 12)}…: ${where.join(", ")}`);
}
if (!referenced.has(claimHash)) fail("nothing in the house references the adopted claim-v1 — the module is vendored but unused");

// 3. the adopted module still satisfies the shelf's own conformance fixture.
//    A hash proves the bytes did not change; only the fixture says the bytes
//    still *mean* what the contract says they mean.
let cases = 0, conformancePass = 0;
{
	const module = adopted.modules.find((m) => m.id === "claim-v1");
	try {
		new Function(readFileSync(`${root}/${module.file}`, "utf8"))();
	} catch (error) {
		fail(`claim-v1 failed to load: ${error?.message ?? error}`);
	}
	const engine = globalThis[module.global];
	if (!engine?.assert) {
		fail(`claim-v1 did not define ${module.global}.assert`);
	} else {
		const fixture = JSON.parse(readFileSync(`${root}/${adopted.conformance.file}`, "utf8"));
		if (fixture.contract !== adopted.conformance.contract)
			fail(`conformance fixture is for ${fixture.contract}, adopted.json expects ${adopted.conformance.contract}`);
		if (fixture.cases.length !== adopted.conformance.cases)
			fail(`conformance fixture has ${fixture.cases.length} cases, adopted.json records ${adopted.conformance.cases}`);
		for (const testCase of fixture.cases) {
			cases += 1;
			const result = engine.assert(testCase.value, testCase.claim);
			if (result.pass === testCase.pass && result.code === testCase.code) conformancePass += 1;
			else fail(`conformance ${testCase.id}: expected pass=${testCase.pass} code=${testCase.code}, got pass=${result.pass} code=${result.code}`);
		}
		// a fixture that only ever agrees proves nothing about the runner, so
		// require the negative direction to be observable here too
		const bogus = engine.assert(1, { mode: "no-such-mode", expected: "1" });
		if (bogus.pass !== false) fail("the conformance runner cannot observe a failure — an unsupported mode returned pass");
	}
}

// 4. the shelf, if we are allowed to ask. Two questions: does the pinned release
//    still publish our hash, and is there a newer release we have not read?
if (online) {
	const get = async (url) => {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "follow" });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.text();
	};
	const asVersion = (v) => v.split(".").map(Number);
	const newer = (a, b) => {
		const [x, y] = [asVersion(a), asVersion(b)];
		for (let i = 0; i < Math.max(x.length, y.length); i += 1) {
			if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) > (y[i] ?? 0);
		}
		return false;
	};
	// derived, never a second field to keep in step: a manifest URL that could
	// disagree with adopted.release is a receipt that can lie by omission
	const manifestUrl = new URL(`${adopted.releasePath.replace("{release}", adopted.release)}manifest.json`, adopted.shelf).href;
	try {
		const manifest = JSON.parse(await get(manifestUrl));
		if (manifest.release !== adopted.release)
			fail(`${manifestUrl} reports release ${manifest.release}, adopted.json says ${adopted.release}`);
		for (const module of adopted.modules) {
			const upstream = manifest.modules?.find((m) => m.id === module.id);
			if (!upstream) fail(`release ${adopted.release} no longer publishes ${module.id}`);
			else if (upstream.sha256 !== module.sha256)
				fail(`${module.id}: shelf publishes ${upstream.sha256}, this house serves ${module.sha256}`);
		}
		if (manifest.conformance?.sha256 && manifest.conformance.sha256 !== adopted.conformance.sha256)
			fail(`conformance fixture: shelf publishes ${manifest.conformance.sha256}, this house vendored ${adopted.conformance.sha256}`);
		notes.push(`release ${manifest.release} manifest still publishes every adopted hash`);

		const shelf = await get(adopted.shelf);
		const published = [...new Set([...shelf.matchAll(/\/eval\/engine\/releases\/([0-9][0-9.]*[0-9])\//g)].map((m) => m[1]))];
		if (!published.length) fail(`the shelf page lists no release paths — ${adopted.shelf} changed shape and this check has gone blind`);
		else if (!published.includes(adopted.release)) fail(`the shelf no longer lists the adopted release ${adopted.release} (lists ${published.join(", ")})`);
		const ahead = published.filter((v) => newer(v, adopted.release));
		if (ahead.length) fail(`the shelf publishes ${ahead.join(", ")}, newer than the adopted ${adopted.release} — read the release, then re-vendor or record why not`);
		else notes.push(`shelf lists ${published.join(", ")}; nothing newer than ${adopted.release}`);
	} catch (error) {
		console.error(`engine: could not reach the shelf (${error?.message ?? error}) — the offline checks above still ran`);
		if (problems.length) { report(); process.exit(1); }
		report();
		process.exit(3);
	}
} else {
	notes.push("shelf not contacted (offline run) — a new upstream release would not be seen here");
}

function report() {
	for (const note of notes) console.log(`engine note: ${note}`);
	if (problems.length) {
		for (const problem of problems) console.error(`engine verification failed: ${problem}`);
		console.error(`engine: ${problems.length} problem(s)`);
		return;
	}
	console.log(
		`engine ok: release ${adopted.release} · ${adopted.modules.length} adopted module(s) · ` +
		`conformance ${conformancePass}/${cases} · ${[...referenced.get(claimHash) ?? []].length} call site(s) on the adopted hash`,
	);
}

report();
process.exit(problems.length ? 1 : 0);
