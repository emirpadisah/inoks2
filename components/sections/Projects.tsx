"use client";

import Image from "next/image";
import { useRef } from "react";
import { projects } from "@/data/stones";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/components/animation/useReducedMotion";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(".project-slide", { autoAlpha: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const track = ref.current?.querySelector<HTMLElement>(".project-track");

        if (!track || !ref.current) {
          return undefined;
        }

        const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            scrub: true,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true
          }
        });

        gsap.from(".project-heading > *", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%"
          }
        });

        gsap.from(".project-caption > *", {
          autoAlpha: 0,
          y: 26,
          stagger: 0.08,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 35%"
          }
        });

        gsap.fromTo(
          ".project-slide img",
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );

        return undefined;
      });

      mm.add("(max-width: 899px)", () => {
        gsap.from(".project-slide", {
          autoAlpha: 0,
          y: 48,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 74%"
          }
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="project-heading">
        <p className="eyebrow">Projeler</p>
        <h2>Doğal taşın mimari ölçekteki karşılığı.</h2>
      </div>

      <div className="project-track">
        {projects.map((project) => (
          <article className="project-slide" key={project.title}>
            <Image
              src={project.image}
              alt={`${project.title} doğal taş projesi`}
              fill
              sizes="100vw"
              quality={84}
              style={{ objectPosition: project.imagePosition ?? "center" }}
            />
            <div className="project-caption">
              <p>{project.location}</p>
              <h3>{project.title}</h3>
              <span>{project.stone}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
