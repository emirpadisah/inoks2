"use client";

import Image from "next/image";
import { useRef } from "react";
import AnimatedText from "@/components/animation/AnimatedText";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set([".hero-slab", ".hero-word", ".hero-kicker", ".hero-copy", ".hero-meta"], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          scale: 1
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-backdrop img", {
        scale: 1.08,
        duration: 2.4
      })
        .from(
          ".hero-slab",
          {
            autoAlpha: 0,
            y: 60,
            scale: 1.08,
            duration: 1.8
          },
          0.1
        )
        .from(
          ".hero-word",
          {
            autoAlpha: 0,
            yPercent: 120,
            stagger: 0.075,
            duration: 1.05
          },
          0.45
        )
        .from(
          [".hero-kicker", ".hero-copy", ".hero-actions", ".hero-meta"],
          {
            autoAlpha: 0,
            y: 22,
            stagger: 0.1,
            duration: 0.9
          },
          0.65
        );

      gsap.to(".hero-slab", {
        yPercent: -20,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-backdrop img", {
        yPercent: 10,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-backdrop media-shell" aria-hidden="true">
        <Image
          src="/industrial-kitchen-wide.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="hero-inner">
        <p className="eyebrow hero-kicker">Paslanmaz çelik / endüstriyel mutfak / Muğla</p>
        <AnimatedText
          as="h1"
          className="hero-title"
          wordClassName="hero-word"
          text="Projeler İçin Endüstriyel Mutfak"
        />
        <p className="hero-copy">
          Teşhir ünitelerinden evye tezgahlarına, soğutmalı dolaplardan çalışma
          tezgahlarına; otel, restoran ve üretim mutfakları için ölçüye özel inoks çözümler.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#specification">
            Teklif Al
          </a>
          <a
            className="button button-ghost"
            href="/katalog.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ürünleri İncele
          </a>
        </div>
      </div>

      <div className="hero-slab media-shell">
        <Image
          src="/gn-containers.jpg"
          alt="Paslanmaz endüstriyel mutfak ekipmanları"
          fill
          priority
          sizes="(max-width: 899px) 92vw, 44vw"
          quality={85}
        />
      </div>

      <div className="hero-meta" aria-label="Company highlights">
        <span>Ölçüden montaja</span>
        <span>Projeye özel üretim</span>
        <span>Muğla ve Ege bölgesi teslimat</span>
      </div>
    </section>
  );
}
