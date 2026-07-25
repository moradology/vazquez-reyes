import Link from "next/link";
import {
  familyCouples,
  nameVariants,
  negativeSearches,
  openCases,
  sources,
  updates,
} from "../research-data";
import { SiteHeader } from "../site-header";

function Grade({
  kind,
  children,
}: {
  kind: "documented" | "probable" | "open";
  children: React.ReactNode;
}) {
  return <span className={`status status-${kind}`}>{children}</span>;
}

const caguasParentHouseholdRecords = [
  {
    src: "1786-miguel-vazquez-baptism.jpg",
    alt: "1786 Caguas baptism entry for Miguel, son of Francisco Vázquez and María Magdalena",
    title: "1786 · Miguel’s baptism",
    detail:
      "Miguel, baptized at the reported age of 15 days, is called the legitimate son of Francisco Vázquez and María Magdalena.",
    note: "Caguas · film 1389001 · folio 79 · record 166",
  },
  {
    src: "1793-maria-de-los-angeles-vazquez-burial.jpg",
    alt: "1793 Caguas burial entry for María de los Ángeles, child of Francisco Vázquez and María Magdalena",
    title: "1793 · María de los Ángeles’s burial",
    detail:
      "The young child is named as the legitimate daughter of Francisco Vázquez or Basques and María Magdalena.",
    note: "Caguas · film 1389031 · folio 119 verso · record 476",
  },
  {
    src: "1794-maria-magdalena-cortes-burial.jpg",
    alt: "1794 Caguas burial entry for María Magdalena Cortés, wife of Francisco Vázquez",
    title: "1794 · María Magdalena Cortés’s burial",
    detail:
      "Her own burial supplies the full name María Magdalena Cortés and identifies Francisco Vázquez as her husband.",
    note: "Caguas · film 1389031 · folio 130 · record 518",
  },
  {
    src: "1801-jose-vazquez-burial.jpg",
    alt: "1801 Caguas burial entry for José Vázquez, son of Francisco and María Cortés, shown in two-part reading order",
    title: "1801 · José Vázquez’s burial",
    detail:
      "José is named as the legitimate son of Francisco and María Cortés. The record gives no age or native places.",
    note: "Caguas · film 1389031 · folio 244 verso · two-part crop",
  },
];

export const metadata = {
  title: "Research Notes · Vazquez–Reyes Family History",
  description:
    "Sources, conflicting dates, open questions, and search notes for the Vazquez-Reyes family history.",
};

