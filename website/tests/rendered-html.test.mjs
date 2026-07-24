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
  assert.match(html, /From.*Humacao/s);
  assert.match(html, /to New York/);
  assert.match(html, /Cruz and Rafael in Humacao/);
  assert.match(html, /Humacao → East Harlem/);
  assert.match(html, /research notes/);
  assert.doesNotMatch(
    html,
    /Two lives, firmly connected|The evidence behind the story|Three breakthroughs|closed the loop/i,
  );
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

test("separates the public summary from the research notes", async () => {
  const [publicResponse, researchResponse] = await Promise.all([
    render(),
    render("/research"),
  ]);
  const publicHtml = await publicResponse.text();
  const researchHtml = await researchResponse.text();

  assert.match(publicHtml, /The families in Humacao/);
  assert.doesNotMatch(publicHtml, /Negative memory/);
  assert.doesNotMatch(publicHtml, /VR-01/);
  assert.doesNotMatch(publicHtml, /WIN4T|Rosedale|Linden, New Jersey/);

  assert.equal(researchResponse.status, 200);
  assert.match(researchHtml, /Research notes/);
  assert.match(researchHtml, /Where the records disagree/);
  assert.match(researchHtml, /Searches without a match/);
  assert.match(researchHtml, /VR-01/);
  assert.match(researchHtml, /Records reviewed/);
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
