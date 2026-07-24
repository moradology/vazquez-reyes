import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Vazquez-Reyes family history", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Vazquez–Reyes Family History<\/title>/i);
  assert.match(html, /From/);
  assert.match(html, /Humacao/);
  assert.match(html, /Cruz Reyes/);
  assert.match(html, /Rafael Vázquez/);
  assert.match(html, /From.*Puerto Rico/s);
  assert.match(html, /to New York/);
  assert.match(html, /The same island across five generations/);
  assert.match(html, /Start with Cruz or Rafael/);
  assert.match(html, /The Reyes–Díaz ancestors/);
  assert.match(html, /The Vázquez–Perales ancestors/);
  assert.match(html, /Three parent pairs, kept in order/);
  assert.match(html, /The records still point to Caguas and Humacao/);
  assert.match(html, /Luís de Rivera/);
  assert.match(html, /No record yet names an overseas-born ancestor/);
  assert.match(html, /Routes still to test/);
  assert.match(html, /1805-maximo-josefa-marriage\.jpg/);
  assert.match(html, /1811-luis-de-rivera-death\.jpg/);
  assert.match(html, /Eastern Puerto Rico → East Harlem/);
  assert.match(html, /The families on paper/);
  assert.match(html, /1940-reyes-household\.jpg/);
  assert.match(html, /4 April 1940/);
  assert.match(html, /research notes/);
  assert.doesNotMatch(
    html,
    /Two lives, firmly connected|The evidence behind the story|Three breakthroughs|closed the loop/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders navigable trees and repeated maps from one geographic frame", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal([...html.matchAll(/data-pr-map="[^"]+"/g)].length, 8);
  assert.equal(
    [...html.matchAll(/id="puerto-rico-municipio-base"/g)].length,
    1,
  );
  assert.equal(
    [...html.matchAll(/href="#puerto-rico-municipio-base"/g)].length,
    8,
  );
  assert.match(html, /data-tree-person="person\.cruz-reyes-vasquez"/);
  assert.match(html, /data-tree-person="person\.rafael-vazquez-perales"/);
  assert.match(html, /data-tree-person="person\.maximo-vazquez"/);
  assert.match(html, /data-tree-open="true"/);
  assert.match(html, /href="\/people\/mauricio-reyes"/);
  assert.match(html, /href="\/people\/atilano-vazquez"/);
  assert.match(html, /href="\/people\/maria-cortez"/);
  assert.match(html, /href="\/people\/marciana-delgado"/);
  assert.match(html, /Points locate the named municipio or barrio/);
});

test("renders the people directory and a detailed, linked person profile", async () => {
  const [indexResponse, personResponse] = await Promise.all([
    render("/people"),
    render("/people/maximo-vazquez"),
  ]);
  const indexHtml = await indexResponse.text();
  const personHtml = await personResponse.text();

  assert.equal(indexResponse.status, 200);
  assert.match(indexHtml, /The people in the records/);
  assert.match(indexHtml, /href="\/people\/maximo-vazquez"/);
  assert.match(indexHtml, /href="\/people\/cruz-reyes-vasquez"/);

  assert.equal(personResponse.status, 200);
  assert.match(personHtml, /<title>Máximo Vázquez · Vazquez–Reyes Family History<\/title>/);
  assert.match(personHtml, /Immediate family and known siblings/);
  assert.match(personHtml, /Francisco \[surname not stated\]/);
  assert.match(personHtml, /María Cortez/);
  assert.match(personHtml, /Known children/);
  assert.match(personHtml, /Atilano Vázquez/);
  assert.match(personHtml, /data-pr-map="person-maximo-vazquez"/);
  assert.match(personHtml, /1805-maximo-josefa-marriage\.jpg/);
  assert.match(personHtml, /Claims and how they are graded/);
  assert.match(personHtml, /Records reviewed/);
});

test("renders a slide-style, evidence-led family presentation", async () => {
  const response = await render("/presentation");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Family evidence walkthrough/);
  assert.equal([...html.matchAll(/\bdata-slide="true"/g)].length, 13);
  assert.match(html, /How the records/);
  assert.match(html, /Connection/);
  assert.match(html, /The record/);
  assert.match(html, /1915-cruz-civil-birth\.jpg/);
  assert.match(html, /1805-maximo-josefa-marriage\.jpg/);
  assert.match(html, /1811-luis-de-rivera-death\.jpg/);
  assert.match(html, /No reviewed record yet identifies a direct ancestor born in Africa/);
  assert.match(html, /data-presentation-fullscreen/);
});