export default function ResearchPage() {
  return (
    <main className="research-page">
      <SiteHeader current="research" />

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

      <nav className="page-jump-nav" aria-label="Research page sections">
        <span>On this page</span>
        <a href="#origins">Origins</a>
        <a href="#families">Families</a>
        <a href="#conflicts">Conflicts</a>
        <a href="#docket">Open questions</a>
        <a href="#negative">Search log</a>
        <a href="#sources">Sources</a>
      </nav>

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

      <section className="research-section origin-research" id="origins">
        <div className="research-section-title">
          <span>01</span>
          <div>
            <p>Origin frontier</p>
            <h2>What is known, and where the trail stops</h2>
          </div>
        </div>
        <p className="section-deck">
          This pass stays shallow on purpose: identify the person, the
          relationship, the stated place, and the next relevant record set.
          Nothing below assigns an overseas origin without a named person and
          record.
        </p>
        <div className="origin-audit-grid">
          <article>
            <Grade kind="documented">DOCUMENTED</Grade>
            <h3>Máximo Vázquez</h3>
            <dl>
              <div>
                <dt>Native place</dt>
                <dd>Caguas, Puerto Rico</dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>Francisco Vázquez and María Magdalena Cortés</dd>
              </div>
              <div>
                <dt>Record language</dt>
                <dd>
                  Described with Josefa as <i>pardo libre</i> in 1819
                </dd>
              </div>
            </dl>
          </article>
          <article>
            <Grade kind="probable">STRONG CLUSTER</Grade>
            <h3>Francisco Vázquez + María Magdalena Cortés</h3>
            <dl>
              <div>
                <dt>Place documented</dt>
                <dd>Caguas, 1786–1801</dd>
              </div>
              <div>
                <dt>Children in originals</dt>
                <dd>Miguel, María de los Ángeles, and José</dd>
              </div>
              <div>
                <dt>Máximo connection</dt>
                <dd>
                  Same parent pair and Caguas origin; his own baptism remains
                  missing
                </dd>
              </div>
              <div>
                <dt>María’s burial</dt>
                <dd>17 June 1794 in Caguas</dd>
              </div>
            </dl>
          </article>
          <article>
            <Grade kind="open">UNMERGED CANDIDATE</Grade>
            <h3>Francisco Xavier Vázquez · Cayey</h3>
            <dl>
              <div>
                <dt>Why he was tested</dt>
                <dd>
                  María Magdalena died in 1794; his documented children with
                  María de los Reyes begin in 1796; both men were alive in
                  1801.
                </dd>
              </div>
              <div>
                <dt>What his burial says</dt>
                <dd>
                  Wife María de los Reyes Vázquez; no parents, native place, or
                  prior wife
                </dd>
              </div>
              <div>
                <dt>Decision</dt>
                <dd>Not attached to this tree without an identity bridge</dd>
              </div>
              <div>
                <dt>Possible earlier network</dt>
                <dd>
                  A published reconstruction follows this Cayey family to Juan
                  Vázquez de Rivera in Ponce in 1709, then stops with Juan’s
                  ancestry unknown.
                </dd>
              </div>
            </dl>
          </article>
          <article>
            <Grade kind="documented">DOCUMENTED</Grade>
            <h3>Josefa Rivera</h3>
            <dl>
              <div>
                <dt>Native place</dt>
                <dd>Humacao, Puerto Rico</dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>Luís de Rivera and Isidora Rodríguez</dd>
              </div>
              <div>
                <dt>Sibling household</dt>
                <dd>
                  Simona, born in 1790, is verified through her baptism and
                  marriage. Ysabel’s 1792 baptism names the same parents.
                </dd>
              </div>
            </dl>
          </article>
          <article>
            <Grade kind="documented">DOCUMENTED</Grade>
            <h3>Luís de Rivera</h3>
            <dl>
              <div>
                <dt>Native-place reports</dt>
                <dd>
                  Coamo in 1808; Humacao district in two 1811 records
                </dd>
              </div>
              <div>
                <dt>Parents</dt>
                <dd>Roque [surname not stated] and Marciana Delgado</dd>
              </div>
              <div>
                <dt>1811 death record</dt>
                <dd>
                  About 50 years old; married in the church to Isidora
                  Rodríguez; nine children named
                </dd>
              </div>
            </dl>
          </article>
          <article>
            <Grade kind="documented">DOCUMENTED</Grade>
            <h3>Isidora Rodríguez</h3>
            <dl>
              <div>
                <dt>Native place</dt>
                <dd>Humacao district, Puerto Rico</dd>
              </div>
              <div>
                <dt>Family</dt>
                <dd>
                  Church-married to Luís de Rivera; nine children named in
                  Luís’s burial
                </dd>
              </div>
              <div>
                <dt>Still unknown</dt>
                <dd>Her parents, birth date, and death</dd>
              </div>
            </dl>
          </article>
        </div>

        <figure className="family-record origin-candidate-record">
          <a
            href="/records/1801-francisco-xavier-vazquez-cayey-candidate-burial.jpg"
            target="_blank"
          >
            <img
              src="/records/1801-francisco-xavier-vazquez-cayey-candidate-burial.jpg"
              alt="1801 Cayey burial page containing the entry for Francisco Xavier Vázquez, an unmerged candidate"
            />
          </a>
          <figcaption>
            <strong>21 October 1801 · Cayey candidate</strong>
            <span>
              Francisco Xavier Vázquez’s burial names María de los Reyes
              Vázquez as his wife. It does not name his parents, native place,
              or an earlier wife. The full-size page is preserved here because
              the record is relevant; it is not proof that he was our Caguas
              Francisco.
            </span>
            <small>
              Nuestra Señora de la Asunción · FamilySearch image
              9398-K8SW-QV · unmerged
            </small>
          </figcaption>
        </figure>

        <div className="origin-coverage">
          <header>
            <p className="eyebrow">Record coverage checked</p>
            <h3>The missing record is not the same as a missing person.</h3>
          </header>
          <div>
            <article>
              <span>Caguas</span>
              <strong>Máximo’s baptism</strong>
              <p>
                No Máximo match appears in the complete 1785–1788 baptism
                transcript. It does contain Miguel’s 1786 baptism under
                Francisco Vázquez and María Magdalena. The surviving digitized
                sequence has major gaps before and after those years.
              </p>
            </article>
            <article>
              <span>Caguas · 1734–1804</span>
              <strong>His parents’ marriage</strong>
              <p>
                The damaged 1734–1774 fragment was captured in full: 71
                images, with every Vázquez- or Cortés-like transcript hit
                checked against the original. The complete 1774–1804
                transcription was also checked. Neither produced a defensible
                Francisco and María match. Damage and missing books still
                prevent an absence claim.
              </p>
            </article>
            <article>
              <span>Caguas · 1786–1801</span>
              <strong>The earlier household is now documented</strong>
              <p>
                Miguel’s baptism, María de los Ángeles’s burial, María
                Magdalena Cortés’s own burial, and José Vázquez’s burial
                establish the fuller parent couple and three probable siblings
                of Máximo.
              </p>
            </article>
            <article>
              <span>Caguas · 1804–1809</span>
              <strong>Burial register captured and screened</strong>
              <p>
                All 190 photographed openings were saved. Two handwriting
                recognition passes and a manual review of plausible hits found
                no defensible target within that span. The verified family
                burials date to 1793, 1794, and 1801—outside these captured
                pages. This is not a full human transcription or proof of
                absence.
              </p>
            </article>
            <article>
              <span>Cayey → Ponce · 1709–1801</span>
              <strong>A possible route, not an ancestor line</strong>
              <p>
                A scholarly reconstruction and the original 1801 Cayey burial
                were checked. The chronology leaves open a post-1794
                remarriage, but no record says this Francisco was María
                Magdalena Cortés’s widower or connects him to the Caguas
                children. The reconstructed line reaches Juan Vázquez de
                Rivera in Ponce in 1709; its author explicitly reports Juan’s
                ancestry as unknown.
              </p>
            </article>
            <article>
              <span>Archivo General de Indias</span>
              <strong>The cited 1709 source is not online</strong>
              <p>
                The reconstruction cites ESCRIBANIA,129A. PARES catalogs the
                bundle as microfilmed but provides no digital image gallery.
                Archive access may let us inspect the cited original, but it
                cannot substitute for the missing Caguas-to-Cayey identity
                bridge.
              </p>
            </article>
            <article>
              <span>Humacao / Las Piedras</span>
              <strong>Josefa’s earlier records</strong>
              <p>
                All 227 images in the surviving 1778–1799 Las Piedras item were
                reviewed. Simona’s 1790 and Ysabel’s 1792 baptisms name Luís de
                Rivera and Isidora Rodríguez; Josefa’s baptism was not found in
                that item.
              </p>
            </article>
            <article>
              <span>Las Piedras</span>
              <strong>Her parents’ marriage</strong>
              <p>
                Luís and Isidora Rodríguez do not appear as a couple in the
                reviewed 1787–1816 marriage transcription.
              </p>
            </article>
            <article>
              <span>Humacao · 1810–1852</span>
              <strong>Isidora’s burial search</strong>
              <p>
                Nine complete alphabetical burial indexes were reviewed. The
                only later exact-name entry is a different Isidora Rodríguez:
                recorded in 1827 with parents Diego and Josefa and husband
                Andrés Ubierna or Obierna. No defensible entry for Luís’s wife
                was found. The surviving sequence has no 1821–1822 book, so
                this narrows the search without proving absence.
              </p>
            </article>
            <article>
              <span>Coamo · 1756–1767</span>
              <strong>The nearby Roque Rivera household is complicated</strong>
              <p>
                Six baptism pages were captured. Bernarda and Luís name
                Emerenciana Tirado as mother; Juana names Francisca Luna and
                has Emerenciana as godmother. The first three mother fields
                remain unreadable. None names Marciana Delgado, so this
                household is real but not attached to the direct line.
              </p>
            </article>
            <article>
              <span>Humacao · 1797</span>
              <strong>A Canary Islands lead rejected</strong>
              <p>
                A burial calls Joseph Roque a native of the Canary Islands,
                but also calls him the widower of María Herrera. Our Roque is
                documented with Marciana Delgado. The conflicting spouse makes
                the overseas-born man a different person; the record is
                preserved and rejected from this family.
              </p>
            </article>
          </div>
        </div>

        <aside className="origin-research-note">
          <Grade kind="open">OVERSEAS ORIGIN OPEN</Grade>
          <p>
            Africa, Europe, and other Caribbean islands remain routes to test.
            The phrase <i>pardos libres</i> records how a Puerto Rican parish
            classified Máximo and Josefa; it does not identify a birthplace
            outside Puerto Rico or measure ancestry.
          </p>
        </aside>
      </section>

      <section className="research-section family-groups" id="families">
        <div className="research-section-title">
          <span>02</span>
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
              {family.id === "francisco-maria-cortez" &&
                caguasParentHouseholdRecords.map((record) => (
                  <figure className="family-record" key={record.src}>
                    <a href={`/records/${record.src}`} target="_blank">
                      <img src={`/records/${record.src}`} alt={record.alt} />
                    </a>
                    <figcaption>
                      <strong>{record.title}</strong>
                      <span>{record.detail}</span>
                      <small>{record.note}</small>
                    </figcaption>
                  </figure>
                ))}
              {family.id === "luis-isidora" && (
                <>
                  <figure className="family-record">
                    <a
                      href="/records/1811-luis-de-rivera-death.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1811-luis-de-rivera-death.jpg"
                        alt="1811 Humacao burial entry for Luís de Rivera, shown in reading order across two parts of the parish register"
                      />
                    </a>
                    <figcaption>
                      <strong>20 April 1811 · Luís de Rivera’s burial</strong>
                      <span>
                        Luís is described as a native of the Humacao district,
                        about 50 years old, and the legitimate son of Roque and
                        Marciana Delgado. The entry names Isidora Rodríguez and
                        their nine children. The manuscript day is faint; the
                        attached index resolves the burial date as 20 April.
                        The exact death day is not separately stated. An 1808
                        child baptism instead reports Coamo as Luís’s native
                        place.
                      </span>
                      <small>
                        Dulce Nombre de Jesús · DGS 008038524 · item 6 · image
                        23
                      </small>
                    </figcaption>
                  </figure>
                  <figure className="family-record">
                    <a
                      href="/records/1790-simona-rivera-baptism.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1790-simona-rivera-baptism.jpg"
                        alt="1790 Las Piedras baptism entry for Simona, daughter of Luís de Rivera and Isidora Rodríguez"
                      />
                    </a>
                    <figcaption>
                      <strong>1790 · Simona’s baptism</strong>
                      <span>
                        Born 8 February and baptized 7 March, Simona was the
                        legitimate daughter of Luís de Rivera and Isidora
                        Rodríguez. Her later marriage repeats the parent pair.
                      </span>
                      <small>
                        Las Piedras · DGS 008126787 · item 1 · image 39
                      </small>
                    </figcaption>
                  </figure>
                  <figure className="family-record">
                    <a
                      href="/records/1792-ysabel-rivera-baptism.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1792-ysabel-rivera-baptism.jpg"
                        alt="1792 Las Piedras baptism entry for Ysabel, daughter of Luís de Rivera and Isidora Rodríguez"
                      />
                    </a>
                    <figcaption>
                      <strong>1792 · Ysabel’s baptism</strong>
                      <span>
                        Born 5 October and baptized 22 October, Ysabel appears
                        in the margin; the body again names Luís de Rivera and
                        Isidora Rodríguez.
                      </span>
                      <small>
                        Las Piedras · DGS 008126787 · item 1 · image 92
                      </small>
                    </figcaption>
                  </figure>
                  <figure className="family-record">
                    <a
                      href="/records/1808-juan-antonio-rivera-baptism.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1808-juan-antonio-rivera-baptism.jpg"
                        alt="Two full Humacao register images containing the 1808 baptism of Juan Antonio"
                      />
                    </a>
                    <figcaption>
                      <strong>1808 · Juan Antonio’s baptism</strong>
                      <span>
                        Born 18 October and baptized 30 October, Juan Antonio
                        was the legitimate son of Luís de Rivera and Isidora
                        Rodríguez. The entry calls Luís a native of Coamo and
                        Isidora a native and resident of Humacao.
                      </span>
                      <small>
                        Humacao · DGS 008038525 · item 13 · images 75–76
                      </small>
                    </figcaption>
                  </figure>
                  <figure className="family-record">
                    <a
                      href="/records/1811-jose-ramon-rivera-baptism.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1811-jose-ramon-rivera-baptism.jpg"
                        alt="1811 Humacao baptism entry for José Ramón, son of Luís de Rivera and Isidora Rodríguez"
                      />
                    </a>
                    <figcaption>
                      <strong>1811 · José Ramón’s baptism</strong>
                      <span>
                        Born 30 January and baptized 9 February, José Ramón was
                        the legitimate son of the same couple. This record calls
                        both parents natives of the Humacao district.
                      </span>
                      <small>
                        Humacao · DGS 008038525 · item 14 · image 37
                      </small>
                    </figcaption>
                  </figure>
                  <figure className="family-record">
                    <a
                      href="/records/1765-luis-rivera-candidate-baptism.jpg"
                      target="_blank"
                    >
                      <img
                        src="/records/1765-luis-rivera-candidate-baptism.jpg"
                        alt="1765 Coamo baptism candidate for Luís, son of Roque de Rivera and Emerenciana Tirado"
                      />
                    </a>
                    <figcaption>
                      <strong>1765 · Coamo baptism candidate</strong>
                      <span>
                        The child Luís and father Roque de Rivera match, but
                        mother Emerenciana Tirado conflicts with Marciana
                        Delgado in Luís’s 1811 burial. The record is retained
                        and not merged.
                      </span>
                      <small>
                        Coamo · DGS 008100612 · item 1 · image 207
                      </small>
                    </figcaption>
                  </figure>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="research-section research-dark" id="conflicts">
        <div className="research-section-title">
          <span>03</span>
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
          <span>04</span>
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
          <span>05</span>
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
          <span>06</span>
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
          <span>07</span>
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
          <span>08</span>
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
          <span>09</span>
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
