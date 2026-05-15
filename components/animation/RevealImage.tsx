"use client";

import Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

type RevealImageProps = {
  src: string | StaticImport;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function RevealImage({
  src,
  alt,
  sizes,
  priority,
  className
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set(ref.current, { autoAlpha: 1, clipPath: "inset(0 0 0 0)" });
        return;
      }

      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, clipPath: "inset(12% 12% 12% 12%)", y: 28 },
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%"
          }
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div className={className} ref={ref}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} />
    </div>
  );
}
