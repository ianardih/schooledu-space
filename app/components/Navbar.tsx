"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  X,
  GraduationCap,
  Building2,
  Newspaper,
  Megaphone,
  Eye,
  Users,
} from "lucide-react";
import defaultSiteContent from "@/app/data/site-content.json";

type NavbarProps = {
  content?: {
    schoolName: string;
    logo: string;
    menu: { label: string; href: string }[];
  };
};

const navGroups = [
  {
    label: "Profil",
    items: [
      {
        href: "/visi-misi",
        icon: Eye,
        title: "Visi & Misi",
        description: "Arah dan tujuan sekolah ke depan",
      },
      {
        href: "/pengajar",
        icon: Users,
        title: "Profil Pengajar",
        description: "Tenaga pengajar profesional & bersertifikat",
      },
      {
        href: "/program",
        icon: GraduationCap,
        title: "Program Keahlian",
        description: "6 program keahlian berstandar industri",
      },
      {
        href: "/fasilitas",
        icon: Building2,
        title: "Fasilitas",
        description: "Lab modern & fasilitas lengkap",
      },
    ],
  },
  {
    label: "Informasi",
    items: [
      {
        href: "/berita",
        icon: Newspaper,
        title: "Berita",
        description: "Kabar terbaru dari sekolah",
      },
      {
        href: "/pengumuman",
        icon: Megaphone,
        title: "Pengumuman",
        description: "Pengumuman resmi sekolah",
      },
    ],
  },
];

const groupedHrefs = new Set(
  navGroups.flatMap((g) => g.items.map((i) => i.href))
);

export function Navbar({ content: rawContent }: NavbarProps) {
  const content = rawContent ?? defaultSiteContent.navbar;
  const [mobileOpen, setMobileOpen] = useState(false);

  const standaloneItems = content.menu.filter(
    (m) => !groupedHrefs.has(m.href) && m.href !== "/ppdb"
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>{content.schoolName}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {standaloneItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className="inline-flex h-9 items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:bg-muted"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {navGroups.map((group) => (
                <NavigationMenuItem key={group.label}>
                  <NavigationMenuTrigger className="text-foreground">
                    {group.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-3 w-[340px]">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink
                              href={item.href}
                              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                            >
                              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <Icon className="h-4.5 w-4.5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                                  {item.description}
                                </p>
                              </div>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="w-px h-6 bg-border mx-1" />

          <Link
            href="/ppdb"
            className={buttonVariants({ size: "sm" })}
          >
            PPDB 2026
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-3 space-y-1">
            {standaloneItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center h-10 px-3 rounded-lg text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}

            {navGroups.map((group) => (
              <div key={group.label}>
                <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 h-10 px-3 ml-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/ppdb"
                onClick={() => setMobileOpen(false)}
                className={buttonVariants({ size: "sm", className: "w-full" })}
              >
                PPDB 2026
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
