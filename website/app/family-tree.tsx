import Link from "next/link";

type TreePerson = {
  number: number;
  name: string;
  detail: string;
  href: string;
  personId?: string;
  status?: "documented" | "open";
};

const cruzPeople: TreePerson[] = [
  { number: 1, name: "Cruz Reyes Díaz", detail: "1915–1998 · Gurabo", href: "#family", personId: "person.cruz-reyes-vasquez" },
  { number: 2, name: "Mauricio Reyes Martínez", detail: "c. 1881–after 1940", href: "#story-mauricio-carmen", personId: "person.mauricio-reyes" },
  { number: 3, name: "Carmen Díaz García", detail: "c. 1887–after 1940", href: "#story-mauricio-carmen", personId: "person.carmen-diaz" },
  { number: 4, name: "Pedro Reyes", detail: "c. 1842–1918", href: "#story-pedro-ana", personId: "person.pedro-reyes" },
  { number: 5, name: "Ana / Anastasia Martínez", detail: "c. 1854–1918", href: "#story-pedro-ana", personId: "person.ana-martinez" },
  { number: 6, name: "Lope Díaz Figueroa", detail: "c. 1858–1929", href: "#story-lope-reyes", personId: "person.lope-diaz-figueroa" },
  { number: 7, name: "Reyes García Olivero", detail: "c. 1862–1933", href: "#story-lope-reyes", personId: "person.reyes-garcia-olivero" },
  { number: 8, name: "Ramón Reyes", detail: "life dates open", href: "#story-ramon-ines", personId: "person.ramon-reyes" },
  { number: 9, name: "Inés Castro", detail: "life dates open", href: "#story-ramon-ines", personId: "person.ines-castro" },
  { number: 10, name: "Dámaso Martínez", detail: "life dates open", href: "#story-damaso-maria", personId: "person.damaso-martinez" },
  { number: 11, name: "María Rivera", detail: "life dates open", href: "#story-damaso-maria", personId: "person.maria-rivera" },
  { number: 12, name: "Manuel María Díaz", detail: "Naguabo · before 1920", href: "#story-lope-reyes", personId: "person.manuel-diaz" },
  { number: 13, name: "Carmen Figueroa", detail: "Naguabo · before 1920", href: "#story-lope-reyes", personId: "person.carmen-figueroa" },
  { number: 14, name: "Bautista García", detail: "Naguabo · dates open", href: "#story-lope-reyes", personId: "person.bautista-garcia" },
  { number: 15, name: "Carmen Olivero", detail: "Naguabo · name conflict", href: "#story-lope-reyes", personId: "person.carmen-olivero" },
];

const rafaelPeople: TreePerson[] = [
  { number: 1, name: "Rafael Vázquez Perales", detail: "1906–1984 · Humacao", href: "#family", personId: "person.rafael-vazquez-perales" },
  { number: 2, name: "Juan de la Rosa Vázquez", detail: "1878–1951", href: "#story-juan-carlina", personId: "person.juan-vazquez-rodriguez" },
  { number: 3, name: "Carlina Perales Pérez", detail: "c. 1881–1922", href: "#story-juan-carlina", personId: "person.carlina-perales-perez" },
  { number: 4, name: "Sotero Vázquez Rodríguez", detail: "birth year disputed–1916", href: "#story-sotero-rodriguez", personId: "person.sotero-vazquez" },
  { number: 5, name: "Carmen / María Eugenia Rodríguez", detail: "identity link under study", href: "#story-sotero-rodriguez", personId: "person.maria-eugenia-rodriguez" },
  { number: 6, name: "Marcelino Perales Medina", detail: "c. 1841–1891", href: "#story-marcelino-aurora", personId: "person.marcelino-perales-medina" },
  { number: 7, name: "Aurora Pérez", detail: "c. 1840–after 1940", href: "#story-marcelino-aurora", personId: "person.aurora-perez" },
  { number: 8, name: "Atilano Vázquez", detail: "c. 1828–1898", href: "#story-atilano-juana", personId: "person.atilano-vazquez" },
  { number: 9, name: "Juana Regina Rodríguez", detail: "died 1863–1870", href: "#story-atilano-juana", personId: "person.juana-rodriguez" },
  { number: 12, name: "Abal / Abel Perales", detail: "Naguabo · died before 1891", href: "#story-marcelino-aurora", personId: "person.abal-perales" },
  { number: 13, name: "Vicenta Medina", detail: "Naguabo · died before 1891", href: "#story-marcelino-aurora", personId: "person.vicenta-medina" },
  { number: 16, name: "Máximo Vázquez", detail: "from Caguas · dates open", href: "#story-maximo-josefa", personId: "person.maximo-vazquez" },
  { number: 17, name: "Josefa Rivera", detail: "from Humacao · dates open", href: "#story-maximo-josefa", personId: "person.josefa-rivera" },
  { number: 18, name: "Andrés [Rodríguez]", detail: "surname inferred", href: "#story-andres-francisca", personId: "person.andres-rodriguez" },
  { number: 19, name: "Francisca Díaz", detail: "life dates open", href: "#story-andres-francisca", personId: "person.francisca-diaz" },
];

function position(number: number) {
  const generation = Math.floor(Math.log2(number));
  const index = number - 2 ** generation;
  const x = 20 + generation * 250;
  const y = 24 + ((index + 0.5) * 624) / 2 ** generation;
  return { generation, x, y };
}

