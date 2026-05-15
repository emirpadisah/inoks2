"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return children;
}
