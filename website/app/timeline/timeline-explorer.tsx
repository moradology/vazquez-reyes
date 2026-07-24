"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  TimelineBranch,
  TimelineEvent,
  TimelinePerson,
} from "../timeline-data";

type BranchFilter = "all" | Exclude<TimelineBranch, "both">;
type ScopeFilter = "direct" | "all";

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
        {events.map((event) => (
          <TimelineRecord
            event={event}
            hidden={!visibleEventIds.has(event.id)}
            key={event.id}
          />
        ))}
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
