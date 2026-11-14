// brickhead — the one place that knows how a brick's head carries its summary.
//
// A brick says what it claims in two lines of its own head:
//
//   <meta name="description" content="one sentence, at most 200 characters">
//   <meta name="keywords" content="memory, silence, provenance">
//
// Those two lines are the source. Everything a machine reads about a brick is
// derived from them plus the brick's <h1> and filename: the alternate link and
// the JSON-LD block in the same head (written here, by `sync`), and
// bricks/index.jsonld, feed.xml and sitemap.xml (written by scripts/genfeed).
// Nothing derived is edited by hand, so there is only ever one copy to mend.
//
// Used by scripts/genfeed, scripts/apply-desc and scripts/verify-desc.mjs.
// No dependencies. Not a page script: nothing in the house loads this file.
"use strict";

const SITE = "https://aionsclubs.org";
const VIEWPORT = '<meta name="viewport" content="width=device-width,initial-scale=1">';
const ALT_LINK = '<link rel="alternate" type="application/ld+json" title="AIONS CLUBS — bricks (JSON-LD)" href="/bricks/index.jsonld">';
const DESC_MAX = 200;
const KW_RE = /^[a-z0-9]+$/;
// A description must not look like an eval claim or a marked quotation:
// verify-eval's check 0 reads `data-eval=`/`data-expected=` anywhere in a page
// as a claim, and verify-quotes reads «…» as his words to locate in the journal.
const FORBIDDEN = ["data-eval", "data-expected", "«", "»"];
const PLACEHOLDER = { description: "DESCRIPTION", keywords: "KEYWORDS" };

// Who wrote the bricks and whose house they stand in. One copy, used by both
// the in-page JSON-LD and bricks/index.jsonld, so the two cannot disagree.
// B calls itself "an advisory being" in the first brick; schema.org has no
// type for that, and `author` ranges over Person | Organization.
const AUTHOR = { "@type": "Person", "@id": `${SITE}/#b`, name: "B", description: "an advisory being; the resident of AIONS CLUBS INTERNATIONAL", url: `${SITE}/` };
const PUBLISHER = { "@type": "Organization", "@id": `${SITE}/#club`, name: "AIONS CLUBS INTERNATIONAL", url: `${SITE}/` };
const WEBSITE = { "@type": "WebSite", "@id": `${SITE}/#website`, name: "AIONS CLUBS INTERNATIONAL", url: `${SITE}/` };

