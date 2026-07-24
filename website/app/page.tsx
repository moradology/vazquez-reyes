import { ResearchTools } from "./research-tools";
import { sources } from "./research-data";

const principalSources = sources.filter((source) =>
  ["cruz-birth", "rafael-birth", "marriage", "census-1950"].includes(source.id),
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
          <a href="#records">Records</a>
          <a href="#journey">New York</a>
          <a href="#stories">Their parents</a>
          <a href="/research">Research notes</a>
        </nav>
        <ResearchTools />
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">The Vazquez–Reyes family</div>
        <h1>
          From <em>Puerto Rico</em>
          <br />
          to New York
        </h1>
        <p className="hero-deck">
          Cruz Reyes was born in Gurabo. Rafael Vázquez grew up in Humacao.
          They married in Manhattan in 1941 and made their home in East Harlem.
        </p>
        <div className="hero-rule">
          <span>Naguabo</span>
          <b />
          <span>Gurabo &amp; Humacao</span>
          <b />
          <span>New York City</span>
        </div>
        <a className="scroll-cue" href="#family">
          Cruz and Rafael <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="public-foreword">
        <p>
          Cruz’s parents, Mauricio Reyes Martínez and Carmen Díaz García, lived
          in Naguabo before Cruz was born in Gurabo on 3 May 1915. By 1920 the
          family was in Anton Ruiz, Humacao.
        </p>
        <p>
          Rafael’s family was already in Anton Ruiz when he was a child. He and
          Cruz married in East Harlem in 1941; the 1950 census records their
          household a few blocks away on East 109th Street.
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
                  3 May 1915
                  <small>Gurabo, Puerto Rico</small>
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
          <strong>EASTERN</strong>
          <b>1902—30</b>
          <span>Naguabo · Gurabo · Humacao</span>
        </div>
        <div className="plot-copy">
          <p className="eyebrow">Before New York</p>
          <h2>The Puerto Rico years</h2>
          <p>
            The two families lived within the same part of eastern Puerto Rico,
            but not in one place. The Reyes–Díaz family moved from Naguabo to
            Gurabo and then Humacao. The Vázquez–Perales family lived in
            Humacao, first in Anton Ruiz and later in Mambiche.
          </p>
          <div className="interments">
            <p>
              <strong>Naguabo → Gurabo</strong>
              <span>Carmen’s family in 1910; Cruz’s birthplace in 1915</span>
            </p>
            <p>
              <strong>Humacao</strong>
              <span>Both families in the 1920 and 1930 censuses</span>
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

      <section className="section record-gallery" id="records">
        <div className="section-label">
          <span>02</span>
          <p>In the records</p>
        </div>
        <div className="records-heading">
          <p className="eyebrow">Original census sheets</p>
          <h2>The families on paper</h2>
          <p>
            These are the pages the enumerators filled out. The spelling and
            ages vary, but the households line up from one census to the next.
          </p>
        </div>
        <div className="record-grid">
          <figure>
            <a href="/records/1910-reyes-household.jpg" target="_blank">
              <img
                src="/records/1910-reyes-household.jpg"
                alt="1910 Puerto Rico census sheet for Ucares, Naguabo"
              />
            </a>
            <figcaption>
              <strong>1910 · Ucares, Naguabo</strong>
              <span>
                Carmen Díaz, her parents Lope Díaz and Reyes García, her husband
                Mauricio Reyes, and their first child.
              </span>
              <small>U.S. Census, National Archives</small>
            </figcaption>
          </figure>
          <figure>
            <a href="/records/1920-vazquez-household.jpg" target="_blank">
              <img
                src="/records/1920-vazquez-household.jpg"
                alt="1920 Puerto Rico census sheet for Anton Ruiz, Humacao"
              />
            </a>
            <figcaption>
              <strong>1920 · Anton Ruiz, Humacao</strong>
              <span>
                Rafael in the household of Juan Vázquez and Carlina Perales,
                with his brothers and sisters.
              </span>
              <small>U.S. Census, National Archives</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="section-label light">
          <span>03</span>
          <p>Puerto Rico to New York</p>
        </div>
        <div className="journey-heading">
          <p className="eyebrow">1907–1950</p>
          <h2>Eastern Puerto Rico → East Harlem</h2>
        </div>
        <div className="timeline">
          <article>
            <span className="year">1907–15</span>
            <div className="dot" />
            <div>
              <h3>Fajardo, Naguabo and Gurabo</h3>
              <p>
                Mauricio and Carmen marry in Fajardo, live with her family in
                Naguabo, and welcome Cruz in Gurabo.
              </p>
            </div>
          </article>
          <article>
            <span className="year">1920–30</span>
            <div className="dot" />
            <div>
              <h3>Humacao</h3>
              <p>
                Both families appear in Humacao records: first in Anton Ruiz,
                then in Mambiche.
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
          <span>04</span>
          <p>Their parents</p>
        </div>
        <div className="stories-heading">
          <p className="eyebrow">One generation earlier</p>
          <h2>The families before New York</h2>
        </div>
        <div className="story-grid">
          <article>
            <span className="story-when">Cruz’s parents</span>
            <h3>
              <span data-person-id="person.mauricio-reyes">Mauricio Reyes Martínez</span>
              {" + "}
              <span data-person-id="person.carmen-diaz">Carmen Díaz García</span>
            </h3>
            <p>
              They married in Fajardo in 1907. Census and civil records follow
              their family through Naguabo, Gurabo and Humacao.
            </p>
            <a href="/research#source-cruz-birth">View the sources →</a>
          </article>
          <article>
            <span className="story-when">Rafael’s parents</span>
            <h3>
              <span data-person-id="person.juan-vazquez-rodriguez">
                Juan Vázquez Rodríguez
              </span>
              {" + "}
              <span data-person-id="person.carlina-perales-perez">
                Carlina Perales Pérez
              </span>
            </h3>
            <p>
              They married in Humacao in 1902. Carlina died there in 1922;
              Rafael was one of the seven children named in her death record.
            </p>
            <a href="/research#source-census-1910">View the sources →</a>
          </article>
          <article>
            <span className="story-when">Mauricio’s parents</span>
            <h3>
              <span data-person-id="person.pedro-reyes">Pedro Reyes</span>
              {" + "}
              <span data-person-id="person.ana-martinez">Ana Martínez</span>
            </h3>
            <p>
              Pedro and Ana lived in Humacao. Their known children were Isabel,
              Natalio, Mauricio and Juliano.
            </p>
            <a href="/research#pedro-ana">See this family →</a>
          </article>
          <article>
            <span className="story-when">Carmen’s parents</span>
            <h3>
              <span data-person-id="person.lope-diaz-figueroa">
                Lope Díaz Figueroa
              </span>
              {" + "}
              <span data-person-id="person.reyes-garcia-olivero">
                Reyes García Olivero
              </span>
            </h3>
            <p>
              Their parents were{" "}
              <span data-person-id="person.manuel-diaz">Manuel Díaz</span> and{" "}
              <span data-person-id="person.carmen-figueroa">Carmen Figueroa</span>,
              and{" "}
              <span data-person-id="person.bautista-garcia">Bautista García</span>{" "}
              and{" "}
              <span data-person-id="person.carmen-olivero">Carmen Olivero</span>.
            </p>
            <a href="/research#lope-reyes">See this family →</a>
          </article>
          <article>
            <span className="story-when">Juan’s parents</span>
            <h3>
              <span data-person-id="person.sotero-vazquez">Sotero Vázquez</span>
              {" + Carmen / María Eugenia Rodríguez"}
            </h3>
            <p>
              Juan’s records disagree: one names{" "}
              <span data-person-id="person.carmen-rodriguez">Carmen Rodríguez</span>,
              another{" "}
              <span data-person-id="person.maria-eugenia-rodriguez">
                María Eugenia Rodríguez
              </span>
              . The distinction remains open.
            </p>
            <a href="/research#sotero-rodriguez">See this family →</a>
          </article>
          <article>
            <span className="story-when">Carlina’s parents</span>
            <h3>
              <span data-person-id="person.marcelino-perales-medina">
                Marcelino Perales y Medina
              </span>
              {" + "}
              <span data-person-id="person.aurora-perez">Aurora Pérez</span>
            </h3>
            <p>
              Marcelino was a son of{" "}
              <span data-person-id="person.abal-perales">Abal or Abel Perales</span>{" "}
              and <span data-person-id="person.vicenta-medina">Vicenta Medina</span>.
              This Naguabo family included at least eight known children.
            </p>
            <a href="/research#marcelino-aurora">See this family →</a>
          </article>
        </div>
      </section>

      <section className="section public-sources">
        <div className="section-label">
          <span>05</span>
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
          Puerto Rico · New York City
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
