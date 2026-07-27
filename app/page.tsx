import { getContent } from "@/lib/content";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CarouselSection } from "./components/CarouselSection";
import { Statistik } from "./components/Statistik";
import { Keunggulan } from "./components/Keunggulan";
import { VisiMisi } from "./components/VisiMisi";
import { ProgramKeahlian } from "./components/ProgramKeahlian";
import { VideoProfil } from "./components/VideoProfil";
import { Fasilitas } from "./components/Fasilitas";
import { Pengajar } from "./components/Pengajar";
import { Galeri } from "./components/Galeri";
import { Mitra } from "./components/Mitra";
import { Berita } from "./components/Berita";
import { Testimoni } from "./components/Testimoni";
import { FAQ } from "./components/FAQ";
import { Lokasi } from "./components/Lokasi";
import { Footer } from "./components/Footer";
import { FloatingCTA } from "./components/FloatingCTA";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex-1">
        <Hero content={content.hero} />
        <CarouselSection content={content.carousel} />
        <Statistik content={content.statistik} />
        <Keunggulan content={content.keunggulan} />
        <VisiMisi content={content.visiMisi} />
        <ProgramKeahlian content={content.programKeahlian} />
        <VideoProfil content={content.videoProfil} />
        <Fasilitas content={content.fasilitas} />
        <Pengajar content={content.pengajar} />
        <Galeri content={content.galeri} />
        <Mitra content={content.mitra} />
        <Berita content={content.berita} />
        <Testimoni content={content.testimoni} />
        <FAQ content={content.faq} />
        <Lokasi content={content.lokasi} />
      </main>
      <Footer content={content.footer} />
      <FloatingCTA whatsappNumber={content.whatsappNumber} />
    </>
  );
}