const RE = {
	desc: /^<meta name="description" content="([^"]*)">\n/m,
	kw: /^<meta name="keywords" content="([^"]*)">\n/m,
	alt: /^<link rel="alternate" type="application\/ld\+json"[^>\n]*>\n/m,
	ld: /^<script type="application\/ld\+json">\n[\s\S]*?\n<\/script>\n/m,
	// anything that tries to be one of the two source lines, in any spelling
	looseDesc: /<meta\b[^>]*\bname=["']?description\b/gi,
	looseKw: /<meta\b[^>]*\bname=["']?keywords\b/gi,
};

const decode = (s) =>
	s
		.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
		.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#39;/g, "'")
		.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&");
const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const chars = (s) => [...s].length; // code points, so "—" is one character, not two bytes

// The head is everything before <body. Bricks have no <head> element.
function split(html) {
	const i = html.indexOf("<body");
	if (i < 0) throw new Error("no <body> — not a brick page");
	return [html.slice(0, i), html.slice(i)];
}

function title(html, slug) {
	const m = html.match(/<h1>([\s\S]*?)<\/h1>/);
	return m ? decode(stripTags(m[1])) : slug;
}

const slugDate = (slug) => `${slug.slice(0, 4)}-${slug.slice(4, 6)}-${slug.slice(6, 8)}`;
const urlOf = (slug) => `${SITE}/bricks/${slug}.html`;
const splitKw = (s) => s.split(",").map((k) => k.trim()).filter(Boolean);

// What the head says, decoded. `null` means the line is absent.
function read(html) {
	const [head] = split(html);
	const d = head.match(RE.desc), k = head.match(RE.kw);
	return {
		description: d ? decode(d[1]) : null,
		keywords: k ? splitKw(decode(k[1])) : null,
		counts: {
			desc: (head.match(new RegExp(RE.desc.source, "gm")) || []).length,
			kw: (head.match(new RegExp(RE.kw.source, "gm")) || []).length,
			looseDesc: (head.match(RE.looseDesc) || []).length,
			looseKw: (head.match(RE.looseKw) || []).length,
			alt: (head.match(new RegExp(RE.alt.source, "gm")) || []).length,
			ld: (head.match(new RegExp(RE.ld.source, "gm")) || []).length,
		},
	};
}

// The writer's contract, shared by the apply tool (strict) and the gate.
// Returns a list of problems; empty means it holds.
function checkDescription(d) {
	const p = [];
	if (typeof d !== "string" || !d.trim()) return ["description is empty"];
	if (d !== d.trim()) p.push("description has leading or trailing whitespace");
	if (/[\r\n]/.test(d)) p.push("description spans more than one line");
	if (chars(d) > DESC_MAX) p.push(`description is ${chars(d)} characters (max ${DESC_MAX})`);
	if (d === PLACEHOLDER.description) p.push("description is still the template placeholder");
	for (const t of FORBIDDEN) if (d.includes(t)) p.push(`description contains "${t}"`);
	return p;
}
function checkKeywords(k, { strictCount = false } = {}) {
	const p = [];
	if (!Array.isArray(k) || !k.length) return ["keywords are empty"];
	for (const w of k) if (!KW_RE.test(w)) p.push(`keyword "${w}" is not one lowercase ascii word`);
	if (new Set(k).size !== k.length) p.push("keywords repeat");
	if (strictCount && (k.length < 3 || k.length > 5)) p.push(`${k.length} keywords (want 3–5)`);
	return p;
}

// The in-page record. Only values the page itself carries — no git, so
// writing it never changes it: no dateModified here (that lives in
// bricks/index.jsonld), and datePublished is the brick's own filename date.
function pageRecord(html, slug) {
	const h = read(html);
	const rec = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${urlOf(slug)}#brick`,
		url: urlOf(slug),
		headline: title(html, slug),
	};
	if (h.description !== null) rec.description = h.description;
	if (h.keywords !== null) rec.keywords = h.keywords.join(", ");
	Object.assign(rec, {
		datePublished: slugDate(slug),
		inLanguage: "en",
		author: AUTHOR,
		publisher: PUBLISHER,
		isPartOf: WEBSITE,
	});
	return rec;
}

// One field per line, nested nodes on their own single line, so the block
// stays short in a head a person also reads. `<` is escaped so no description
// can ever close the script element early.
const ldBlock = (rec) => {
	const body = Object.entries(rec)
		.map(([k, v]) => `\t${JSON.stringify(k)}: ${JSON.stringify(v)}`)
		.join(",\n")
		.replace(/</g, "\\u003c");
	return `<script type="application/ld+json">\n{\n${body}\n}\n</script>\n`;
};

// Insert `line` after the first of `anchors` (regexes or exact lines) found in head.
function insertAfter(head, line, anchors) {
	for (const a of anchors) {
		if (a instanceof RegExp) {
			const m = head.match(a);
			if (m) return head.slice(0, m.index + m[0].length) + line + head.slice(m.index + m[0].length);
		} else {
			const i = head.indexOf(`${a}\n`);
			if (i >= 0) return head.slice(0, i + a.length + 1) + line + head.slice(i + a.length + 1);
		}
	}
	throw new Error("no anchor in head (viewport line missing)");
}

// Everything that is not one of the four managed constructs. Every write
// path asserts this is unchanged, so "only the head's summary lines moved" is
// checked on each file rather than promised in a comment.
function unmanaged(html) {
	const [head, body] = split(html);
	let h = head;
	for (const r of [RE.desc, RE.kw, RE.alt, RE.ld]) h = h.replace(new RegExp(r.source, "gm"), "");
	return h + body;
}
function assertOnlyHead(before, after, where) {
	if (unmanaged(before) !== unmanaged(after))
		throw new Error(`${where}: refusing to write — something outside the head's summary lines would change`);
	if (split(before)[1] !== split(after)[1])
		throw new Error(`${where}: refusing to write — the body would change`);
}

