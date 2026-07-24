import assert from "node:assert/strict";
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";

const outRoot = new URL("../out-pages/", import.meta.url);
const clientRoot = new URL("../dist/client/", import.meta.url);
const basePath = "/vazquez-reyes/";
const workerPromise = import(new URL("../dist/server/index.js", import.meta.url));

async function render(pathname) {
  const { default: worker } = await workerPromise;
  const response = await worker.fetch(
    new Request(`https://moradology.github.io${pathname}`, {
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
  assert.equal(response.status, 200, `render ${pathname}`);
  return response.text();
}

function makeStatic(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "")
    .replaceAll("/assets/", `${basePath}assets/`)
    .replace(
      /\b(href|src)="\/(?!\/|vazquez-reyes\/)([^"]*)"/g,
      `$1="${basePath}$2"`,
    )
    .replace(/\bcontent="\/og\.png"/g, `content="${basePath}og.png"`)
    .replace(
      "</body>",
      `<script src="${basePath}static-tools.js" defer></script></body>`,
    );
}

async function rewriteAssetUrls(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const url = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) {
      await rewriteAssetUrls(url);
    } else if (entry.name.endsWith(".css") || entry.name.endsWith(".js")) {
      const source = await readFile(url, "utf8");
      await writeFile(url, source.replaceAll("/assets/", `${basePath}assets/`));
    }
  }
}

await rm(outRoot, { recursive: true, force: true });
await Promise.all([
  mkdir(new URL("people/", outRoot), { recursive: true }),
  mkdir(new URL("timeline/", outRoot), { recursive: true }),
  mkdir(new URL("presentation/", outRoot), { recursive: true }),
  mkdir(new URL("research/", outRoot), { recursive: true }),
]);
await cp(new URL("assets/", clientRoot), new URL("assets/", outRoot), {
  recursive: true,
});
await cp(new URL("og.png", clientRoot), new URL("og.png", outRoot));
await cp(new URL("records/", clientRoot), new URL("records/", outRoot), {
  recursive: true,
});
await cp(new URL("maps/", clientRoot), new URL("maps/", outRoot), {
  recursive: true,
});
await cp(new URL("places/", clientRoot), new URL("places/", outRoot), {
  recursive: true,
});
await cp(
  new URL("static-tools.js", clientRoot),
  new URL("static-tools.js", outRoot),
);

const people = (await readFile(
  new URL("../../research/people/people.jsonl", import.meta.url),
  "utf8",
))
  .split(/\r?\n/)
  .filter((line) => line.trim())
  .map((line) => JSON.parse(line));
const personSlugs = people.map((person) => person.id.replace(/^person\./, ""));
const routes = [
  { name: "public", pathname: "/", output: "index.html" },
  { name: "people", pathname: "/people", output: "people/index.html" },
  { name: "timeline", pathname: "/timeline", output: "timeline/index.html" },
  {
    name: "presentation",
    pathname: "/presentation",
    output: "presentation/index.html",
  },
  { name: "research", pathname: "/research", output: "research/index.html" },
  ...personSlugs.map((slug) => ({
    name: `person ${slug}`,
    pathname: `/people/${slug}`,
    output: `people/${slug}/index.html`,
  })),
];
const renderedRoutes = [];

for (const route of routes) {
  const html = makeStatic(await render(route.pathname));
  const outputUrl = new URL(route.output, outRoot);
  await mkdir(new URL("./", outputUrl), { recursive: true });
  await writeFile(outputUrl, html);
  renderedRoutes.push({ ...route, html });
}

const publicHtml = renderedRoutes[0].html;
await writeFile(new URL("404.html", outRoot), publicHtml);
await writeFile(new URL(".nojekyll", outRoot), "");
await rewriteAssetUrls(new URL("assets/", outRoot));

for (const { name, html } of renderedRoutes) {
  for (const match of html.matchAll(/\b(?:href|src|content)="(\/[^"]*)"/g)) {
    assert.ok(match[1].startsWith(basePath), `${name} root path: ${match[1]}`);
  }
  assert.doesNotMatch(html, /__VINEXT_RSC_|modulepreload/, `${name} runtime`);
  assert.match(html, new RegExp(`${basePath.replaceAll("/", "\\/")}assets\\/`));
  assert.match(html, new RegExp(`${basePath.replaceAll("/", "\\/")}static-tools\\.js`));
}

assert.equal(renderedRoutes.length, people.length + 5);

for (const filename of [
  "1910-reyes-household.jpg",
  "1920-vazquez-household.jpg",
]) {
  await readFile(new URL(`records/${filename}`, outRoot));
}
for (const filename of [
  "humacao-near-1909.jpg",
  "east-harlem-1970s.jpg",
  "punta-santiago-1902.jpg",
]) {
  await readFile(new URL(`places/${filename}`, outRoot));
}
for (const filename of [
  "puerto-rico-topographic-1886.jpg",
  "puerto-rico-crop-lands-1899.jpg",
]) {
  await readFile(new URL(`maps/${filename}`, outRoot));
}

console.log(`Exported GitHub Pages artifact to ${outRoot.pathname}`);
