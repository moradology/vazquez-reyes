"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArchiveImage } from "../archive-image";
import type {
  TimelineBranch,
  TimelineEvent,
  TimelinePerson,
} from "../timeline-data";

type BranchFilter = "all" | Exclude<TimelineBranch, "both">;
type ScopeFilter = "direct" | "all";

type TimelinePlaceImage = {
  afterEventId: string;
  alt: string;
  citation: string;
  context: string;
  dateLabel: string;
  id: string;
  place: string;
  sourceHref: string;
  sourceLabel: string;
  src: string;
};

const timelinePlaceImages: readonly TimelinePlaceImage[] = [
  {
    id: "timeline-place-punta-santiago-1902",
    afterEventId: "geo.event.juan-carlina-marriage-1902",
    dateLabel: "1902",
    place: "Punta Santiago, Humacao",
    context:
      "Published in the year Juan Vázquez and Carlina Perales married in Humacao. This is a view of the municipio, not their residence.",
    src: "/places/punta-santiago-1902.jpg",
    alt: "Fishing boats and fishermen’s homes at Punta Santiago, Humacao, in 1902",
    citation:
      "William A. Wilcox, Fishing Boats and Fishermen’s Homes, Punta Santiago, published by the United States Fish Commission in 1902. Public domain.",
    sourceHref:
      "https://commons.wikimedia.org/wiki/File:FMIB_38052_Fishing_Boats_and_Fishermen%27s_Homes,_Punta_Santiago.jpeg",
    sourceLabel: "United States Fish Commission image",
  },
  {
    id: "timeline-place-humacao-1920",
    afterEventId: "geo.event.reyes-anton-ruiz-1920",
    dateLabel: "1920",
    place: "Near Humacao",
    context:
      "Both Cruz’s and Rafael’s households were recorded in Antón Ruíz in 1920. This postcard shows the surrounding region, not either family home.",
    src: "/places/humacao-near-1909.jpg",
    alt: "A hand-colored postcard showing bull carts, a rural house, and palms near Humacao, Puerto Rico",
    citation:
      "Waldrop Photographic Co., Bull Carts near Humacao, first issued 1909; this postcard edition published 1920. Public domain.",
    sourceHref:
      "https://commons.wikimedia.org/wiki/File:Puerto_Rico_-_Bull_Carts_near_Humacao.jpg",
    sourceLabel: "Wikimedia Commons source",
  },
  {
    id: "timeline-place-east-105th-1939-1941",
    afterEventId: "timeline.claim.couple-marriage",
    dateLabel: "1939–41",
    place: "16 East 105th Street, East Harlem",
    context:
      "Rafael gave this address when he and Cruz married in 1941. New York City tax photographers recorded the building between 1939 and 1941; the image does not identify a particular apartment or anyone in the family.",
    src: "/places/16-east-105-street-1939-1941.jpg",
    alt: "Black-and-white 1939–1941 tax photograph of the apartment building at 16 East 105th Street in East Harlem",
    citation:
      "16 East 105 Street, 1939–1941, 1940s Tax Department photographs, New York (N.Y.). Department of Finance, nynyma_rec0040_1_01610_0064. Courtesy of the Municipal Archives, City of New York.",
    sourceHref:
      "https://nycrecords.access.preservica.com/uncategorized/IO_3e40e72b-a649-4039-8b1c-24d2179eabcb/",
    sourceLabel: "NYC Municipal Archives record",
  },
];

const timelinePlaceImagesByEvent = new Map(
  timelinePlaceImages.map((image) => [image.afterEventId, image]),
);

function branchMatches(
  branch: TimelineBranch,
  selected: BranchFilter,
) {
  return selected === "all" || branch === "both" || branch === selected;
}

function TimelineRecord({
  event,
  hidden,
}: {
  event: TimelineEvent;
  hidden: boolean;
}) {
  return (
    <li
      className={`family-timeline-row family-timeline-row-${event.branch}`}
      data-timeline-branch={event.branch}
      data-timeline-direct={event.directLine ? "true" : "false"}
      data-timeline-event={event.id}
      data-timeline-people={event.people.map((person) => person.id).join(" ")}
      hidden={hidden}
    >
      <div className="family-timeline-axis">
        <span aria-hidden="true" />
        <time dateTime={event.dateTime ?? undefined}>{event.dateLabel}</time>
      </div>
      <article
        className={`family-timeline-event family-timeline-event-${event.branch}`}
      >
        <p className="family-timeline-meta">
          <span>{event.eventTypeLabel}</span>
          <span>{event.certainty}</span>
        </p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        {event.place ? (
          <p className="family-timeline-place">{event.place}</p>
        ) : null}
        <div className="family-timeline-links">
          {event.people.map((person) => (
            <Link href={`/people/${person.slug}`} key={person.id}>
              {person.name}
            </Link>
          ))}
          {event.source?.url ? (
            <a
              href={event.source.url}
              rel="noreferrer"
              target="_blank"
              aria-label={`Open source: ${event.source.title}`}
            >
              Open record ↗
            </a>
          ) : null}
        </div>
      </article>
    </li>
  );
}

