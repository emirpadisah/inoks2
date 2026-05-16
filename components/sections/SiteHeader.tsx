import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/#collection", label: "Ürünler" },
  { href: "/#specification", label: "Seçim" },
  { href: "/#projects", label: "Projeler" },
  { href: "/#process", label: "Üretim" },
  { href: "/#katalog", label: "Katalog" }
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="/#home" aria-label="İnoks Muğla ana sayfa">
          <span className="brand-wordmark">
            <span className="brand-wordmark-main">İnoks Muğla</span>
          </span>
        </a>

        <nav aria-label="Ana navigasyon" className="desktop-nav">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="mailto:info@inoksmugla.com">
          Teklif <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
        </a>
      </div>
    </header>
  );
}
