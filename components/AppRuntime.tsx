"use client";

import { useEffect } from "react";

// Maps the design's image keys to the photos bundled in /public/img.
const RES: Record<string, string> = {
  "plot": "/img/plot.jpg",
  "villa": "/img/villa.jpg",
  "hero": "/img/hero.jpg",
  "apt": "/img/apt.jpg",
  "penthouse": "/img/penthouse.jpg",
  "l5": "/img/l5.jpg",
  "l4": "/img/l4.jpg",
  "l3": "/img/l3.jpg",
  "l2": "/img/l2.jpg",
  "l1": "/img/l1.jpg",
  "farmhouse": "/img/farmhouse.jpg",
  "resort": "/img/resort.jpg",
  "grasslands": "/img/grasslands.jpg",
  "mandavi": "/img/mandavi.jpg",
  "sairadha": "/img/sairadha.jpg",
  "f2": "/img/f2.jpg",
  "f1": "/img/f1.jpg",
  "cta": "/img/cta.jpg",
  "l6": "/img/l6.jpg",
  "beachresort": "/img/beachresort.jpg",
  "hotel": "/img/hotel.jpg"
};

declare global {
  interface Window {
    __resources?: Record<string, string>;
    __nyvasaBooted?: boolean;
  }
}

// Runs the original vanilla UI script once, after the markup is in the DOM.
export default function AppRuntime() {
  useEffect(() => {
    if (window.__nyvasaBooted) return;
    window.__nyvasaBooted = true;
    window.__resources = RES;
    const s = document.createElement("script");
    s.src = "/app.js";
    s.async = false;
    document.body.appendChild(s);
  }, []);
  return null;
}
