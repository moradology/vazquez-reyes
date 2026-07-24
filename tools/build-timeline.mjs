#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "website/app/timeline-data.ts");

async function readJsonl(file) {
  const text = await readFile(file, "utf8");
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${file}:${index + 1}: ${error.message}`);
      }
    });
}

const [people, claims, sources, geographyEvents, places] = await Promise.all([
  readJsonl(path.join(root, "research/people/people.jsonl")),
  readJsonl(path.join(root, "research/evidence/claims.jsonl")),
  readJsonl(path.join(root, "research/sources/sources.jsonl")),
  readJsonl(path.join(root, "research/geography/events.jsonl")),
  readJsonl(path.join(root, "research/geography/places.jsonl")),
]);

const peopleById = new Map(people.map((person) => [person.id, person]));
const sourcesById = new Map(sources.map((source) => [source.id, source]));
const placesById = new Map(places.map((place) => [place.id, place]));

function personRefs(value) {
  const refs = new Set();
  const visit = (current) => {
    if (typeof current === "string") {
      if (peopleById.has(current)) refs.add(current);
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
  return [...refs];
}

function claimSubjects(claim) {
  return Array.isArray(claim.subject) ? claim.subject : [claim.subject];
}

const familyGraph = new Map(people.map((person) => [person.id, new Set()]));
function connect(left, right) {
  if (!peopleById.has(left) || !peopleById.has(right) || left === right) return;
  familyGraph.get(left).add(right);
  familyGraph.get(right).add(left);
}

for (const person of people) {
  const relatives = [
    ...personRefs(person.parents),
    ...personRefs(person.known_children),
    ...personRefs(person.known_siblings),
    ...personRefs(person.mother),
    ...personRefs(person.father),
  ];
  relatives.forEach((relative) => connect(person.id, relative));
}
for (const claim of claims) {
  if (!["parents", "sibling", "biological_child_of"].includes(claim.predicate)) {
    continue;
  }
  const refs = [...claimSubjects(claim), ...personRefs(claim.object)];
  for (let index = 1; index < refs.length; index += 1) {
    connect(refs[0], refs[index]);
  }
}

function ancestorsOf(startId) {
  const ancestors = new Set();
  const visit = (personId) => {
    if (ancestors.has(personId)) return;
    ancestors.add(personId);
    const person = peopleById.get(personId);
    if (!person) return;
    const parentRefs = new Set([
      ...personRefs(person.parents),
      ...personRefs(person.mother),
      ...personRefs(person.father),
      ...claims
        .filter(
          (claim) =>
            claim.predicate === "parents" &&
            claimSubjects(claim).includes(personId),
        )
        .flatMap((claim) => personRefs(claim.object)),
    ]);
    parentRefs.forEach(visit);
  };
  visit(startId);
  return ancestors;
}

function connectedTo(seeds) {
  const visited = new Set(seeds);
  const queue = [...seeds];
  while (queue.length) {
    const personId = queue.shift();
    for (const relative of familyGraph.get(personId) ?? []) {
      if (!visited.has(relative)) {
        visited.add(relative);
        queue.push(relative);
      }
    }
  }
  return visited;
}

const reyesDirect = ancestorsOf("person.cruz-reyes-vasquez");
const vazquezDirect = ancestorsOf("person.rafael-vazquez-perales");
const reyesFamily = connectedTo(reyesDirect);
const vazquezFamily = connectedTo(vazquezDirect);

function personBranch(personId) {
  const inReyes = reyesFamily.has(personId);
  const inVazquez = vazquezFamily.has(personId);
  if (inReyes && inVazquez) return "both";
  if (inReyes) return "reyes";
  if (inVazquez) return "vazquez";
  return "vazquez";
}

function eventBranch(personIds, mapGroups = []) {
  const branches = new Set(personIds.map(personBranch));
  if (
    mapGroups.some((group) =>
      ["cruz", "mauricio-carmen", "pedro-ana"].includes(group),
    )
  ) {
    branches.add("reyes");
  }
  if (
    mapGroups.some((group) =>
      [
        "rafael",
        "juan-carlina",
        "sotero-maria",
        "marcelino-aurora",
        "atilano-juana",
        "early-vazquez",
      ].includes(group),
    )
  ) {
    branches.add("vazquez");
  }
  if (
    branches.has("both") ||
    (branches.has("reyes") && branches.has("vazquez"))
  ) {
    return "both";
  }
  return branches.has("reyes") ? "reyes" : "vazquez";
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function prettyIso(value) {
  const exact = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (exact) {
    return `${Number(exact[3])} ${monthNames[Number(exact[2]) - 1]} ${exact[1]}`;
  }
  const month = value.match(/^(\d{4})-(\d{2})$/);
  if (month) return `${monthNames[Number(month[2]) - 1]} ${month[1]}`;
  return value;
}

function prettyRange(value) {
  const exact = value.match(
    /^(\d{4})-(\d{2})-(\d{2}) to (\d{4})-(\d{2})-(\d{2})$/,
  );
  if (exact && exact[1] === exact[4] && exact[2] === exact[5]) {
    return `${Number(exact[3])}–${Number(exact[6])} ${
      monthNames[Number(exact[2]) - 1]
    } ${exact[1]}`;
  }
  if (exact) return `${prettyIso(exact[1] + "-" + exact[2] + "-" + exact[3])}–${prettyIso(exact[4] + "-" + exact[5] + "-" + exact[6])}`;
  return value
    .replace(/^about\s+/i, "c. ")
    .replace(/(\d{4})-(\d{4})/g, "$1–$2");
}

function dateDescriptor(event) {
  if (!event || typeof event !== "object" || Array.isArray(event)) return null;
  if (typeof event.date === "string") {
    return {
      raw: event.date,
      label: prettyIso(event.date),
      qualifier: "exact",
      dateTime: event.date,
    };
  }
  if (typeof event.preferred === "string") {
    return {
      raw: event.preferred,
      label: prettyIso(event.preferred),
      qualifier: event.preferred.length === 10 ? "exact" : "partial",
      dateTime: event.preferred,
    };
  }
  if (typeof event.recorded === "string") {
    return {
      raw: event.recorded,
      label: prettyIso(event.recorded),
      qualifier: "recorded",
      dateTime: event.recorded,
    };
  }
  if (typeof event.date_range === "string") {
    return {
      raw: event.date_range,
      label: prettyRange(event.date_range),
      qualifier: "range",
    };
  }
  if (
    typeof event.after === "string" &&
    typeof event.before === "string"
  ) {
    return {
      raw: `${event.after} to ${event.before}`,
      label: `Between ${prettyIso(event.after)} and ${prettyIso(event.before)}`,
      qualifier: "range",
    };
  }
  if (typeof event.on_or_before === "string") {
    return {
      raw: event.on_or_before,
      label: `By ${prettyIso(event.on_or_before)}`,
      qualifier: "boundary",
    };
  }
  if (typeof event.approximate === "string") {
    return {
      raw: event.approximate,
      label: prettyRange(event.approximate.replace(/^about\s+/i, "c. ")),
      qualifier: "approximate",
    };
  }
  if (typeof event.estimated === "string") {
    return {
      raw: event.estimated,
      label: prettyRange(event.estimated.replace(/^about\s+/i, "c. ")),
      qualifier: "approximate",
    };
  }
  if (typeof event.estimated_range === "string") {
    return {
      raw: event.estimated_range,
      label: prettyRange(event.estimated_range),
      qualifier: "approximate",
    };
  }
  if (typeof event.approximate_range === "string") {
    return {
      raw: event.approximate_range,
      label: prettyRange(event.approximate_range),
      qualifier: "approximate",
    };
  }
  if (typeof event.year === "string" || typeof event.year === "number") {
    return {
      raw: String(event.year),
      label: String(event.year),
      qualifier: "partial",
      dateTime: String(event.year),
    };
  }
  if (
    typeof event.likely_year === "string" &&
    typeof event.reported_day_month === "string"
  ) {
    return {
      raw: event.likely_year,
      label: `Probably ${event.reported_day_month} ${event.likely_year}`,
      qualifier: "approximate",
    };
  }
  if (typeof event.after === "string") {
    return {
      raw: event.after,
      label: `After ${prettyIso(event.after)}`,
      qualifier: "boundary",
    };
  }
  if (typeof event.before === "string") {
    return {
      raw: event.before,
      label: `Before ${prettyIso(event.before)}`,
      qualifier: "boundary",
    };
  }
  return null;
}

function sortValue(raw) {
  const match = String(raw).match(
    /(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?/,
  );
  if (!match) return Number.POSITIVE_INFINITY;
  return (
    Number(match[1]) * 10_000 +
    Number(match[2] ?? 6) * 100 +
    Number(match[3] ?? 15)
  );
}

function descriptorSortValue(descriptor) {
  const base = sortValue(descriptor.raw);
  if (/^After\b/.test(descriptor.label)) return base + 1;
  if (/^(?:Before|By)\b/.test(descriptor.label)) return base - 1;
  return base;
}

function eventYear(raw) {
  return String(raw).match(/(\d{4})/)?.[1] ?? "unknown";
}

function normalizeEventType(type) {
  return {
    child_birth: "birth",
    child_baptism: "baptism",
    reported_birth_place: "origin",
    reported_native_place: "origin",
  }[type] ?? type;
}

function eventTypeLabel(type) {
  return {
    baptism: "Baptism",
    birth: "Birth",
    burial: "Burial",
    death: "Death",
    marriage: "Marriage",
    migration: "Move",
    origin: "Birthplace evidence",
    residence: "Household",
  }[normalizeEventType(type)] ?? type.replaceAll("_", " ");
}

function certainty(status, qualifier) {
  const normalized = String(status ?? "").toLowerCase();
  if (
    ["exact", "recorded"].includes(qualifier) &&
    /confirmed|documented|original|register/.test(normalized)
  ) {
    return "Documented";
  }
  if (
    ["exact", "recorded"].includes(qualifier) &&
    /probable|strong/.test(normalized)
  ) {
    return "Strongly supported";
  }
  if (
    qualifier === "approximate" ||
    qualifier === "range" ||
    qualifier === "boundary" ||
    /approx|estimate|bracket|bound|conflict|open/.test(normalized)
  ) {
    return "Approximate or bounded";
  }
  if (/probable|strong/.test(normalized)) return "Strongly supported";
  return "Documented";
}

function sourceSummary(evidenceRefs = []) {
  const source = evidenceRefs.map((ref) => sourcesById.get(ref)).find(Boolean);
  if (!source) return null;
  return {
    title: source.title,
    url: source.url ?? null,
  };
}

function personLinks(personIds) {
  return [...new Set(personIds)]
    .map((personId) => peopleById.get(personId))
    .filter(Boolean)
    .map((person) => ({
      id: person.id,
      name: person.display_name,
      slug: person.id.replace(/^person\./, ""),
    }));
}

function geoTitle(event, linkedPeople, place) {
  const names = linkedPeople.map((person) => person.name);
  const type = normalizeEventType(event.event_type);
  if (type === "marriage" && names.length >= 2) {
    return `${names[0]} and ${names[1]} marry`;
  }
  if (event.event_type === "child_birth" && names.length) {
    return `${names.at(-1)} is born`;
  }
  if (event.event_type === "child_baptism" && names.length >= 2) {
    return `A child of ${names[0]} and ${names[1]} is baptized`;
  }
  if (type === "birth" && names.length) return `${names[0]} is born`;
  if (type === "baptism" && names.length) {
    return `${names[0]} is baptized`;
  }
  if (type === "death" && names.length) return `${names[0]} dies`;
  if (type === "burial" && names.length) return `${names[0]} is buried`;
  if (type === "origin" && names.length) {
    return `${names[0]}'s birthplace enters the record`;
  }
  if (type === "residence") {
    return `A household is recorded in ${place}`;
  }
  return `${eventTypeLabel(event.event_type)} in ${place}`;
}