test("uses one predictable primary navigation across every page type", async () => {
  const pages = [
    ["/", "/"],
    ["/people", "/people"],
    ["/people/maximo-vazquez", "/people"],
    ["/presentation", "/presentation"],
    ["/research", "/research"],
  ];

  for (const [path, currentHref] of pages) {
    const response = await render(path);
    const html = await response.text();
    const nav = html.match(
      /<nav class="primary-nav" aria-label="Main sections">(.*?)<\/nav>/s,
    )?.[1];

    assert.ok(nav, `primary navigation missing on ${path}`);
    assert.equal([...nav.matchAll(/<a\b/g)].length, 4, path);
    assert.match(nav, /<a[^>]*href="\/"[^>]*>Family story<\/a>/);
    assert.match(nav, /<a[^>]*href="\/people"[^>]*>People<\/a>/);
    assert.match(nav, /<a[^>]*href="\/presentation"[^>]*>Presentation<\/a>/);
    assert.match(nav, /<a[^>]*href="\/research"[^>]*>Research<\/a>/);
    assert.match(
      nav,
      new RegExp(
        `<a(?=[^>]*href="${currentHref.replaceAll("/", "\\/")}")[^>]*aria-current="page"`,
      ),
    );
    assert.match(html, /<header class="site-header site-header-(?:light|dark)">/);
    assert.match(html, />Vazquez–Reyes<\/strong>/);
  }
});

test("keeps the geography ledger referential and explicit about precision", async () => {
  const [placesText, eventsText, peopleText, sourcesText] = await Promise.all([
    readFile(
      new URL("../../research/geography/places.jsonl", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../../research/geography/events.jsonl", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../../research/people/people.jsonl", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../../research/sources/sources.jsonl", import.meta.url),
      "utf8",
    ),
  ]);
  const parse = (text) =>
    text
      .split(/\r?\n/)
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));
  const places = parse(placesText);
  const events = parse(eventsText);
  const placeIds = new Set(places.map((place) => place.id));
  const peopleIds = new Set(parse(peopleText).map((person) => person.id));
  const sourceIds = new Set(parse(sourcesText).map((source) => source.id));

  assert.equal(places.length, 18);
  assert.equal(events.length, 38);
  for (const place of places) {
    assert.match(place.precision, /point/);
    assert.match(place.coordinate_source.url, /^https:\/\/tigerweb\.geo\.census\.gov\//);
  }
  for (const event of events) {
    assert.ok(placeIds.has(event.place_ref), event.id);
    assert.ok(event.person_refs.every((id) => peopleIds.has(id)), event.id);
    assert.ok(event.evidence_refs.every((id) => sourceIds.has(id)), event.id);
  }
});

test("keeps sensitive details out of the rendered page", async () => {
  const peopleText = await readFile(
    new URL("../../research/people/people.jsonl", import.meta.url),
    "utf8",
  );
  const profilePaths = peopleText
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => `/people/${JSON.parse(line).id.replace(/^person\./, "")}`);
  const responses = await Promise.all(
    ["/", "/research", "/people", ...profilePaths].map((path) => render(path)),
  );
  responses.forEach((response) => assert.equal(response.status, 200));
  const html = (await Promise.all(responses.map((response) => response.text()))).join(
    " ",
  );

  assert.doesNotMatch(html, /\bSSN\b/i);
  assert.doesNotMatch(html, /\b\d{3}-\d{2}-\d{4}\b/);
});

