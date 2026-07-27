import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "../data/content";
import {
  Monitor,
  Network,
  Calculator,
  ShoppingCart,
  Cpu,
  Palette,
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  CheckCircle,
  Play,
} from "lucide-react";

const programs = siteContent.programKeahlian.programs;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Network,
  Calculator,
  ShoppingCart,
  Cpu,
  Palette,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  "bg-blue-500": { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20" },
  "bg-emerald-500": { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20" },
  "bg-amber-500": { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20" },
  "bg-purple-500": { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/20" },
  "bg-rose-500": { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/20" },
  "bg-pink-500": { bg: "bg-pink-500/10", text: "text-pink-600", border: "border-pink-500/20" },
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

export default function ProgramPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Program Keahlian
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                Pilih Masa Depan Anda
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                SMK Nusantara Tech menyediakan 6 program keahlian unggulan yang
                dirancang bersama industri untuk menyiapkan Anda terjun ke dunia
                kerja.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {siteContent.statistik.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-primary">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program list */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-16">
              {programs.map((program, index) => {
                const Icon = iconMap[program.icon] || Monitor;
                const colors = colorMap[program.color] || colorMap["bg-blue-500"];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={program.id}
                    id={program.slug}
                    className="scroll-mt-24"
                  >
                    {/* Info + Detail cards */}
                    <div
                      className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-start ${
                        !isEven ? "lg:[direction:rtl]" : ""
                      }`}
                    >
                      {/* Info */}
                      <div className={!isEven ? "lg:[direction:ltr]" : ""}>
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                          >
                            <Icon className={`h-6 w-6 ${colors.text}`} />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">{program.title}</h2>
                            <Badge
                              variant="outline"
                              className={`text-xs mt-1 ${colors.border} ${colors.text}`}
                            >
                              {program.slug.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {program.detail.overview}
                        </p>

                        <Link
                          href={`/ppdb?program=${program.slug}`}
                          className={buttonVariants({ className: "gap-2" })}
                        >
                          Daftar Program Ini
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      {/* Detail cards */}
                      <div className={`space-y-4 ${!isEven ? "lg:[direction:ltr]" : ""}`}>
                        {/* Kurikulum */}
                        <div className={`rounded-xl border ${colors.border} bg-card p-5`}>
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className={`h-4 w-4 ${colors.text}`} />
                            <h3 className="text-sm font-semibold">Kurikulum</h3>
                          </div>
                          <ul className="grid gap-1.5 pl-5">
                            {program.detail.kurikulum.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground list-disc"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Kompetensi */}
                        <div className={`rounded-xl border ${colors.border} bg-card p-5`}>
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className={`h-4 w-4 ${colors.text}`} />
                            <h3 className="text-sm font-semibold">
                              Kompetensi Lulusan
                            </h3>
                          </div>
                          <ul className="grid gap-1.5 pl-5">
                            {program.detail.kompetensi.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle
                                  className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${colors.text}`}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prospek Karir */}
                        <div className={`rounded-xl border ${colors.border} bg-card p-5`}>
                          <div className="flex items-center gap-2 mb-3">
                            <Briefcase className={`h-4 w-4 ${colors.text}`} />
                            <h3 className="text-sm font-semibold">
                              Prospek Karir
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {program.detail.prospek.map((item, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video section */}
                    <div className="mt-10">
                      <div className={`rounded-xl border ${colors.border} p-5 md:p-6`}>
                        <div className="flex items-center gap-2 mb-4">
                          <Play className={`h-4 w-4 ${colors.text}`} />
                          <h3 className="text-sm font-semibold">
                            Video Penjelasan Program
                          </h3>
                        </div>
                        {program.videoYoutubeId ? (
                          <div className="space-y-3">
                            <YouTubeEmbed
                              videoId={program.videoYoutubeId}
                              title={`Video ${program.title}`}
                            />
                            <p className="text-xs text-muted-foreground text-center">
                              Simak penjelasan lengkap mengenai program{" "}
                              {program.title} melalui video di atas.
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 aspect-video">
                            <div className="text-center">
                              <Play className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                              <p className="text-xs text-muted-foreground">
                                Video penjelasan segera tersedia
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
            <h2 className="text-2xl font-bold mb-3">Tertarik dengan Program Kami?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Segera daftarkan diri Anda dan mulai perjalanan karir di bidang
              yang Anda minati.
            </p>
            <Link
              href="/ppdb"
              className={buttonVariants({ size: "lg", className: "gap-2" })}
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
