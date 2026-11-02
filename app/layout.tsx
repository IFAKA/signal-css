import type { Metadata } from "next";
import "signal-css/styles.css";
import "signal-css/animations.css";

export const metadata: Metadata = { title: "Signal CSS — browser-first CSS framework", description: "A browser-first CSS framework for semantic HTML, responsive layouts, accessible states, and reduced-motion interfaces." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body data-signal><a className="skip-link" href="#main-content">Skip to content</a><div id="main-content">{children}</div></body></html>;
}