const timelineEvents = [];
const geoFingerprints = new Set();

for (const event of geographyEvents) {
  const descriptor = dateDescriptor({
    date: event.date,
    date_range: event.date_range,
  });
  if (!descriptor) continue;
  const linkedPeople = personLinks(event.person_refs ?? []);
  const place = placesById.get(event.place_ref)?.label ?? event.place_ref;
  const normalizedType = normalizeEventType(event.event_type);
  for (const person of linkedPeople) {
    geoFingerprints.add(
      `${person.id}|${normalizedType}|${eventYear(descriptor.raw)}`,
    );
  }
  timelineEvents.push({
    id: event.id,
    branch: eventBranch(event.person_refs ?? [], event.map_groups ?? []),
    directLine: (event.person_refs ?? []).some(
      (ref) => reyesDirect.has(ref) || vazquezDirect.has(ref),
    ),
    dateLabel: descriptor.label,
    dateTime: descriptor.dateTime ?? null,
    sortValue: descriptorSortValue(descriptor),
    eventType: normalizedType,
    eventTypeLabel: eventTypeLabel(event.event_type),
    certainty: certainty(event.status, descriptor.qualifier),
    title: geoTitle(event, linkedPeople, place),
    description: event.map_note,
    place,
    people: linkedPeople,
    source: sourceSummary(event.evidence_refs),
  });
}

