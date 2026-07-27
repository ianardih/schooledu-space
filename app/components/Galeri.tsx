"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollReveal } from "@/lib/animations";
import { ZoomIn } from "lucide-react";

type GaleriItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
};

type GaleriProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    items: GaleriItem[];
  };
};

const categoryColors: Record<string, string> = {
  Pembelajaran: "bg-blue-500/10 text-blue-700",
  Event: "bg-purple-500/10 text-purple-700",
  Pelatihan: "bg-emerald-500/10 text-emerald-700",
  Upacara: "bg-amber-500/10 text-amber-700",
  Prestasi: "bg-rose-500/10 text-rose-700",
  Kunjungan: "bg-cyan-500/10 text-cyan-700",
};

export function Galeri({ content }: GaleriProps) {
  const [selectedItem, setSelectedItem] = useState<GaleriItem | null>(null);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Galeri
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {content.sectionTitle}
            </h2>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {content.sectionDescription}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {content.items.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <Dialog
                open={selectedItem?.id === item.id}
                onOpenChange={(open) => setSelectedItem(open ? item : null)}
              >
                <DialogTrigger
                  render={
                    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-md hover:border-primary/30" />
                  }
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ZoomIn className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      variant="secondary"
                      className={`text-xs mb-2 ${categoryColors[item.category] || ""}`}
                    >
                      {item.category}
                    </Badge>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </CardContent>
                </DialogTrigger>

                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-base">
                      {item.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </DialogContent>
              </Dialog>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
