"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

type FloatingCTAProps = {
  whatsappNumber?: string;
};

export function FloatingCTA({ whatsappNumber }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Link
        href="/ppdb"
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 text-sm font-medium"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="hidden sm:inline">Daftar Sekarang</span>
      </Link>

      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20SMK%20Nusantara%20Tech`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105 text-sm font-medium"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      )}
    </div>
  );
}
