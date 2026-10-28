import { EkgHero } from "@/components/chapters/EkgHero";
import { EsPlusHero } from "@/components/chapters/EsPlusHero";
import { GolfHero } from "@/components/chapters/GolfHero";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { MoreFromUs } from "@/components/home/MoreFromUs";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Enriched Solutions: financial healing and legacy building</h1>
      <HeroCarousel
        slides={[
          { id: "ekg", label: "EKG", content: <EkgHero variant="chapter" id="ekg" className="w-full" /> },
          { id: "es-plus", label: "ES+", content: <EsPlusHero variant="chapter" id="es-plus" className="w-full" /> },
          {
            id: "golf-and-heels",
            label: "Golf & Heels",
            content: <GolfHero variant="chapter" id="golf-and-heels" className="w-full" />,
          },
        ]}
      />
      <MoreFromUs />
    </>
  );
}
