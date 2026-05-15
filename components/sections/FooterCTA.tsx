import { ArrowUpRight } from "lucide-react";

export default function FooterCTA() {
  return (
    <footer className="footer-cta" id="contact">
      <div>
        <p className="eyebrow">İhracat ofisi</p>
        <h2>Teklif Alın</h2>
      </div>
      <div className="footer-actions">
        <a href="mailto:info@mantom.com">
          info@mantom.com <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
        <a href="#collection">
          Taşları İncele <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
      </div>
      <div className="footer-meta">
        <span>İstanbul / Denizli / Afyon</span>
        <span>Blok, plaka, ebatlı kesim, proje paketleme</span>
      </div>
    </footer>
  );
}
