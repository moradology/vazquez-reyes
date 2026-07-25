const openRoutes = [
  {
    place: "Africa",
    note: "No African-born person or specific place has been identified.",
  },
  {
    place: "Europe",
    note: "No European-born person or specific place has been identified.",
  },
  {
    place: "Another Caribbean island",
    note: "No person, port, or island has been identified.",
  },
];

export function OriginFrontier() {
  return (
    <section className="section origin-frontier" id="origins">
      <div className="section-label">
        <span>03</span>
        <p>Where the records begin</p>
      </div>

      <div className="origin-heading">
        <p className="eyebrow">The current edge of the family tree</p>
        <h2>Caguas and Humacao are secure. Coamo is now a live question.</h2>
        <p>
          The first people whose native places are stated in the records are
          Máximo Vázquez of Caguas and Josefa Rivera of Humacao. Their 1805
          marriage names both parent pairs. Earlier Caguas records now identify
          Máximo’s parents more fully as Francisco Vázquez and María Magdalena
          Cortés. On Josefa’s line, Juan Antonio’s 1808 baptism calls Luís de
          Rivera a native of Coamo, while two 1811 records call him a native of
          Humacao. The surviving Caguas marriage material has been checked back
          to 1734 without naming an earlier place. The disagreement remains
          open.
        </p>
      </div>

      <div className="origin-family" aria-label="Earliest documented Vázquez family">
        <article className="origin-line origin-line-maximo">
          <header>
            <span>Máximo’s parents</span>
            <strong>
              <b data-person-id="person.francisco-father-of-maximo-vazquez">
                Francisco Vázquez
              </b>
              <br />
              <b data-person-id="person.maria-cortez">
                María Magdalena Cortés
              </b>
            </strong>
            <small>
              Birthplaces open · María buried in Caguas, 17 June 1794
            </small>
          </header>
          <div className="origin-descent" aria-hidden="true">
            <i />
            <b>their son</b>
          </div>
          <div className="origin-person" data-person-id="person.maximo-vazquez">
            <span>Native of Caguas</span>
            <h3>Máximo Vázquez</h3>
            <p>
              Recorded as Máximo Basquez at his marriage in 1805; three
              probable siblings now appear in the earlier Caguas household
            </p>
          </div>
        </article>

        <div className="origin-marriage">
          <span>married</span>
          <strong>31 December 1805</strong>
          <small>Humacao</small>
        </div>

        <article className="origin-line origin-line-josefa">
          <header>
            <span>Luís’s parents</span>
            <strong>
              <b data-person-id="person.roque-father-of-luis-de-rivera">
                Roque [surname not stated]
              </b>
              <br />
              <b data-person-id="person.marciana-delgado">Marciana Delgado</b>
            </strong>
            <small>Named in Luís’s 1811 burial · birthplaces open</small>
          </header>
          <div className="origin-descent" aria-hidden="true">
            <i />
            <b>their son and his wife</b>
          </div>
          <div
            className="origin-person"
            data-person-id="person.luis-father-of-josefa-rivera"
          >
            <span>Luís: Coamo in 1808 · Humacao in 1811</span>
            <h3>
              Luís de Rivera +{" "}
              <b data-person-id="person.isidora-rodriguez">
                Isidora Rodríguez
              </b>
            </h3>
            <p>
              His 1811 burial names Roque and Marciana; two child baptisms call
              Isidora a native of Humacao
            </p>
          </div>
          <div className="origin-descent" aria-hidden="true">
            <i />
            <b>their daughter</b>
          </div>
          <div className="origin-person" data-person-id="person.josefa-rivera">
            <span>Native of Humacao</span>
            <h3>Josefa Rivera</h3>
            <p>Recorded as Josefa Ribera at her marriage in 1805</p>
          </div>
        </article>
      </div>

      <div className="record-boundary">
        <span>Current documented boundary in Puerto Rico</span>
      </div>

      <div className="origin-open">
        <div>
          <p className="eyebrow">Routes still to test</p>
          <h3>No record yet names an overseas-born ancestor.</h3>
          <p>
            A 1765 Coamo baptism is a strong candidate for Luís because it names
            a child Luís and father Roque de Rivera. It also names mother
            Emerenciana Tirado, conflicting with the direct 1811 record’s
            Marciana Delgado. The wider six-child Coamo cluster also introduces
            Francisca Luna as a mother while retaining Emerenciana as a
            godmother. Until those identities are resolved, it remains a
            nearby household—not an extension of this tree.
          </p>
        </div>
        <div className="origin-route-grid">
          {openRoutes.map((route) => (
            <article key={route.place}>
              <span>OPEN</span>
              <strong>{route.place}</strong>
              <p>{route.note}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="classification-note">
        <strong>What the 1819 record does say</strong>
        <p>
          A son’s baptism describes Máximo and Josefa as <i>pardos libres</i>.
          That is the parish’s colonial racial and legal classification for
          them: pardo and free. It does not name an overseas birthplace or
          provide a modern ancestry percentage.
        </p>
        <a href="/research#origins">See the record trail and coverage gaps →</a>
      </aside>
    </section>
  );
}
