import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

type HeroProps = {
  content: {
    tagline: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    image: string;
  };
};

export function Hero({ content }: HeroProps) {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10"
    >
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <ScrollReveal>
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center rounded-full border bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {content.tagline}
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-base md:text-lg">
                {content.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={content.ctaPrimaryHref}
                  className={buttonVariants({ size: "lg", className: "gap-2" })}
                >
                  {content.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={content.ctaSecondaryHref}
                  className={buttonVariants({
                    size: "lg",
                    variant: "outline",
                    className: "gap-2",
                  })}
                >
                  <PlayCircle className="h-4 w-4" />
                  {content.ctaSecondary}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative mx-auto lg:mx-0 w-full max-w-[500px]">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border shadow-lg flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10" />
                <div className="relative text-center p-8">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur">
                    <svg
                      className="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {content.title.split(" ").slice(-2).join(" ")}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {content.tagline}
                  </p>
                </div>
                {/* Decorative dots */}
                <div className="absolute top-4 right-4 flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary/30" />
                  <div className="h-2 w-2 rounded-full bg-primary/20" />
                  <div className="h-2 w-2 rounded-full bg-primary/10" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
