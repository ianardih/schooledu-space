"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Handshake,
  Briefcase,
  Laptop,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

type KeunggulanItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

type KeunggulanProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    items: KeunggulanItem[];
  };
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Handshake,
  Briefcase,
  Laptop,
  TrendingUp,
  GraduationCap,
};

export function Keunggulan({ content }: KeunggulanProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Keunggulan
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {content.sectionTitle}
            </h2>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {content.sectionDescription}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {content.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
