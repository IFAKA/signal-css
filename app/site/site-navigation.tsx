import Link from "next/link";

export type SiteSection = "home" | "docs";

const links: Array<[label: string, href: string, section: SiteSection]> = [
  ["Docs", "/docs", "docs"],
];

export function SiteNavigation({ current }: { current: SiteSection }) {
  return <nav className="row spread" aria-label="Site navigation">
    <div className="cluster">
      <Link href="/" aria-current={current === "home" ? "page" : undefined}>Signal CSS</Link>
    </div>
    <div className="cluster">
      {links.map(([label, href, section]) => <Link key={section} href={href} aria-current={current === section ? "page" : undefined}>{label}</Link>)}
      <a href="https://components.signalcss.dev">React Components</a>
    </div>
  </nav>;
}
