import { ResearchTools } from "../research-tools";
import {
  familyCouples,
  nameVariants,
  negativeSearches,
  openCases,
  sources,
  updates,
} from "../research-data";

function Grade({
  kind,
  children,
}: {
  kind: "documented" | "probable" | "open";
  children: React.ReactNode;
}) {
  return <span className={`status status-${kind}`}>{children}</span>;
}

export const metadata = {
  title: "Research Notes · Vazquez–Reyes Family History",
  description:
    "Sources, conflicting dates, open questions, and search notes for the Vazquez-Reyes family history.",
};

export default function ResearchPage() {
  return (
    <main className="research-page">
      <header className="site-header research-header">
        <a className="wordmark" href="/" aria-label="Return to the family summary">
          <span>V</span>
          <i />
          <span>R</span>
        </a>
        <nav aria-label="Research navigation">
          <a href="/">Public summary</a>
          <a href="#families">Family groups</a>
          <a href="#conflicts">Conflicts</a>
          <a href="#docket">Open questions</a>
          <a href="#negative">Search log</a>
          <a href="#sources">Sources</a>
        </nav>
        <ResearchTools />
      </header>

      <section className="research-hero">
        <p className="hero-kicker">Updated July 2026</p>
        <h1>Research notes</h1>
        <p>
          This page lists the sources reviewed, conflicts between them, searches
          already tried, and the records we are looking for next. Details about
          living relatives and sensitive identifiers are not published.
        </p>
        <a href="/">← Return to the family summary</a>
      </section>

      <section className="research-section" id="method">
        <div className="research-section-title">
          <span>00</span>
          <div>
            <p>Labels</p>
            <h2>How claims are marked</h2>
          </div>
        </div>
        <div className="method-grid">
          <article>
            <Grade kind="documented">DOCUMENTED</Grade>
            <h3>Record-backed</h3>
            <p>
              An identified census, civil registration, marriage record, or
              official cemetery entry supports the statement.
            </p>
          </article>
          <article>
            <Grade kind="probable">PROBABLE</Grade>
            <h3>Supported, not settled</h3>
            <p>
              Several details agree, but a more direct record is still needed.
            </p>
          </article>
          <article>
            <Grade kind="open">OPEN</Grade>
            <h3>Unresolved</h3>
            <p>
              The available records conflict, or a remembered name has not yet
              been matched to a record.
            </p>
          </article>
        </div>
        <p className="method-note">
          The underlying notes are stored as JSONL files in the public
          repository. Social Security numbers, account details, and information
          about living people are excluded. Selected historical record images
          are reproduced on the public summary.
        </p>
      </section>

      <section className="research-section family-groups" id="families">
        <div className="research-section-title">
          <span>01</span>
          <div>
            <p>Direct lines</p>
            <h2>One family at a time</h2>
          </div>
        </div>
        <p className="section-deck">
          Each couple is kept separate. Birth and death fields stay visible even
          when no reliable date has been found; known children are included as
          sibling leads, not as a claim that every child has been identified.
        </p>
        <div className="family-couple-list">
          {familyCouples.map((family) => (
            <article className="family-couple" id={family.id} key={family.id}>
              <header>
                <div>
                  <p>{family.branch}</p>
                  <h3>{family.couple}</h3>
                  <span>{family.connection}</span>
                </div>
                <Grade kind={family.status}>
                  {family.status === "documented" ? "DOCUMENTED" : "UNRESOLVED"}
                </Grade>
              </header>
              <div className="couple-people">
                {family.people.map((person) => (
                  <section key={person.name}>
                    <h4>{person.name}</h4>
                    <dl>
                      <div>
                        <dt>Birth</dt>
                        <dd>{person.birth}</dd>
                      </div>
                      <div>
                        <dt>Death</dt>
                        <dd>{person.death}</dd>
                      </div>
                    </dl>
                  </section>
                ))}
              </div>
              <div className="known-children">
                <strong>Known or reported children</strong>
                <ul>
                  {family.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
                <p>{family.childNote}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section research-dark" id="conflicts">
        <div className="research-section-title">
          <span>02</span>
          <div>
            <p>Conflicts</p>
            <h2>Where the records and memory differ</h2>
          </div>
        </div>
        <div className="conflict-table" role="table" aria-label="Research conflicts">
          <article role="row">
            <div role="cell">
              <strong>Pastora or Cruz?</strong>
              <Grade kind="open">NAME UNRESOLVED</Grade>
            </div>
            <p role="cell">
              <b>Pastora</b> — the name remembered by the family, possibly a
              personal or baptismal name.
            </p>
            <p role="cell">
              <b>Cruz Reyes Díaz</b> — the civilly registered name. Her
              grandfather Lope Díaz made the declaration on 17 June 1915, six
              weeks after the birth; later records also use Cruz.
            </p>
            <p role="cell">
              <b>Next:</b> locate the Gurabo parish baptism and check whether it
              says Pastora, Cruz Pastora, Pastora Cruz, or Cruz.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Her birth date and place</strong>
              <Grade kind="documented">RESOLVED</Grade>
            </div>
            <p role="cell">
              <b>3 May 1915, Gurabo</b> — the original civil registration gives
              the date, place, both parents, and both sets of grandparents.
            </p>
            <p role="cell">
              <b>4 May 1914, Humacao</b> — the later Social Security index is
              superseded for birthplace and date by the contemporary record.
            </p>
            <p role="cell">
              <b>May 1917</b> — the 1941 marriage index understates her age.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Rafael’s birth</strong>
              <Grade kind="open">DAY UNRESOLVED</Grade>
            </div>
            <p role="cell">
              <b>February 1906</b> — Puerto Rico civil index; supported by the
              1910 and 1920 census ages.
            </p>
            <p role="cell">
              <b>24 October 1906</b> — family account.
            </p>
            <p role="cell">
              <b>24 October 1909</b> — 1941 marriage license; inconsistent with
              the childhood records.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Rafael’s death</strong>
              <Grade kind="probable">PROBABLE</Grade>
            </div>
            <p role="cell">
              <b>30 December 1984</b> — family account and a matching tree; fits
              the official 2 January burial.
            </p>
            <p role="cell">
              <b>1 December 1984</b> — weak public SSDI derivative.
            </p>
            <p role="cell">
              <b>Next:</b> obtain the NYC death certificate.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Juan’s mother</strong>
              <Grade kind="open">UNRESOLVED</Grade>
            </div>
            <p role="cell">
              <b>Carmen Rodríguez</b> — named in Juan’s 1902 marriage record.
            </p>
            <p role="cell">
              <b>María Eugenia Rodríguez</b> — named by the informant on Juan’s
              1951 death record.
            </p>
            <p role="cell">
              <b>Next:</b> locate Juan’s Yabucoa baptism or birth registration.
            </p>
          </article>
        </div>
      </section>

      <section className="research-section" id="names">
        <div className="research-section-title">
          <span>03</span>
          <div>
            <p>Name variants</p>
            <h2>Names found in the records</h2>
          </div>
        </div>
        <div className="variant-list">
          {nameVariants.map((entry) => (
            <article key={entry.person}>
              <h3>{entry.person}</h3>
              <p className="variant-forms">{entry.forms}</p>
              <p>{entry.conclusion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section research-dark" id="docket">
        <div className="research-section-title">
          <span>04</span>
          <div>
            <p>Open questions</p>
            <h2>Records to look for next</h2>
          </div>
        </div>
        <div className="docket-list">
          {openCases.map((item) => (
            <article key={item.id}>
              <span>{item.id}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.conflict}</p>
                <strong>Next record</strong>
                <p>{item.next}</p>
              </div>
              <Grade kind="open">OPEN</Grade>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section" id="negative">
        <div className="research-section-title">
          <span>05</span>
          <div>
            <p>Search log</p>
            <h2>Searches without a match</h2>
          </div>
        </div>
        <p className="section-deck">
          These results do not prove that a record does not exist. They are
          listed so the same searches are not repeated.
        </p>
        <ol className="negative-list">
          {negativeSearches.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ol>
      </section>

      <section className="research-section wanted-records">
        <div className="research-section-title">
          <span>06</span>
          <div>
            <p>Family papers</p>
            <h2>Documents we are looking for</h2>
          </div>
        </div>
        <div className="wanted-research-grid">
          <ul>
            <li>
              The Gurabo baptism after 3 May 1915, checked under both Pastora
              and Cruz.
            </li>
            <li>Rafael’s baptism card, passport, or a clearer birth certificate.</li>
            <li>The 1941 marriage certificate or church announcement.</li>
            <li>Obituary clippings and funeral cards from 1984 and 1998.</li>
          </ul>
          <ul>
            <li>Photographs of either couple’s parents.</li>
            <li>Anything labeled Martínez, Juan Ramón, Sotero, or Carlina.</li>
            <li>Anything that explains why 24 October was remembered.</li>
          </ul>
        </div>
        <p className="method-note">
          Photograph the front and back. Record whose box or album it came from.
          Anything concerning living relatives remains private unless there is
          explicit permission to publish it.
        </p>
      </section>

      <section className="research-section research-sources" id="sources">
        <div className="research-section-title">
          <span>07</span>
          <div>
            <p>Sources</p>
            <h2>Records reviewed</h2>
          </div>
        </div>
        <div className="source-list">
          {sources.map((source, index) => (
            <a
              href={source.href}
              id={`source-${source.id}`}
              target="_blank"
              rel="noreferrer"
              key={source.id}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{source.label}</strong>
                <small>{source.detail}</small>
                <em>{source.grade}</em>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <p className="method-note">
          Some Ancestry links require a subscription and signed-in session.
          Original downloads and interface captures are archived privately. A
          readable derivative of the 1915 civil act and two National Archives
          census sheets are reproduced on the public summary.
        </p>
      </section>

      <section className="research-section change-log">
        <div className="research-section-title">
          <span>08</span>
          <div>
            <p>Research log</p>
            <h2>Work completed</h2>
          </div>
        </div>
        <div className="update-list">
          {updates.map((update) => (
            <article key={update.text}>
              <time>{update.date}</time>
              <p>{update.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="wordmark inverse" aria-hidden="true">
          <span>V</span>
          <i />
          <span>R</span>
        </div>
        <p>
          Vazquez–Reyes research notes
          <br />
          <a href="/">Return to the public summary</a>
        </p>
        <p className="footer-note">
          Canonical files remain in the public repository.
          <br />
          Living-person details and sensitive identifiers are excluded.
        </p>
      </footer>
    </main>
  );
}
