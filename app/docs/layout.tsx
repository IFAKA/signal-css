import Link from "next/link";
import { SiteFooter } from "@/site/site-footer";
import { SiteHeader } from "@/site/site-header";
import { frameworkPages, htmlPatternPages } from "@/docs/docs-registry";

function DocsSidebar({ current }: { current?: string }) {
  return <aside className="sidebar">
    <p className="label">Documentation</p>
    <nav aria-label="Documentation">
      <ul className="menu-list">
        <li><Link href="/docs" aria-current={current === undefined ? "page" : undefined}>Overview</Link></li>
        <li><Link href="/docs/getting-started" aria-current={current === "getting-started" ? "page" : undefined}>Getting started</Link></li>
      </ul>
      <p className="label">Framework</p>
      <ul className="menu-list">{frameworkPages.filter(page => page.route !== "getting-started").map(page => <li key={page.route}><Link href={`/docs/${page.route}`} aria-current={current === page.route ? "page" : undefined}>{page.title}</Link></li>)}</ul>
      <p className="label">HTML patterns</p>
      <ul className="menu-list">{htmlPatternPages.map(page => <li key={page.route}><Link href={`/docs/${page.route}`} aria-current={current === page.route ? "page" : undefined}>{page.title}</Link></li>)}</ul>
    </nav>
  </aside>;
}

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="shell" data-signal>
    <SiteHeader current="docs" />
    <div className="layout">
      {children}
    </div>
    <SiteFooter />
  </div>;
}

export { DocsSidebar };
