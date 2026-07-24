import type { ReactNode } from "react";
import Link from "next/link";
import { PrimaryNavigation, type PrimaryPage } from "./primary-navigation";
import { ResearchTools } from "./research-tools";

export function SiteHeader({
  actions,
  current,
  variant = "light",
}: {
  actions?: ReactNode;
  current: PrimaryPage;
  variant?: "light" | "dark";
}) {
  return (
    <header className={`site-header site-header-${variant}`}>
      <Link
        className="wordmark site-wordmark"
        href="/"
        aria-label="Vazquez–Reyes family history home"
      >
        <span>V</span>
        <i />
        <span>R</span>
        <strong>Vazquez–Reyes</strong>
      </Link>
      <PrimaryNavigation current={current} />
      <div className="site-header-actions">
        {actions === undefined ? <ResearchTools /> : actions}
      </div>
    </header>
  );
}
