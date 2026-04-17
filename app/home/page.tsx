"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import RhaiymondoHome from "@/components/sites/RhaiymondoHome";
import RhaymondoHome from "@/components/sites/RhaymondoHome";

function HomeContent() {
  const searchParams = useSearchParams();
  const bypass = searchParams.get("bypass") === "true";
  const siteParam = searchParams.get("site");
  
  // Use bypass param to decide which site to show, otherwise fall back to env
  const site = bypass ? siteParam : process.env.NEXT_PUBLIC_SITE;
  
  return site === "RHAYMONDO" ? <RhaymondoHome /> : <RhaiymondoHome />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}