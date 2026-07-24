import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function readJsonl(path) {
  return (await readFile(new URL(path, root), "utf8"))
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
}

const [people, claims, sources, geographyEvents] = await Promise.all([
  readJsonl("research/people/people.jsonl"),
  readJsonl("research/evidence/claims.jsonl"),
  readJsonl("research/sources/sources.jsonl"),
  readJsonl("research/geography/events.jsonl"),
]);

const peopleById = new Map(people.map((person) => [person.id, person]));
const sourcesById = new Map(sources.map((source) => [source.id, source]));

const publicRecordImages = {
  "source.pr-civil-birth.cruz.3790159": "1915-cruz-civil-birth.jpg",
  "source.census.1910.reyes-diaz": "1910-reyes-household.jpg",
  "source.census.1940.reyes-diaz": "1940-reyes-household.jpg",
  "source.census.1920.rafael": "1920-vazquez-household.jpg",
  "source.familysearch-census.1930.juan-dolores":
    "1930-juan-dolores-household.jpg",
  "source.familysearch-census.1940.juan-dolores":
    "1940-juan-dolores-household.jpg",
  "source.familysearch-baptism.mauricio-reyes-martinez.1882":
    "1882-mauricio-reyes-baptism.jpg",
  "source.census.1910.pedro-ana-julian":
    "1910-pedro-ana-julian-household.jpg",
  "source.census.1910.sotero-maria": "1910-sotero-maria-household.jpg",
  "source.familysearch-marriage.maximo-josefa.1805":
    "1805-maximo-josefa-marriage.jpg",
  "source.familysearch-baptism.miguel-vazquez.1786":
    "1786-miguel-vazquez-baptism.jpg",
  "source.familysearch-burial.maria-de-los-angeles-vazquez.1793":
    "1793-maria-de-los-angeles-vazquez-burial.jpg",
  "source.familysearch-burial.maria-magdalena-cortes.1794":
    "1794-maria-magdalena-cortes-burial.jpg",
  "source.familysearch-burial.jose-vazquez.1801":
    "1801-jose-vazquez-burial.jpg",
  "source.familysearch-baptism.simona-rivera.1790":
    "1790-simona-rivera-baptism.jpg",
  "source.familysearch-baptism.ysabel-rivera.1792":
    "1792-ysabel-rivera-baptism.jpg",
  "source.familysearch-death.luis-de-rivera.1811":
    "1811-luis-de-rivera-death.jpg",
};

function personRefs(value) {
  const result = new Set();
  const visit = (current) => {
    if (typeof current === "string") {
      if (peopleById.has(current)) result.add(current);
      return;
    }
    if (Array.isArray(current)) {
      current.forEach(visit);
      return;
    }
    if (current && typeof current === "object") {
      Object.values(current).forEach(visit);
    }
  };
  visit(value);
  return [...result];
}

function refsFromKey(value, acceptedKeys) {
  const result = new Set();
  const visit = (current) => {
    if (!current || typeof current !== "object") return;
    if (Array.isArray(current)) {
      current.forEach(visit);
      return;
    }
    for (const [key, child] of Object.entries(current)) {
      if (acceptedKeys.has(key)) {
        personRefs(child).forEach((id) => result.add(id));
      }
      visit(child);
    }
  };
  visit(value);
  return [...result];
}

function subjects(claim) {
  return Array.isArray(claim.subject) ? claim.subject : [claim.subject];
}

const claimsByPerson = new Map(
  people.map((person) => [
    person.id,
    claims.filter((claim) => subjects(claim).includes(person.id)),
  ]),
);

const baseRelations = new Map();
for (const person of people) {
  const personClaims = claimsByPerson.get(person.id) ?? [];
  const parentIds = new Set(personRefs(person.parents));
  if (person.parents && !Array.isArray(person.parents)) {
    refsFromKey(person.parents, new Set(["father", "mother"])).forEach((id) =>
      parentIds.add(id),
    );
  }
  for (const claim of personClaims) {
    if (claim.predicate === "parents") {
      personRefs(claim.object).forEach((id) => parentIds.add(id));
    }
    refsFromKey(claim.object, new Set(["parents"])).forEach((id) =>
      parentIds.add(id),
    );
  }

  const partnerIds = new Set(
    refsFromKey(person, new Set(["spouse", "partner", "spouses", "marriage", "marriages"])),
  );
  const childIds = new Set(
    personRefs(person.known_children).filter((id) => id !== person.id),
  );
  const siblingIds = new Set(
    personRefs(person.known_siblings).filter((id) => id !== person.id),
  );

  baseRelations.set(person.id, {
    parentIds,
    partnerIds,
    childIds,
    siblingIds,
  });
}

for (const [personId, relations] of baseRelations) {
  for (const parentId of relations.parentIds) {
    baseRelations.get(parentId)?.childIds.add(personId);
  }
  for (const childId of relations.childIds) {
    baseRelations.get(childId)?.parentIds.add(personId);
  }
  for (const partnerId of relations.partnerIds) {
    baseRelations.get(partnerId)?.partnerIds.add(personId);
  }
}

