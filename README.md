# Vazquez-Reyes Family Research

Private-first working repository for building a documented Vazquez-Reyes
family history from public records, subscription indexes, family material,
and explicitly labeled hypotheses.

Public site: https://moradology.github.io/vazquez-reyes/

## Current state

The project has a tested Ancestry acquisition cockpit and an evidence-backed
reconstruction extending both branches through several generations in Puerto
Rico. The public story follows Cruz Reyes Díaz and Rafael Vázquez from eastern
Puerto Rico to their 1941 Manhattan marriage and 1950 East Harlem household.
Their parents, grandparents, earlier families, documented places, and the major
date and identity conflicts are captured as structured research records.

Start with [`research/initial-findings.md`](research/initial-findings.md).

The public presentation lives in [`website/`](website/) and is deliberately
derived from the privacy-reviewed research core. Its validation checks that all
canonical historical people appear and that sensitive identifiers do not.

The site has four reader-facing layers:

- `/` — concise family story for public consumption.
- `/people` and `/people/{name}` — a directory and detailed, linked profile for
  each reviewed historical person.
- `/presentation` — a full-screen, keyboard-controlled walkthrough of the
  records that establish the family connections.
- `/research` — sanitized ongoing notebook with conflicts, open cases, negative
  searches, sources, and a change log.

The tracked `research/` directory remains the canonical third layer from which
both pages are assembled and checked.

## Operating principles

- Record facts and uncertainty separately.
- Never invent a person to fill a pedigree gap.
- Keep living people and sensitive identifiers out of tracked files.
- Keep raw subscription images and structured Ancestry acquisitions local.
- Preserve source URLs, literal citation metadata, and the search context that
  produced each finding.
- Treat the public-facing trees and maps as generated projections rather than
  the source of truth.

## Ancestry cockpit

The cockpit uses a dedicated, persistent Chrome profile on port `9222`. Start
it from the project, then sign into Ancestry manually in the opened window.
The tool never reads or automates login credentials.

```sh
./gen ancestry --help
./gen ancestry browser start
./gen ancestry browser status
./gen ancestry cache stats
./gen ancestry capture --collection 7884 --id 174417271 \
  --capture-id capture.census.1910.rafael \
  --source-ref source.census.1910.rafael \
  --agent vazquez-reyes
./gen ancestry search --collection 62308 --name Given_Vazquez --agent vazquez-reyes
./gen ancestry goto "search/62308?name=Given_Vazquez" --agent vazquez-reyes
./gen ancestry next --agent vazquez-reyes
./gen ancestry open --agent vazquez-reyes
./gen ancestry back --agent vazquez-reyes
```

Live-capable reads are cache-first and globally paced. `where`, `next`, `prev`,
and `back` are local operations and do not contact Ancestry.

## Validation

```sh
./gen gate
```

This runs the cockpit's offline contract suite and validates/regenerates the
geographic projection. The website has a separate render test:

```sh
cd website && npm test
```

The research records are line-oriented JSON and can be reviewed with ordinary
text tools. Run `./gen geography` after editing the place or event ledgers.
Run `node tools/build-people-pages.mjs` after editing people, claims, sources,
or geographic events; GitHub Actions verifies that both generated projections
are current.

## Research layout

- `research/intake.md` — starting family information and privacy decisions.
- `research/initial-findings.md` — human-readable first-pass report.
- `research/people/people.jsonl` — reviewed historical people.
- `research/people/relationships.jsonl` — typed family relationships.
- `research/geography/places.jsonl` — sourced Census map points and precision.
- `research/geography/events.jsonl` — dated, sourced movements used by the maps.
- `research/cases/cases.jsonl` — open and resolved research questions.
- `research/evidence/claims.jsonl` — privacy-reviewed claims and conclusions.
- `research/sources/sources.jsonl` — canonical source registry.
- `research/reasoning-traces/` — durable inference and negative-search notes.
- `research/cache/ancestry/` — gitignored acquisition store.
