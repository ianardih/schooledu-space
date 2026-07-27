"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/lib/animations";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type FAQProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    items: FAQItem[];
  };
};

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left bg-card hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm font-medium pr-4">{item.question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ({ content }: FAQProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {content.sectionTitle}
            </h2>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {content.sectionDescription}
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {content.items.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <FAQAccordion item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
