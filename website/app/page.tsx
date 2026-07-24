import { ResearchTools } from "./research-tools";

const sourceLinks = [
  {
    label: "1941 Manhattan marriage license",
    detail: "Certificate 18978 · Rafael Vazquez & Cruz Reyes",
    href: "https://www.ancestry.com/search/collections/61788/records/322345",
  },
  {
    label: "1910 Puerto Rico census",
    detail: "Anton Ruiz, Humacao · Rafael in his parents’ household",
    href: "https://www.ancestry.com/search/collections/7884/records/174417271",
  },
  {
    label: "1920 Puerto Rico census",
    detail: "Camino Anton Ruiz, Humacao",
    href: "https://www.ancestry.com/search/collections/6061/records/59358969",
  },
  {
    label: "1950 United States census",
    detail: "East 109th Street, Manhattan · Rafael & Cruz",
    href: "https://www.ancestry.com/search/collections/62308/records/294017627",
  },
  {
    label: "Official cemetery lookup",
    detail: "Rosedale & Rosehill Cemetery · Linden, New Jersey",
    href: "https://www.rosedale-rosehill.com/name-lookup",
  },
  {
    label: "Cruz Vasquez memorial",
    detail: "Find a Grave memorial 122157535",
    href: "https://www.findagrave.com/memorial/122157535/cruz-vasquez",
  },
];

const questions = [
  {
    title: "Cruz’s exact birth date",
    copy: "Records disagree: 4 May 1914, 3 May 1915, and May 1917. Her original Humacao civil registration should decide it.",
  },
  {
    title: "Rafael’s exact birth day",
    copy: "The civil index and childhood censuses support February 1906. The remembered 24 October date remains unexplained.",
  },
  {
    title: "The Martínez and Belén clues",
    copy: "These family memories may unlock Cruz’s grandparents, but neither has yet been placed safely in the tree.",
  },
  {
    title: "Their final days in New York",
    copy: "NYC death certificates and cemetery interment cards should confirm death places, informants, and funeral arrangements.",
  },
];

