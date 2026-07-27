import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import defaultSiteContent from "@/app/data/site-content.json";

type FooterProps = {
  content?: {
    schoolName: string;
    address: string;
    phone: string;
    email: string;
    socialMedia: { instagram: string; facebook: string; youtube: string };
    quickLinks: { label: string; href: string }[];
    copyright: string;
  };
};

export function Footer({ content: rawContent }: FooterProps) {
  const content = rawContent ?? defaultSiteContent.footer;
  return (
    <footer id="kontak" className="border-t bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg mb-3"
            >
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>{content.schoolName}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Membentuk generasi profesional siap kerja, berkarakter, dan
              berinovasi.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Tautan Cepat</h3>
            <ul className="space-y-2">
              {content.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{content.address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{content.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{content.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">PPDB 2026/2027</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Pendaftaran sudah dibuka! Daftar sekarang sebelum kehabisan
              kuota.
            </p>
            <Link
              href="/ppdb"
              className={buttonVariants({ size: "sm", className: "gap-2" })}
            >
              Daftar Sekarang
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{content.copyright}</p>
          <div className="flex items-center gap-4">
            <a
              href={content.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href={content.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Facebook
            </a>
            <a
              href={content.socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