function PedigreeChart({
  title,
  branch,
  people,
}: {
  title: string;
  branch: "reyes" | "vazquez";
  people: TreePerson[];
}) {
  const known = new Map(people.map((person) => [person.number, person]));
  const nodes = Array.from({ length: 31 }, (_, index) => {
    const number = index + 1;
    return (
      known.get(number) ?? {
        number,
        name: "Earlier parents",
        detail: "not yet identified",
        href: "/research#searches",
        status: "open" as const,
      }
    );
  });

  return (
    <article className={`pedigree pedigree-${branch}`}>
      <header>
        <p>{branch === "reyes" ? "Cruz’s line" : "Rafael’s line"}</p>
        <h3>{title}</h3>
        <span>Choose any named person to follow that branch</span>
      </header>
      <div className="pedigree-scroll" tabIndex={0}>
        <svg
          viewBox="0 0 1255 672"
          role="img"
          aria-label={`${title}, five-generation ancestor tree`}
        >
          <g className="pedigree-generation-labels" aria-hidden="true">
            {["Starting person", "Parents", "Grandparents", "Great-grandparents", "Earlier generation"].map(
              (label, generation) => (
                <text x={20 + generation * 250} y="15" key={label}>
                  {label}
                </text>
              ),
            )}
          </g>
          <g className="pedigree-connectors" aria-hidden="true">
            {nodes
              .filter((node) => node.number < 16)
              .flatMap((node) => {
                const child = position(node.number);
                return [node.number * 2, node.number * 2 + 1].map(
                  (parentNumber) => {
                    const parent = position(parentNumber);
                    const middle = child.x + 225 + 12.5;
                    return (
                      <path
                        d={`M${child.x + 225},${child.y}H${middle}V${parent.y}H${parent.x}`}
                        key={`${node.number}-${parentNumber}`}
                      />
                    );
                  },
                );
              })}
          </g>
          <g className="pedigree-nodes">
            {nodes.map((person) => {
              const { generation, x, y } = position(person.number);
              const open = person.status === "open";
              const nodeHeight = generation === 4 ? 29 : 42;
              return (
                <a
                  href={
                    person.personId
                      ? `/people/${person.personId.replace(/^person\./, "")}`
                      : person.href
                  }
                  data-tree-person={person.personId}
                  data-tree-open={open ? "true" : undefined}
                  key={person.number}
                >
                  <g
                    className={open ? "pedigree-node open" : "pedigree-node"}
                    transform={`translate(${x} ${y - nodeHeight / 2})`}
                  >
                    <rect width="225" height={nodeHeight} rx="1" />
                    <text x="9" y={generation === 4 ? 18 : 17}>
                      {person.name}
                    </text>
                    {generation < 4 && (
                      <text className="pedigree-node-detail" x="9" y="33">
                        {person.detail}
                      </text>
                    )}
                  </g>
                </a>
              );
            })}
          </g>
        </svg>
      </div>
    </article>
  );
}

export function FamilyTrees() {
  return (
    <section className="section family-trees" id="tree">
      <div className="section-label">
        <span>02</span>
        <p>Family trees</p>
      </div>
      <div className="tree-heading">
        <p className="eyebrow">Two branches, shown in order</p>
        <h2>Start with Cruz or Rafael. Then choose a path backward.</h2>
        <p>
          Each column is one generation earlier. Named boxes open the family
          story below; pale boxes mark the next records still to be found.
        </p>
      </div>
      <PedigreeChart
        title="The Reyes–Díaz ancestors"
        branch="reyes"
        people={cruzPeople}
      />
      <PedigreeChart
        title="The Vázquez–Perales ancestors"
        branch="vazquez"
        people={rafaelPeople}
      />
      <aside className="tree-continuation" aria-labelledby="earliest-vazquez-heading">
        <div>
          <p className="eyebrow">
            The chart continues through Caguas and Luís de Rivera
          </p>
          <h3 id="earliest-vazquez-heading">
            Three parent pairs, kept in order
          </h3>
          <p>
            The 1805 marriage names Máximo’s and Josefa’s parents separately.
            It omits Francisco’s surname, but four earlier Caguas originals
            identify the couple as Francisco Vázquez and María Magdalena
            Cortés. Luís’s 1811 burial then names his own parents, Roque and
            Marciana Delgado; Roque’s surname is still not supplied.
          </p>
        </div>
        <div className="tree-continuation-grid">
          <article>
            <span>Máximo’s parents</span>
            <strong>
              <Link href="/people/francisco-father-of-maximo-vazquez">
                Francisco Vázquez
              </Link>
              <Link href="/people/maria-cortez">
                María Magdalena Cortés
              </Link>
            </strong>
          </article>
          <article>
            <span>Josefa’s parents</span>
            <strong>
              <Link href="/people/luis-father-of-josefa-rivera">Luís de Rivera</Link>
              <Link href="/people/isidora-rodriguez">Isidora Rodríguez</Link>
            </strong>
          </article>
          <article>
            <span>Luís’s parents</span>
            <strong>
              <Link href="/people/roque-father-of-luis-de-rivera">
                Roque [surname not stated]
              </Link>
              <Link href="/people/marciana-delgado">Marciana Delgado</Link>
            </strong>
          </article>
        </div>
      </aside>
    </section>
  );
}
