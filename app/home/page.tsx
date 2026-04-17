import { Suspense } from "react";
import HomePage from "./HomePage";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomePage />
    </Suspense>
  );
}