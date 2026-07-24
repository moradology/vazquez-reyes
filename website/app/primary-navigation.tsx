import Link from "next/link";

export type PrimaryPage =
  | "story"
  | "people"
  | "timeline"
  | "presentation"
  | "research";

const primaryLinks: Array<{
  id: PrimaryPage;
  href: string;
  label: string;
}> = [
  { id: "story", href: "/", label: "Family story" },
  { id: "people", href: "/people", label: "People" },
  { id: "timeline", href: "/timeline", label: "Timeline" },
  { id: "presentation", href: "/presentation", label: "Presentation" },
  { id: "research", href: "/research", label: "Research" },
];

export function PrimaryNavigation({ current }: { current: PrimaryPage }) {
  return (
    <nav className="primary-nav" aria-label="Main sections">
      {primaryLinks.map((link) => (
        <Link
          aria-current={link.id === current ? "page" : undefined}
          href={link.href}
          key={link.id}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
