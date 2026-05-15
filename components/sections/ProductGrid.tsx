"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Search } from "lucide-react";
import { stones } from "@/data/stones";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function ProductGrid() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(".stone-card", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(".stone-card", {
        autoAlpha: 0,
        y: 58,
        stagger: 0.14,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%"
        }
      });

      gsap.from(".collection-copy > *", {
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
    <section className="section products" id="collection" ref={ref}>
      <div className="section-heading collection-copy">
        <p className="eyebrow">Koleksiyon</p>
        <h2>Rafine yüzeyler için seçili doğal taşlar.</h2>
        <p>
          Plakalar ton, damar hareketi, yüzey ve kullanım alanına göre
          sınıflandırılır; proje ekipleri malzeme kararından şartnameye hızlıca ilerler.
        </p>
      </div>

      <div className="product-grid">
        {stones.map((stone) => (
          <Link
            aria-label={`${stone.name} plakasını incele`}
            className="stone-card"
            href={`/stones/${stone.id}`}
            key={stone.id}
          >
            <span
              className="stone-card-media"
              style={{ inset: 0, overflow: "hidden", position: "absolute" }}
            >
              <Image
                src={stone.image}
                alt={`${stone.name} doğal taş dokusu`}
                className="stone-card-photo"
                height={1200}
                sizes="(max-width: 899px) 88vw, 25vw"
                width={900}
                quality={82}
              />
            </span>
            <span className="stone-card-icon" aria-hidden="true">
              <Search size={17} strokeWidth={1.6} />
            </span>
            <div className="stone-overlay">
              <div>
                <h3>{stone.name}</h3>
                <p>{stone.origin}</p>
              </div>
              <p>{stone.use}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
