import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  type LedgerValue,
  peopleProfiles,
} from "../../people-data";
import {
  PuertoRicoMapDefinitions,
  PuertoRicoPersonMap,
} from "../../puerto-rico-map";
import { ArchiveImage } from "../../archive-image";
import { SiteHeader } from "../../site-header";

const profilesById = new Map(
  peopleProfiles.map((profile) => [profile.id, profile]),
);
const profilesBySlug = new Map(
  peopleProfiles.map((profile) => [profile.slug, profile]),
);

export function generateStaticParams() {
  return peopleProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = profilesBySlug.get(slug);
  if (!profile) return {};
  return {
    title: `${profile.displayName} · Vazquez–Reyes Family History`,
    description: `Known dates, family relationships, places, records, and open questions for ${profile.displayName}.`,
  };
}

function words(value: string) {
  return value
    .replace(/^person\./, "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function dateText(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

function PersonLink({ id }: { id: string }) {
  const profile = profilesById.get(id);
  if (!profile) return <span>{words(id)}</span>;
  return (
    <Link className="inline-person-link" href={`/people/${profile.slug}`}>
      {profile.displayName}
    </Link>
  );
}

function DetailValue({ value }: { value: LedgerValue | undefined }) {
  if (value == null) return <span className="not-stated">Not stated</span>;
  if (typeof value === "boolean") return <span>{value ? "Yes" : "No"}</span>;
  if (typeof value === "number") return <span>{value}</span>;
  if (typeof value === "string") {
    if (profilesById.has(value)) return <PersonLink id={value} />;
    return <span>{dateText(value)}</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="not-stated">None recorded</span>;
    return (
      <ul className="detail-list">
        {value.map((item, index) => (
          <li key={index}>
            <DetailValue value={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <dl className="nested-details">
      {Object.entries(value).map(([key, child]) => (
        <div key={key}>
          <dt>{words(key)}</dt>
          <dd>
            <DetailValue value={child} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function statusKind(status: string) {
  if (/rejected|unmerged|open|unresolved|not_yet|candidate/i.test(status)) {
    return "open";
  }
  if (/probable|strong|estimated|conflict|inferred|bounded/i.test(status)) {
    return "probable";
  }
  return "documented";
}

function Status({ value }: { value: string }) {
  return (
    <span className={`profile-status profile-status-${statusKind(value)}`}>
      {words(value)}
    </span>
  );
}

function eventSummary(value: LedgerValue | undefined, fallback: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  const event = value as { readonly [key: string]: LedgerValue };
  const date =
    event.preferred ??
    event.date ??
    event.approximate ??
    event.estimated ??
    event.estimated_range ??
    event.approximate_range ??
    event.before ??
    event.after;
  const place = event.place;
  return [date, place]
    .filter((part) => typeof part === "string")
    .map((part) => dateText(String(part)))
    .join(" · ") || fallback;
}

function RelationGroup({
  ids,
  named,
  title,
}: {
  ids: readonly string[];
  named?: readonly string[];
  title: string;
}) {
  if (ids.length === 0 && (!named || named.length === 0)) return null;
  return (
    <section className="relation-group">
      <h3>{title}</h3>
      <div className="relation-cards">
        {ids.map((id) => {
          const relation = profilesById.get(id);
          if (!relation) return null;
          return (
            <Link
              className={`relation-card relation-card-${relation.tone}`}
              href={`/people/${relation.slug}`}
              key={id}
            >
              <strong>{relation.displayName}</strong>
              <span>
                {eventSummary(relation.record.birth, "Birth open")} —{" "}
                {eventSummary(relation.record.death, "death open")}
              </span>
              <i>Open profile →</i>
            </Link>
          );
        })}
        {named?.map((name) => (
          <div className="relation-card relation-card-unlinked" key={name}>
            <strong>{name}</strong>
            <span>Named in a record; no separate profile yet</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const internalFields = new Set([
  "id",
  "display_name",
  "sex",
  "evidence_refs",
  "site_projection",
]);

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = profilesBySlug.get(slug);
  if (!profile) notFound();
  const recordFields = Object.entries(profile.record).filter(
    ([key]) => !internalFields.has(key),
  );
  const imageSources = profile.sources.filter((source) => source.public_image);

  return (
    <main className={`person-page person-page-${profile.tone}`}>
      <SiteHeader current="people" />

      <section className="person-hero">
        <div>
          <p className="hero-kicker">
            {profile.tone === "reyes" ? "Reyes–Díaz branch" : "Vázquez–Perales branch"}
          </p>
          <h1>{profile.displayName}</h1>
          <p className="person-hero-note">
            Everything currently attached to this person in the evidence
            ledger—including conflicts and missing facts.
          </p>
        </div>
        <dl className="person-vitals">
          <div>
            <dt>Born</dt>
            <dd>{eventSummary(profile.record.birth, "Date and place not yet found")}</dd>
          </div>
          <div>
            <dt>Died</dt>
            <dd>{eventSummary(profile.record.death, "Date and place not yet found")}</dd>
          </div>
          <div>
            <dt>Sex</dt>
            <dd>{words(profile.sex)}</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>
              {profile.sources.length} source{profile.sources.length === 1 ? "" : "s"} ·{" "}
              {profile.claims.length} evaluated claim
              {profile.claims.length === 1 ? "" : "s"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="person-section person-family" id="family-links">
        <div className="person-section-heading">
          <p className="eyebrow">Navigate the family</p>
          <h2>Immediate family and known siblings</h2>
          <p>
            Linked names have their own profile. Unlinked names are preserved
            exactly as leads rather than turned into invented people.
          </p>
        </div>
        <RelationGroup ids={profile.relations.parentIds} title="Parents" />
        <RelationGroup ids={profile.relations.partnerIds} title="Partners" />
        <RelationGroup
          ids={profile.relations.childIds}
          named={profile.relations.namedChildren}
          title="Known children"
        />
        <RelationGroup
          ids={profile.relations.siblingIds}
          named={profile.relations.namedSiblings}
          title="Known siblings and half-siblings"
        />
        <RelationGroup
          ids={profile.relations.relatedIds}
          title="Other linked people"
        />
      </section>

      <section className="person-section person-map-section">
        <PuertoRicoMapDefinitions />
        <PuertoRicoPersonMap
          extendedFamilyPersonIds={[
            ...profile.relations.siblingIds,
            ...profile.relations.relatedIds,
          ]}
          familyPersonIds={[
            ...profile.relations.parentIds,
            ...profile.relations.partnerIds,
            ...profile.relations.childIds,
          ]}
          personId={profile.id}
          title={profile.displayName}
          tone={profile.tone}
        />
      </section>

      <section className="person-section" id="details">
        <div className="person-section-heading">
          <p className="eyebrow">The complete profile</p>
          <h2>What is currently known</h2>
        </div>
        <dl className="profile-details">
          {recordFields.map(([key, value]) => (
            <div key={key}>
              <dt>{words(key)}</dt>
              <dd>
                <DetailValue value={value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {imageSources.length > 0 && (
        <section className="person-section record-gallery">
          <div className="person-section-heading">
            <p className="eyebrow">Original records</p>
            <h2>Images connected to this person</h2>
          </div>
          <div className="record-gallery-grid">
            {imageSources.map((source) => (
              <figure key={source.id}>
                <ArchiveImage
                  alt={source.title}
                  citation={source.citation ?? source.title}
                  id={`person-record-${profile.slug}-${source.id.replace(/[^a-z0-9]+/gi, "-")}`}
                  sourceHref={source.url ?? "/research"}
                  sourceLabel="Source record"
                  src={`/records/${source.public_image}`}
                  triggerClassName="person-record-image"
                  zoomLabel={`View ${source.title} at full size`}
                />
                <figcaption>
                  <strong>{source.title}</strong>
                  {source.citation && <span>{source.citation}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="person-section person-claims" id="evidence">
        <div className="person-section-heading">
          <p className="eyebrow">Connection by connection</p>
          <h2>Claims and how they are graded</h2>
        </div>
        <div className="claim-list">
          {profile.claims.map((claim) => (
            <article key={claim.id}>
              <header>
                <h3>{words(claim.predicate)}</h3>
                <Status value={claim.status} />
              </header>
              <DetailValue value={claim.object} />
              {claim.note && <p className="claim-note">{claim.note}</p>}
            </article>
          ))}
          {profile.claims.length === 0 && (
            <p className="empty-evidence">
              No separate evaluated claim has been written for this profile yet.
              The person record and cited sources below remain the current
              evidence.
            </p>
          )}
        </div>
      </section>

      <section className="person-section person-sources">
        <div className="person-section-heading">
          <p className="eyebrow">Source list</p>
          <h2>Records reviewed</h2>
        </div>
        <ol className="profile-source-list">
          {profile.sources.map((source) => (
            <li key={source.id}>
              <div>
                <strong>{source.title}</strong>
                <span>
                  {[source.repository, source.accessed && `accessed ${source.accessed}`]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
              {source.citation && <p>{source.citation}</p>}
              {source.note && <p>{source.note}</p>}
              <Status value={source.status ?? source.quality ?? source.type} />
              {source.url && (
                <a href={source.url} rel="noreferrer" target="_blank">
                  Open source ↗
                </a>
              )}
            </li>
          ))}
        </ol>
      </section>

      <footer className="person-footer">
        <Link href="/people">← All people</Link>
        <Link href="/research">See the research notebook →</Link>
      </footer>
    </main>
  );
}