function Status({
  children,
  kind = "confirmed",
}: {
  children: React.ReactNode;
  kind?: "confirmed" | "probable" | "open";
}) {
  return <span className={`status status-${kind}`}>{children}</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Vazquez Reyes family history home">
          <span>V</span>
          <i />
          <span>R</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#reading">How to read</a>
          <a href="#family">Family</a>
          <a href="#journey">Journey</a>
          <a href="#stories">Stories</a>
          <a href="#questions">Docket</a>
          <a href="#evidence">Sources</a>
        </nav>
        <ResearchTools />
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">Working record · prepared July 2026</div>
        <h1>
          From <em>Humacao</em>
          <br />
          to Manhattan
        </h1>
        <p className="hero-deck">
          The documented story of Cruz Reyes and Rafael Vázquez—two Puerto
          Rican lives, a 1941 marriage, and a shared resting place in Linden,
          New Jersey.
        </p>
        <p className="hero-disclaimer">
          A sourced public-record draft, not a final proof tree. Living
          descendants are intentionally omitted.
        </p>
        <div className="hero-rule">
          <span>Puerto Rico</span>
          <b />
          <span>New York</span>
          <b />
          <span>New Jersey</span>
        </div>
        <a className="scroll-cue" href="#family">
          Read the record <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="section reading" id="reading">
        <div className="section-label">
          <span>00</span>
          <p>How to read this</p>
        </div>
        <div className="foreword">
          <p>
            This record exists because names, dates, and family memories drift
            unless somebody gathers the evidence while it can still be found.
            Every conclusion here carries a confidence stamp. Where records
            disagree, the disagreement stays visible and the next record that
            could settle it is named.
          </p>
          <p>
            Start with Cruz and Rafael below. Their cards are doors into the
            record—not endpoints. The page will grow backward through their
            parents only when evidence supports the next relationship.
          </p>
        </div>
        <div className="reading-key">
          <article>
            <Status>DOCUMENTED</Status>
            <h3>Record-backed</h3>
            <p>Supported by a named census, civil index, marriage record, or official cemetery entry.</p>
          </article>
          <article>
            <Status kind="probable">PROBABLE</Status>
            <h3>Strong fit</h3>
            <p>People, dates, and places align, but an original record is still needed.</p>
          </article>
          <article>
            <Status kind="open">OPEN</Status>
            <h3>Unresolved</h3>
            <p>A conflict or family clue remains a search target, never a silently filled blank.</p>
          </article>
        </div>
      </section>

      <section className="section family" id="family">
        <div className="section-label">
          <span>01</span>
          <p>The starting couple</p>
        </div>
        <div className="family-intro">
          <h2>Two lives, now firmly connected.</h2>
          <p>
            A Manhattan marriage license, census households, and a shared
            cemetery plot identify the grandparents with high confidence.
            Conflicts are preserved here instead of quietly edited away.
          </p>
        </div>

        <div className="couple">
          <article
            className="person-card cruz"
            data-person-id="person.cruz-reyes-vasquez"
          >
            <div className="person-number">I</div>
            <Status>IDENTIFIED</Status>
            <p className="given">Cruz Reyes</p>
            <h3>Vasquez</h3>
            <p className="lifespan">1914/15 — 1998</p>
            <dl>
              <div>
                <dt>Born</dt>
                <dd>Humacao, Puerto Rico</dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>
                  Mauricio Reyes
                  <br />
                  Carmen Díaz
                </dd>
              </div>
              <div>
                <dt>Died</dt>
                <dd>10 October 1998</dd>
              </div>
            </dl>
            <p className="card-note">
              <Status kind="open">DATE CONFLICT</Status>
              Best current record gives 4 May 1914; family memory gives 3 May
              1915.
            </p>
          </article>

          <div className="marriage-mark" aria-label="Married 25 October 1941">
            <span>married</span>
            <strong>25 · X · 1941</strong>
            <span>Manhattan</span>
          </div>

          <article
            className="person-card rafael"
            data-person-id="person.rafael-vazquez-perales"
          >
            <div className="person-number">II</div>
            <Status>IDENTIFIED</Status>
            <p className="given">Rafael Vázquez</p>
            <h3>y Perales</h3>
            <p className="lifespan">1906 — 1984</p>
            <dl>
              <div>
                <dt>Born</dt>
                <dd>Humacao, Puerto Rico</dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>
                  Juan Vázquez y Rodríguez
                  <br />
                  Carlina Perales y Pérez
                </dd>
              </div>
              <div>
                <dt>Died</dt>
                <dd>
                  30 December 1984 <sup>probable</sup>
                </dd>
              </div>
            </dl>
            <p className="card-note">
              <Status kind="open">DAY UNRESOLVED</Status>
              Civil registration supports February 1906, not the remembered
              October date.
            </p>
          </article>
        </div>

        <div className="parents-band">
          <div>
            <span>Cruz’s line</span>
            <strong data-person-id="person.mauricio-reyes">
              Mauricio Reyes
            </strong>
            <i>+</i>
            <strong data-person-id="person.carmen-diaz">Carmen Díaz</strong>
          </div>
          <div>
            <span>Rafael’s line</span>
            <strong data-person-id="person.juan-vazquez-rodriguez">
              Juan Vázquez y Rodríguez
            </strong>
            <i>+</i>
            <strong data-person-id="person.carlina-perales-perez">
              Carlina Perales y Pérez
            </strong>
          </div>
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="section-label light">
          <span>02</span>
          <p>Their journey</p>
        </div>
        <div className="journey-heading">
          <p className="eyebrow">Three places hold the story</p>
          <h2>Humacao → Manhattan → Linden</h2>
        </div>

        <div className="timeline">
          <article>
            <span className="year">1906</span>
            <div className="dot" />
            <div>
              <h3>Humacao, Puerto Rico</h3>
              <p>
                Rafael is born and later enumerated with his parents in Anton
                Ruiz. By 1930 he is a single adult in Mambiche.
              </p>
              <Status>DOCUMENTED</Status>
            </div>
          </article>
          <article>
            <span className="year">1941</span>
            <div className="dot" />
            <div>
              <h3>East Harlem, Manhattan</h3>
              <p>
                Rafael and Cruz marry on 25 October. Their license records 16
                East 105th Street; by 1950 they are on East 109th Street.
              </p>
              <Status>DOCUMENTED</Status>
            </div>
          </article>
          <article>
            <span className="year">1985–98</span>
            <div className="dot" />
            <div>
              <h3>Linden, New Jersey</h3>
              <p>
                They are buried in the same plot at the combined Rosedale &
                Rosehill Cemetery—Rafael first, then Cruz thirteen years later.
              </p>
              <Status>OFFICIAL CEMETERY RECORD</Status>
            </div>
          </article>
        </div>
      </section>

      <section className="section stories" id="stories">
        <div className="section-label">
          <span>03</span>
          <p>Stories the records tell</p>
        </div>
        <div className="stories-heading">
          <p className="eyebrow">Nothing beyond the evidence</p>
          <h2>Three small breakthroughs.</h2>
        </div>
        <div className="story-grid">
          <article>
            <span className="story-when">1941 → 1950</span>
            <h3>The license that joined both families</h3>
            <p>
              Rafael and Cruz’s Manhattan marriage license names all four
              parents. Nine years later, the census finds the couple together
              on East 109th Street. Two records turn a family memory into one
              continuous household.
            </p>
            <a href="#source-marriage">Read the evidence ↓</a>
            <Status>DOCUMENTED</Status>
          </article>
          <article>
            <span className="story-when">1910 → 1920</span>
            <h3>“Cathelina” comes back into focus</h3>
            <p>
              Rafael’s mother appears across the Humacao records as Carlina
              Perales, including the fuller Carlina Perales y Pérez. The family
              memory preserved Pérez and an approximate first name; no reviewed
              source supports López.
            </p>
            <a href="#source-1910">Read the evidence ↓</a>
            <Status>DOCUMENTED</Status>
          </article>
          <article>
            <span className="story-when">1985 → 1998</span>
            <h3>The cemetery plot that closed the loop</h3>
            <p>
              “Rosehill in Linden” led to the official combined Rosedale &
              Rosehill database. Rafael and Cruz occupy two positions in the
              same plot, thirteen years apart.
            </p>
            <a href="#source-cemetery">Read the evidence ↓</a>
            <Status>OFFICIAL RECORD</Status>
          </article>
        </div>
      </section>

      <section className="plot-feature">
        <div className="plot-stamp">
          <span>Rosedale division</span>
          <strong>WIN4T</strong>
          <b>22—11</b>
          <span>Linden, New Jersey</span>
        </div>
        <div className="plot-copy">
          <p className="eyebrow">The cemetery clue that joined the record</p>
          <h2>Together in one plot.</h2>
          <p>
            Family memory called the place “Rosehill.” The official combined
            property is Rosedale & Rosehill Cemetery, and its database assigns
            both burials to the Rosedale side of plot WIN4T-22-11.
          </p>
          <div className="interments">
            <p>
              <strong>Cruz Vasquez</strong>
              <span>/DD · buried 13 October 1998</span>
            </p>
            <p>
              <strong>Rafael Vasquez</strong>
              <span>/3D · buried 2 January 1985</span>
            </p>
          </div>
          <a
            className="text-link"
            href="https://www.rosedale-rosehill.com/name-lookup"
            target="_blank"
            rel="noreferrer"
          >
            Search the official cemetery record ↗
          </a>
        </div>
      </section>

      <section className="section questions" id="questions">
        <div className="section-label light">
          <span>04</span>
          <p>Research docket</p>
        </div>
        <div className="questions-grid">
          <div className="questions-title">
            <p className="eyebrow">The tree grows through questions</p>
            <h2>What we’re looking for next.</h2>
            <p className="docket-note">
              Each question names a record that can move the research.
              Rejected candidates and negative searches stay in the reasoning
              record so they are not proposed again.
            </p>
          </div>
          <div className="question-list">
            {questions.map((question, index) => (
              <article key={question.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{question.title}</h3>
                  <p>{question.copy}</p>
                  <Status kind="open">OPEN CASE</Status>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wanted" id="wanted">
        <div className="section-label">
          <span>05</span>
          <p>Wanted: family papers</p>
        </div>
        <div className="wanted-grid">
          <div>
            <p className="eyebrow">A phone photo is enough</p>
            <h2>What might be hiding in a drawer?</h2>
          </div>
          <ul>
            <li>Birth certificates, baptism cards, or old passports for Cruz or Rafael.</li>
            <li>The October 1941 marriage certificate, wedding photographs, or a church announcement.</li>
            <li>Obituary clippings or funeral cards from December 1984 and October 1998.</li>
            <li>Photographs of Mauricio Reyes, Carmen Díaz, Juan Vázquez, or Carlina Perales.</li>
            <li>Anything explaining the Martínez, Belén, Juan Ramón, or 24 October clues.</li>
          </ul>
        </div>
        <p className="privacy-promise">
          This page names no living descendants, and that is a rule rather than
          an oversight. Material concerning living relatives remains private
          unless there is explicit permission and a clear reason to publish it.
        </p>
      </section>

      <section className="section names" id="names">
        <div className="section-label">
          <span>06</span>
          <p>Index of names</p>
        </div>
        <div className="name-index">
          <a href="#family"><span>C</span>Díaz, Carmen</a>
          <a href="#family"><span>C</span>Perales y Pérez, Carlina</a>
          <a href="#family"><span>C</span>Reyes, Cruz</a>
          <a href="#family"><span>M</span>Reyes, Mauricio</a>
          <a href="#family"><span>R</span>Vázquez y Perales, Rafael</a>
          <a href="#family"><span>J</span>Vázquez y Rodríguez, Juan</a>
        </div>
      </section>

      <section className="section evidence" id="evidence">
        <div className="section-label">
          <span>07</span>
          <p>Source ledger</p>
        </div>
        <div className="evidence-heading">
          <h2>Every conclusion keeps its paper trail.</h2>
          <p>
            This is a working history, not a finished tree. Original records
            outrank indexes; indexes outrank member trees; family memory remains
            visible as a clue.
          </p>
        </div>
        <div className="source-list">
          {sourceLinks.map((source, index) => (
            <a
              href={source.href}
              id={
                index === 0
                  ? "source-marriage"
                  : index === 1
                    ? "source-1910"
                    : index === 4
                      ? "source-cemetery"
                      : undefined
              }
              target="_blank"
              rel="noreferrer"
              key={source.label}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{source.label}</strong>
                <small>{source.detail}</small>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <div className="legend">
          <p><Status>CONFIRMED</Status> Supported by independent records</p>
          <p><Status kind="probable">PROBABLE</Status> Strong fit; original record still sought</p>
          <p><Status kind="open">OPEN</Status> Conflicting or unresolved</p>
        </div>
      </section>

      <footer>
        <div className="wordmark inverse" aria-hidden="true">
          <span>V</span>
          <i />
          <span>R</span>
        </div>
        <p>
          Vazquez–Reyes family history
          <br />
          Research begun July 2026
        </p>
        <p className="footer-note">
          A private-first research project. Living-person details and sensitive
          identifiers are intentionally excluded.
        </p>
      </footer>
    </main>
  );
}