function TimelinePlaceRecord({
  hidden,
  image,
}: {
  hidden: boolean;
  image: TimelinePlaceImage;
}) {
  return (
    <li
      className="timeline-place-row"
      data-timeline-place-image={image.id}
      hidden={hidden}
    >
      <div className="timeline-place-axis">
        <span aria-hidden="true" />
        <time>{image.dateLabel}</time>
      </div>
      <figure className="timeline-place-figure">
        <ArchiveImage
          alt={image.alt}
          citation={image.citation}
          id={`${image.id}-viewer`}
          sourceHref={image.sourceHref}
          sourceLabel={image.sourceLabel}
          src={image.src}
          triggerClassName="timeline-place-image"
          zoomLabel={`View ${image.place} at full size`}
        />
        <figcaption>
          <p className="timeline-place-label">Place in view</p>
          <h3>{image.place}</h3>
          <p>{image.context}</p>
          <p className="timeline-place-source">
            {image.citation}{" "}
            <a href={image.sourceHref} rel="noreferrer" target="_blank">
              Source ↗
            </a>
          </p>
        </figcaption>
      </figure>
    </li>
  );
}

export function TimelineExplorer({
  events,
  people,
}: {
  events: readonly TimelineEvent[];
  people: readonly TimelinePerson[];
}) {
  const [branch, setBranch] = useState<BranchFilter>("all");
  const [scope, setScope] = useState<ScopeFilter>("direct");
  const [personId, setPersonId] = useState("all");

  const visibleEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          branchMatches(event.branch, branch) &&
          (scope === "all" || event.directLine) &&
          (personId === "all" ||
            event.people.some((person) => person.id === personId)),
      ),
    [branch, events, personId, scope],
  );
  const visibleEventIds = new Set(visibleEvents.map((event) => event.id));

  function chooseBranch(nextBranch: BranchFilter) {
    setBranch(nextBranch);
    const selectedPerson = people.find((person) => person.id === personId);
    if (
      selectedPerson &&
      !branchMatches(selectedPerson.branch, nextBranch)
    ) {
      setPersonId("all");
    }
  }

  function chooseScope(nextScope: ScopeFilter) {
    setScope(nextScope);
    const selectedPerson = people.find((person) => person.id === personId);
    if (nextScope === "direct" && selectedPerson && !selectedPerson.directLine) {
      setPersonId("all");
    }
  }

  return (
    <section className="timeline-explorer" aria-label="Interactive family timeline">
      <div className="timeline-controls">
        <fieldset>
          <legend>Family line</legend>
          <div className="timeline-segmented">
            {[
              ["all", "Both"],
              ["reyes", "Reyes–Díaz"],
              ["vazquez", "Vázquez–Perales"],
            ].map(([value, label]) => (
              <button
                aria-pressed={branch === value}
                data-timeline-branch-filter={value}
                key={value}
                onClick={() => chooseBranch(value as BranchFilter)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>People shown</legend>
          <div className="timeline-segmented">
            <button
              aria-pressed={scope === "direct"}
              data-timeline-scope-filter="direct"
              onClick={() => chooseScope("direct")}
              type="button"
            >
              Direct line
            </button>
            <button
              aria-pressed={scope === "all"}
              data-timeline-scope-filter="all"
              onClick={() => chooseScope("all")}
              type="button"
            >
              Include relatives
            </button>
          </div>
        </fieldset>

        <label className="timeline-person-filter">
          <span>One person</span>
          <select
            data-timeline-person-filter
            onChange={(event) => setPersonId(event.target.value)}
            value={personId}
          >
            <option value="all">All people in this view</option>
            {people.map((person) => (
              <option
                data-timeline-branch={person.branch}
                data-timeline-direct={person.directLine ? "true" : "false"}
                hidden={
                  !branchMatches(person.branch, branch) ||
                  (scope === "direct" && !person.directLine)
                }
                key={person.id}
                value={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="timeline-reading-key">
        <p aria-live="polite" data-timeline-count>
          Showing <strong>{visibleEvents.length}</strong>{" "}
          {visibleEvents.length === 1 ? "event" : "events"}, earliest to latest
        </p>
        <p>
          Exact dates, ranges, and estimates keep their different labels. Facts
          without any usable date remain on the person pages rather than being
          forced onto the line.
        </p>
      </div>

      <div className="family-timeline-lane-headings" aria-hidden="true">
        <span>Reyes–Díaz</span>
        <span>Year</span>
        <span>Vázquez–Perales</span>
      </div>

      <ol className="family-timeline">
        {events.flatMap((event) => {
          const placeImage = timelinePlaceImagesByEvent.get(event.id);
          return [
            <TimelineRecord
              event={event}
              hidden={!visibleEventIds.has(event.id)}
              key={event.id}
            />,
            placeImage ? (
              <TimelinePlaceRecord
                hidden={personId !== "all"}
                image={placeImage}
                key={placeImage.id}
              />
            ) : null,
          ];
        })}
      </ol>
      <p
        className="timeline-empty"
        data-timeline-empty
        hidden={visibleEvents.length > 0}
      >
        No dated event matches this combination of filters.
      </p>
    </section>
  );
}