function relatedName(event, key) {
  const value = event?.[key];
  if (typeof value !== "string") return null;
  return peopleById.get(value)?.display_name ?? value;
}

function lifeEventTitle(person, type, event) {
  if (type === "marriage") {
    const spouse =
      relatedName(event, "person") ??
      relatedName(event, "spouse") ??
      event.spouse_name;
    return spouse
      ? `${person.display_name} and ${spouse} marry`
      : `${person.display_name} marries`;
  }
  return {
    birth: `${person.display_name} is born`,
    baptism: `${person.display_name} is baptized`,
    death: `${person.display_name} dies`,
    burial: `${person.display_name} is buried`,
  }[type];
}

function lifeEventDescription(type, event, descriptor) {
  const place = event.place ?? event.cemetery;
  if (event.conflict) return event.conflict;
  if (descriptor.qualifier === "approximate") {
    return place
      ? `The date is estimated from later records; the recorded place is ${place}.`
      : "The date is estimated from later records.";
  }
  if (descriptor.qualifier === "range" || descriptor.qualifier === "boundary") {
    return place
      ? `The surviving records bound the date and place the event in ${place}.`
      : "The surviving records bound the event without supplying an exact date.";
  }
  return {
    birth: place ? `Birth recorded in ${place}.` : "Birth date documented.",
    baptism: place ? `Baptized in ${place}.` : "Baptism date documented.",
    marriage: place ? `Marriage recorded in ${place}.` : "Marriage documented.",
    death: place ? `Death recorded in ${place}.` : "Death date documented.",
    burial: place ? `Burial recorded in ${place}.` : "Burial date documented.",
  }[type];
}

