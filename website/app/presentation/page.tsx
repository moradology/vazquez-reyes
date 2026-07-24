import Link from "next/link";
import { ArchiveImage } from "../archive-image";
import { SiteHeader } from "../site-header";

export const metadata = {
  title: "Family Presentation · Vazquez–Reyes Family History",
  description:
    "A slide-style walk through the records connecting the Vazquez-Reyes generations.",
};

function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="slide-source" href={href} rel="noreferrer" target="_blank">
      {children} ↗
    </a>
  );
}

function RecordImage({
  alt,
  caption,
  src,
}: {
  alt: string;
  caption: string;
  src: string;
}) {
  const imageId = `presentation-record-${src.replace(/[^a-z0-9]+/gi, "-")}`;
  return (
    <figure className="slide-record">
      <ArchiveImage
        alt={alt}
        citation={caption}
        id={imageId}
        sourceHref={`/records/${src}`}
        sourceLabel="Open image file"
        src={`/records/${src}`}
        triggerClassName="slide-record-image"
        zoomLabel={`View ${caption} at full size`}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function SlideNav({ current, total }: { current: number; total: number }) {
  const previous = current > 1 ? `#slide-${String(current - 1).padStart(2, "0")}` : "/";
  const next =
    current < total
      ? `#slide-${String(current + 1).padStart(2, "0")}`
      : "/people";
  return (
    <nav className="slide-nav" aria-label={`Slide ${current} controls`}>
      <a href={previous} aria-label="Previous slide">
        ←
      </a>
      <span>
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <a href={next} aria-label="Next slide">
        →
      </a>
    </nav>
  );
}

const totalSlides = 16;

export default function PresentationPage() {
  return (
    <main
      className="presentation-deck"
      data-presentation
      data-slide-total={totalSlides}
    >
      <SiteHeader
        current="presentation"
        variant="dark"
        actions={
          <div className="presentation-actions">
            <span>Vazquez–Reyes family history</span>
            <button type="button" data-presentation-fullscreen>
              Present
            </button>
          </div>
        }
      />

      <section className="deck-slide title-slide" data-slide id="slide-01">
        <div className="slide-copy">
          <p className="slide-kicker">Family presentation</p>
          <h1>
            The Vázquez–Reyes
            <br />
            <em>family roots</em>
          </h1>
          <p>
            Cruz Reyes and Rafael Vázquez, their parents and siblings, and the
            earlier generations documented in New York and Puerto Rico.
          </p>
          <span className="presentation-instruction">
            Use ← → or the space bar to move through the slides
          </span>
        </div>
        <div className="title-route" aria-label="Family route">
          <span>Caguas · Juncos · Yabucoa · Naguabo</span>
          <i />
          <span>Humacao</span>
          <i />
          <span>New York</span>
        </div>
        <SlideNav current={1} total={totalSlides} />
      </section>

      <section className="deck-slide" data-slide id="slide-02">
        <div className="slide-copy">
          <p className="slide-kicker">Start with the couple</p>
          <h2>Cruz Reyes and Rafael Vázquez</h2>
          <div className="evidence-step">
            <span>Connection</span>
            <strong>Husband and wife</strong>
            <p>Married 25 October 1941 in Manhattan.</p>
          </div>
          <div className="evidence-step">
            <span>The record</span>
            <strong>New York City marriage license 18978</strong>
            <p>
              The license names Rafael, Cruz, and all four parents. The 1950
              census then places the couple together on East 109th Street.
            </p>
          </div>
          <SourceLink href="https://www.ancestry.com/search/collections/61788/records/322345">
            1941 marriage index
          </SourceLink>
          <SourceLink href="https://www.ancestry.com/search/collections/62308/records/294017627">
            1950 census household
          </SourceLink>
        </div>
        <aside className="slide-pair">
          <Link href="/people/cruz-reyes-vasquez">
            <span>1915–1998</span>
            <strong>Cruz Reyes Díaz</strong>
          </Link>
          <i>married</i>
          <Link href="/people/rafael-vazquez-perales">
            <span>1906–1984</span>
            <strong>Rafael Vázquez Perales</strong>
          </Link>
        </aside>
        <SlideNav current={2} total={totalSlides} />
      </section>

      <section className="deck-slide map-context-slide" data-slide id="slide-03">
        <div className="slide-copy map-context-copy">
          <p className="slide-kicker">Geographic context</p>
          <h2>Relief and routes · 1886</h2>
          <p>
            Most of the Puerto Rico record trail stays within a compact eastern
            corridor: Caguas, Gurabo, Juncos, Las Piedras, Naguabo, Humacao,
            and Yabucoa.
          </p>
          <p className="slide-caution">
            This map describes the region, not land owned or worked by a
            particular relative. Select it to inspect the original at full
            size.
          </p>
        </div>
        <div className="slide-map-single">
          <figure>
            <ArchiveImage
              alt="Topographic map of Puerto Rico published in 1886"
              citation="G.W. & C.B. Colton & Co., Mapa topográfico de la isla de Puerto Rico, 1886. Library of Congress Geography and Map Division."
              id="presentation-topographic-map-1886"
              sourceHref="https://www.loc.gov/item/98687140/"
              sourceLabel="Library of Congress"
              src="/maps/puerto-rico-topographic-1886.jpg"
              triggerClassName="slide-map-image"
              zoomLabel="View the 1886 Puerto Rico topographic map at full size"
            />
            <figcaption>
              <strong>Relief and routes · 1886</strong>
              <span>
                The eastern towns sit between the central heights and the
                Atlantic-facing coastal plain.
              </span>
            </figcaption>
          </figure>
        </div>
        <SlideNav current={3} total={totalSlides} />
      </section>

      <section className="deck-slide map-context-slide" data-slide id="slide-04">
        <div className="slide-copy map-context-copy">
          <p className="slide-kicker">Geographic context</p>
          <h2>Crops and land cover · 1899</h2>
          <p>
            The crop map distinguishes coffee, sugar cane, pasture, and mixed
            cultivation across the island at the end of the nineteenth
            century.
          </p>
          <p className="slide-caution">
            It supplies regional context only; it does not identify a
            particular relative’s occupation or property.
          </p>
        </div>
        <div className="slide-map-single">
          <figure>
            <ArchiveImage
              alt="Map of Puerto Rico showing the distribution of crop lands in 1899"
              citation="Herbert M. Wilson, Map of Puerto Rico showing distribution of crop lands, U.S. Geological Survey Water-Supply Paper 32, plate XIII, 1899. Library of Congress."
              id="presentation-crop-map-1899"
              sourceHref="https://www.loc.gov/item/98687184/"
              sourceLabel="Library of Congress"
              src="/maps/puerto-rico-crop-lands-1899.jpg"
              triggerClassName="slide-map-image"
              zoomLabel="View the 1899 Puerto Rico crop-land map at full size"
            />
            <figcaption>
              <strong>Crops and land cover · 1899</strong>
              <span>
                Coffee, sugar cane, grass, and mixed crop zones give texture to
                the places named in the records.
              </span>
            </figcaption>
          </figure>
        </div>
        <SlideNav current={4} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-05">
        <div className="slide-copy">
          <p className="slide-kicker">Cruz’s birth</p>
          <h2>The civil act fixes the place, date, and two generations.</h2>
          <ul className="slide-findings">
            <li>Born 3 May 1915 in barrio Rincón, Gurabo.</li>
            <li>Parents: Mauricio Reyes Martínez and Carmen Díaz García.</li>
            <li>
              Grandparents: Pedro Reyes and Ana Martínez; Lope Díaz and Reyes
              García.
            </li>
            <li>Her grandfather Lope reported the birth on 17 June.</li>
          </ul>
          <p className="slide-caution">
            The act itself says Cruz. The remembered Pastora story remains
            secondhand and unverified.
          </p>
          <Link className="slide-profile-link" href="/people/cruz-reyes-vasquez">
            Open Cruz’s complete profile →
          </Link>
        </div>
        <RecordImage
          alt="1915 civil birth registration for Cruz Reyes Díaz"
          caption="Gurabo civil birth registration, 1915"
          src="1915-cruz-civil-birth.jpg"
        />
        <SlideNav current={5} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-06">
        <div className="slide-copy">
          <p className="slide-kicker">Cruz’s parents</p>
          <h2>Mauricio Reyes Martínez + Carmen Díaz García</h2>
          <div className="evidence-step">
            <span>Connection</span>
            <strong>Cruz’s parents</strong>
            <p>
              Named together on Cruz’s birth act and across the 1910, 1920,
              1930, 1935, and 1940 households.
            </p>
          </div>
          <div className="evidence-step">
            <span>Their own record</span>
            <strong>Married 23 October 1907 in Fajardo</strong>
            <p>
              Their marriage repeats the same parents later given on Cruz’s
              birth act.
            </p>
          </div>
          <div className="slide-links">
            <Link href="/people/mauricio-reyes">Mauricio’s profile →</Link>
            <Link href="/people/carmen-diaz">Carmen’s profile →</Link>
          </div>
        </div>
        <RecordImage
          alt="1910 census household of Mauricio Reyes and Carmen Díaz"
          caption="The Reyes–Díaz household in Húcares, Naguabo, 1910"
          src="1910-reyes-household.jpg"
        />
        <SlideNav current={6} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-07">
        <div className="slide-copy">
          <p className="slide-kicker">Mauricio’s parents</p>
          <h2>Pedro Reyes + Ana or Anastasia Martínez</h2>
          <div className="evidence-step">
            <span>The record</span>
            <strong>Mauricio’s 1882 Humacao baptism</strong>
            <p>
              Names Pedro and Ana as his parents, then names Ramón Reyes and
              Inés Castro, and Dámaso Martínez and María Rivera, as his
              grandparents.
            </p>
          </div>
          <p className="slide-caution">
            The baptism’s birth-year wording is impossible. September 1881 is
            likely; it is not silently promoted to an exact fact.
          </p>
          <div className="slide-links">
            <Link href="/people/pedro-reyes">Pedro’s profile →</Link>
            <Link href="/people/ana-martinez">Ana’s profile →</Link>
          </div>
        </div>
        <RecordImage
          alt="1882 baptism of Mauricio Reyes Martínez"
          caption="Dulce Nombre de Jesús, Humacao, 1882"
          src="1882-mauricio-reyes-baptism.jpg"
        />
        <SlideNav current={7} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-08">
        <div className="slide-copy">
          <p className="slide-kicker">Rafael’s childhood</p>
          <h2>Rafael with Juan Vázquez and Carlina Perales</h2>
          <div className="evidence-step">
            <span>Connection</span>
            <strong>Parents and son</strong>
            <p>
              Rafael’s civil registration names Carlina. The 1910 and 1920
              censuses place Rafael with Juan Vázquez Rodríguez and Carlina
              Perales Pérez in Antón Ruíz, Humacao.
            </p>
          </div>
          <p className="slide-caution">
            February 1906 is supported. The exact day remains unresolved; the
            remembered October date conflicts with the civil index.
          </p>
          <Link className="slide-profile-link" href="/people/rafael-vazquez-perales">
            Open Rafael’s complete profile →
          </Link>
        </div>
        <RecordImage
          alt="1920 census household containing Rafael Vázquez"
          caption="The Vázquez–Perales household in Antón Ruíz, Humacao, 1920"
          src="1920-vazquez-household.jpg"
        />
        <SlideNav current={8} total={totalSlides} />
      </section>

      <section className="deck-slide relationship-sequence-slide" data-slide id="slide-09">
        <div className="slide-copy">
          <p className="slide-kicker">Rafael’s parents</p>
          <h2>Juan de la Rosa Vázquez + Carlina Perales Pérez</h2>
          <div className="evidence-step">
            <span>Their own record</span>
            <strong>1902 Humacao marriage</strong>
            <p>
              Juan’s parents are Sotero Vázquez and Carmen Rodríguez. Carlina’s
              parents are Marcelino Perales and Aurora Pérez.
            </p>
          </div>
          <div className="evidence-step">
            <span>Independent check</span>
            <strong>Juan’s 1878 Yabucoa baptism</strong>
            <p>
              Gives his birth date and again names Sotero and Carmen, while
              adding both sets of grandparents.
            </p>
          </div>
          <div className="evidence-step">
            <span>Later household</span>
            <strong>Juan + Dolores Rivera by 1930</strong>
            <p>
              After Carlina’s 1922 death, the 1930 and 1940 censuses place
              Dolores with Juan and mark the couple <i>CC</i>, contrato
              consensual or common law. No legal marriage record has been
              found.
            </p>
          </div>
          <div className="slide-links">
            <Link href="/people/juan-vazquez-rodriguez">Juan’s profile →</Link>
            <Link href="/people/carlina-perales-perez">Carlina’s profile →</Link>
            <Link href="/people/dolores-rivera">Dolores’s profile →</Link>
          </div>
        </div>
        <aside className="household-sequence" aria-label="Juan's two documented households">
          <div>
            <span>1902</span>
            <strong>Juan + Carlina Perales</strong>
            <p>Civil marriage · Rafael’s parents</p>
          </div>
          <i aria-hidden="true" />
          <div>
            <span>1922</span>
            <strong>Carlina dies</strong>
            <p>Humacao civil death record</p>
          </div>
          <i aria-hidden="true" />
          <div>
            <span>By 1930</span>
            <strong>Juan + Dolores Rivera</strong>
            <p>Consensual/common-law household</p>
          </div>
        </aside>
        <SlideNav current={9} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-10">
        <div className="slide-copy">
          <p className="slide-kicker">The Rodríguez name conflict</p>
          <h2>Carmen and María Eugenia are probably one woman—but not merged.</h2>
          <ul className="slide-findings">
            <li>Juan’s baptism and marriage call his mother Carmen Rodríguez.</li>
            <li>
              Sotero’s 1875 marriage names María Eugenia Rodríguez, daughter
              of Cristóbal Rodríguez and Leonor Díaz.
            </li>
            <li>
              Later children use Eugenia or María Eugenia, while Sotero’s 1916
              death returns to Carmen and names the same seven-child cluster.
            </li>
            <li>
              María Eugenia’s 1933 death calls her Sotero’s widow; their son
              Francisco reported the death.
            </li>
          </ul>
          <p className="slide-caution">
            The household evidence is strong. No reviewed record yet writes
            Carmen and Eugenia together as one explicit full name.
          </p>
        </div>
        <RecordImage
          alt="1910 census for Sotero Vázquez and María Rodríguez"
          caption="Sotero, María, Braulio, and Francisco in Antón Ruíz, 1910"
          src="1910-sotero-maria-household.jpg"
        />
        <SlideNav current={10} total={totalSlides} />
      </section>

      <section className="deck-slide" data-slide id="slide-11">
        <div className="slide-copy">
          <p className="slide-kicker">Sotero’s parents</p>
          <h2>Atilano Vázquez + Juana Regina Rodríguez</h2>
          <div className="evidence-step">
            <span>Connection</span>
            <strong>Repeated across six original records</strong>
            <p>
              Sotero’s marriage and death, and records for Juan, Victorio, Juan
              del Carmen, and Francisco, name Atilano and Juana.
            </p>
          </div>
          <div className="evidence-step">
            <span>Their own record</span>
            <strong>Married 10 February 1849 in Yabucoa</strong>
            <p>
              Atilano is the son of Máximo Vázquez and Josefa de Rivera. Juana
              is the daughter of Andrés and Francisca Díaz.
            </p>
          </div>
          <div className="slide-links">
            <Link href="/people/atilano-vazquez">Atilano’s profile →</Link>
            <Link href="/people/juana-rodriguez">Juana’s profile →</Link>
          </div>
        </div>
        <aside className="slide-sibling-cloud">
          <p>Atilano’s documented siblings</p>
          <span>Juana Jacinta</span>
          <span>Andrea</span>
          <span>Juan de Dios</span>
          <span>Miguel de los Santos</span>
          <span>Francisco Solano</span>
          <span>Manuel</span>
          <span>María</span>
        </aside>
        <SlideNav current={11} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-12">
        <div className="slide-copy">
          <p className="slide-kicker">The 1805 bridge</p>
          <h2>Máximo Basquez + Josefa Ribera</h2>
          <ul className="slide-findings">
            <li>Married 31 December 1805 in Humacao.</li>
            <li>
              Máximo’s parents: Francisco and María Cortez; Francisco’s
              surname is omitted here.
            </li>
            <li>Josefa’s parents: Luís and Isidora Rodríguez.</li>
            <li>The record does not state a surname for either father.</li>
          </ul>
          <p className="slide-caution">
            A later child baptism calls Máximo a native of Caguas and Josefa a
            native of Humacao, and describes both as <i>pardos libres</i>.
          </p>
          <div className="slide-links">
            <Link href="/people/maximo-vazquez">Máximo’s profile →</Link>
            <Link href="/people/josefa-rivera">Josefa’s profile →</Link>
          </div>
        </div>
        <RecordImage
          alt="1805 Humacao marriage of Máximo Basquez and Josefa Ribera"
          caption="The marriage entry continues across the facing pages"
          src="1805-maximo-josefa-marriage.jpg"
        />
        <SlideNav current={12} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-13">
        <div className="slide-copy">
          <p className="slide-kicker">Máximo’s Caguas family</p>
          <h2>Four earlier records supply the fuller parent names.</h2>
          <ul className="slide-findings">
            <li>
              <b>1786:</b> Miguel’s baptism names Francisco Vázquez and María
              Magdalena.
            </li>
            <li>
              <b>1793:</b> María de los Ángeles’s burial repeats the couple.
            </li>
            <li>
              <b>1794:</b> María Magdalena Cortés’s burial names husband
              Francisco Vázquez.
            </li>
            <li>
              <b>1801:</b> José Vázquez’s burial names Francisco and María
              Cortés.
            </li>
          </ul>
          <p className="slide-caution">
            This strongly identifies Máximo’s parents and three probable
            siblings. Máximo’s own baptism is still missing, so the sibling
            links are not presented as direct baptismal proof.
          </p>
          <div className="slide-links">
            <Link href="/people/francisco-father-of-maximo-vazquez">
              Francisco’s profile →
            </Link>
            <Link href="/people/maria-cortez">María’s profile →</Link>
          </div>
        </div>
        <RecordImage
          alt="1794 Caguas burial of María Magdalena Cortés, wife of Francisco Vázquez"
          caption="María Magdalena Cortés’s 1794 Caguas burial"
          src="1794-maria-magdalena-cortes-burial.jpg"
        />
        <SlideNav current={13} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-14">
        <div className="slide-copy">
          <p className="slide-kicker">Josefa’s family</p>
          <h2>Three records establish the Luís de Rivera household.</h2>
          <ol className="numbered-evidence">
            <li>
              <b>1790:</b> Simona’s baptism names Luís de Rivera and Isidora
              Rodríguez.
            </li>
            <li>
              <b>1792:</b> Ysabel’s baptism names the same parents.
            </li>
            <li>
              <b>1805:</b> Simona’s and Josefa’s marriages each name Luís and
              Isidora.
            </li>
          </ol>
          <p>
            These are independent original entries. They supply Luís’s surname
            without assuming it from Josefa’s later name.
          </p>
          <div className="slide-links">
            <Link href="/people/josefa-rivera">Josefa’s profile →</Link>
            <Link href="/people/simona-ribera">Simona’s profile →</Link>
          </div>
        </div>
        <RecordImage
          alt="1790 Las Piedras baptism of Simona"
          caption="Simona, daughter of Luís de Rivera and Isidora Rodríguez"
          src="1790-simona-rivera-baptism.jpg"
        />
        <SlideNav current={14} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-15">
        <div className="slide-copy">
          <p className="slide-kicker">One generation farther</p>
          <h2>Luís de Rivera names Roque and Marciana Delgado.</h2>
          <ul className="slide-findings">
            <li>Luís was buried in Humacao on 20 April 1811, about age 50.</li>
            <li>He was a native of that district.</li>
            <li>His parents were Roque and Marciana Delgado.</li>
            <li>His wife was Isidora Rodríguez.</li>
            <li>The entry names nine children, including Josefa and Simona.</li>
          </ul>
          <p className="slide-caution">
            The manuscript day is faint; the attached index resolves the
            burial as 20 April. The record does not separately state an exact
            day of death.
          </p>
          <Link
            className="slide-profile-link"
            href="/people/luis-father-of-josefa-rivera"
          >
            Open Luís’s complete profile →
          </Link>
        </div>
        <RecordImage
          alt="1811 Humacao burial entry for Luís de Rivera"
          caption="Luís de Rivera’s burial entry · 20 April 1811"
          src="1811-luis-de-rivera-death.jpg"
        />
        <SlideNav current={15} total={totalSlides} />
      </section>

      <section className="deck-slide frontier-slide" data-slide id="slide-16">
        <div className="slide-copy">
          <p className="slide-kicker">Where the trail stands</p>
          <h2>The earliest proven places are still in Puerto Rico.</h2>
          <div className="frontier-columns">
            <div>
              <span>Place documented</span>
              <strong>Máximo Vázquez</strong>
              <p>Caguas, Puerto Rico</p>
              <strong>Josefa Rivera</strong>
              <p>Humacao, Puerto Rico</p>
              <strong>Luís de Rivera</strong>
              <p>Humacao district, Puerto Rico</p>
            </div>
            <div>
              <span>Birthplace not yet documented</span>
              <strong>Francisco Vázquez</strong>
              <strong>María Magdalena Cortés</strong>
              <strong>Roque</strong>
              <strong>Marciana Delgado</strong>
              <strong>Isidora Rodríguez</strong>
            </div>
          </div>
          <p className="frontier-answer">
            No reviewed record yet identifies a direct ancestor born in Africa,
            Europe, the Canary Islands, or another Caribbean colony. Those are
            research routes—not family facts.
          </p>
          <div className="slide-links">
            <Link href="/research#origins">See the origin research →</Link>
            <Link href="/people">Explore every person →</Link>
          </div>
        </div>
        <aside className="family-invitation">
          <span>What the family can add</span>
          <p>Old certificates</p>
          <p>Family Bibles</p>
          <p>Photographs with names</p>
          <p>Letters and funeral cards</p>
          <p>Stories—with who told them</p>
        </aside>
        <SlideNav current={16} total={totalSlides} />
      </section>
    </main>
  );
}
