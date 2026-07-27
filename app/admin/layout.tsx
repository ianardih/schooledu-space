"use client";

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
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Navigation,
  Newspaper,
  PlayCircle,
  Presentation,
  Quote,
  UserPlus,
  Users,
  X,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Navbar", href: "/admin/navbar", icon: Navigation },
  { label: "Hero", href: "/admin/hero", icon: Presentation },
  { label: "Carousel", href: "/admin/carousel", icon: Images },
  { label: "Statistik", href: "/admin/statistik", icon: BarChart3 },
  { label: "Keunggulan", href: "/admin/keunggulan", icon: Award },
  { label: "Visi & Misi", href: "/admin/visi-misi", icon: Eye },
  {
    label: "Program Keahlian",
    href: "/admin/program-keahlian",
    icon: GraduationCap,
  },
  { label: "Video Profil", href: "/admin/video-profil", icon: PlayCircle },
  { label: "Fasilitas", href: "/admin/fasilitas", icon: Building2 },
  { label: "Profil Pengajar", href: "/admin/pengajar", icon: Users },
  { label: "Galeri", href: "/admin/galeri", icon: Camera },
  { label: "Mitra", href: "/admin/mitra", icon: Handshake },
  { label: "Berita", href: "/admin/berita", icon: Newspaper },
  { label: "Testimoni", href: "/admin/testimoni", icon: Quote },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Lokasi", href: "/admin/lokasi", icon: MapPin },
  { label: "PPDB", href: "/admin/ppdb", icon: UserPlus },
  { label: "Footer", href: "/admin/footer", icon: Footprints },
  { label: "WhatsApp", href: "/admin/whatsapp-number", icon: MessageCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Admin Panel</h2>
            <p className="text-xs text-gray-400">SMK Muhammadiyah 1 Gresik</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-gray-700">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-semibold text-gray-900">Admin Panel</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
