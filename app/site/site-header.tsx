import { SiteNavigation, type SiteSection } from "@/site/site-navigation";

export function SiteHeader({ current }: { current: SiteSection }) {
  return <header><SiteNavigation current={current} /></header>;
}
