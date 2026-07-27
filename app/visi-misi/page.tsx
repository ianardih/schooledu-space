import { getContent } from "@/lib/content";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function VisiMisiPage() {
  const content = await getContent();
  const { visiMisi } = content;

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Visi & Misi
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                {visiMisi.sectionTitle}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                {visiMisi.sectionDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Visi */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden border-primary/20">
                <CardContent className="pt-8 pb-8 px-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <Eye className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Visi</h2>
                      <p className="text-sm text-muted-foreground">
                        Arah dan tujuan jangka panjang sekolah
                      </p>
                    </div>
                  </div>
                  <Separator className="mb-6" />
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {visiMisi.visi}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Misi */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="pt-8 pb-8 px-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Misi</h2>
                      <p className="text-sm text-muted-foreground">
                        Langkah strategis untuk mewujudkan visi
                      </p>
                    </div>
                  </div>
                  <Separator className="mb-6" />
                  <ol className="space-y-5">
                    {visiMisi.misi.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {i + 1}
                        </span>
                        <p className="text-base leading-relaxed text-muted-foreground pt-1">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 border-t">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-3">Wujudkan Visi Bersama Kami</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Bergabunglah dengan SMK Nusantara Tech dan jadilah bagian dari
              generasi profesional masa depan.
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
      <Footer content={content.footer} />
    </>
  );
}
