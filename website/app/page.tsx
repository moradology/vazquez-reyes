import { ResearchTools } from "./research-tools";
import { sources } from "./research-data";

function PersonStatus({ children }: { children: React.ReactNode }) {
  return <span className="status">{children}</span>;
}

const principalSources = sources.filter((source) =>
  ["marriage", "census-1910", "census-1950", "cemetery"].includes(source.id),
);

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
          <a href="#family">Family</a>
          <a href="#resting-place">Resting place</a>
          <a href="#journey">Journey</a>
          <a href="#stories">Stories</a>
          <a href="/research">Research notebook</a>
        </nav>
        <ResearchTools />
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">A family history in progress</div>
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
        <div className="hero-rule">
          <span>Puerto Rico</span>
          <b />
          <span>New York</span>
          <b />
          <span>New Jersey</span>
        </div>
        <a className="scroll-cue" href="#family">
          Meet Cruz and Rafael <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="public-foreword">
        <p>
          Family memory gave us two names, a handful of dates, and “Rosehill
          Cemetery in Linden.” Records now connect those fragments into one
          continuous story from Humacao to East Harlem and a shared grave in
          New Jersey.
        </p>
        <p>
          This page tells the family-facing story. Date disputes, unsuccessful
          searches, and the records still being sought live in the{" "}
          <a href="/research">ongoing research notebook</a>.
        </p>
      </section>

      <section className="section family" id="family">
        <div className="section-label">
          <span>01</span>
          <p>The starting couple</p>
        </div>
        <div className="family-intro public-family-intro">
          <h2>Two lives, firmly connected.</h2>
          <p>
            Their marriage record names both sets of parents. Later census and
            cemetery records follow them together across the decades.
          </p>
        </div>

        <div className="couple">
          <article
            className="person-card cruz"
            data-person-id="person.cruz-reyes-vasquez"
          >
            <div className="person-number">I</div>
            <PersonStatus>IDENTIFIED</PersonStatus>
            <p className="given">Cruz Reyes</p>
            <h3>Vasquez</h3>
            <p className="lifespan">died 1998</p>
            <dl>
              <div>
                <dt>Born</dt>
                <dd>
                  Humacao, Puerto Rico
                  <small>Exact date still being resolved</small>
                </dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>
                  <span data-person-id="person.mauricio-reyes">Mauricio Reyes</span>
                  <br />
                  <span data-person-id="person.carmen-diaz">Carmen Díaz</span>
                </dd>
              </div>
              <div>
                <dt>Died</dt>
                <dd>10 October 1998</dd>
              </div>
            </dl>
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
            <PersonStatus>IDENTIFIED</PersonStatus>
            <p className="given">Rafael Vázquez</p>
            <h3>y Perales</h3>
            <p className="lifespan">1906 — 1984</p>
            <dl>
              <div>
                <dt>Born</dt>
                <dd>
                  February 1906
                  <small>Humacao, Puerto Rico</small>
                </dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>
                  <span data-person-id="person.juan-vazquez-rodriguez">
                    Juan Vázquez y Rodríguez
                  </span>
                  <br />
                  <span data-person-id="person.carlina-perales-perez">
                    Carlina Perales y Pérez
                  </span>
                </dd>
              </div>
              <div>
                <dt>Died</dt>
                <dd>December 1984</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className="plot-feature public-plot" id="resting-place">
        <div className="plot-stamp">
          <span>Rosedale division</span>
          <strong>WIN4T</strong>
          <b>22—11</b>
          <span>Linden, New Jersey</span>
        </div>
        <div className="plot-copy">
          <p className="eyebrow">The clue that closed the loop</p>
          <h2>Together in one plot.</h2>
          <p>
            “Rosehill Cemetery in Linden” was almost exactly right. The official
            combined property is Rosedale & Rosehill Cemetery. Its database
            places Cruz and Rafael in two positions within the same Rosedale
            plot.
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
                Rafael is born and raised in Anton Ruiz. By 1930 he is a single
                adult in Mambiche, still in his father’s household.
              </p>
            </div>
          </article>
          <article>
            <span className="year">1941</span>
            <div className="dot" />
            <div>
              <h3>East Harlem, Manhattan</h3>
              <p>
                Rafael and Cruz marry on 25 October at an address on East 105th
                Street. By 1950 they are living on East 109th Street.
              </p>
            </div>
          </article>
          <article>
            <span className="year">1985–98</span>
            <div className="dot" />
            <div>
              <h3>Linden, New Jersey</h3>
              <p>
                Rafael is buried first. Thirteen years later, Cruz joins him in
                the same Rosedale plot.
              </p>
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
          <h2>Three breakthroughs.</h2>
        </div>
        <div className="story-grid">
          <article>
            <span className="story-when">1941 → 1950</span>
            <h3>The license that joined both families</h3>
            <p>
              The Manhattan license names Rafael, Cruz, and all four parents.
              The 1950 census then finds the couple together on East 109th
              Street.
            </p>
            <a href="/research#source-marriage">See the record trail →</a>
          </article>
          <article>
            <span className="story-when">1910 → 1920</span>
            <h3>“Cathelina” comes back into focus</h3>
            <p>
              Rafael’s mother appears across the Humacao records as Carlina
              Perales y Pérez. The family memory preserved Pérez and an
              approximate first name.
            </p>
            <a href="/research#source-census-1910">See the record trail →</a>
          </article>
          <article>
            <span className="story-when">1985 → 1998</span>
            <h3>The cemetery plot that closed the loop</h3>
            <p>
              A remembered cemetery name led to two official entries in one
              plot, thirteen years apart.
            </p>
            <a href="/research#source-cemetery">See the record trail →</a>
          </article>
        </div>
      </section>

      <section className="section public-sources">
        <div className="section-label">
          <span>04</span>
          <p>Principal records</p>
        </div>
        <div className="principal-source-grid">
          {principalSources.map((source) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.id}>
              <span>{source.grade}</span>
              <strong>{source.label}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <a className="research-cta" href="/research">
          Read the full research notebook
          <span>Conflicts, open cases, negative searches, and complete sources →</span>
        </a>
      </section>

      <section className="public-contribute">
        <p className="eyebrow">Help finish the record</p>
        <h2>Family papers can answer what archives cannot.</h2>
        <p>
          Wedding photographs, baptism cards, passports, funeral cards,
          obituary clippings, and notes on the backs of photographs may explain
          the Martínez, Belén, Juan Ramón, and 24 October clues. A clear phone
          photograph of the front and back is enough to begin.
        </p>
        <p className="privacy-promise">
          Living relatives remain private unless there is explicit permission
          and a clear reason to publish their information.
        </p>
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
          Public story · <a href="/research">Research notebook</a>
          <br />
          Living-person details and sensitive identifiers are excluded.
        </p>
      </footer>
    </main>
  );
}
