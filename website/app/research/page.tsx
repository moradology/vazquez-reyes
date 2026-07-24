import Link from "next/link";
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
        <Link className="wordmark" href="/" aria-label="Return to the family summary">
          <span>V</span>
          <i />
          <span>R</span>
        </Link>
        <nav aria-label="Research navigation">
          <Link href="/">Public summary</Link>
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
        <Link href="/">← Return to the family summary</Link>
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
        <p className="method-note geography-note">
          The maps use a separate{" "}
          <a href="https://github.com/moradology/vazquez-reyes/tree/main/research/geography">
            geography ledger
          </a>
          . Each mapped event names its people, date, place, and supporting
          record. Coordinates are labeled by their real precision: a barrio
          point locates the named barrio, never an invented house.
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
              {family.id === "pedro-ana" && (
                <>
                  <figure className="family-record">
                    <a
                      href="/records/1882-mauricio-reyes-baptism.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1882-mauricio-reyes-baptism.jpg"
                        alt="1882 Humacao baptismal entry for Mauricio Reyes Martínez"
                      />
                    </a>
                    <figcaption>
                      <strong>1882 · Humacao baptism</strong>
                      <span>
                        Mauricio’s baptism names Pedro Reyes and Ana Martínez,
                        then carries both lines back to Ramón Reyes and Inés
                        Castro, and Dámaso Martínez and María Rivera.
                      </span>
                      <small>
                        Parish register · page 236 · baptized 23 February 1882
                      </small>
                    </figcaption>
                  </figure>
                  <figure className="family-record">
                    <a
                      href="/records/1910-pedro-ana-julian-household.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1910-pedro-ana-julian-household.jpg"
                        alt="1910 Puerto Rico census lines for Pedro Reyes, Ana Martínez, and Julián Reyes across two adjacent pages"
                      />
                    </a>
                    <figcaption>
                      <strong>1910 · Anton Ruiz, Humacao</strong>
                      <span>
                        Pedro closes sheet 5B; Ana and Julián continue on sheet
                        6A. The columns identify Pedro’s second marriage and
                        report that Ana had seven children, four living.
                      </span>
                      <small>
                        U.S. census · ED 822 · sheets 5B–6A · lines 50 and 1–2
                      </small>
                    </figcaption>
                  </figure>
                </>
              )}
              {family.id === "sotero-rodriguez" && (
                <figure className="family-record">
                  <a
                    href="/records/1910-sotero-maria-household.jpg"
                    target="_blank"
                  >
                    <img
                      src="/records/1910-sotero-maria-household.jpg"
                      alt="1910 Puerto Rico census lines for Sotero Vázquez, María Rodríguez, Braulio, and Francisco in Anton Ruiz, Humacao"
                    />
                  </a>
                  <figcaption>
                    <strong>1910 · Anton Ruiz, Humacao</strong>
                    <span>
                      Sotero and María with sons Braulio and Francisco. The
                      sheet reports a 34-year marriage and seven children born,
                      seven living—details that confirm the household even
                      though Sotero’s reported age conflicts with his death act.
                    </span>
                    <small>U.S. census · ED 822 · sheet 8A · lines 6–9</small>
                  </figcaption>
                </figure>
              )}
              {family.id === "maximo-josefa" && (
                <figure className="family-record">
                  <a
                    href="/records/1805-maximo-josefa-marriage.jpg"
                    target="_blank"
                  >
                    <img
                      src="/records/1805-maximo-josefa-marriage.jpg"
                      alt="1805 Humacao parish marriage entry for Máximo Basquez and Josefa Ribera, continued across two pages"
                    />
                  </a>
                  <figcaption>
                    <strong>1805 · Humacao marriage</strong>
                    <span>
                      On 31 December, Máximo Basquez, son of Francisco and
                      María Cortez, married Josefa Ribera, daughter of Luís and
                      Isidora Rodríguez. The register gives no surname for
                      either father.
                    </span>
                    <small>
                      Dulce Nombre de Jesús · DGS 008038536 · item 4 · image
                      105
                    </small>
                  </figcaption>
                </figure>
              )}
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
              <strong>The secondhand Pastora story</strong>
              <Grade kind="open">UNVERIFIED ORAL HISTORY</Grade>
            </div>
            <p role="cell">
              <b>Pastora</b> — Cruz’s daughter remembers being told that this
              may have been her mother’s name. She does not remember Cruz using
              it, and no reviewed record supports it.
            </p>
            <p role="cell">
              <b>Cruz Reyes Díaz</b> — the civilly registered name. Her
              grandfather Lope Díaz made the declaration on 17 June 1915, 45
              days after the birth; every identified later record also uses
              Cruz.
            </p>
            <p role="cell">
              <b>Next:</b> seek a duplicate or clearer copy of the damaged
              Gurabo folio and identify the child and parents without assuming
              what name the entry will contain.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Mauricio’s birth year</strong>
              <Grade kind="open">WORDING CONFLICT</Grade>
            </div>
            <p role="cell">
              <b>22 September</b> — the birth day and month written in his
              original baptismal entry.
            </p>
            <p role="cell">
              <b>“This year”</b> — impossible wording in a baptism dated 23
              February 1882. The likely year is 1881, but that remains an
              inference.
            </p>
            <p role="cell">
              <b>Next:</b> find his civil birth or a duplicate church record
              before assigning an exact year.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Ana Martínez’s baptism</strong>
              <Grade kind="open">CANDIDATE REJECTED</Grade>
            </div>
            <p role="cell">
              <b>1844</b> — an Ana baptized in Humacao with parents Dámaso
              Martínez and María Rivera.
            </p>
            <p role="cell">
              <b>About 1854–1858</b> — the range implied by Ana’s ages in the
              1910 census and 1918 death act.
            </p>
            <p role="cell">
              <b>Conclusion:</b> the 1844 child may belong to the same parent
              pair, but she is not merged as the direct Ana.
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
              <Grade kind="probable">STRONG WORKING CONCLUSION</Grade>
            </div>
            <p role="cell">
              <b>Carmen Rodríguez</b> — named in Juan’s 1878 baptism and 1902
              marriage, and as Sotero’s wife on his 1916 death act.
            </p>
            <p role="cell">
              <b>María Eugenia or Eugenia Rodríguez</b> — named in Sotero’s
              1875 marriage, Juan’s 1951 death, and the records of Victorio,
              Juan del Carmen, Braulio, and Francisco.
            </p>
            <p role="cell">
              <b>Conclusion:</b> one woman using Carmen, Eugenia, and María
              Eugenia best explains the matching husband, children, and
              grandparents. Her 1933 death confirms María Eugenia Rodríguez
              Pacheco as Sotero’s widow and names their son Francisco as
              informant, but it still does not explicitly combine Carmen with
              Eugenia. The profiles remain separate.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Heriberta’s birth date</strong>
              <Grade kind="open">UNRESOLVED</Grade>
            </div>
            <p role="cell">
              <b>25 July 1913</b> — the Naguabo civil birth act, declared by
              her father Mauricio Reyes.
            </p>
            <p role="cell">
              <b>16 March 1913</b> — the Naguabo baptismal register. The same
              parents and all four grandparents establish that both records
              concern Heriberta.
            </p>
            <p role="cell">
              <b>Next:</b> seek another early record without treating either
              date as silently corrected.
            </p>
          </article>
          <article role="row">
            <div role="cell">
              <strong>Reyes García’s mother</strong>
              <Grade kind="open">GIVEN NAME UNRESOLVED</Grade>
            </div>
            <p role="cell">
              <b>Carmen Olivero</b> — named on Reyes García’s 1933 death act.
            </p>
            <p role="cell">
              <b>Dolores Olivero</b> — named on her son Secundino’s 1903
              baptism.
            </p>
            <p role="cell">
              <b>Next:</b> find Reyes García’s own baptism or marriage before
              merging the two given names.
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
              A duplicate or clearer copy of Gurabo baptism book 15, folio 18
              verso, naming the indexed Cruz Reyes and her parents.
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
          small set of readable record crops is reproduced here and on the
          public summary. The 1940 image stops before younger household members
          whose deaths have not been documented.
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
          <Link href="/">Return to the public summary</Link>
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
