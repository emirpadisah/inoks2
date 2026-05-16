"use client";

import { useRef } from "react";
import { ArrowDownToLine } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

const catalogHref = "/katalog.pdf";

export default function CatalogDownload() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(".catalog-copy > *", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(".catalog-copy > *", {
        autoAlpha: 0,
        y: 28,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%"
        }
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section className="section catalog" id="katalog" ref={ref}>
      <div className="section-heading catalog-copy">
        <div>
          <p className="eyebrow">Katalog</p>
          <h2>Ürün kataloğunu indirin.</h2>
        </div>
        <div>
          <p>
            Tezgah, dolap, evye ve servis ünitelerimizi PDF katalogda inceleyin;
            proje ekibinizle paylaşmak için indirip kullanabilirsiniz.
          </p>
          <a className="button button-dark catalog-download" download href={catalogHref}>
            Katalog İndir
            <ArrowDownToLine aria-hidden="true" size={17} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </section>
  );
}
