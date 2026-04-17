"use client";

import dynamic from "next/dynamic";

const WinkCursor = dynamic(() => import("wink-cursor"), { ssr: false });

export default function CursorWrapper() {
  return <WinkCursor />;
}