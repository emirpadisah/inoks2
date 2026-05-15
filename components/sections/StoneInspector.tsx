"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { Search } from "lucide-react";
import type { Stone } from "@/data/stones";

type StoneInspectorProps = {
  stone: Stone;
};

export default function StoneInspector({ stone }: StoneInspectorProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const rect = frame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    frame.style.setProperty("--zoom-x", `${x}%`);
    frame.style.setProperty("--zoom-y", `${y}%`);
  }

  return (
    <div
      className="stone-inspector"
      onPointerMove={handlePointerMove}
      ref={frameRef}
    >
      <Image
        alt={`${stone.name} plaka detay incelemesi`}
        fill
        priority
        quality={85}
        sizes="(max-width: 899px) 100vw, 64vw"
        src={stone.image}
      />
      <div className="stone-inspector-hint" aria-hidden="true">
        <Search size={16} strokeWidth={1.6} />
        Detay için gezdir
      </div>
    </div>
  );
}
