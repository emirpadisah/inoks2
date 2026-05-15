import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/#collection", label: "Taşlar" },
  { href: "/#specification", label: "Seçim" },
  { href: "/#projects", label: "Projeler" },
  { href: "/#process", label: "Üretim" }
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="/#home" aria-label="Aysu Mermer ana sayfa">
          <span className="brand-mark">A</span>
          <span className="brand-text">Aysu Mermer</span>
        </a>

        <nav aria-label="Ana navigasyon" className="desktop-nav">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="mailto:info@aysumermer.com">
          Teklif <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
        </a>
      </div>
    </header>
  );
}
