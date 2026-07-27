import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "@/app/data/content";
import {
  Calendar,
  Megaphone,
  Trophy,
  Briefcase,
  Handshake,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const events = siteContent.carousel;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Megaphone,
  Trophy,
  Briefcase,
  Handshake,
};

const eventDetails: Record<
  string,
  { body: string[]; date: string; location: string }
> = {
  "open-house-2026": {
    date: "Sabtu, 2 Agustus 2026",
    location: "SMK Nusantara Tech - Seluruh Area Sekolah",
    body: [
      "SMK Nusantara Tech mengundang calon siswa dan orang tua untuk menghadiri Open House 2026. Acara ini merupakan kesempatan emas untuk mengenal sekolah, fasilitas, dan program keahlian yang tersedia secara langsung.",
      "Selama Open House, pengunjung dapat mengunjungi setiap laboratorium dan workshop, berbicara langsung dengan guru dan siswa, serta menyaksikan demonstrasi praktik dari masing-masing program keahlian.",
      "Tersedia juga konsultasi pendaftaran PPDB, informasi beasiswa, dan tour sekolah yang dipandu oleh siswa ambassador. Jangan lewatkan kesempatan ini untuk memastikan masa depan pendidikan Anda!",
    ],
  },
  "career-day-2026": {
    date: "Jumat, 15 Agustus 2026",
    location: "Aula Utama SMK Nusantara Tech",
    body: [
      "Career Day 2026 adalah acara tahunan yang menghadirkan lebih dari 30 perusahaan mitra untuk berinteraksi langsung dengan siswa kelas XII dan kelas XI.",
      "Siswa dapat menyampaikan CV, melakukan wawancara kerja langsung, serta mendapatkan informasi lowongan magang dan kerja dari berbagai sektor industri mulai dari teknologi, akuntansi, desain, hingga manufaktur.",
      "Acara ini juga dirangkai dengan seminar karir dan workshop CV writing yang dipandu oleh HRD profesional. Pastikan Anda hadir untuk membuka peluang karir sejak dini!",
    ],
  },
};

export function generateStaticParams() {
  return events
    .filter((item) => item.href.startsWith("/events/"))
    .map((item) => ({
      slug: item.href.replace("/events/", ""),
    }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.href === `/events/${slug}`);
  if (!event) notFound();

  const detail = eventDetails[slug];
  const Icon = iconMap[event.icon] || Calendar;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className={`relative overflow-hidden bg-gradient-to-r ${event.gradient} text-white`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 shrink-0">
                <Icon className="h-7 w-7 text-white/80" />
              </div>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs"
              >
                {event.badge}
              </Badge>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
              {event.title}
            </h1>
            <p className="text-base text-white/80 max-w-2xl">
              {event.description}
            </p>
          </div>
        </div>

        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            {detail ? (
              <>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="rounded-lg border p-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                    <p className="text-sm font-medium">{detail.date}</p>
                  </div>
                  <div className="rounded-lg border p-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Lokasi</p>
                    <p className="text-sm font-medium">{detail.location}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {detail.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground leading-relaxed text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {event.description}
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Informasi detail mengenai acara ini akan segera kami update.
                  Pantau terus website kami atau hubungi bagian humas untuk
                  informasi lebih lanjut.
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/ppdb"
                className={buttonVariants({ className: "gap-2" })}
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className={buttonVariants({ variant: "outline", className: "gap-2" })}
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
