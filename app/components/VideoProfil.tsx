import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/lib/animations";

type VideoProfilProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    youtubeId: string;
    thumbnail: string;
  };
};

export function VideoProfil({ content }: VideoProfilProps) {
  if (!content.youtubeId) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Video Profil
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
          <div className="mx-auto max-w-4xl">
            <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-xl">
              <iframe
                src={`https://www.youtube.com/embed/${content.youtubeId}`}
                title={content.sectionTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
