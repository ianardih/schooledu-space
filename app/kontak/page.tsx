"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "@/app/data/content";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Globe,
} from "lucide-react";

const content = siteContent.footer;

const jamOperasional = [
  { hari: "Senin - Jumat", jam: "07:00 - 16:00 WIB" },
  { hari: "Sabtu", jam: "07:00 - 12:00 WIB" },
  { hari: "Minggu & Hari Libur", jam: "Tutup" },
];

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
  });
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    fetch("/api/content/lokasi")
      .then((r) => r.json())
      .then((data) => {
        if (data.mapEmbedUrl) setMapUrl(data.mapEmbedUrl);
      })
      .catch(() => {});
  }, []);

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(
      "Pesan berhasil dikirim! Kami akan membalas dalam 1x24 jam melalui email."
    );
    setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Kontak
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                Hubungi Kami
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Kami siap membantu Anda. Kirim pesan atau kunjungi langsung
                sekolah kami.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Contact info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Alamat Sekolah
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {content.address}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Telepon & Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{content.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>{content.email}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Jam Operasional
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {jamOperasional.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.hari}
                          </span>
                          <span className="font-medium">{item.jam}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Media Sosial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <a
                        href={content.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 items-center gap-2 rounded-lg border bg-muted/50 hover:bg-muted transition-colors px-3"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Instagram</span>
                      </a>
                      <a
                        href={content.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 items-center gap-2 rounded-lg border bg-muted/50 hover:bg-muted transition-colors px-3"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Facebook</span>
                      </a>
                      <a
                        href={content.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 items-center gap-2 rounded-lg border bg-muted/50 hover:bg-muted transition-colors px-3"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">YouTube</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Kirim Pesan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nama">Nama Lengkap *</Label>
                          <Input
                            id="nama"
                            placeholder="Masukkan nama Anda"
                            value={formData.nama}
                            onChange={(e) =>
                              handleChange("nama", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="nama@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="telepon">No. Telepon/HP</Label>
                          <Input
                            id="telepon"
                            type="tel"
                            placeholder="08xxxxxxxxxx"
                            value={formData.telepon}
                            onChange={(e) =>
                              handleChange("telepon", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subjek">Subjek *</Label>
                          <Input
                            id="subjek"
                            placeholder="Perihal pesan"
                            value={formData.subjek}
                            onChange={(e) =>
                              handleChange("subjek", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pesan">Pesan *</Label>
                        <Textarea
                          id="pesan"
                          placeholder="Tulis pesan Anda di sini..."
                          rows={5}
                          value={formData.pesan}
                          onChange={(e) =>
                            handleChange("pesan", e.target.value)
                          }
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className={buttonVariants({ className: "gap-2 w-full sm:w-auto" })}
                      >
                        <Send className="h-4 w-4" />
                        Kirim Pesan
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12">
              <Card className="overflow-hidden">
                <div className="relative w-full aspect-video bg-muted">
                  {mapUrl ? (
                    <iframe
                      src={mapUrl}
                      title="Lokasi Sekolah"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-muted-foreground">
                          Peta Lokasi Sekolah
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {content.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
