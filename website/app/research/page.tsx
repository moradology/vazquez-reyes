import { ResearchTools } from "../research-tools";
import {
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
          repository. Subscription-only images, Social Security numbers, and
          details about living people are excluded.
        </p>
      </section>

      <section className="research-section research-dark" id="conflicts">
        <div className="research-section-title">
          <span>01</span>
          <div>
            <p>Date conflicts</p>
            <h2>Where the records disagree</h2>
          </div>
        </div>
        <div className="conflict-table" role="table" aria-label="Date conflicts">
          <article role="row">
            <div role="cell">
              <strong>Cruz’s birth</strong>
              <Grade kind="open">UNRESOLVED</Grade>
            </div>
            <p role="cell">
              <b>4 May 1914</b> — Social Security claim; provisionally preferred
              because it also names both parents and Humacao.
            </p>
            <p role="cell">
              <b>3 May 1915</b> — family account and public SSDI derivative.
            </p>
            <p role="cell">
              <b>May 1917</b> — 1941 marriage license.
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
        </div>
      </section>

      <section className="research-section" id="names">
        <div className="research-section-title">
          <span>02</span>
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
          <span>03</span>
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
          <span>04</span>
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
          <span>05</span>
          <div>
            <p>Family papers</p>
            <h2>Documents we are looking for</h2>
          </div>
        </div>
        <div className="wanted-research-grid">
          <ul>
            <li>Birth certificates, baptism cards, or passports for Cruz and Rafael.</li>
            <li>The 1941 marriage certificate or church announcement.</li>
            <li>Obituary clippings and funeral cards from 1984 and 1998.</li>
          </ul>
          <ul>
            <li>Photographs of either couple’s parents.</li>
            <li>Anything labeled Martínez, Belén, or Juan Ramón.</li>
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
          <span>06</span>
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
          Some Ancestry links require a subscription and signed-in session. The
          public page summarizes metadata rather than republishing protected
          record images.
        </p>
      </section>

      <section className="research-section change-log">
        <div className="research-section-title">
          <span>07</span>
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
