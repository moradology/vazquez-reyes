# Geography ledger

This directory is the canonical geographic layer for the family research.
It records only places and movements supported by a cited record. The public
maps are generated from these files.

## `places.jsonl`

One JSON object per named place:

- `id`: stable `place.*` identifier
- `label`: display name
- `kind`: `municipio`, `barrio`, or `island`
- `parent_ref`: enclosing place, when known
- `geoid`: Census geographic identifier, when available
- `coordinates`: `[longitude, latitude]`
- `precision`: what the point actually means
- `coordinate_source`: dataset, service URL, and access date

Coordinates are representative map points for administrative areas. They are
not household locations. A barrio point means “somewhere in this named
barrio,” not a street or parcel.

## `events.jsonl`

One JSON object per mapped event:

- `id`: stable `geo.event.*` identifier
- `date` or `date_range`: the record date or supported interval
- `event_type`: birth, marriage, residence, death, or reported native place
- `person_refs`: canonical people involved
- `place_ref`: a place in `places.jsonl`
- `status`: `confirmed`, `strong`, or `approximate`
- `evidence_refs`: one or more canonical source records
- `map_groups`: public map sequences that include this event
- `sequence`: ordering within those sequences
- `map_label` and `map_note`: compact public presentation

The ledger deliberately separates documentary certainty from cartographic
precision. A confirmed census event can still use a broad barrio
representative point because the census does not identify a surviving exact
house coordinate.
