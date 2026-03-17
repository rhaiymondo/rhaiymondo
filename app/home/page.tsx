import RhaiymondoHome from "@/components/sites/RhaiymondoHome";
import RhaymondoHome from "@/components/sites/RhaymondoHome";

export default function Home() {
  const site = process.env.NEXT_PUBLIC_SITE;
  return site === "RHAYMONDO" ? <RhaymondoHome /> : <RhaiymondoHome />;
}
