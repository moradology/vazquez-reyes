import Link from "next/link";

type PrimaryPage = "story" | "people" | "presentation" | "research";

const primaryLinks: Array<{
  id: PrimaryPage;
  href: string;
  label: string;
}> = [
  { id: "story", href: "/", label: "Family story" },
  { id: "people", href: "/people", label: "People" },
  { id: "presentation", href: "/presentation", label: "Presentation" },
  { id: "research", href: "/research", label: "Research" },
];

export function PrimaryNavigation({ current }: { current: PrimaryPage }) {
  return (
    <nav className="primary-nav" aria-label="Primary navigation">
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
