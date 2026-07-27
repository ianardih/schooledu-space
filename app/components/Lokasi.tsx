import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ScrollReveal } from "@/lib/animations";

type LokasiProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    mapEmbedUrl: string;
  };
};

export function Lokasi({ content }: LokasiProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Lokasi
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {content.sectionTitle}
            </h2>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {content.sectionDescription}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          <ScrollReveal>
            <Card className="overflow-hidden h-full">
              <div className="relative w-full aspect-video bg-muted">
                <iframe
                  src={content.mapEmbedUrl}
                  title={`Lokasi - ${content.sectionTitle}`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="h-full">
              <CardContent className="pt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Alamat</h4>
                    <p className="text-sm text-muted-foreground">
                      {content.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Telepon</h4>
                    <p className="text-sm text-muted-foreground">
                      {content.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      {content.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Jam Operasional
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {content.hours}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
