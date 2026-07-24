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
  assert.match(html, /WIN4T/);
  assert.match(html, /Two lives, firmly connected/);
  assert.match(html, /ongoing research notebook/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
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

test("separates public story from the ongoing research notebook", async () => {
  const [publicResponse, researchResponse] = await Promise.all([
    render(),
    render("/research"),
  ]);
  const publicHtml = await publicResponse.text();
  const researchHtml = await researchResponse.text();

  assert.match(publicHtml, /Family papers can answer what archives cannot/);
  assert.doesNotMatch(publicHtml, /Negative memory/);
  assert.doesNotMatch(publicHtml, /VR-01/);

  assert.equal(researchResponse.status, 200);
  assert.match(researchHtml, /The evidence behind the story/);
  assert.match(researchHtml, /Where the records disagree/);
  assert.match(researchHtml, /Negative memory/);
  assert.match(researchHtml, /VR-01/);
  assert.match(researchHtml, /The records reviewed so far/);
});

test("projects every canonical historical person into the public page", async () => {
  const response = await render();
  const html = await response.text();
  const peopleText = await readFile(
    new URL("../../research/people/people.jsonl", import.meta.url),
    "utf8",
  );
  const canonicalIds = peopleText
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line).id)
    .sort();
  const renderedIds = [...html.matchAll(/data-person-id="([^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.deepEqual([...new Set(renderedIds)].sort(), canonicalIds);
});