test("separates the public summary from the research notes", async () => {
  const [publicResponse, researchResponse] = await Promise.all([
    render(),
    render("/research"),
  ]);
  const publicHtml = await publicResponse.text();
  const researchHtml = await researchResponse.text();

  assert.match(publicHtml, /The families before New York/);
  assert.doesNotMatch(
    publicHtml,
    /Pedro,\s*Ana,\s*Lope,\s*Reyes,\s*Sotero,\s*María,\s*Marcelo and Aurora/i,
  );
  assert.doesNotMatch(publicHtml, /Negative memory/);
  assert.doesNotMatch(publicHtml, /VR-01/);
  assert.doesNotMatch(publicHtml, /WIN4T|Rosedale|Linden, New Jersey/);
  assert.doesNotMatch(
    publicHtml,
    /data-person-id="person\.(?:candido-reyes-diaz|teresa-reyes-diaz)"/,
  );
  assert.doesNotMatch(publicHtml, /Pastora/i);

  assert.equal(researchResponse.status, 200);
  assert.match(researchHtml, /Research notes/);
  assert.match(researchHtml, /What is known, and where the trail stops/);
  assert.match(researchHtml, /The missing record is not the same as a missing person/);
  assert.match(researchHtml, /Simona Ribera/);
  assert.match(researchHtml, /OVERSEAS ORIGIN OPEN/);
  assert.match(researchHtml, /Where the records and memory differ/);
  assert.match(researchHtml, /secondhand Pastora story/i);
  assert.match(researchHtml, /daughter remembers being told/i);
  assert.doesNotMatch(researchHtml, /family knew her as Pastora/i);
  assert.match(researchHtml, /One family at a time/);
  assert.match(researchHtml, /Known or reported children/);
  assert.match(researchHtml, /Cándido \(1923–1948\)/);
  assert.match(researchHtml, /Teresa \(died as an infant in 1927\)/);
  assert.match(researchHtml, /book 15, folio 18 verso/i);
  assert.match(researchHtml, /surviving page is damaged/i);
  assert.match(researchHtml, /Pedro Reyes \+ Ana or Anastasia Martínez/);
  assert.match(researchHtml, /Juan de la Rosa Vázquez Rodríguez/);
  assert.match(researchHtml, /Atilano Vázquez \+ Juana Regina Rodríguez/);
  assert.match(researchHtml, /Atilano Vázquez \+ Juana Paula de Santiago/);
  assert.match(researchHtml, /Married 10 February 1849 in Yabucoa/);
  assert.match(researchHtml, /3 June 1898 · Yabucoa/);
  assert.match(researchHtml, /Máximo Vázquez \+ Josefa Rivera/);
  assert.match(researchHtml, /Máximo Basquez and Josefa Ribera/);
  assert.match(researchHtml, /Francisco \[surname not stated\] \+ María Cortez/);
  assert.match(researchHtml, /Luís de Rivera \+ Isidora Rodríguez/);
  assert.match(researchHtml, /1790-simona-rivera-baptism\.jpg/);
  assert.match(researchHtml, /1792-ysabel-rivera-baptism\.jpg/);
  assert.match(researchHtml, /1811-luis-de-rivera-death\.jpg/);
  assert.match(researchHtml, /Roque \[surname not stated\] and Marciana Delgado/);
  assert.match(researchHtml, /A Canary Islands lead rejected/);
  assert.match(researchHtml, /widower of María Herrera/);
  assert.match(researchHtml, /31 December 1805 in Humacao/);
  assert.match(researchHtml, /Miguel de los Santos/);
  assert.match(researchHtml, /Andrés \[Rodríguez\] \+ Francisca Díaz/);
  assert.match(researchHtml, /Heriberta.*25 Jul 1913.*16 Mar 1913/s);
  assert.match(researchHtml, /Marcelino Perales y Medina \+ Aurora Pérez/);
  assert.match(researchHtml, /Searches without a match/);
  assert.match(researchHtml, /VR-02/);
  assert.match(researchHtml, /VR-08/);
  assert.match(researchHtml, /VR-09/);
  assert.match(researchHtml, /VR-13/);
  assert.match(researchHtml, /Records reviewed/);
});

test("projects every public canonical historical person into the public page", async () => {
  const response = await render();
  const html = await response.text();
  const peopleText = await readFile(
    new URL("../../research/people/people.jsonl", import.meta.url),
    "utf8",
  );
  const canonicalIds = peopleText
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line))
    .filter((person) => person.site_projection !== "research_only")
    .map((person) => person.id)
    .sort();
  const renderedIds = [...html.matchAll(/data-person-id="([^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.deepEqual([...new Set(renderedIds)].sort(), canonicalIds);
});
