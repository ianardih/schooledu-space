import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "@/app/data/content";
import {
  MonitorDot,
  Wrench,
  BookOpen,
  Video,
  Church,
  Trophy,
  ArrowRight,
  Play,
} from "lucide-react";

const content = siteContent.fasilitas;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MonitorDot,
  Wrench,
  BookOpen,
  Video,
  Church,
  Trophy,
};

const facilityDetails: Record<number, { features: string[] }> = {
  1: {
    features: [
      "50 unit komputer dengan spesifikasi tinggi (Intel i7, 16GB RAM, SSD 512GB)",
      "Software licensi: Adobe Creative Suite, Visual Studio, Figma, AutoCAD",
      "Jaringan internet dedicated 100 Mbps",
      "LCD Proyektor dan AC di setiap ruangan",
      "Akses 24/7 untuk siswa project team",
    ],
  },
  2: {
    features: [
      "Peralatan industri: solder station, multimeter, oscilloscope",
      "Modul PLC Siemens S7-1200 dan Schneider",
      "Robotika: Arduino, Raspberry Pi, ESP32, drone edukasi",
      "Bengkel kelistrikan dengan panel industri",
      "Workshop otomasi dan IoT",
    ],
  },
  3: {
    features: [
      "Koleksi 10.000+ buku dan referensi",
      "Akses e-book dan jurnal internasional (IEEE, ACM)",
      "Ruang baca nyaman dengan kapasitas 100 orang",
      "Komputer akses digital dan Wi-Fi gratis",
      "Ruang diskusi kelompok (4 ruang)",
    ],
  },
  4: {
    features: [
      "Kamera DSLR/mirrorless Canon & Sony",
      "Lighting studio profesional",
      "Green screen dan backdrop",
      "Komputer editing iMac dengan Final Cut Pro & Premiere Pro",
      "Ruang rekaman audio & podcast",
    ],
  },
  5: {
    features: [
      "Kapasitas 500 jamaah",
      "Ruang wudhu dan kamar mandi yang bersih",
      "Taman yang asri dan tenang",
      "Perpustakaan religi",
      "Kegiatan keagamaan rutin: kajian, tafsir, dan diskusi",
    ],
  },
  6: {
    features: [
      "Lapangan basket dan volleyball standar nasional",
      "Lapangan futsal sintetis",
      "Jogging track 400 meter",
      "Ruang fitness dan senam",
      "Gedung serbaguna untuk acara dan pertandingan",
    ],
  },
};

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  if (!videoId) return null;
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default function FasilitasPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Fasilitas
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                {content.sectionTitle}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                {content.sectionDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Intro Video */}
        {content.introVideo && (
          <section className="py-10 md:py-14">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">
                  {content.introVideo.title}
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  {content.introVideo.description}
                </p>
              </div>
              <YouTubeEmbed
                videoId={content.introVideo.youtubeId}
                title={content.introVideo.title}
              />
            </div>
          </section>
        )}

        {/* Facility list */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-16">
              {content.items.map((item, index) => {
                const Icon = iconMap[item.icon] || MonitorDot;
                const details = facilityDetails[item.id];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className="scroll-mt-24"
                    id={`facility-${item.id}`}
                  >
                    {/* Info + Features */}
                    <div
                      className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-start ${
                        !isEven ? "lg:[direction:rtl]" : ""
                      }`}
                    >
                      <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h2 className="text-xl font-bold">{item.title}</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {item.description}
                        </p>
                        {details && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">
                                Fasilitas Tersedia
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {details.features.map((feature, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                        {item.videoYoutubeId ? (
                          <div className="space-y-3">
                            <YouTubeEmbed
                              videoId={item.videoYoutubeId}
                              title={`Video ${item.title}`}
                            />
                            <p className="text-xs text-muted-foreground text-center">
                              Video penjelasan: {item.title}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 aspect-video">
                            <div className="text-center">
                              <Play className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                              <p className="text-xs text-muted-foreground">
                                Video segera tersedia
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-muted/30 border-t">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ingin Melihat Fasilitas Kami?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Kunjungi sekolah kami secara langsung atau daftar untuk mengakses
              seluruh fasilitas sebagai siswa.
            </p>
            <Link
              href="/ppdb"
              className={buttonVariants({ className: "gap-2" })}
            >
              Daftar Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
