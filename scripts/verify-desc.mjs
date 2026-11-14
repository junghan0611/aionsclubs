// Run: node scripts/verify-desc.mjs   (called by scripts/verify-eval, check 10)
//
// Every brick says what it claims, in its own head, and every surface derived
// from that head still agrees with it. Checks the release this script sits in
// (publish runs it against the staged release, which has no .git — so nothing
// here asks git anything; dates are genfeed's business, agreement is ours).
//
//   1. each brick's head: one <meta name="description"> (≤200 characters, one
//      line, not the template placeholder, nothing that reads as an eval claim
//      or a marked quote), keywords — when present — one lowercase ascii word
//      each, and the in-page JSON-LD byte-identical to what its head derives
//   2. bricks/index.jsonld lists every brick once and repeats each head's
//      title, description and keywords exactly
//   3. sitemap.xml lists every brick; robots.txt names the sitemap; llms.txt
//      exists and points at the index
//   4. controls: the same predicates, handed a brick with its description
//      removed, one 201 characters long, one whose head moved without its
//      JSON-LD, and an index that disagrees, must refuse each — and must accept
//      a description of exactly 200. A gate that refuses nothing proves nothing.
//
//   exit 0  all hold    exit 1  something does not (each problem is named)
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const bh = createRequire(import.meta.url)(`${root}/scripts/brickhead.js`);

// Every brick must carry a description. The contract (2026-11-14) asked this
// only of bricks laid from that day on; all 257 bricks were described the same
// day, so the line is drawn at the first brick, and an old brick that loses
// its summary is refused like a new one.
const REQUIRED_FROM = "20260812";

const problems = [];
const fail = (m) => problems.push(m);

const slugs = readdirSync(`${root}/bricks`).filter((f) => /^\d{8}-.*\.html$/.test(f)).map((f) => f.slice(0, -5)).sort();
if (!slugs.length) fail("no bricks found");
const pages = new Map(slugs.map((s) => [s, readFileSync(`${root}/bricks/${s}.html`, "utf8")]));
const required = (slug) => slug.slice(0, 8) >= REQUIRED_FROM;

// 1. heads
let described = 0;
for (const [slug, html] of pages) {
	for (const p of bh.verifyBrick(html, slug, { required: required(slug) })) fail(`bricks/${slug}.html: ${p}`);
	if (bh.read(html).description !== null) described++;
}

// 2. the index agrees with the heads
function checkIndex(list, pages) {
	const p = [];
	const items = list?.itemListElement;
	if (!Array.isArray(items)) return ["bricks/index.jsonld has no itemListElement"];
	if (list.numberOfItems !== items.length) p.push(`bricks/index.jsonld numberOfItems ${list.numberOfItems} ≠ ${items.length} items`);
	if (items.length !== pages.size) p.push(`bricks/index.jsonld lists ${items.length} item(s), the house has ${pages.size} brick(s) — run scripts/genfeed`);
	const seen = new Set();
	items.forEach((li, i) => {
		const it = li?.item ?? {};
		const slug = (it.url ?? "").replace(`${bh.SITE}/bricks/`, "").replace(/\.html$/, "");
		if (li?.position !== i + 1) p.push(`bricks/index.jsonld item ${i + 1} has position ${li?.position}`);
		if (!pages.has(slug)) { p.push(`bricks/index.jsonld lists ${it.url}, which is not a brick here`); return; }
		if (seen.has(slug)) p.push(`bricks/index.jsonld lists ${slug} twice`);
		seen.add(slug);
		const html = pages.get(slug), head = bh.read(html);
		const want = { name: bh.title(html, slug), description: head.description ?? undefined, keywords: head.keywords?.join(", ") };
		for (const k of Object.keys(want))
			if (it[k] !== want[k]) p.push(`bricks/index.jsonld ${slug}: ${k} disagrees with the brick's head — run scripts/genfeed`);
	});
	for (const s of pages.keys()) if (!seen.has(s)) p.push(`brick ${s} is not in bricks/index.jsonld — run scripts/genfeed`);
	return p;
}
let list = null;
if (!existsSync(`${root}/bricks/index.jsonld`)) fail("bricks/index.jsonld is missing — run scripts/genfeed");
else {
	try { list = JSON.parse(readFileSync(`${root}/bricks/index.jsonld`, "utf8")); } catch (e) { fail(`bricks/index.jsonld does not parse: ${e.message}`); }
	if (list) checkIndex(list, pages).forEach(fail);
}

