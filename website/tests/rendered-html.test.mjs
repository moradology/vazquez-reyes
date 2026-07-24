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
  assert.match(html, /href="#story-mauricio-carmen"/);
  assert.match(html, /href="#story-atilano-juana"/);
  assert.match(html, /Points locate the named municipio or barrio/);
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
  const [publicResponse, researchResponse] = await Promise.all([
    render(),
    render("/research"),
  ]);
  const html = `${await publicResponse.text()} ${await researchResponse.text()}`;

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
