"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Megaphone,
  Trophy,
  Briefcase,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

type CarouselItemData = {
  id: number;
  type: string;
  title: string;
  description: string;
  badge: string;
  gradient: string;
  icon: string;
  href: string;
};

type CarouselSectionProps = {
  content: CarouselItemData[];
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Megaphone,
  Trophy,
  Briefcase,
  Handshake,
};

export function CarouselSection({ content }: CarouselSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {content.map((item) => {
              const Icon = iconMap[item.icon] || Calendar;
              return (
                <CarouselItem key={item.id}>
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${item.gradient} text-white`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-10">
                      <div className="flex-1 text-center md:text-left">
                        <Badge
                          variant="secondary"
                          className="mb-3 bg-white/20 text-white border-0 hover:bg-white/30 text-xs"
                        >
                          {item.badge}
                        </Badge>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/80 max-w-lg mb-4">
                          {item.description}
                        </p>
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 text-sm font-medium text-white border border-white/20 hover:bg-white/25 transition-colors"
                        >
                          Selengkapnya
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full bg-white/10 shrink-0">
                        <Icon className="h-12 w-12 md:h-16 md:w-16 text-white/80" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="flex justify-center gap-2 mt-4">
          {content.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
