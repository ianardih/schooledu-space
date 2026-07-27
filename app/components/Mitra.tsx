import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/lib/animations";
import { InfiniteMovingCards } from "./InfiniteMovingCards";

type MitraItem = {
  id: number;
  name: string;
  logo: string;
  type: string;
};

type MitraProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    items: MitraItem[];
  };
};

export function Mitra({ content }: MitraProps) {
  const items = content.items.map((item) => ({
    name: item.name,
    logo: item.logo,
  }));

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Mitra
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
          <div className="space-y-4">
            <InfiniteMovingCards
              items={items}
              direction="left"
              speed="normal"
            />
            <InfiniteMovingCards
              items={[...items].reverse()}
              direction="right"
              speed="normal"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
