"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Star,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import defaultSiteContent from "@/app/data/site-content.json";

type PengajarItem = {
  id: number;
  name: string;
  photo: string;
  position: string;
  program: string;
  shortBio: string;
  detail: {
    tempatLahir: string;
    tanggalLahir: string;
    pendidikan: string[];
    pengalaman: string[];
    keahlian: string[];
    email: string;
    telepon: string;
  };
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((n) => n.length > 2 || n === n.toUpperCase())
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BiodataDetail({ item }: { item: PengajarItem }) {
  const { detail } = item;
  return (
    <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-5">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
            {getInitials(item.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-sm text-primary font-medium">{item.position}</p>
          <Badge variant="secondary" className="mt-1 text-xs">
            {item.program}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed italic">
        &ldquo;{item.shortBio}&rdquo;
      </p>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{detail.tempatLahir}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>{formatDate(detail.tanggalLahir)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0" />
          <span className="truncate">{detail.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0" />
          <span>{detail.telepon}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">Pendidikan</h4>
        </div>
        <ul className="space-y-2 pl-6">
          {detail.pendidikan.map((p, i) => (
            <li
              key={i}
              className="text-xs text-muted-foreground list-disc leading-relaxed"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">Pengalaman</h4>
        </div>
        <ul className="space-y-2 pl-6">
          {detail.pengalaman.map((p, i) => (
            <li
              key={i}
              className="text-xs text-muted-foreground list-disc leading-relaxed"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">Keahlian</h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {detail.keahlian.map((k, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {k}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PengajarPage() {
  const content = defaultSiteContent;
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <>
      <Navbar content={content.navbar} />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Pengajar
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                {content.pengajar.sectionTitle}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                {content.pengajar.sectionDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Grid Pengajar */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {content.pengajar.items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <Dialog
                    key={item.id}
                    open={isOpen}
                    onOpenChange={(open) => setOpenId(open ? item.id : null)}
                  >
                    <DialogTrigger
                      render={
                        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30" />
                      }
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-28 w-28 mb-4">
                            <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                              {getInitials(item.name)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="text-base font-semibold">
                            {item.name}
                          </h3>
                          <p className="text-sm text-primary font-medium mt-0.5">
                            {item.position}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.program}
                          </p>
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-2">
                            {item.shortBio}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4 group-hover:gap-2 transition-all">
                            Lihat Biodata
                            <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </CardContent>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          Biodata Lengkap
                        </DialogTitle>
                      </DialogHeader>
                      <BiodataDetail item={item} />
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-muted/30 border-t">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ingin Belajar dari Para Ahli?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Bergabunglah dengan SMK Nusantara Tech dan dapatkan bimbingan
              langsung dari tenaga pengajar profesional.
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
