"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  BarChart3,
  Building2,
  Camera,
  Eye,
  Footprints,
  GraduationCap,
  Handshake,
  HelpCircle,
  Images,
  MapPin,
  Navigation,
  Newspaper,
  PlayCircle,
  Presentation,
  Quote,
  UserPlus,
  Users,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { label: "Navbar", href: "/admin/navbar", icon: Navigation, key: "navbar" },
  { label: "Hero", href: "/admin/hero", icon: Presentation, key: "hero" },
  { label: "Carousel", href: "/admin/carousel", icon: Images, key: "carousel" },
  {
    label: "Statistik",
    href: "/admin/statistik",
    icon: BarChart3,
    key: "statistik",
  },
  {
    label: "Keunggulan",
    href: "/admin/keunggulan",
    icon: Award,
    key: "keunggulan",
  },
  {
    label: "Visi & Misi",
    href: "/admin/visi-misi",
    icon: Eye,
    key: "visiMisi",
  },
  {
    label: "Program Keahlian",
    href: "/admin/program-keahlian",
    icon: GraduationCap,
    key: "programKeahlian",
  },
  {
    label: "Video Profil",
    href: "/admin/video-profil",
    icon: PlayCircle,
    key: "videoProfil",
  },
  {
    label: "Fasilitas",
    href: "/admin/fasilitas",
    icon: Building2,
    key: "fasilitas",
  },
  {
    label: "Profil Pengajar",
    href: "/admin/pengajar",
    icon: Users,
    key: "pengajar",
  },
  { label: "Galeri", href: "/admin/galeri", icon: Camera, key: "galeri" },
  { label: "Mitra", href: "/admin/mitra", icon: Handshake, key: "mitra" },
  { label: "Berita", href: "/admin/berita", icon: Newspaper, key: "berita" },
  {
    label: "Testimoni",
    href: "/admin/testimoni",
    icon: Quote,
    key: "testimoni",
  },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle, key: "faq" },
  { label: "Lokasi", href: "/admin/lokasi", icon: MapPin, key: "lokasi" },
  { label: "PPDB", href: "/admin/ppdb", icon: UserPlus, key: "ppdb" },
  { label: "Footer", href: "/admin/footer", icon: Footprints, key: "footer" },
  { label: "WhatsApp", href: "/admin/whatsapp-number", icon: MessageCircle, key: "whatsappNumber" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setCounts({
          navbar: data.navbar?.menu?.length || 0,
          carousel: data.carousel?.length || 0,
          statistik: data.statistik?.length || 0,
          keunggulan: data.keunggulan?.items?.length || 0,
          visiMisi: 1,
          programKeahlian: data.programKeahlian?.programs?.length || 0,
          videoProfil: 1,
          fasilitas: data.fasilitas?.items?.length || 0,
          pengajar: data.pengajar?.items?.length || 0,
          galeri: data.galeri?.items?.length || 0,
          mitra: data.mitra?.items?.length || 0,
          berita: data.berita?.items?.length || 0,
          testimoni: data.testimoni?.items?.length || 0,
          faq: data.faq?.items?.length || 0,
          lokasi: 1,
          ppdb: data.ppdb?.batches?.length || 0,
          hero: 1,
          footer: 1,
          whatsappNumber: 1,
        });
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Kelola semua konten website SMK Muhammadiyah 1 Gresik
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-sm font-medium">
                      {section.label}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? "-" : (counts[section.key] ?? 0)}
                  </p>
                  <p className="text-xs text-gray-500">item</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
