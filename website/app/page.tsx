import { ResearchTools } from "./research-tools";
import { sources } from "./research-data";
import { FamilyTrees } from "./family-tree";
import { OriginFrontier } from "./origin-frontier";
import {
  PuertoRicoMap,
  PuertoRicoMapDefinitions,
} from "./puerto-rico-map";

const principalSources = sources.filter((source) =>
  [
    "cruz-birth",
    "rafael-birth",
    "census-1940-reyes",
    "marriage",
    "census-1950",
    "maximo-josefa-marriage",
  ].includes(source.id),
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
          <a href="#tree">Tree</a>
          <a href="#origins">Origins</a>
          <a href="#geography">Map</a>
          <a href="#records">Records</a>
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
          Cruz Reyes Díaz was born in Gurabo. Rafael Vázquez grew up in
          Humacao. They married in Manhattan in 1941 and made their home in
          East Harlem.
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
          in Naguabo before their daughter was born in Gurabo on 3 May 1915.
          By 1920 the family was in Antón Ruíz, Humacao.
        </p>
        <p>
          Rafael’s family was already in Antón Ruíz when he was a child. He and
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
          <h2>Cruz Reyes Díaz and Rafael Vázquez</h2>
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
            <p className="card-note">
              Documented as Cruz in civil, census, marriage, and Social
              Security records
            </p>
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

      <FamilyTrees />

      <OriginFrontier />

      <section className="section geography-atlas" id="geography">
        <div className="section-label light">
          <span>04</span>
          <p>Puerto Rico, life by life</p>
        </div>
        <div className="geography-heading">
          <p className="eyebrow">One map, held steady</p>
          <h2>The same island across five generations</h2>
          <p>
            Every panel repeats the same Puerto Rico shoreline, municipio
            boundaries, labels, and scale. Only the documented family path
            changes, making continuities and short moves visible from one life
            to the next.
          </p>
        </div>
        <PuertoRicoMapDefinitions />
        <div className="map-atlas-grid">
          <PuertoRicoMap
            group="cruz"
            eyebrow="Cruz · 1915–1940"
            title="Cruz Reyes Díaz"
            summary="A Gurabo birth followed by three documented Humacao households before New York."
            storyHref="#family"
            tone="reyes"
          />
          <PuertoRicoMap
            group="rafael"
            eyebrow="Rafael · 1906–1930"
            title="Rafael Vázquez Perales"
            summary="A Humacao childhood that can be followed from Antón Ruíz to Mambiche."
            storyHref="#family"
            tone="vazquez"
          />
          <PuertoRicoMap
            group="mauricio-carmen"
            eyebrow="Cruz’s parents · 1907–1940"
            title="Mauricio Reyes and Carmen Díaz"
            summary="Their records move through Fajardo, Naguabo, Gurabo, and three Humacao barrios."
            storyHref="#story-mauricio-carmen"
            tone="reyes"
          />
          <PuertoRicoMap
            group="juan-carlina"
            eyebrow="Rafael’s parents · 1878–1930"
            title="Juan Vázquez and Carlina Perales"
            summary="From their separate Yabucoa and Naguabo beginnings to a shared life in Humacao."
            storyHref="#story-juan-carlina"
            tone="vazquez"
          />
          <PuertoRicoMap
            group="sotero-maria"
            eyebrow="Rafael’s grandparents · 1875–1933"
            title="Sotero Vázquez and María Eugenia Rodríguez"
            summary="Their family formed in Yabucoa and later appears together in Antón Ruíz, Humacao."
            storyHref="#story-sotero-rodriguez"
            tone="vazquez"
          />
          <PuertoRicoMap
            group="atilano-juana"
            eyebrow="One generation earlier · c. 1828–1898"
            title="Atilano Vázquez and Juana Regina Rodríguez"
            summary="Atilano’s Juncos origin and the Yabucoa family he built with Juana Regina."
            storyHref="#story-atilano-juana"
            tone="vazquez"
          />
          <PuertoRicoMap
            group="marcelino-aurora"
            eyebrow="The Perales branch · c. 1841–1940"
            title="Marcelino Perales and Aurora Pérez"
            summary="A Naguabo family, followed into Aurora’s long widowhood in Río Blanco."
            storyHref="#story-marcelino-aurora"
            tone="vazquez"
          />
          <PuertoRicoMap
            group="early-vazquez"
            eyebrow="The earliest mapped generation · before 1819–1824"
            title="Máximo Vázquez and Josefa Rivera"
            summary="Caguas and Humacao origins followed by children baptized in Juncos and San Lorenzo."
            storyHref="#story-maximo-josefa"
            tone="vazquez"
          />
        </div>
        <p className="geography-method">
          Points locate the named municipio or barrio—not a guessed house.
          Census GEOIDs, coordinates, precision, and event-to-record links are
          preserved in the public project’s geography ledger.
        </p>
      </section>

      <section className="section record-gallery" id="records">
        <div className="section-label">
          <span>05</span>
          <p>In the records</p>
        </div>
        <div className="records-heading">
          <p className="eyebrow">Original records</p>
          <h2>The families on paper</h2>
          <p>
            These are the civil, parish, and census pages that carry the family
            names. Spelling and ages vary, but the people and households line
            up.
          </p>
        </div>
        <div className="record-grid">
          <figure className="record-featured">
            <a href="/records/1915-cruz-civil-birth.jpg" target="_blank">
              <img
                src="/records/1915-cruz-civil-birth.jpg"
                alt="1915 Gurabo civil birth registration naming Cruz Reyes Díaz"
              />
            </a>
            <figcaption>
              <strong>1915 · Rincón, Gurabo</strong>
              <span>
                The civil act records the name Cruz Reyes Díaz. Her grandfather
                Lope Díaz reported the birth 45 days after she was born.
              </span>
              <small>Puerto Rico civil registration</small>
            </figcaption>
          </figure>
          <figure>
            <a href="/records/1910-reyes-household.jpg" target="_blank">
              <img
                src="/records/1910-reyes-household.jpg"
                alt="1910 Puerto Rico census sheet for Húcares, Naguabo"
              />
            </a>
            <figcaption>
              <strong>1910 · Húcares, Naguabo</strong>
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
                alt="1920 Puerto Rico census sheet for Antón Ruíz, Humacao"
              />
            </a>
            <figcaption>
              <strong>1920 · Antón Ruíz, Humacao</strong>
              <span>
                Rafael in the household of Juan Vázquez and Carlina Perales,
                with his brothers and sisters.
              </span>
              <small>U.S. Census, National Archives</small>
            </figcaption>
          </figure>
          <figure className="record-wide">
            <a href="/records/1940-reyes-household.jpg" target="_blank">
              <img
                src="/records/1940-reyes-household.jpg"
                alt="1940 Puerto Rico census crop of the Mauricio and Carmen Reyes household, rows 91 through 96"
              />
            </a>
            <figcaption>
              <strong>1940 · Collores, Humacao</strong>
              <span>
                Mauricio and Carmen with Eriberta, Cruz, Aurora, and Cándido.
                Eighteen months later, Cruz married in Manhattan.
              </span>
              <small>U.S. Census, National Archives · rows 91–96</small>
            </figcaption>
          </figure>
          <figure className="record-wide">
            <a href="/records/1805-maximo-josefa-marriage.jpg" target="_blank">
              <img
                src="/records/1805-maximo-josefa-marriage.jpg"
                alt="1805 Humacao parish marriage entry for Máximo Basquez and Josefa Ribera, continued across two pages"
              />
            </a>
            <figcaption>
              <strong>1805 · Humacao</strong>
              <span>
                Máximo Basquez and Josefa Ribera married on 31 December. The
                entry names his parents, Francisco and María Cortez, and hers,
                Luís and Isidora Rodríguez.
              </span>
              <small>
                Dulce Nombre de Jesús parish register · two-part reading-order
                crop
              </small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="section-label light">
          <span>06</span>
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
                Naguabo, and welcome their daughter in Gurabo.
              </p>
            </div>
          </article>
          <article>
            <span className="year">1920–40</span>
            <div className="dot" />
            <div>
              <h3>Humacao</h3>
              <p>
                Both families appear in Humacao records. Cruz was still living
                with her parents in Collores on 4 April 1940.
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
                The census records the couple living together on East 109th
                Street.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section stories" id="stories">
        <div className="section-label">
          <span>07</span>
          <p>Their parents</p>
        </div>
        <div className="stories-heading">
          <p className="eyebrow">One generation earlier</p>
          <h2>The families before New York</h2>
        </div>
        <div className="story-grid">
          <article id="story-mauricio-carmen">
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
          <article id="story-juan-carlina">
            <span className="story-when">Rafael’s parents</span>
            <h3>
              <span data-person-id="person.juan-vazquez-rodriguez">
                Juan de la Rosa Vázquez Rodríguez
              </span>
              {" + "}
              <span data-person-id="person.carlina-perales-perez">
                Carlina Perales Pérez
              </span>
            </h3>
            <p>
              Juan was born in Yabucoa on 30 August 1878. He and Carlina
              married in Humacao in 1902; Rafael was one of the seven children
              named in Carlina’s death record.
            </p>
            <a href="/research#source-census-1910">View the sources →</a>
          </article>
          <article id="story-pedro-ana">
            <span className="story-when">Mauricio’s parents</span>
            <h3>
              <span data-person-id="person.pedro-reyes">Pedro Reyes</span>
              {" + "}
              <span data-person-id="person.ana-martinez">
                Ana or Anastasia Martínez
              </span>
            </h3>
            <p>
              Pedro and Ana lived in Humacao. Their son Mauricio was baptized
              there in 1882. In 1910 they were living with their son Julián;
              Ana reported seven children born and four living.
            </p>
            <a href="/research#pedro-ana">See this family →</a>
          </article>
          <article id="story-ramon-ines">
            <span className="story-when">Pedro’s parents</span>
            <h3>
              <span data-person-id="person.ramon-reyes">Ramón Reyes</span>
              {" + "}
              <span data-person-id="person.ines-castro">Inés Castro</span>
            </h3>
            <p>
              Two Humacao baptismal records name Ramón and Inés as Pedro
              Reyes’s parents. Their own birth, marriage and death records are
              still to be found.
            </p>
            <a href="/research#ramon-ines">See this family →</a>
          </article>
          <article id="story-damaso-maria">
            <span className="story-when">Ana’s parents</span>
            <h3>
              <span data-person-id="person.damaso-martinez">
                Dámaso Martínez
              </span>
              {" + "}
              <span data-person-id="person.maria-rivera">María Rivera</span>
            </h3>
            <p>
              Mauricio’s baptism names Dámaso and María as Ana’s parents. An
              earlier sibling’s baptism repeats Dámaso, though María’s surname
              is difficult to read on that page.
            </p>
            <a href="/research#damaso-maria">See this family →</a>
          </article>
          <article id="story-lope-reyes">
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
              In 1910 Lope and Reyes lived in Húcares, Naguabo, with their
              daughter Carmen, son-in-law Mauricio, and granddaughter Juana.
              Later records follow Lope and Reyes to Humacao, where they died
              in 1929 and 1933.
            </p>
            <a href="/research#lope-reyes">See this family →</a>
          </article>
          <article id="story-manuel-carmen">
            <span className="story-when">Lope’s parents</span>
            <h3>
              <span data-person-id="person.manuel-diaz">Manuel María Díaz</span>
              {" + "}
              <span data-person-id="person.carmen-figueroa">Carmen Figueroa</span>
            </h3>
            <p>
              Records for their sons call Manuel and Carmen natives of
              Naguabo. Their own birth, marriage, and death dates remain open.
            </p>
            <a href="/research#lope-reyes">See the supporting records →</a>
          </article>
          <article id="story-bautista-carmen">
            <span className="story-when">Reyes’s parents</span>
            <h3>
              <span data-person-id="person.bautista-garcia">Bautista García</span>
              {" + "}
              <span data-person-id="person.carmen-olivero">Carmen Olivero</span>
            </h3>
            <p>
              Reyes’s death record names Bautista and Carmen, both from
              Naguabo. A son’s baptism calls her mother Dolores Olivero, so
              that given-name conflict remains open.
            </p>
            <a href="/research#lope-reyes">See the name conflict →</a>
          </article>
          <article id="story-sotero-rodriguez">
            <span className="story-when">A family in Yabucoa</span>
            <h3>
              <span data-person-id="person.sotero-vazquez">Sotero Vázquez</span>
              {" + "}
              <span data-person-id="person.maria-eugenia-rodriguez">
                María Eugenia Rodríguez
              </span>
            </h3>
            <p>
              Sotero and María Eugenia married in Yabucoa in 1875. Their family
              included Juan,{" "}
              <span data-person-id="person.juana-maria-vazquez-rodriguez">
                Juana
              </span>
              ,{" "}
              <span data-person-id="person.victorio-vazquez-rodriguez">
                Victorio
              </span>
              ,{" "}
              <span data-person-id="person.juan-del-carmen-vazquez-rodriguez">
                Juan del Carmen, possibly the Carmelo named later
              </span>
              ,{" "}
              <span data-person-id="person.mauricio-vazquez-rodriguez">
                Mauricio
              </span>
              ,{" "}
              <span data-person-id="person.braulio-vazquez-rodriguez">
                Braulio
              </span>
              , and{" "}
              <span data-person-id="person.francisco-vazquez-rodriguez">
                Francisco
              </span>
              . By 1910, Sotero and María were living in Antón Ruíz, Humacao,
              with Braulio and Francisco still at home. Records call their
              mother María Eugenia, Eugenia, and{" "}
              <span data-person-id="person.carmen-rodriguez">
                Carmen Rodríguez
              </span>
              . Sotero died there in 1916. María Eugenia died there in 1933;
              their son Francisco gave the information for her death record.
            </p>
            <a href="/research#sotero-rodriguez">See this family →</a>
          </article>
          <article id="story-atilano-juana">
            <span className="story-when">A generation earlier in Yabucoa</span>
            <h3>
              <span data-person-id="person.atilano-vazquez">Atilano Vázquez</span>
              {" + "}
              <span data-person-id="person.juana-rodriguez">
                Juana Regina Rodríguez
              </span>
            </h3>
            <p>
              Atilano, born in Juncos around 1828, married Juana Regina in
              Yabucoa in 1849. Their family included Sotero, Francisca,{" "}
              <span data-person-id="person.maria-isidra-vazquez-rodriguez">
                María Isidra
              </span>
              , born in 1863, and{" "}
              <span data-person-id="person.maria-balbina-vazquez-rodriguez">
                María Balbina
              </span>
              , born in 1850. Juana died before María Balbina’s marriage in
              1870. Atilano lived in Yabucoa until his death in 1898.
            </p>
            <a href="/research#atilano-juana">See this family →</a>
          </article>
          <article id="story-maximo-josefa">
            <span className="story-when">Atilano’s parents</span>
            <h3>
              <span data-person-id="person.maximo-vazquez">Máximo Vázquez</span>
              {" + "}
              <span data-person-id="person.josefa-rivera">Josefa Rivera</span>
            </h3>
            <p>
              They married in Humacao on 31 December 1805. The register writes
              their names as Máximo Basquez and Josefa Ribera and identifies
              both sets of parents. An 1819 baptism calls Máximo a native of
              Caguas and Josefa a native of Humacao. Their children’s records
              follow the family through Humacao, Juncos, and San Lorenzo.
            </p>
            <a href="/research#maximo-josefa">See this family →</a>
          </article>
          <article id="story-andres-francisca">
            <span className="story-when">Juana Regina’s parents</span>
            <h3>
              <span data-person-id="person.andres-rodriguez">
                Andrés [Rodríguez]
              </span>
              {" + "}
              <span data-person-id="person.francisca-diaz">Francisca Díaz</span>
            </h3>
            <p>
              The 1849 marriage names Juana Regina’s parents as the deceased
              Andrés and Francisca Díaz. Andrés’s surname was not written and
              is retained in brackets, inferred from his daughter.
            </p>
            <a href="/research#andres-francisca">See this family →</a>
          </article>
          <article id="story-atilano-juana-paula">
            <span className="story-when">Atilano’s later family</span>
            <h3>
              <span data-person-id="person.atilano-vazquez">Atilano Vázquez</span>
              {" + "}
              <span data-person-id="person.juana-paula-de-santiago">
                Juana Paula de Santiago
              </span>
            </h3>
            <p>
              The widowed Atilano married Juana Paula in Yabucoa in 1875. She
              was from Humacao, a daughter of Tomás de Santiago and Petronila
              Orellana. Their daughter{" "}
              <span data-person-id="person.maria-eugenia-vazquez-de-santiago">
                María Eugenia
              </span>{" "}
              was born in Yabucoa in 1879. Their daughter{" "}
              <span data-person-id="person.mariana-vazquez-de-santiago">
                Mariana
              </span>{" "}
              was born in 1896 and baptized in Cidra the following year.
              María Eugenia was a different person from Sotero’s wife and was
              likely Sotero’s half-sister.
            </p>
            <a href="/research#atilano-juana-paula">See this family →</a>
          </article>
          <article id="story-marcelino-aurora">
            <span className="story-when">Carlina’s parents</span>
            <h3>
              <span data-person-id="person.marcelino-perales-medina">
                Marcelino Perales y Medina
              </span>
              {" + "}
              <span data-person-id="person.aurora-perez">Aurora Pérez</span>
            </h3>
            <p>
              This Naguabo family included at least eight known children,
              including{" "}
              <span data-person-id="person.hilaria-perales-perez">
                Hilaria or Ilaria Perales
              </span>
              . Marcelino died in 1891. Aurora was still living with Hilaria
              in Río Blanco in 1940.
            </p>
            <a href="/research#marcelino-aurora">See this family →</a>
          </article>
          <article id="story-abal-vicenta">
            <span className="story-when">Marcelino’s parents</span>
            <h3>
              <span data-person-id="person.abal-perales">Abal or Abel Perales</span>
              {" + "}
              <span data-person-id="person.vicenta-medina">Vicenta Medina</span>
            </h3>
            <p>
              Marcelino’s death act names both parents and says they had
              already died. The image leaves Abal or Abel’s exact spelling
              uncertain; both were associated with Naguabo.
            </p>
            <a href="/research#marcelino-aurora">See the death act →</a>
          </article>
        </div>
      </section>

      <section className="section public-sources">
        <div className="section-label">
          <span>08</span>
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