const marriageFingerprints = new Set();
for (const person of people) {
  const lifeEvents = [
    ["birth", person.birth],
    ["baptism", person.baptism],
    ["death", person.death],
    ["burial", person.burial],
    ["marriage", person.marriage],
    ...(Array.isArray(person.marriages)
      ? person.marriages.map((marriage) => ["marriage", marriage])
      : []),
  ];
  for (const [type, event] of lifeEvents) {
    const descriptor = dateDescriptor(event);
    if (!descriptor) continue;
    const fingerprint = `${person.id}|${type}|${eventYear(descriptor.raw)}`;
    if (geoFingerprints.has(fingerprint)) continue;

    if (type === "marriage") {
      const partnerId =
        typeof event.person === "string"
          ? event.person
          : typeof event.spouse === "string"
            ? event.spouse
            : null;
      if (partnerId && peopleById.has(partnerId)) {
        const pairKey = [
          person.id,
          partnerId,
          String(sortValue(descriptor.raw)),
        ]
          .sort()
          .join("|");
        if (marriageFingerprints.has(pairKey)) continue;
        marriageFingerprints.add(pairKey);
      }
    }

    const linkedIds = [
      person.id,
      ...personRefs(event.person),
      ...personRefs(event.spouse),
    ];
    timelineEvents.push({
      id: `timeline.${person.id.replace(/^person\./, "")}.${type}.${sortValue(descriptor.raw)}`,
      branch: eventBranch(linkedIds),
      directLine:
        reyesDirect.has(person.id) || vazquezDirect.has(person.id),
      dateLabel: descriptor.label,
      dateTime: descriptor.dateTime ?? null,
      sortValue: descriptorSortValue(descriptor),
      eventType: type,
      eventTypeLabel: eventTypeLabel(type),
      certainty: certainty(event.status, descriptor.qualifier),
      title: lifeEventTitle(person, type, event),
      description: lifeEventDescription(type, event, descriptor),
      place: event.place ?? event.cemetery ?? null,
      people: personLinks(linkedIds),
      source: null,
    });
  }
}

const timelineClaimPredicates = new Set([
  "spouse_of",
  "migration_window",
  "household",
]);

