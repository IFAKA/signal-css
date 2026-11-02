import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsSidebar } from "@/docs/layout";
import { docsByRoute, docsPages, type DocsRoute } from "@/docs/docs-registry";

export function generateStaticParams() {
  return docsPages.map(page => ({ slug: page.route }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = docsByRoute[slug as DocsRoute];
    return page ? { title: `${page.title} — Signal CSS`, description: page.summary } : {};
  });
}

export default async function DocsTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = docsByRoute[slug as DocsRoute];
  if (!page) notFound();

  return <>
    <DocsSidebar current={page.route} />
    <main>
      <header className="readable">
        <p className="muted">Signal CSS / {page.category.toLowerCase()}</p>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
      </header>
      {page.capabilities.map(item => <section key={item.name} aria-labelledby={`${item.route}-${item.name.toLowerCase().replaceAll(" ", "-")}`}>
        <article className="card">
          <header><div><p className="label">{item.category}</p><h2 id={`${item.route}-${item.name.toLowerCase().replaceAll(" ", "-")}`}>{item.name}</h2></div><span className="badge badge-neutral">{item.selectors.join(" · ")}</span></header>
          <p>{item.description}</p>
          <div className="grid two">
            <div className="card">
              <p className="label">Rendered example</p>
              <div className="card-content">
                <div dangerouslySetInnerHTML={{ __html: item.example }} />
              </div>
            </div>
            <div className="card">
              <p className="label">Code</p>
              <pre className="code-block"><code>{item.example}</code></pre>
            </div>
          </div>
        </article>
      </section>)}
    </main>
  </>;
}
