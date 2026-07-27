"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { siteContent } from "@/app/data/content";
import {
  CalendarIcon,
  CalendarDays,
  X,
  ArrowRight,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import type { DateRange } from "react-day-picker";

dayjs.locale("id");

const content = siteContent.berita;

const categoryColorMap: Record<string, string> = {
  Prestasi: "bg-emerald-500/10 text-emerald-700",
  "Kerja Sama": "bg-blue-500/10 text-blue-700",
  PMB: "bg-amber-500/10 text-amber-700",
  Kegiatan: "bg-purple-500/10 text-purple-700",
  Akademik: "bg-rose-500/10 text-rose-700",
};

const allCategories = [...new Set(content.items.map((item) => item.category))];

function formatDate(isoDate: string) {
  return dayjs(isoDate).format("D MMMM YYYY");
}

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return content.items.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (dateRange?.from) {
        const itemDate = dayjs(item.date);
        if (itemDate.isBefore(dayjs(dateRange.from).startOf("day"))) return false;
        if (dateRange.to && itemDate.isAfter(dayjs(dateRange.to).endOf("day")))
          return false;
      }
      return true;
    });
  }, [selectedCategory, dateRange]);

  const hasActiveFilter = selectedCategory !== null || dateRange !== undefined;

  function clearFilters() {
    setSelectedCategory(null);
    setDateRange(undefined);
  }

  function formatDateRange() {
    if (!dateRange?.from) return "";
    const from = dayjs(dateRange.from).format("D MMM YYYY");
    if (!dateRange.to) return from;
    const to = dayjs(dateRange.to).format("D MMM YYYY");
    return `${from} - ${to}`;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Berita
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                {content.sectionTitle}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                {content.sectionDescription}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>Filter:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "default" : "outline"}
                    className="h-8 text-xs"
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat ? null : cat)
                    }
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <Separator orientation="vertical" className="h-6 hidden sm:block" />

              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1.5"
                    />
                  }
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {dateRange ? formatDateRange() : "Pilih Tanggal"}
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range);
                      if (range?.from && range?.to) setCalendarOpen(false);
                    }}
                    numberOfMonths={2}
                  />
                  {dateRange && (
                    <div className="border-t p-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-xs"
                        onClick={() => {
                          setDateRange(undefined);
                          setCalendarOpen(false);
                        }}
                      >
                        Hapus Filter Tanggal
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {hasActiveFilter && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs gap-1 text-muted-foreground"
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3" />
                  Reset
                </Button>
              )}
            </div>

            {hasActiveFilter && (
              <p className="text-sm text-muted-foreground mb-4">
                Menampilkan {filteredItems.length} dari {content.items.length}{" "}
                berita
              </p>
            )}

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">
                  Tidak ada berita yang cocok dengan filter yang dipilih.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={clearFilters}
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/berita/${item.id}`} className="group">
                    <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`w-fit text-xs ${
                            categoryColorMap[item.category] || ""
                          }`}
                        >
                          {item.category}
                        </Badge>
                        <CardTitle className="text-base leading-snug mt-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {item.excerpt}
                        </CardDescription>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                          Baca Selengkapnya
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
