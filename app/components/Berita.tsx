"use client";

import { useState, useMemo } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  X,
  CalendarDays,
  User,
} from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import type { DateRange } from "react-day-picker";
import { ScrollReveal } from "@/lib/animations";

dayjs.locale("id");

type BeritaItemData = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  detail: { author: string; body: string[] };
};

type BeritaProps = {
  content: {
    sectionTitle: string;
    sectionDescription: string;
    items: BeritaItemData[];
  };
};

const INITIAL_COUNT = 3;

const categoryColorMap: Record<string, string> = {
  Prestasi: "bg-emerald-500/10 text-emerald-700",
  "Kerja Sama": "bg-blue-500/10 text-blue-700",
  PMB: "bg-amber-500/10 text-amber-700",
  Kegiatan: "bg-purple-500/10 text-purple-700",
  Akademik: "bg-rose-500/10 text-rose-700",
};

function formatDate(isoDate: string) {
  return dayjs(isoDate).format("D MMMM YYYY");
}

function BeritaDetail({ item }: { item: BeritaItemData }) {
  return (
    <div className="max-h-[70vh] overflow-y-auto pr-1">
      <div className="aspect-video bg-linear-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center mb-4">
        <p className="text-sm font-medium text-muted-foreground">
          {item.category}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarIcon className="h-3 w-3" />
          <span>{formatDate(item.date)}</span>
        </div>
        <Badge
          variant="secondary"
          className={`text-xs ${categoryColorMap[item.category] || ""}`}
        >
          {item.category}
        </Badge>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <User className="h-3 w-3" />
        <span>{item.detail.author}</span>
      </div>

      <div className="space-y-3">
        {item.detail.body.map((paragraph, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export function Berita({ content }: BeritaProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const allCategories = useMemo(
    () => [...new Set(content.items.map((item) => item.category))],
    [content.items],
  );

  const filteredItems = useMemo(() => {
    return content.items.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false;

      if (dateRange?.from) {
        const itemDate = dayjs(item.date);
        if (itemDate.isBefore(dayjs(dateRange.from).startOf("day")))
          return false;
        if (dateRange.to && itemDate.isAfter(dayjs(dateRange.to).endOf("day")))
          return false;
      }

      return true;
    });
  }, [content.items, selectedCategory, dateRange]);

  const visibleItems = showAll
    ? filteredItems
    : filteredItems.slice(0, INITIAL_COUNT);
  const hasMore = filteredItems.length > INITIAL_COUNT;
  const hasActiveFilter = selectedCategory !== null || dateRange !== undefined;

  function clearFilters() {
    setSelectedCategory(null);
    setDateRange(undefined);
    setShowAll(false);
  }

  function formatDateRange() {
    if (!dateRange?.from) return "";
    const from = dayjs(dateRange.from).format("D MMM YYYY");
    if (!dateRange.to) return from;
    const to = dayjs(dateRange.to).format("D MMM YYYY");
    return `${from} - ${to}`;
  }

  return (
    <section id="berita" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Berita
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {content.sectionTitle}
            </h2>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              {content.sectionDescription}
            </p>
          </div>
        </ScrollReveal>

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
            {visibleItems.map((item) => {
              const isOpen = openDialogId === item.id;
              return (
                <Dialog
                  key={item.id}
                  open={isOpen}
                  onOpenChange={(open) =>
                    setOpenDialogId(open ? item.id : null)
                  }
                >
                  <DialogTrigger
                    render={
                      <Card className="group relative overflow-hidden transition-all hover:shadow-md cursor-pointer hover:border-primary/30" />
                    }
                  >
                    <div className="aspect-video bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
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
                      <CardTitle className="text-base leading-snug mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {item.excerpt}
                      </CardDescription>
                    </CardContent>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-base leading-snug pr-8">
                        {item.title}
                      </DialogTitle>
                    </DialogHeader>

                    <BeritaDetail item={item} />
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        )}

        {hasMore && !hasActiveFilter && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  Tampilkan Lebih Sedikit
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Lihat Semua Berita ({content.items.length})
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
