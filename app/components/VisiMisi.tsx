import { Badge } from "@/components/ui/badge";
import { Eye, Compass, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

type VisiMisiProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    visi: string;
    misi: string[];
  };
};

export function VisiMisi({ content }: VisiMisiProps) {
  return (
    <section id="visi-misi" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.06]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <Badge variant="secondary" className="mb-3">
              Visi & Misi
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
          <div className="mx-auto max-w-3xl mb-12">
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-primary/[0.01] p-8 md:p-10">
              <div className="absolute -top-4 left-8 flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 shadow-lg shadow-primary/20">
                <Eye className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">Visi</span>
              </div>
              <div className="absolute -top-3 right-8 h-6 w-6 rotate-45 border-t border-r border-primary/20 bg-background" />
              <p className="mt-2 text-base md:text-lg text-foreground/80 leading-relaxed italic">
                &ldquo;{content.visi}&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Misi Kami</h3>
            </div>

            <div className="grid gap-3">
              {content.misi.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/30">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed">
                        {item}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
