"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

type Program = {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  videoYoutubeId: string;
  detail: {
    overview: string;
    kurikulum: string[];
    kompetensi: string[];
    prospek: string[];
  };
};

type ProgramKeahlianProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    programs: Program[];
  };
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Network,
  Calculator,
  ShoppingCart,
  Cpu,
  Palette,
};

function ProgramDetail({ program }: { program: Program }) {
  const Icon = iconMap[program.icon] || Monitor;

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-1">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${program.color}/10`}
      >
        <Icon
          className={`h-7 w-7 ${program.color.replace("bg-", "text-")}`}
        />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {program.detail.overview}
      </p>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Kurikulum</h4>
          </div>
          <ul className="grid gap-1.5 pl-6">
            {program.detail.kurikulum.map((item, i) => (
              <li key={i} className="text-xs text-muted-foreground list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Kompetensi Lulusan</h4>
          </div>
          <ul className="grid gap-1.5 pl-6">
            {program.detail.kompetensi.map((item, i) => (
              <li key={i} className="text-xs text-muted-foreground list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Prospek Karir</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {program.detail.prospek.map((item, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProgramKeahlian({ content }: ProgramKeahlianProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="program" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="secondary" className="mb-3">
            Program Keahlian
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {content.sectionTitle}
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            {content.sectionDescription}
          </p>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.programs.map((program) => {
            const Icon = iconMap[program.icon] || Monitor;
            const isOpen = openId === program.id;

            return (
              <Dialog
                key={program.id}
                open={isOpen}
                onOpenChange={(open) => setOpenId(open ? program.id : null)}
              >
                <DialogTrigger
                  render={
                    <Card className="group relative overflow-hidden transition-all hover:shadow-md cursor-pointer hover:border-primary/30" />
                  }
                >
                  <CardHeader>
                    <div
                      className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${program.color}/10`}
                    >
                      <Icon
                        className={`h-6 w-6 ${program.color.replace("bg-", "text-")}`}
                      />
                    </div>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-3">
                      {program.description}
                    </CardDescription>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                      Lihat Detail
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg">
                      {program.title}
                    </DialogTitle>
                    <DialogDescription>
                      {program.description}
                    </DialogDescription>
                  </DialogHeader>

                  <ProgramDetail program={program} />

                  <DialogFooter>
                    <Link
                      href={`/ppdb?program=${program.slug}`}
                      className={buttonVariants({ size: "sm", className: "gap-2" })}
                    >
                      Daftar Program Ini
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
