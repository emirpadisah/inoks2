"use client";

import { useRef } from "react";
import { processSteps } from "@/data/stones";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(".process-step", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.from(".process-copy > *", {
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

      gsap.from(".process-step", {
        autoAlpha: 0,
        y: 46,
        stagger: 0.16,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 62%"
        }
      });

      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-timeline",
            start: "top 72%",
            end: "bottom 64%",
            scrub: true
          }
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section className="section process" id="process" ref={ref}>
      <div className="process-copy">
        <p className="eyebrow">Üretim</p>
        <h2>Ölçüden sahaya hazır teslimata.</h2>
        <p>
          Şeffaf üretim akışı; mimarlara, yüklenicilere ve işletme sahiplerine
          ilk montajdan önce güven verir.
        </p>
      </div>

      <div className="process-timeline">
        <span className="process-line" aria-hidden="true" />
        {processSteps.map((step) => (
          <article className="process-step" key={step.label}>
            <span>{step.label}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
