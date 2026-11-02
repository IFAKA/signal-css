import Link from "next/link";
import { Badge } from "@signal-css/react";
import { DocsSidebar } from "@/docs/layout";
import { docsPages } from "@/docs/docs-registry";

export default function DocsPage() {
  return <>
    <DocsSidebar />
    <main id="docs-overview">
      <header className="readable">
        <p className="muted">Signal CSS / browser-first framework</p>
        <Badge tone="success">Signal CSS + React Components</Badge>
        <h1>Documentation that keeps the browser in the room.</h1>
        <p>Learn the shared layout rhythm, semantic patterns, and accessibility contract behind Signal CSS. Each topic is a standalone route you can link to and revisit directly.</p>
        <p className="callout callout-info">Signal CSS is the framework-agnostic styling foundation. The companion React Components site adds optional behavior and composition without changing the browser-first CSS contract.</p>
      </header>
      <section aria-labelledby="start-title" className="grid two">
        <article className="card">
          <h2 id="start-title">Start here</h2>
          <p>Install the stylesheet, add <code>data-signal</code>, and build from native HTML.</p>
          <p><Link href="/docs/getting-started">Read getting started →</Link></p>
        </article>
        <article className="card">
          <h2>The contract</h2>
          <ul><li>One shared stylesheet</li><li>Native controls stay recognizable</li><li>Responsive layouts without utility sprawl</li><li>Keyboard and reduced-motion aware</li></ul>
        </article>
      </section>
      <section aria-labelledby="topics-title">
        <header><h2 id="topics-title">Framework reference</h2><p className="muted">Choose a focused topic instead of scanning one long page.</p></header>
        <div className="auto-grid">{docsPages.map(page => <article className="card" key={page.route}><p className="label">{page.eyebrow}</p><h3><Link href={`/docs/${page.route}`}>{page.title}</Link></h3><p className="help">{page.summary}</p><p><span className="badge badge-neutral">{page.capabilities.length} patterns</span></p></article>)}</div>
      </section>
    </main>
  </>;
}