for (const [personId, relations] of baseRelations) {
  for (const other of people) {
    if (other.id === personId) continue;
    const otherParents = baseRelations.get(other.id)?.parentIds ?? new Set();
    if ([...relations.parentIds].some((id) => otherParents.has(id))) {
      relations.siblingIds.add(other.id);
    }
  }
}

const reyesDirect = new Set();
const walkParents = (id, seen = new Set()) => {
  if (seen.has(id)) return;
  seen.add(id);
  reyesDirect.add(id);
  for (const parentId of baseRelations.get(id)?.parentIds ?? []) {
    walkParents(parentId, seen);
  }
};
walkParents("person.cruz-reyes-vasquez");

function unresolvedLabels(value) {
  const labels = [];
  const visit = (current) => {
    if (typeof current === "string") {
      if (!peopleById.has(current)) labels.push(current);
      return;
    }
    if (Array.isArray(current)) {
      current.forEach(visit);
      return;
    }
    if (current && typeof current === "object") {
      if (typeof current.name === "string" && !peopleById.has(current.name)) {
        labels.push(current.name);
      }
    }
  };
  visit(value);
  return [...new Set(labels)];
}

const profiles = people.map((person) => {
  const personClaims = claimsByPerson.get(person.id) ?? [];
  const evidenceIds = new Set([
    ...(person.evidence_refs ?? []),
    ...personClaims.flatMap((claim) => claim.evidence_refs ?? []),
  ]);
  const profileSources = [...evidenceIds]
    .map((id) => sourcesById.get(id))
    .filter(Boolean)
    .map((source) => {
      const publicSource = Object.fromEntries(
        Object.entries(source).filter(([key]) => key !== "privacy"),
      );
      return {
        ...publicSource,
        public_image: publicRecordImages[source.id],
      };
    });
  const relations = baseRelations.get(person.id);
  const allRelated = new Set(personRefs(person));
  [
    ...relations.parentIds,
    ...relations.partnerIds,
    ...relations.childIds,
    ...relations.siblingIds,
  ].forEach((id) => allRelated.delete(id));
  allRelated.delete(person.id);

  const publicRecord = {
    ...person,
    notes:
      typeof person.notes === "string"
        ? person.notes.replace(/^Do not record SSN\.\s*/, "")
        : person.notes,
  };

  return {
    id: person.id,
    slug: person.id.replace(/^person\./, ""),
    displayName: person.display_name,
    sex: person.sex,
    tone: reyesDirect.has(person.id) ? "reyes" : "vazquez",
    siteProjection: person.site_projection ?? "public",
    record: publicRecord,
    relations: {
      parentIds: [...relations.parentIds],
      partnerIds: [...relations.partnerIds],
      childIds: [...relations.childIds],
      siblingIds: [...relations.siblingIds],
      relatedIds: [...allRelated],
      namedChildren: unresolvedLabels(person.known_children),
      namedSiblings: unresolvedLabels(person.known_siblings),
    },
    claims: personClaims,
    sources: profileSources,
    geographyEvents: geographyEvents.filter((event) =>
      event.person_refs?.includes(person.id),
    ),
  };
});

const output = `// Generated by tools/build-people-pages.mjs from the research ledgers.
// Edit the JSONL ledgers, then rerun the generator.

export type LedgerValue =
  | null
  | boolean
  | number
  | string
  | readonly LedgerValue[]
  | { readonly [key: string]: LedgerValue };

export type PersonProfile = {
  id: string;
  slug: string;
  displayName: string;
  sex: string;
  tone: "reyes" | "vazquez";
  siteProjection: string;
  record: { readonly [key: string]: LedgerValue };
  relations: {
    parentIds: readonly string[];
    partnerIds: readonly string[];
    childIds: readonly string[];
    siblingIds: readonly string[];
    relatedIds: readonly string[];
    namedChildren: readonly string[];
    namedSiblings: readonly string[];
  };
  claims: readonly {
    id: string;
    subject: LedgerValue;
    predicate: string;
    object: LedgerValue;
    status: string;
    evidence_refs?: readonly string[];
    note?: string | null;
  }[];
  sources: readonly {
    id: string;
    title: string;
    type: string;
    repository?: string;
    accessed?: string;
    url?: string;
    quality?: string;
    citation?: string;
    status?: string;
    note?: string;
    image_archive?: string;
    public_image?: string;
  }[];
  geographyEvents: readonly {
    id: string;
    date: string;
    event_type: string;
    person_refs: readonly string[];
    place_ref: string;
    evidence_refs: readonly string[];
    map_groups: readonly string[];
    sequence: number;
    map_label: string;
    map_note: string;
  }[];
};

export const peopleProfiles: readonly PersonProfile[] = ${JSON.stringify(profiles, null, 2)};
`;

await writeFile(new URL("website/app/people-data.ts", root), output);
console.log(`Generated ${profiles.length} person profiles.`);
