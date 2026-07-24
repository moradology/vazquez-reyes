import { ResearchTools } from "./research-tools";
import { sources } from "./research-data";

const principalSources = sources.filter((source) =>
  ["rafael-birth", "census-1910", "marriage", "census-1950"].includes(source.id),
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
          <a href="#puerto-rico">Puerto Rico</a>
          <a href="#journey">New York</a>
          <a href="#stories">Their parents</a>
          <a href="/research">Research notes</a>
        </nav>
        <ResearchTools />
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">The Vazquez–Reyes family</div>
        <h1>
          From <em>Humacao</em>
          <br />
          to New York
        </h1>
        <p className="hero-deck">
          Born in Humacao, Puerto Rico, Cruz Reyes and Rafael Vázquez married
          in Manhattan in 1941 and made their home in East Harlem.
        </p>
        <div className="hero-rule">
          <span>Humacao</span>
          <b />
          <span>Puerto Rico</span>
          <b />
          <span>New York City</span>
        </div>
        <a className="scroll-cue" href="#family">
          Cruz and Rafael <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="public-foreword">
        <p>
          Rafael Vázquez grew up in Humacao, in the barrios of Anton Ruiz and
          Mambiche. Cruz Reyes was also born in Humacao. By 1941 they were both
          in New York, where they married on East 105th Street.
        </p>
        <p>
          The 1950 census records them on East 109th Street in East Harlem.
          Their 1941 marriage license also records the names of their four
          parents in Puerto Rico.
        </p>
      </section>

      <section className="section family" id="family">
        <div className="section-label">
          <span>01</span>
          <p>Cruz and Rafael</p>
        </div>
        <div className="family-intro public-family-intro">
          <h2>Cruz Reyes and Rafael Vázquez</h2>
          <p>
            They married on East 105th Street in 1941. Nine years later, the
            census recorded them a few blocks north on East 109th Street.
          </p>
        </div>

        <div className="couple">
          <article
            className="person-card cruz"
            data-person-id="person.cruz-reyes-vasquez"
          >
            <div className="person-number">I</div>
            <p className="given">Cruz Reyes</p>
            <h3>Vasquez</h3>
            <p className="lifespan">died 1998</p>
            <dl>
              <div>
                <dt>Born</dt>
                <dd>
                  Humacao, Puerto Rico
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

      <section className="plot-feature public-plot" id="puerto-rico">
        <div className="plot-stamp">
          <span>Puerto Rico</span>
          <strong>HUMACAO</strong>
          <b>1906—30</b>
          <span>Anton Ruiz · Mambiche</span>
        </div>
        <div className="plot-copy">
          <p className="eyebrow">Humacao, Puerto Rico</p>
          <h2>Cruz and Rafael in Humacao</h2>
          <p>
            Cruz’s records name Humacao as her birthplace. Rafael’s birth
            registration and three censuses place him in Humacao from childhood
            through 1930.
          </p>
          <div className="interments">
            <p>
              <strong>Anton Ruiz</strong>
              <span>Rafael’s family in the 1910 and 1920 censuses</span>
            </p>
            <p>
              <strong>Mambiche</strong>
              <span>Rafael and his father in the 1930 census</span>
            </p>
          </div>
          <a
            className="text-link"
            href="/research#source-census-1910"
          >
            View the Puerto Rico sources →
          </a>
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="section-label light">
          <span>02</span>
          <p>Puerto Rico to New York</p>
        </div>
        <div className="journey-heading">
          <p className="eyebrow">1906–1950</p>
          <h2>Humacao → East Harlem</h2>
        </div>
        <div className="timeline">
          <article>
            <span className="year">1906–30</span>
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
                Street.
              </p>
            </div>
          </article>
          <article>
            <span className="year">1950</span>
            <div className="dot" />
            <div>
              <h3>East Harlem, Manhattan</h3>
              <p>
                The census records Cruz and Rafael living together on East
                109th Street.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section stories" id="stories">
        <div className="section-label">
          <span>03</span>
          <p>Their parents</p>
        </div>
        <div className="stories-heading">
          <p className="eyebrow">One generation earlier</p>
          <h2>The families in Humacao</h2>
        </div>
        <div className="story-grid">
          <article>
            <span className="story-when">Cruz’s parents</span>
            <h3>Mauricio Reyes and Carmen Díaz</h3>
            <p>
              Cruz’s marriage license and Social Security record name Mauricio
              Reyes and Carmen Díaz as her parents.
            </p>
            <a href="/research#source-ssa-cruz">View the sources →</a>
          </article>
          <article>
            <span className="story-when">Rafael’s parents</span>
            <h3>Juan Vázquez and Carlina Perales</h3>
            <p>
              Rafael’s birth and census records name Juan Vázquez y Rodríguez
              and Carlina Perales y Pérez as his parents.
            </p>
            <a href="/research#source-census-1910">View the sources →</a>
          </article>
          <article>
            <span className="story-when">25 October 1941</span>
            <h3>Both families on the marriage record</h3>
            <p>
              The Manhattan marriage license records Cruz, Rafael, and all four
              parents together.
            </p>
            <a href="/research#source-marriage">View the source →</a>
          </article>
        </div>
      </section>

      <section className="section public-sources">
        <div className="section-label">
          <span>04</span>
          <p>Sources for this page</p>
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
          Open the research notes
          <span>Conflicting dates, open questions, searches, and sources →</span>
        </a>
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
          Humacao, Puerto Rico · New York City
        </p>
        <p className="footer-note">
          Public summary · <a href="/research">Research notes</a>
          <br />
          Living-person details and sensitive identifiers are excluded.
        </p>
      </footer>
    </main>
  );
}
