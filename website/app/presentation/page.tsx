import Link from "next/link";
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
  return (
    <figure className="slide-record">
      <img alt={alt} src={`/records/${src}`} />
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

const totalSlides = 13;

export default function PresentationPage() {
  return (
    <main className="presentation-deck" data-presentation>
      <SiteHeader
        current="presentation"
        variant="dark"
        actions={
          <div className="presentation-actions">
          <span>Family evidence walkthrough</span>
          <button type="button" data-presentation-fullscreen>
            Present
          </button>
          </div>
        }
      />

      <section className="deck-slide title-slide" data-slide id="slide-01">
        <div className="slide-copy">
          <p className="slide-kicker">The Vazquez–Reyes family</p>
          <h1>
            How the records
            <br />
            <em>connect us</em>
          </h1>
          <p>
            A record-by-record walk from Cruz and Rafael in New York through
            eastern Puerto Rico and back to the earliest generation we can
            currently prove.
          </p>
          <span className="presentation-instruction">
            Use ← → or the space bar to move through the slides
          </span>
        </div>
        <div className="title-route" aria-label="Family route">
          <span>New York</span>
          <i />
          <span>Humacao</span>
          <i />
          <span>Naguabo · Yabucoa · Juncos · Caguas</span>
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

      <section className="deck-slide record-slide" data-slide id="slide-03">
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
        <SlideNav current={3} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-04">
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
        <SlideNav current={4} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-05">
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
        <SlideNav current={5} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-06">
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
        <SlideNav current={6} total={totalSlides} />
      </section>

      <section className="deck-slide" data-slide id="slide-07">
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
          <div className="slide-links">
            <Link href="/people/juan-vazquez-rodriguez">Juan’s profile →</Link>
            <Link href="/people/carlina-perales-perez">Carlina’s profile →</Link>
          </div>
        </div>
        <aside className="connection-ladder">
          <span>Rafael</span>
          <i />
          <strong>Juan + Carlina</strong>
          <i />
          <div>
            <span>Sotero + Carmen</span>
            <span>Marcelino + Aurora</span>
          </div>
        </aside>
        <SlideNav current={7} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-08">
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
        <SlideNav current={8} total={totalSlides} />
      </section>

      <section className="deck-slide" data-slide id="slide-09">
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
        <SlideNav current={9} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-10">
        <div className="slide-copy">
          <p className="slide-kicker">The 1805 bridge</p>
          <h2>Máximo Basquez + Josefa Ribera</h2>
          <ul className="slide-findings">
            <li>Married 31 December 1805 in Humacao.</li>
            <li>Máximo’s parents: Francisco and María Cortez.</li>
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
        <SlideNav current={10} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-11">
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
        <SlideNav current={11} total={totalSlides} />
      </section>

      <section className="deck-slide record-slide" data-slide id="slide-12">
        <div className="slide-copy">
          <p className="slide-kicker">One generation farther</p>
          <h2>Luís de Rivera names Roque and Marciana Delgado.</h2>
          <ul className="slide-findings">
            <li>Luís died in Humacao district in 1811, about age 50.</li>
            <li>He was a native of that district.</li>
            <li>His parents were Roque and Marciana Delgado.</li>
            <li>His wife was Isidora Rodríguez.</li>
            <li>The entry names nine children, including Josefa and Simona.</li>
          </ul>
          <p className="slide-caution">
            The exact day is too faint to state. The relationship, place,
            approximate age, parents, spouse, and child list are legible.
          </p>
          <Link
            className="slide-profile-link"
            href="/people/luis-father-of-josefa-rivera"
          >
            Open Luís’s complete profile →
          </Link>
        </div>
        <RecordImage
          alt="1811 Humacao death entry for Luís de Rivera"
          caption="Luís de Rivera’s 1811 death entry"
          src="1811-luis-de-rivera-death.jpg"
        />
        <SlideNav current={12} total={totalSlides} />
      </section>

      <section className="deck-slide frontier-slide" data-slide id="slide-13">
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
              <strong>Francisco</strong>
              <strong>María Cortez</strong>
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
        <SlideNav current={13} total={totalSlides} />
      </section>
    </main>
  );
}
