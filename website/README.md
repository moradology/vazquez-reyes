# Vazquez-Reyes family-history site

Public presentation layer for the canonical research records one directory up.
The page is a sourced working artifact, not a final proof tree.

Published with GitHub Pages at
https://moradology.github.io/vazquez-reyes/.

- `/` is the concise family-facing story.
- `/people` lists every reviewed historical person and links to one detailed
  page per person.
- `/presentation` is the family-meeting evidence walkthrough.
- `/research` is the sanitized ongoing research notebook.
- `../research/` remains the canonical evidence and reasoning layer.

## Public-data rules

- Publish deceased historical people only.
- Omit Social Security numbers, account data, subscription images, and details
  about potentially living descendants.
- Show confidence and date conflicts rather than smoothing them away.
- Keep source links beside the conclusions they support.
- Make each open question name the record that could resolve it.

The rendered-page tests verify that every canonical historical person is
represented and that common sensitive-identifier patterns are absent.

## Commands

```sh
npm install
node ../tools/build-people-pages.mjs
npm run dev
npm run build
node --test tests/rendered-html.test.mjs
npm run export:pages
```
