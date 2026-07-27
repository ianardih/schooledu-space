import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "@/app/data/content";
import {
  CalendarIcon,
  User,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const berita = siteContent.berita.items;

const categoryColorMap: Record<string, string> = {
  Prestasi: "bg-emerald-500/10 text-emerald-700",
  "Kerja Sama": "bg-blue-500/10 text-blue-700",
  PMB: "bg-amber-500/10 text-amber-700",
  Kegiatan: "bg-purple-500/10 text-purple-700",
  Akademik: "bg-rose-500/10 text-rose-700",
};

function formatDate(isoDate: string) {
  return dayjs(isoDate).format("D MMMM YYYY");
}

export function generateStaticParams() {
  return berita.map((item) => ({ id: String(item.id) }));
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = berita.find((b) => b.id === Number(id));
  if (!item) notFound();

  const currentIndex = berita.findIndex((b) => b.id === item.id);
  const prev = currentIndex > 0 ? berita[currentIndex - 1] : null;
  const next =
    currentIndex < berita.length - 1 ? berita[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </Link>

            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center mb-6">
              <p className="text-sm font-medium text-muted-foreground">
                {item.category}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(item.date)}</span>
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${categoryColorMap[item.category] || ""}`}
              >
                {item.category}
              </Badge>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4">
              {item.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
              <User className="h-4 w-4" />
              <span>{item.detail.author}</span>
            </div>

            <div className="space-y-4">
              {item.detail.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t">
              <h3 className="text-sm font-semibold mb-4">Berita Lainnya</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {prev && (
                  <Link
                    href={`/berita/${prev.id}`}
                    className="group flex flex-col gap-1 rounded-lg border p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <span className="text-xs text-muted-foreground">
                      Sebelumnya
                    </span>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/berita/${next.id}`}
                    className="group flex flex-col gap-1 rounded-lg border p-4 hover:border-primary/30 hover:shadow-sm transition-all sm:ml-auto text-right"
                  >
                    <span className="text-xs text-muted-foreground">
                      Selanjutnya
                    </span>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/ppdb"
                className={buttonVariants({ className: "gap-2" })}
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
