import Link from "next/link";
import { Badge } from "@signal-css/react";
import { SiteFooter } from "@/site/site-footer";
import { SiteHeader } from "@/site/site-header";

export function HomePageContent() {
  return <div className="shell" data-signal>
    <SiteHeader current="home" />
    <main id="home-content">
      <header className="readable">
        <p className="muted">A small CSS framework for real interfaces</p>
        <Badge tone="success">Signal CSS + React Components</Badge>
        <h1>Build the product. Keep the browser.</h1>
        <p>Signal CSS gives semantic HTML a shared layout rhythm, responsive behavior, accessible states, and a few useful patterns. React is optional; the framework works as a stylesheet in any HTML project.</p>
        <nav className="row" aria-label="Homepage links">
          <Link href="/docs">Read the docs →</Link>
          <Link href="/docs/getting-started">Install Signal CSS →</Link>
          <a href="https://components.signalcss.dev">React Components →</a>
        </nav>
      </header>
      <section aria-labelledby="site-sections">
        <header>
          <h2 id="site-sections">Site sections</h2>
          <p className="muted">Start with the framework contract, then choose the layer you need.</p>
        </header>
        <div className="auto-grid">
          <article className="card">
            <p className="label">01 / Documentation</p>
            <h2>Understand the contract.</h2>
            <p className="help">Learn why Signal starts with native HTML and how the shared CSS layers fit together.</p>
            <p><Link href="/docs">Open documentation →</Link></p>
          </article>
          <article className="card">
            <p className="label">02 / CSS API</p>
            <h2>Compose native patterns.</h2>
            <p className="help">Learn the selectors, tokens, layout primitives, states, and accessibility rules that make the stylesheet portable.</p>
            <p><Link href="/docs/foundations">Open the CSS API →</Link></p>
          </article>
          <article className="card">
            <p className="label">03 / React optional</p>
            <h2>Add components when useful.</h2>
            <p className="help">The companion React library adds behavior and composition while keeping Signal CSS as its styling foundation.</p>
            <p><a href="https://components.signalcss.dev">Open React Components →</a></p>
          </article>
        </div>
      </section>
      <section className="grid two">
        <article className="card">
          <h2>HTML first</h2>
          <p>Native headings, links, buttons, forms, tables, disclosure, progress, and meter controls remain the source of truth.</p>
          <pre className="code-block"><code>{`<article class="card">\n  <h2>System health</h2>\n  <progress value="98" max="100">98%</progress>\n</article>`}</code></pre>
        </article>
        <article className="card">
          <h2>React when useful</h2>
          <p>React wrappers provide state and composition without replacing the CSS contract. They are an optional companion package.</p>
          <p><a href="https://components.signalcss.dev">Visit the React Components site →</a></p>
          <div className="callout callout-info" role="status">
            <strong>One framework, every section.</strong>
            <p>The landing page, docs, and reference examples all use the same Signal CSS file.</p>
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  </div>;
}
