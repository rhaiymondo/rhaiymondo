"use client";

import { useEffect, useRef } from "react";

export default function CursorWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We need to actually use the WinkCursor component's effect
    // Since it's a function component, we need to invoke its logic manually
    const defaultImg = "https://i.postimg.cc/QdwvSCvX/smile.png";
    const clickImg = "https://i.postimg.cc/W3nWR1YV/wink.png";
    const size = 32;
    const duration = 180;

    const e = document.createElement("div");
    e.style.position = "fixed";
    e.style.left = "0";
    e.style.top = "0";
    e.style.width = `${size}px`;
    e.style.height = `${size}px`;
    e.style.pointerEvents = "none";
    e.style.backgroundImage = `url(${defaultImg})`;
    e.style.backgroundSize = "contain";
    e.style.backgroundRepeat = "no-repeat";
    e.style.zIndex = "999999";
    e.style.transform = "translate(-50%, -50%)";
    e.style.transition = "transform 200ms cubic-bezier(.22,1,.36,1), opacity 120ms ease";
    document.body.appendChild(e);
    
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    let timeoutId: ReturnType<typeof setTimeout>;
    
    const moveHandler = (l: PointerEvent) => {
      e.style.transform = `translate(${l.clientX}px, ${l.clientY}px)`;
    };
    
    const clickHandler = () => {
      clearTimeout(timeoutId);
      e.style.backgroundImage = `url(${clickImg})`;
      timeoutId = setTimeout(() => {
        e.style.backgroundImage = `url(${defaultImg})`;
      }, duration);
    };

    window.addEventListener("pointermove", moveHandler);
    window.addEventListener("pointerdown", clickHandler);

    return () => {
      window.removeEventListener("pointermove", moveHandler);
      window.removeEventListener("pointerdown", clickHandler);
      document.body.style.cursor = originalCursor;
      clearTimeout(timeoutId);
      e.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ display: "none" }} />;
}