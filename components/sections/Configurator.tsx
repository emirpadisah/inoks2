"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { applications, finishes, stones, type Stone } from "@/data/stones";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function Configurator() {
  const [stoneId, setStoneId] = useState<Stone["id"]>("marble");
  const [finish, setFinish] = useState<(typeof finishes)[number]>("Honlu");
  const [application, setApplication] = useState<(typeof applications)[number]>("Lobi");
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const activeStone = useMemo(
    () => stones.find((stone) => stone.id === stoneId) ?? stones[0],
    [stoneId]
  );

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(panelRef.current, { autoAlpha: 1, clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, clipPath: "inset(0 100% 0 0)", scale: 1.015 },
        {
          autoAlpha: 1,
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 0.85,
          ease: "power3.out"
        }
      );
    },
    { dependencies: [stoneId, reducedMotion], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(".configurator-copy > *, .config-panel-wrap", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(".configurator-copy > *, .config-panel-wrap", {
        autoAlpha: 0,
        y: 38,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });

      gsap.to(".config-panel-wrap", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section className="section configurator" id="specification" ref={sectionRef}>
      <div className="configurator-copy">
        <p className="eyebrow">Seçim</p>
        <h2>Projeye hazır bir taş brief’i oluşturun.</h2>
        <p>
          Taş tipini, yüzeyi ve kullanım alanını seçin. Bu bölüm satıştan çok
          numune, plaka uygunluğu, teklif ve ihracat hazırlığına odaklanır.
        </p>

        <fieldset>
          <legend>Taş tipi</legend>
          <div className="option-row">
            {stones.map((stone) => (
              <button
                aria-pressed={stoneId === stone.id}
                className={stoneId === stone.id ? "active" : ""}
                key={stone.id}
                onClick={() => setStoneId(stone.id)}
                type="button"
              >
                {stone.name}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Yüzey işlemi</legend>
          <div className="option-row">
            {finishes.map((item) => (
              <button
                aria-pressed={finish === item}
                className={finish === item ? "active" : ""}
                key={item}
                onClick={() => setFinish(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Kullanım alanı</legend>
          <div className="option-row">
            {applications.map((item) => (
              <button
                aria-pressed={application === item}
                className={application === item ? "active" : ""}
                key={item}
                onClick={() => setApplication(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <a className="quote-link" href="mailto:info@aysumermer.com">
          Teklif Al
        </a>
      </div>

      <div className="config-panel-wrap">
        <div className="config-panel media-shell" ref={panelRef}>
          <Image
            alt={`${activeStone.name} plaka önizlemesi`}
            fill
            key={activeStone.image}
            quality={85}
            sizes="(max-width: 899px) 92vw, 45vw"
            src={activeStone.image}
          />
        </div>
        <div className="config-summary">
          <p>{activeStone.name}</p>
          <p>
            {finish} yüzey / {application} uygulaması
          </p>
          <p>{activeStone.description}</p>
        </div>
      </div>
    </section>
  );
}
