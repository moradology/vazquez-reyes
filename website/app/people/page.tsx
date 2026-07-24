import Link from "next/link";
import { peopleProfiles } from "../people-data";
import { SiteHeader } from "../site-header";

export const metadata = {
  title: "People · Vazquez–Reyes Family History",
  description:
    "Detailed profiles for people documented in the Vazquez-Reyes family research.",
};

function lifeLine(profile: (typeof peopleProfiles)[number]) {
  const birth = profile.record.birth;
  const death = profile.record.death;
  const read = (value: unknown, fallback: string) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
    const event = value as Record<string, unknown>;
    return String(
      event.preferred ??
        event.date ??
        event.approximate ??
        event.estimated ??
        event.estimated_range ??
        event.approximate_range ??
        event.before ??
        event.after ??
        fallback,
    );
  };
  return `${read(birth, "birth open")} — ${read(death, "death open")}`;
}

export default function PeopleIndexPage() {
  const profiles = [...peopleProfiles].sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );

  return (
    <main className="people-index">
      <SiteHeader current="people" />

      <section className="people-index-hero">
        <p className="hero-kicker">The people in the records</p>
        <h1>People</h1>
        <p>
          Each profile gathers the names, dates, relatives, places, records,
          conflicts, and open questions currently attached to one person.
        </p>
      </section>

      <section className="people-directory" aria-label="Person profiles">
        {profiles.map((profile) => (
          <Link
            className={`directory-person directory-person-${profile.tone}`}
            href={`/people/${profile.slug}`}
            key={profile.id}
          >
            <span>{profile.tone === "reyes" ? "Reyes–Díaz" : "Vázquez–Perales"}</span>
            <h2>{profile.displayName}</h2>
            <p>{lifeLine(profile)}</p>
            <strong>Open profile →</strong>
          </Link>
        ))}
      </section>
    </main>
  );
}