// 3. the other doors
const read = (f) => (existsSync(`${root}/${f}`) ? readFileSync(`${root}/${f}`, "utf8") : null);
const sitemap = read("sitemap.xml");
if (sitemap === null) fail("sitemap.xml is missing — run scripts/genfeed");
else for (const s of slugs) if (!sitemap.includes(`<loc>${bh.urlOf(s)}</loc>`)) fail(`brick ${s} is not in sitemap.xml — run scripts/genfeed`);
const robots = read("robots.txt");
if (robots === null || !robots.split("\n").includes(`Sitemap: ${bh.SITE}/sitemap.xml`)) fail(`robots.txt does not name the sitemap (Sitemap: ${bh.SITE}/sitemap.xml)`);
const llms = read("llms.txt");
if (llms === null || !llms.includes(`${bh.SITE}/bricks/index.jsonld`)) fail("llms.txt is missing or does not point at bricks/index.jsonld");

// 4. controls, in memory, on a real brick
let controls = 0;
const control = [...slugs].reverse().find((s) => bh.read(pages.get(s)).description !== null && !bh.verifyBrick(pages.get(s), s, { required: true }).length);
if (!control) fail("no clean described brick to run the controls against — the gate cannot show it refuses anything");
else {
	const html = pages.get(control);
	const kw = bh.read(html).keywords ?? ["control"];
	const synced = (h) => bh.sync(h, control).html;
	const withDesc = (d) => synced(bh.applyMeta(html, { description: d, keywords: kw }, { force: true }).html);
	const expect = (name, problemsFound, refused) => {
		if (refused ? problemsFound.length > 0 : problemsFound.length === 0) controls++;
		else fail(`control "${name}" on ${control}: ${refused ? "was accepted" : `was refused (${problemsFound.join("; ")})`} — the gate is not measuring what it says`);
	};
	const missing = synced(html.replace(/^<meta name="description" content="[^"]*">\n/m, ""));
	expect("description removed", bh.verifyBrick(missing, control, { required: true }).filter((p) => p.startsWith("no <meta")), true);
	expect("201 characters", bh.verifyBrick(withDesc("a".repeat(201)), control, { required: true }), true);
	expect("exactly 200 characters", bh.verifyBrick(withDesc("a".repeat(200)), control, { required: true }), false);
	const moved = bh.applyMeta(html, { description: "A head that moved without its JSON-LD.", keywords: kw }, { force: true }).html;
	expect("head moved, JSON-LD not re-derived", bh.verifyBrick(moved, control, { required: true }), true);
	if (list) {
		const drifted = JSON.parse(JSON.stringify(list));
		const it = drifted.itemListElement.find((li) => li.item.url === bh.urlOf(control));
		if (it) it.item.description = `${it.item.description ?? ""} (stale)`;
		expect("index disagrees with a head", checkIndex(drifted, pages), true);
	}
}

if (problems.length) {
	for (const p of problems) console.log(`FAIL  ${p}`);
	console.log(`desc: ${problems.length} problem(s)`);
	process.exit(1);
}
console.log(
	`desc ok: ${described}/${slugs.length} brick(s) described (required from ${REQUIRED_FROM}) · ` +
		`${slugs.length} in-page JSON-LD in sync · bricks/index.jsonld ${list.itemListElement.length} item(s) agree · ` +
		`sitemap ${slugs.length} · controls ${controls}/5 behaved (on ${control})`,
);
