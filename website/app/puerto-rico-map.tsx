import { geographyEvents, geographyPlaces } from "./geography-data";
import {
  puertoRicoMapView,
  puertoRicoMunicipioShapes,
} from "./pr-map-shapes";

type MapGroup =
  | "cruz"
  | "mauricio-carmen"
  | "pedro-ana"
  | "rafael"
  | "juan-carlina"
  | "sotero-maria"
  | "atilano-juana"
  | "early-vazquez"
  | "marcelino-aurora";

type PuertoRicoMapProps = {
  group: MapGroup;
  eyebrow: string;
  title: string;
  summary: string;
  storyHref: string;
  tone: "reyes" | "vazquez";
};

type GeographyPlace = {
  id: string;
  label: string;
  kind: string;
  parent_ref?: string;
  geoid?: string;
  coordinates: readonly [number, number];
};

const typedPlaces = geographyPlaces as readonly GeographyPlace[];
const placesById = new Map(
  typedPlaces.map((place) => [place.id, place]),
);

function project([longitude, latitude]: readonly [number, number]) {
  const x =
    puertoRicoMapView.margin +
    ((longitude - puertoRicoMapView.minLon) /
      (puertoRicoMapView.maxLon - puertoRicoMapView.minLon)) *
      (puertoRicoMapView.width - puertoRicoMapView.margin * 2);
  const y =
    puertoRicoMapView.margin +
    ((puertoRicoMapView.maxLat - latitude) /
      (puertoRicoMapView.maxLat - puertoRicoMapView.minLat)) *
      (puertoRicoMapView.height - puertoRicoMapView.margin * 2);
  return [Number(x.toFixed(1)), Number(y.toFixed(1))] as const;
}

const baseLabels = [
  ["Caguas", [-66.0509643, 18.2111085]],
  ["Juncos", [-65.9085417, 18.2241334]],
  ["Gurabo", [-65.9809422, 18.2718899]],
  ["Naguabo", [-65.735749, 18.2110697]],
  ["Humacao", [-65.7862286, 18.1354025]],
  ["Yabucoa", [-65.8598696, 18.059859]],
  ["Fajardo", [-65.588454, 18.3863776]],
] as const;

export function PuertoRicoMapDefinitions() {
  return (
    <svg
      aria-hidden="true"
      className="pr-map-definitions"
      width="0"
      height="0"
      focusable="false"
    >
      <defs>
        <g id="puerto-rico-municipio-base">
          {puertoRicoMunicipioShapes.map((shape) => (
            <path d={shape.path} key={shape.id} />
          ))}
        </g>
      </defs>
    </svg>
  );
}

export function PuertoRicoMap({
  group,
  eyebrow,
  title,
  summary,
  storyHref,
  tone,
}: PuertoRicoMapProps) {
  const events = geographyEvents
    .filter((event) => (event.map_groups as readonly string[]).includes(group))
    .sort((a, b) => a.sequence - b.sequence);

  const stops = events.reduce<
    Array<{
      place: GeographyPlace;
      firstSequence: number;
      eventCount: number;
    }>
  >((result, event) => {
    const place = placesById.get(event.place_ref);
    if (!place) return result;
    const existing = result.find((stop) => stop.place.id === place.id);
    if (existing) {
      existing.eventCount += 1;
    } else {
      result.push({ place, firstSequence: event.sequence, eventCount: 1 });
    }
    return result;
  }, []);

  const route = stops.map((stop) => project(stop.place.coordinates)).join(" ");
  const activeMunicipios = new Set(
    stops
      .map((stop) =>
        stop.place.kind === "municipio"
          ? stop.place.geoid
          : placesById.get(stop.place.parent_ref ?? "")?.geoid,
      )
      .filter(Boolean),
  );

  return (
    <article
      className={`pr-life-map pr-life-map-${tone}`}
      data-pr-map={group}
    >
      <div className="pr-life-map-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>

      <figure>
        <svg
          viewBox={`0 0 ${puertoRicoMapView.width} ${puertoRicoMapView.height}`}
          role="img"
          aria-label={`${title} in Puerto Rico. The same map of Puerto Rico used throughout this page, highlighting documented places for this life or couple.`}
        >
          <rect className="pr-map-water" width="800" height="320" />
          <text className="pr-map-water-label" x="38" y="48">
            ATLANTIC OCEAN
          </text>
          <text className="pr-map-water-label" x="286" y="302">
            CARIBBEAN SEA
          </text>
          <use
            className="pr-map-municipios"
            href="#puerto-rico-municipio-base"
          />
          <g className="pr-map-active-municipios">
            {puertoRicoMunicipioShapes
              .filter((shape) => activeMunicipios.has(shape.id))
              .map((shape) => (
              <path
                className="pr-map-municipio-active"
                d={shape.path}
                data-geoid={shape.id}
                key={shape.id}
              />
              ))}
          </g>
          <g className="pr-map-labels" aria-hidden="true">
            {baseLabels.map(([label, coordinates]) => {
              const [x, y] = project(coordinates);
              return (
                <text x={x + 5} y={y - 5} key={label}>
                  {label}
                </text>
              );
            })}
          </g>
          {route && (
            <polyline
              className="pr-map-route"
              points={route}
              vectorEffect="non-scaling-stroke"
            />
          )}
          <g className="pr-map-stops">
            {stops.map((stop, index) => {
              const [x, y] = project(stop.place.coordinates);
              return (
                <g
                  transform={`translate(${x} ${y})`}
                  data-place-ref={stop.place.id}
                  key={stop.place.id}
                >
                  <circle
                    className={
                      stop.place.kind === "barrio"
                        ? "pr-map-stop barrio"
                        : "pr-map-stop municipio"
                    }
                    r="9"
                  />
                  <text y="3.2">{index + 1}</text>
                </g>
              );
            })}
          </g>
          <rect className="pr-map-neatline" x="6" y="6" width="788" height="308" />
          <g className="pr-map-north" aria-hidden="true">
            <text x="758" y="37">N</text>
            <path d="M758 44V67M753 51L758 44L763 51" />
          </g>
        </svg>
        <figcaption>
          <span>Same island, same scale</span>
          <span>Numbered points follow the record sequence</span>
        </figcaption>
      </figure>

      <ol className="pr-life-events">
        {events.map((event) => (
          <li key={event.id}>
            <span>{event.map_label}</span>
            <p>{event.map_note}</p>
          </li>
        ))}
      </ol>
      <a className="pr-map-link" href={storyHref}>
        Follow this branch →
      </a>
    </article>
  );
}
