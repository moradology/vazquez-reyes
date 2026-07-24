# Vazquez-Reyes Family Research

Private-first working repository for building a documented Vazquez-Reyes
family history from public records, subscription indexes, family material,
and explicitly labeled hypotheses.

## Current state

The project has a clean research structure, a tested Ancestry acquisition
cockpit, and an initial evidence-backed reconstruction of the starting couple.
Cruz Reyes and Rafael Vázquez are connected by their 1941 Manhattan marriage,
their 1950 Manhattan household, and a shared cemetery plot in Linden, New
Jersey. Their recorded parents and the major date conflicts are now captured
as structured research records.

Start with [`research/initial-findings.md`](research/initial-findings.md).

The public presentation lives in [`website/`](website/) and is deliberately
derived from the privacy-reviewed research core. Its validation checks that all
canonical historical people appear and that sensitive identifiers do not.

## Operating principles

- Record facts and uncertainty separately.
- Never invent a person to fill a pedigree gap.
- Keep living people and sensitive identifiers out of tracked files.
- Keep raw subscription images and structured Ancestry acquisitions local.
- Preserve source URLs, literal citation metadata, and the search context that
  produced each finding.
- Treat the public-facing family tree, if one is later built, as a generated
  projection rather than the source of truth.

## Ancestry cockpit

The cockpit connects to an already-running Chrome session on port `9222`.
Chrome must be logged into Ancestry by the researcher; the tool never automates
login.

```sh
./gen ancestry --help
./gen ancestry cache stats
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

This currently runs the cockpit's offline contract suite. The initial research
records are line-oriented JSON and can be reviewed with ordinary text tools.

## Research layout

- `research/intake.md` — starting family information and privacy decisions.
- `research/initial-findings.md` — human-readable first-pass report.
- `research/people/people.jsonl` — reviewed historical people.
- `research/people/relationships.jsonl` — typed family relationships.
- `research/cases/cases.jsonl` — open and resolved research questions.
- `research/evidence/claims.jsonl` — privacy-reviewed claims and conclusions.
- `research/sources/sources.jsonl` — canonical source registry.
- `research/reasoning-traces/` — durable inference and negative-search notes.
- `research/cache/ancestry/` — gitignored acquisition store.
