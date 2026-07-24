# Vazquez-Reyes family-history site

Public presentation layer for the canonical research records one directory up.
The page is a sourced working artifact, not a final proof tree.

- `/` is the concise family-facing story.
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
npm run dev
npm run build
node --test tests/rendered-html.test.mjs
```
