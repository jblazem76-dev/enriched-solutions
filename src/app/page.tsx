import { EkgHero } from "@/components/chapters/EkgHero";
import { EsPlusHero } from "@/components/chapters/EsPlusHero";
import { GolfHero } from "@/components/chapters/GolfHero";
import { MoreFromUs } from "@/components/home/MoreFromUs";
import { ChapterNav } from "@/components/site/ChapterNav";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Enriched Solutions: financial healing and legacy building</h1>
      <ChapterNav />
      <EkgHero variant="chapter" id="ekg" />
      <EsPlusHero variant="chapter" id="es-plus" />
      <GolfHero variant="chapter" id="golf-and-heels" />
      <MoreFromUs />
    </>
  );
}
