type ArchiveImageProps = {
  alt: string;
  citation: string;
  id: string;
  sourceHref: string;
  sourceLabel: string;
  src: string;
  triggerClassName?: string;
  zoomLabel: string;
};

export function ArchiveImage({
  alt,
  citation,
  id,
  sourceHref,
  sourceLabel,
  src,
  triggerClassName,
  zoomLabel,
}: ArchiveImageProps) {
  return (
    <div className="archive-image-shell">
      <button
        aria-label={zoomLabel}
        className={`archive-image-trigger ${triggerClassName ?? ""}`}
        data-archive-image-trigger={id}
        popoverTarget={id}
        type="button"
      >
        <img alt={alt} src={src} />
        <span className="archive-image-zoom">View full size</span>
      </button>

      <div
        aria-label={zoomLabel}
        className="archive-image-viewer"
        data-archive-image-viewer={id}
        id={id}
        popover="auto"
        role="dialog"
      >
        <div className="archive-image-viewer-inner">
          <button
            className="archive-image-close"
            popoverTarget={id}
            popoverTargetAction="hide"
            type="button"
          >
            Close
          </button>
          <img alt={alt} src={src} />
          <p>
            <span>{citation}</span>
            <a href={sourceHref} rel="noreferrer" target="_blank">
              {sourceLabel} ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