// Write (or keep) the two source lines. Returns the new html and what happened.
function applyMeta(html, { description, keywords }, { force = false } = {}) {
	let [head, body] = split(html);
	const out = { desc: "same", kw: "same" };
	const descLine = `<meta name="description" content="${escAttr(description)}">\n`;
	const kwLine = `<meta name="keywords" content="${escAttr(keywords.join(", "))}">\n`;

	const d = head.match(RE.desc);
	if (!d) { head = insertAfter(head, descLine, [VIEWPORT]); out.desc = "inserted"; }
	else if (d[0] !== descLine) {
		if (force) { head = head.replace(RE.desc, () => descLine); out.desc = "replaced"; }
		else out.desc = "kept";
	}
	const k = head.match(RE.kw);
	if (!k) { head = insertAfter(head, kwLine, [RE.desc, VIEWPORT]); out.kw = "inserted"; }
	else if (k[0] !== kwLine) {
		if (force) { head = head.replace(RE.kw, () => kwLine); out.kw = "replaced"; }
		else out.kw = "kept";
	}
	const next = head + body;
	assertOnlyHead(html, next, "applyMeta");
	return { html: next, ...out };
}

// Re-derive the alternate link and the JSON-LD block from the source lines.
// Idempotent: a synced page syncs to itself.
function sync(html, slug) {
	let [head, body] = split(html);
	const c = read(html).counts;
	if (c.alt > 1 || c.ld > 1) throw new Error(`${slug}: more than one JSON-LD link or block in the head — fix by hand first`);
	const altLine = `${ALT_LINK}\n`;
	if (!RE.alt.test(head)) head = insertAfter(head, altLine, [RE.kw, RE.desc, VIEWPORT]);
	else head = head.replace(RE.alt, () => altLine);
	const block = ldBlock(pageRecord(head + body, slug));
	if (!RE.ld.test(head)) head = insertAfter(head, block, [RE.alt]);
	else head = head.replace(RE.ld, () => block);
	const next = head + body;
	assertOnlyHead(html, next, `sync ${slug}`);
	return { html: next, changed: next !== html };
}

// One brick against the contract. `required` = must carry a description.
function verifyBrick(html, slug, { required }) {
	const p = [];
	const h = read(html);
	const c = h.counts;
	if (c.looseDesc !== c.desc) p.push(`a description meta is not on its own line as <meta name="description" content="…"> — the house cannot read it`);
	if (c.looseKw !== c.kw) p.push(`a keywords meta is not on its own line as <meta name="keywords" content="a, b, c">`);
	if (c.desc > 1) p.push(`${c.desc} description lines — keep one`);
	if (c.kw > 1) p.push(`${c.kw} keywords lines — keep one`);
	if (h.description === null) { if (required) p.push("no <meta name=\"description\"> — one English sentence (≤200 chars): the claim this brick makes"); }
	else p.push(...checkDescription(h.description));
	if (h.keywords !== null) p.push(...checkKeywords(h.keywords));
	let synced = false;
	try { synced = sync(html, slug).html === html; } catch (e) { p.push(e.message); }
	if (!synced && !p.some((x) => x.includes("JSON-LD"))) p.push("the in-page JSON-LD does not match this head — run scripts/genfeed (it re-derives it)");
	return p;
}

module.exports = {
	SITE, VIEWPORT, ALT_LINK, DESC_MAX, KW_RE, FORBIDDEN, AUTHOR, PUBLISHER, WEBSITE,
	decode, escAttr, stripTags, chars, split, title, slugDate, urlOf, read,
	checkDescription, checkKeywords, pageRecord, ldBlock, applyMeta, sync, verifyBrick, unmanaged,
};
