"use client";

import { useCountUp, ScrollReveal } from "@/lib/animations";

type StatistikProps = {
  content: { value: string; label: string }[];
};

function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1]), suffix: match[2] };
}

function StatItem({ value, label }: { value: string; label: string }) {
  const { num, suffix } = parseValue(value);
  const { ref, count } = useCountUp(num, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function Statistik({ content }: StatistikProps) {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {content.map((item, index) => (
              <StatItem key={index} value={item.value} label={item.label} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
