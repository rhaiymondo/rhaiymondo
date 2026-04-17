"use client";

import { useEffect } from "react";

export default function CursorWrapper() {
  useEffect(() => {
    import("wink-cursor").catch(console.error);
  }, []);

  return null;
}