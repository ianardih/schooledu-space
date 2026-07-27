import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  MonitorDot,
  Wrench,
  BookOpen,
  Video,
  Church,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

type Facility = {
  id: number;
  title: string;
  description: string;
  icon: string;
  videoYoutubeId: string;
};

type FasilitasProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    introVideo: { title: string; description: string; youtubeId: string };
    items: Facility[];
  };
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MonitorDot,
  Wrench,
  BookOpen,
  Video,
  Church,
  Trophy,
};

export function Fasilitas({ content }: FasilitasProps) {
  return (
    <section id="fasilitas" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="secondary" className="mb-3">
            Fasilitas
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {content.sectionTitle}
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            {content.sectionDescription}
          </p>
        </div>
        </ScrollReveal>

        {content.introVideo && (
          <div className="mx-auto max-w-3xl mb-12">
            <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${content.introVideo.youtubeId}`}
                title={content.introVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              {content.introVideo.title}
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => {
            const Icon = iconMap[item.icon] || MonitorDot;
            return (
              <Card
                key={item.id}
                className="group relative overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  {item.videoYoutubeId && (
                    <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoYoutubeId}`}
                        title={`Video ${item.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/fasilitas"
            className={buttonVariants({ variant: "outline", className: "gap-2" })}
          >
            Lihat Semua Fasilitas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
