import { ArrowUpRight } from "lucide-react";

export default function FooterCTA() {
  return (
    <footer className="footer-cta" id="contact">
      <div>
        <p className="eyebrow">İnoks Muğla</p>
        <h2>Teklif Alın</h2>
      </div>
      <div className="footer-actions">
        <a href="mailto:info@inoksmugla.com">
          info <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
        <a href="tel:+905428465052">
          +90 542 846 50 52 <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
        <a href="/katalog.pdf" download>
          Katalog İndir <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
        <a href="#collection">
          Ürünleri İncele <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
      </div>
      <div className="footer-meta">
        <span>Muğla / Bodrum / Ege bölgesi</span>
        <span>Tezgah, dolap, evye, montaj ve proje teslimatı</span>
      </div>
    </footer>
  );
}
