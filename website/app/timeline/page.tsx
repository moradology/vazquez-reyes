import { SiteHeader } from "../site-header";
import { timelineEvents, timelinePeople } from "../timeline-data";
import { TimelineExplorer } from "./timeline-explorer";

export const metadata = {
  title: "Timeline · Vazquez–Reyes Family History",
  description:
    "A chronological view of the documented Vazquez-Reyes family record, from eighteenth-century Puerto Rico to New York.",
};

export default function TimelinePage() {
  const directEvents = timelineEvents.filter((event) => event.directLine).length;

  return (
    <main className="timeline-page">
      <SiteHeader current="timeline" />

      <section className="timeline-page-hero">
        <p className="hero-kicker">One chronology, two family lines</p>
        <h1>Family timeline</h1>
        <p>
          Follow the Reyes–Díaz and Vázquez–Perales families through the dated
          records. Shared events bridge the two sides when Cruz and Rafael’s
          stories meet in New York.
        </p>
        <div className="timeline-page-summary" aria-label="Timeline coverage">
          <span>
            <strong>{directEvents}</strong> direct-line events
          </span>
          <span>
            <strong>{timelineEvents.length}</strong> events with relatives
          </span>
          <span>
            <strong>{timelinePeople.length}</strong> people with dated records
          </span>
        </div>
      </section>

      <TimelineExplorer events={timelineEvents} people={timelinePeople} />
    </main>
  );
}
