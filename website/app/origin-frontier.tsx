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
        <h2>The earliest stated origins are Caguas and Humacao.</h2>
        <p>
          The first people whose native places are stated in the records are
          Máximo Vázquez of Caguas and Josefa Rivera of Humacao. Their 1805
          marriage names both parent pairs. Earlier baptisms of Josefa’s
          sisters supply her father’s full name, but still give neither parent
          a birthplace.
        </p>
      </div>

      <div className="origin-family" aria-label="Earliest documented Vázquez family">
        <article className="origin-line origin-line-maximo">
          <header>
            <span>Máximo’s parents</span>
            <strong>
              <b data-person-id="person.francisco-father-of-maximo-vazquez">
                Francisco [surname not stated]
              </b>
              <br />
              <b data-person-id="person.maria-cortez">María Cortez</b>
            </strong>
            <small>Birthplaces and dates not yet found</small>
          </header>
          <div className="origin-descent" aria-hidden="true">
            <i />
            <b>their son</b>
          </div>
          <div className="origin-person" data-person-id="person.maximo-vazquez">
            <span>Native of Caguas</span>
            <h3>Máximo Vázquez</h3>
            <p>Recorded as Máximo Basquez at his marriage in 1805</p>
          </div>
        </article>

        <div className="origin-marriage">
          <span>married</span>
          <strong>31 December 1805</strong>
          <small>Humacao</small>
        </div>

        <article className="origin-line origin-line-josefa">
          <header>
            <span>Josefa’s parents</span>
            <strong>
              <b data-person-id="person.luis-father-of-josefa-rivera">
                Luís de Rivera
              </b>
              <br />
              <b data-person-id="person.isidora-rodriguez">
                Isidora Rodríguez
              </b>
            </strong>
            <small>
              Daughters Simona and Ysabel were baptized at Las Piedras in 1790
              and 1792; the parents’ own dates and birthplaces remain unknown
            </small>
          </header>
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
        <span>Current record boundary</span>
      </div>

      <div className="origin-open">
        <div>
          <p className="eyebrow">Routes still to test</p>
          <h3>No record yet names an overseas-born ancestor.</h3>
          <p>
            These are possibilities to investigate, not family origins already
            established.
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
