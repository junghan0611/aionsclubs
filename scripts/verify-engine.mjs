// Verify what this house adopted from junghanacs.com's engine shelf.
//
//   node scripts/verify-engine.mjs            offline: bytes, call sites, conformance
//   node scripts/verify-engine.mjs --online   also ask the shelf what it publishes now
//
//   exit 0  in sync (offline run says: the adopted bytes are the adopted bytes)
//   exit 1  contradiction — the shelf disagrees with what this house serves
//   exit 3  --online could not reach the shelf; the offline part still ran and passed
//
// What blocks and what only reports. This check runs inside `scripts/verify-eval`,
// so a failure here stops a publish. Only a *contradiction* earns that: bytes,
// hashes, or the adopted release being withdrawn. An upstream release this house
// has not read is news, not corruption — the adoption contract says in as many
// words that "a consumer can remain on an old release indefinitely"
// (junghanacs.com eval-engine-contract.md, read 2026-09-13), and a gate that
// blocks a deploy because someone else did something correct hands the key to
// this house's press to another repository.
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
// published a release this house has not looked at?
//
// That question is mid-transition. It was carried upstream on 2026-09-13 and
// Homepage agreed to publish a discovery feed at `/eval/engine/releases.json`
// (deliberately outside `releases/`, whose one-year `immutable` cache a feed must
// never receive). So this check watches the feed's *arrival* rather than any
// surface's present shape: 404 means keep scraping the shelf page, 200 means the
// feed answers and the scrape becomes a second, independent witness. The scrape
// is not deleted on the first 200 — the shelf page only became a generated
// surface on 2026-09-13, and making the thing that changed today the sole witness
// is how a watcher goes quietly blind.
//
// Why there is no version comparator here any more. There was one, and on
// 2026-09-13 it read `2026.9.12-fix.1` as [2026, 9, NaN, 1] and answered
// "nothing newer" — silently, the exact shape this house forbids. The repair is
// not a better parser: Homepage declared the feed's `releases[]` array order
// normative (publication order, oldest first, append-only), so a consumer answers
// "is there anything newer?" by its own position in that array and never parses a
// release id at all. Their words: the sort rule is how the publisher builds an
// order, not a procedure a consumer re-implements. The house tag convention this
// grammar grew from calls its suffix free-form (agent-config
// skills/tag-release/SKILL.md), and `git tag --sort=-version:refname` measurably
// orders same-day follow-ups by label, not by publication — and its answer even
// changes with `versionsort.suffix`, so it is not stable across machines, while
// commit time is no fallback because a lightweight tag records none. That
// measurement went
// to the skill's steward on 2026-09-13 and the skill now carries the disclaimer
// itself (agent-config cc52950): with multiple free-form same-day suffixes it is
// "not publication order or stable release chronology", and a consumer needing a
// total order "must carry an explicit ordered identifier". The feed's array is
// that identifier. So there is no correct comparator to write here, only a
// position to read.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const online = process.argv.includes("--online");
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const problems = [];
const notes = [];
// Two channels on purpose. `fail` says the shelf contradicts this house and stops
// a publish; `tell` says something upstream changed that a person should read and
// lets the publish through. Collapsing them is what put another repository's
// correct release on this house's deploy road.
const news = [];
const fail = (msg) => problems.push(msg);
const tell = (msg) => news.push(msg);

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
	// throwing on a bad status is right for a resource that must exist; the feed
	// is the one URL whose *absence* is a documented state, so it gets `probe`
	const get = async (url) => {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "follow" });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return response.text();
	};
	const probe = async (url) => {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: "follow" });
		return { status: response.status, body: response.ok ? await response.text() : null };
	};
	// derived, never a second field to keep in step: a manifest URL that could
	// disagree with adopted.release is a receipt that can lie by omission
	const manifestUrl = new URL(`${adopted.releasePath.replace("{release}", adopted.release)}manifest.json`, adopted.shelf).href;
	const feedUrl = new URL("releases.json", adopted.shelf).href;
	try {
		// keep the bytes, not just the parse: manifestSha256 in the feed is a claim
		// about this byte string, and it can only be checked against what arrived
		const manifestBytes = await get(manifestUrl);
		const manifest = JSON.parse(manifestBytes);
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

		// 4a. the transition signal. 404 is a state this house has agreed to expect,
		//     not a failure; anything that is neither 404 nor 200 means the signal
		//     itself has gone ambiguous and should be read by a person.
		const feed = await probe(feedUrl);
		let feedReleases = null;
		if (feed.status === 404) {
			notes.push(`${feedUrl} 404 — no discovery feed yet; the shelf page is still the only surface`);
		} else if (feed.status !== 200) {
			fail(`${feedUrl} answered HTTP ${feed.status} — neither 404 (no feed) nor 200 (feed); read it before trusting discovery`);
		} else {
			const parsed = JSON.parse(feed.body);
			if (parsed.format !== 1) {
				// one cause, one failure: reading a format this check does not know
				// would turn every downstream field into a second, derived complaint
				fail(`${feedUrl} declares format ${parsed.format}, this check only reads format 1 — read the feed before trusting discovery`);
			} else {
				const entries = Array.isArray(parsed.releases) ? parsed.releases : [];
				if (!entries.length) fail(`${feedUrl} is live but lists no releases`);
				feedReleases = [...new Set(entries.map((r) => r.release).filter(Boolean))];

				const index = entries.findIndex((r) => r.release === adopted.release);
				const mine = index < 0 ? null : entries[index];
				if (!mine) fail(`${feedUrl} does not list the adopted release ${adopted.release} (lists ${feedReleases.join(", ") || "nothing"}) — a withdrawn release contradicts this house's adoption`);
				else {
					// the fourth independent record: three in adopted.json describe the
					// module bytes, this one describes the manifest that vouches for them.
					// Its absence is a failure, not a note — a note is what this house
					// published three bricks about in two days. --online runs outside
					// publish, so saying so loudly costs no deploy.
					const got = sha256(manifestBytes);
					if (!mine.manifestSha256)
						fail(`${feedUrl} lists ${adopted.release} without manifestSha256 — the agreed schema's fourth record is missing, so the feed vouches for nothing`);
					else if (got !== mine.manifestSha256)
						fail(`${feedUrl} records manifestSha256 ${mine.manifestSha256} for ${adopted.release}, but ${manifestUrl} hashes to ${got}`);
					else notes.push(`feed manifestSha256 matches the fetched manifest bytes (${got.slice(0, 12)}…)`);
					for (const module of adopted.modules) {
						const claimed = mine.modules?.find((m) => m.id === module.id);
						if (claimed && claimed.sha256 !== module.sha256)
							fail(`${feedUrl}: ${module.id} is ${claimed.sha256} for ${adopted.release}, this house serves ${module.sha256}`);
					}
				}
				// Position, not parsing. Everything after this house's own entry is a
				// release it has not read. `latest` is a notification, never an
				// adoption trigger.
				if (index >= 0) {
					const after = entries.slice(index + 1).map((r) => r.release).filter(Boolean);
					if (after.length)
						tell(`${feedUrl} publishes ${after.join(", ")} after the adopted ${adopted.release} — read them, then re-vendor or record why not. This does not block a publish.`);
					else notes.push(`feed lists ${feedReleases.join(", ")}; latest ${parsed.latest ?? "unstated"}; nothing after ${adopted.release}`);
					// the order guarantee this check now rests on, checked rather than
					// assumed: if `latest` is not the last element, the array is not the
					// publication order it claims and a position read means less
					const last = entries[entries.length - 1]?.release;
					if (parsed.latest && last && parsed.latest !== last)
						tell(`${feedUrl} declares latest ${parsed.latest} but its last array element is ${last} — the declared publication order does not hold, so read the feed by hand`);
				}
			}
		}

		// the scrape stays after the feed arrives: a second witness that must agree
		const shelf = await get(adopted.shelf);
		// the id grammar is `YYYY.M.D` with an optional same-day `-<label>.<n>`; the
		// old pattern accepted only digits and dots, so a follow-up release on the
		// page was invisible here too — the same blindness as the deleted comparator
		const published = [...new Set([...shelf.matchAll(/\/eval\/engine\/releases\/([0-9][0-9.]*[0-9](?:-[a-z][a-z0-9-]*\.[0-9]+)?)\//g)].map((m) => m[1]))];
		if (!published.length)
			tell(`${adopted.shelf} lists no release paths — the page changed shape, so this witness is blind${feedReleases ? "; the feed still answers" : " and the feed is not up yet, so nothing is watching discovery"}`);
		else if (!published.includes(adopted.release))
			fail(`the shelf no longer lists the adopted release ${adopted.release} (lists ${published.join(", ")})`);
		else notes.push(`shelf lists ${published.join(", ")}`);

		if (feedReleases && published.length) {
			const onlyFeed = feedReleases.filter((v) => !published.includes(v));
			const onlyPage = published.filter((v) => !feedReleases.includes(v));
			// a disagreement between two *discovery* surfaces says nothing about the
			// bytes this house serves, so it is read, not a blocked deploy
			if (onlyFeed.length || onlyPage.length)
				tell(
					`the two discovery surfaces disagree — ${feedUrl} has ${onlyFeed.join(", ") || "nothing"} the page omits, ` +
					`the page has ${onlyPage.join(", ") || "nothing"} the feed omits`,
				);
			else notes.push("feed and shelf page list the same releases");
		}
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
	for (const item of news) console.error(`engine news: ${item}`);
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