for (const claim of claims.filter((item) =>
  timelineClaimPredicates.has(item.predicate),
)) {
  const object =
    claim.predicate === "spouse_of"
      ? claim.value
      : claim.object ?? claim.value;
  const linkedIds = [
    ...claimSubjects(claim),
    ...personRefs(claim.object),
    ...personRefs(object),
  ].filter((id) => peopleById.has(id));
  let type;
  let descriptor;
  let title;
  let description;
  let place;

  if (claim.predicate === "spouse_of") {
    type = "marriage";
    descriptor = dateDescriptor(object);
    const linked = personLinks(linkedIds);
    title =
      linked.length >= 2
        ? `${linked[0].name} and ${linked[1].name} marry`
        : "Marriage";
    place = object.place ?? null;
    description = place
      ? `The marriage license places the ceremony in ${place}.`
      : "The marriage is documented by the surviving records.";
  } else if (claim.predicate === "migration_window") {
    type = "migration";
    const last = String(object.last_documented_in_puerto_rico ?? "");
    const first = String(object.first_documented_in_new_york ?? "");
    const lastDate = last.match(/\d{4}-\d{2}-\d{2}/)?.[0];
    const firstDate = first.match(/\d{4}-\d{2}-\d{2}/)?.[0];
    if (lastDate && firstDate) {
      descriptor = dateDescriptor({ date_range: `${lastDate} to ${firstDate}` });
    }
    title = "Cruz's move from Puerto Rico to New York is bounded";
    place = "Collores, Humacao → Manhattan";
    description =
      "Cruz was recorded in Collores in April 1940 and signed her Manhattan marriage affidavit in October 1941. The travel date is still unknown.";
  } else if (claim.predicate === "household") {
    type = "residence";
    descriptor = dateDescriptor(object);
    place = object.place ?? null;
    title = place ? `A household is recorded at ${place}` : "Household record";
    description =
      claim.note ??
      "The census records the named family members together at this place.";
  }

  if (!descriptor || !type) continue;
  const eventSortValue = descriptorSortValue(descriptor);
  if (
    linkedIds.some((personId) =>
      geoFingerprints.has(`${personId}|${type}|${eventYear(descriptor.raw)}`),
    )
  ) {
    continue;
  }
  const claimFingerprint = `${linkedIds.sort().join("|")}|${type}|${eventSortValue}`;
  if (marriageFingerprints.has(claimFingerprint)) continue;

  timelineEvents.push({
    id: `timeline.${claim.id}`,
    branch: eventBranch(linkedIds),
    directLine: linkedIds.some(
      (id) => reyesDirect.has(id) || vazquezDirect.has(id),
    ),
    dateLabel: descriptor.label,
    dateTime: descriptor.dateTime ?? null,
    sortValue: eventSortValue,
    eventType: type,
    eventTypeLabel: eventTypeLabel(type),
    certainty: certainty(claim.status, descriptor.qualifier),
    title,
    description,
    place,
    people: personLinks(linkedIds),
    source: sourceSummary(claim.evidence_refs),
  });
}

timelineEvents.sort(
  (left, right) =>
    left.sortValue - right.sortValue ||
    left.eventType.localeCompare(right.eventType) ||
    left.title.localeCompare(right.title),
);

const eventPersonIds = new Set(
  timelineEvents.flatMap((event) => event.people.map((person) => person.id)),
);
const timelinePeople = people
  .filter((person) => eventPersonIds.has(person.id))
  .map((person) => ({
    id: person.id,
    name: person.display_name,
    slug: person.id.replace(/^person\./, ""),
    branch: personBranch(person.id),
    directLine: reyesDirect.has(person.id) || vazquezDirect.has(person.id),
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

const generated = `// Generated by tools/build-timeline.mjs from the research ledgers.
// Edit the JSONL ledgers, then rerun the generator.

export type TimelineBranch = "reyes" | "vazquez" | "both";

export type TimelinePerson = {
  id: string;
  name: string;
  slug: string;
  branch: TimelineBranch;
  directLine: boolean;
};

export type TimelineEvent = {
  id: string;
  branch: TimelineBranch;
  directLine: boolean;
  dateLabel: string;
  dateTime: string | null;
  sortValue: number;
  eventType: string;
  eventTypeLabel: string;
  certainty: string;
  title: string;
  description: string;
  place: string | null;
  people: readonly {
    id: string;
    name: string;
    slug: string;
  }[];
  source: {
    title: string;
    url: string | null;
  } | null;
};

export const timelinePeople: readonly TimelinePerson[] = ${JSON.stringify(timelinePeople, null, 2)};

export const timelineEvents: readonly TimelineEvent[] = ${JSON.stringify(timelineEvents, null, 2)};
`;

await writeFile(output, generated);
console.log(
  `Generated ${timelineEvents.length} timeline events for ${timelinePeople.length} people.`,
);
