"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "../data/content";
import dayjs from "dayjs";
import "dayjs/locale/id";
import {
  User,
  Users,
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  GraduationCap,
  CalendarIcon,
  Clock,
  Search,
  Megaphone,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Timer,
  Users2,
  TrendingUp,
} from "lucide-react";

dayjs.locale("id");

const ppdb = siteContent.ppdb;
const programs = siteContent.programKeahlian.programs;

const jalurOptions = [
  { value: "umum", label: "Jalur Umum", description: "Tes tertulis dan wawancara" },
  { value: "prestasi", label: "Jalur Prestasi", description: "Berdasarkan prestasi akademik/non-akademik" },
  { value: "mitra", label: "Jalur Mitra Industri", description: "Rekomendasi dari mitra industri" },
];

const agamaOptions = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];

const batchStatusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Sedang Dibuka", color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", dot: "bg-emerald-500" },
  upcoming: { label: "Akan Datang", color: "bg-amber-500/10 text-amber-700 border-amber-500/20", dot: "bg-amber-500" },
  closed: { label: "Ditutup", color: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground/40" },
};

function useCountdown(target: string) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = dayjs(target).diff(dayjs(), "second");
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      seconds: diff % 60,
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = dayjs(target).diff(dayjs(), "second");
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(id);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function PPDBPage() {
  const [step, setStep] = useState("data-diri");
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nisn: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    agama: "",
    alamat: "",
    telepon: "",
    email: "",
    namaOrangTua: "",
    pekerjaanOrangTua: "",
    teleponOrangTua: "",
    alamatOrangTua: "",
    programPilihan: "",
    jalurPendaftaran: "",
    catatan: "",
  });

  const countdown = useCountdown(ppdb.countdownTarget);

  const steps = [
    { id: "data-diri", label: "Data Diri", icon: User },
    { id: "orang-tua", label: "Orang Tua", icon: Users },
    { id: "pilihan", label: "Pilihan Program", icon: BookOpen },
    { id: "konfirmasi", label: "Konfirmasi", icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function goNext() {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) setStep(steps[nextIndex].id);
  }

  function goPrev() {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) setStep(steps[prevIndex].id);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Pendaftaran berhasil! Silakan cek email Anda untuk informasi lebih lanjut.");
  }

  const totalQuota = ppdb.programs.reduce((sum, p) => sum + p.quota, 0);
  const totalRegistered = ppdb.batches.reduce((sum, b) => sum + b.registered, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero with Countdown */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-white/20 text-white border-white/30 hover:bg-white/30">
                PPDB {ppdb.academicYear}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
                {ppdb.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
                {ppdb.subtitle}
              </p>
            </div>

            {/* Countdown */}
            <div className="mx-auto max-w-xl mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Timer className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/70">{ppdb.countdownLabel}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: countdown.days, label: "Hari" },
                  { value: countdown.hours, label: "Jam" },
                  { value: countdown.minutes, label: "Menit" },
                  { value: countdown.seconds, label: "Detik" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-3 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/60 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              <div className="rounded-lg bg-white/10 border border-white/10 p-3 text-center">
                <Users2 className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <div className="text-lg font-bold">{totalRegistered}</div>
                <div className="text-[10px] text-white/60">Terdaftar</div>
              </div>
              <div className="rounded-lg bg-white/10 border border-white/10 p-3 text-center">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <div className="text-lg font-bold">{totalQuota}</div>
                <div className="text-[10px] text-white/60">Total Kuota</div>
              </div>
              <div className="rounded-lg bg-white/10 border border-white/10 p-3 text-center">
                <Clock className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <div className="text-lg font-bold">{ppdb.batches.length}</div>
                <div className="text-[10px] text-white/60">Gelombang</div>
              </div>
            </div>
          </div>
        </section>

        {/* Batch Announcements */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <Badge variant="secondary" className="mb-3">
                Pengumuman
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Jadwal Pendaftaran
              </h2>
              <p className="mt-2 text-muted-foreground">
                Pilih gelombang yang sesuai. Pastikan Anda mendaftar sebelum batas waktu yang ditentukan.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
              {ppdb.batches.map((batch) => {
                const cfg = batchStatusConfig[batch.status];
                const fillPercent = Math.round((batch.registered / batch.quota) * 100);
                return (
                  <Card
                    key={batch.name}
                    className={`relative overflow-hidden ${
                      batch.status === "active" ? "border-primary/40 shadow-md" : ""
                    }`}
                  >
                    {batch.status === "active" && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-base">{batch.name}</CardTitle>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${cfg.color}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {dayjs(batch.registrationStart).format("D MMM")} -{" "}
                            {dayjs(batch.registrationEnd).format("D MMM YYYY")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Search className="h-3.5 w-3.5 shrink-0" />
                          <span>Seleksi: {dayjs(batch.selectionDate).format("D MMM YYYY")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Megaphone className="h-3.5 w-3.5 shrink-0" />
                          <span>Pengumuman: {dayjs(batch.announcementDate).format("D MMM YYYY")}</span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">
                            {batch.registered}/{batch.quota} pendaftar
                          </span>
                          <span className="font-medium">{fillPercent}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              fillPercent >= 100
                                ? "bg-muted-foreground/40"
                                : fillPercent >= 80
                                  ? "bg-amber-500"
                                  : "bg-primary"
                            }`}
                            style={{ width: `${Math.min(fillPercent, 100)}%` }}
                          />
                        </div>
                      </div>

                      {batch.status === "active" && (
                        <Link
                          href="#formulir"
                          className={buttonVariants({ size: "sm", className: "w-full gap-2" })}
                        >
                          Daftar Gelombang Ini
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      {batch.status === "upcoming" && (
                        <div className="text-center text-xs text-muted-foreground py-1">
                          Pendaftaran belum dibuka
                        </div>
                      )}
                      {batch.status === "closed" && (
                        <div className="text-center text-xs text-muted-foreground py-1">
                          Pendaftaran sudah ditutup
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Registration Flow */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <Badge variant="secondary" className="mb-3">
                Alur Pendaftaran
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                5 Langkah Mudah Mendaftar
              </h2>
              <p className="mt-2 text-muted-foreground">
                Proses pendaftaran cepat dan transparan. Ikuti langkah-langkah berikut.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Desktop flow */}
              <div className="hidden md:block">
                <div className="flex items-start justify-between relative">
                  <div className="absolute top-6 left-0 right-0 h-px bg-border" />
                  {ppdb.registrationFlow.map((item) => (
                      <div key={item.step} className="relative flex flex-col items-center text-center w-1/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm z-10 mb-3">
                          {item.step}
                        </div>
                        <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                          {item.description}
                        </p>
                        <span className="text-[10px] text-primary font-medium">{item.duration}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Mobile flow */}
              <div className="md:hidden space-y-4">
                {ppdb.registrationFlow.map((item, i) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                          {item.step}
                        </div>
                        {i < ppdb.registrationFlow.length - 1 && (
                          <div className="w-px flex-1 bg-border my-1" />
                        )}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <span className="text-[10px] text-primary font-medium">{item.duration}</span>
                      </div>
                      </div>
                    ))}
                </div>
              </div>
          </div>
        </section>

        {/* Programs & Requirements */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
              {/* Program Quota */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Kuota per Program
                </h2>
                <div className="space-y-3">
                  {ppdb.programs.map((prog) => {
                    const progRegistered = ppdb.batches
                      .filter((b) => b.status === "closed")
                      .reduce((sum) => sum + Math.round(prog.quota * 0.85), 0);
                    const fillPercent = Math.round((progRegistered / prog.quota) * 100);
                    return (
                      <div key={prog.code} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                              {prog.code}
                            </span>
                            <span className="text-sm font-medium">{prog.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{prog.quota} kuota</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/60"
                            style={{ width: `${Math.min(fillPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Persyaratan Umum
                </h2>
                <div className="rounded-lg border p-4 space-y-3">
                  {ppdb.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg bg-primary/5 border border-primary/10 p-4">
                  <h3 className="text-sm font-semibold mb-2">Berkas yang Harus Disiapkan</h3>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      Fotokopi NISN / Akta Kelahiran
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      Fotokopi Kartu Keluarga
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      Fotokopi Ijazah / SKHUN (jika ada)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      Pas foto 3x4 (2 lembar, latar biru)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      Sertifikat prestasi (jika ada)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      Surat keterangan sehat dari dokter
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 md:py-16 bg-muted/30 border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="rounded-xl border bg-card p-6 md:p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-2">Butuh Bantuan?</h2>
                  <p className="text-sm text-muted-foreground">
                    Hubungi panitia PPDB untuk informasi lebih lanjut
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <a
                    href={`https://wa.me/${ppdb.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
                      <MessageSquare className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                      <p className="text-sm font-medium">Chat Kami</p>
                    </div>
                  </a>
                  <a
                    href={`tel:${ppdb.contact.phone}`}
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Telepon</p>
                      <p className="text-sm font-medium">{ppdb.contact.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${ppdb.contact.email}`}
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">Kirim Email</p>
                    </div>
                  </a>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  {ppdb.contact.hours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="formulir" className="py-12 md:py-16 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-3">
                Formulir Pendaftaran
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight">
                Isi Data Pendaftaran
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                Pastikan data yang diisi sudah benar sebelum mengirim.
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = s.id === step;
                const isCompleted = i < currentStepIndex;
                return (
                  <div key={s.id} className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <div
                        className={`w-8 h-px ${
                          isCompleted ? "bg-primary/40" : "bg-border"
                        }`}
                      />
                    )}
                    </div>
                  );
                })}
              </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Data Diri */}
              {step === "data-diri" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Data Diri Siswa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="namaLengkap">Nama Lengkap *</Label>
                        <Input
                          id="namaLengkap"
                          placeholder="Masukkan nama lengkap"
                          value={formData.namaLengkap}
                          onChange={(e) => handleChange("namaLengkap", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nisn">NISN *</Label>
                        <Input
                          id="nisn"
                          placeholder="Nomor Induk Siswa Nasional"
                          value={formData.nisn}
                          onChange={(e) => handleChange("nisn", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tempatLahir">Tempat Lahir *</Label>
                        <Input
                          id="tempatLahir"
                          placeholder="Kota kelahiran"
                          value={formData.tempatLahir}
                          onChange={(e) => handleChange("tempatLahir", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tanggal Lahir *</Label>
                        <Popover>
                          <PopoverTrigger
                            render={
                              <button
                                type="button"
                                className={buttonVariants({
                                  variant: "outline",
                                  className:
                                    "w-full justify-start gap-2 text-left font-normal h-8",
                                })}
                              />
                            }
                          >
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            {formData.tanggalLahir ? (
                              dayjs(formData.tanggalLahir).format("D MMMM YYYY")
                            ) : (
                              <span className="text-muted-foreground">
                                Pilih tanggal
                              </span>
                            )}
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                              mode="single"
                              defaultMonth={
                                formData.tanggalLahir
                                  ? new Date(formData.tanggalLahir)
                                  : new Date(2010, 0)
                              }
                              selected={
                                formData.tanggalLahir
                                  ? new Date(formData.tanggalLahir)
                                  : undefined
                              }
                              onSelect={(day) => {
                                if (day) {
                                  handleChange("tanggalLahir", dayjs(day).format("YYYY-MM-DD"));
                                }
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Jenis Kelamin *</Label>
                        <RadioGroup
                          value={formData.jenisKelamin}
                          onValueChange={(val) => handleChange("jenisKelamin", val as string)}
                          className="flex gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="laki-laki" id="laki-laki" />
                            <Label htmlFor="laki-laki" className="font-normal cursor-pointer">
                              Laki-laki
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="perempuan" id="perempuan" />
                            <Label htmlFor="perempuan" className="font-normal cursor-pointer">
                              Perempuan
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Agama *</Label>
                        <Select
                          value={formData.agama}
                          onValueChange={(val) => handleChange("agama", val as string)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih agama" />
                          </SelectTrigger>
                          <SelectContent>
                            {agamaOptions.map((a) => (
                              <SelectItem key={a} value={a}>
                                {a}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Lengkap *</Label>
                      <Textarea
                        id="alamat"
                        placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                        value={formData.alamat}
                        onChange={(e) => handleChange("alamat", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="telepon">No. Telepon/HP *</Label>
                        <Input
                          id="telepon"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={formData.telepon}
                          onChange={(e) => handleChange("telepon", e.target.value)}
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
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Foto Siswa</Label>
                      <div className="flex items-center gap-3">
                        <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed bg-muted/50">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>Format: JPG, PNG (Maks. 2MB)</p>
                          <p>Ukuran: 3x4 cm, latar belakang biru</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Data Orang Tua */}
              {step === "orang-tua" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Data Orang Tua / Wali
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="namaOrangTua">Nama Orang Tua / Wali *</Label>
                        <Input
                          id="namaOrangTua"
                          placeholder="Nama lengkap orang tua/wali"
                          value={formData.namaOrangTua}
                          onChange={(e) => handleChange("namaOrangTua", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pekerjaanOrangTua">Pekerjaan *</Label>
                        <Input
                          id="pekerjaanOrangTua"
                          placeholder="Pekerjaan orang tua/wali"
                          value={formData.pekerjaanOrangTua}
                          onChange={(e) => handleChange("pekerjaanOrangTua", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="teleponOrangTua">No. Telepon/HP *</Label>
                        <Input
                          id="teleponOrangTua"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={formData.teleponOrangTua}
                          onChange={(e) => handleChange("teleponOrangTua", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alamatOrangTua">Alamat *</Label>
                        <Input
                          id="alamatOrangTua"
                          placeholder="Alamat orang tua/wali"
                          value={formData.alamatOrangTua}
                          onChange={(e) => handleChange("alamatOrangTua", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground">
                        <strong>Catatan:</strong> Data orang tua/wali diperlukan untuk
                        keperluan komunikasi dan administrasi sekolah. Pastikan data
                        yang diisi sudah benar dan dapat dihubungi.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Pilihan Program */}
              {step === "pilihan" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Pilihan Program Keahlian
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Program Keahlian Pilihan 1 *</Label>
                      <Select
                        value={formData.programPilihan}
                        onValueChange={(val) => handleChange("programPilihan", val as string)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih program keahlian" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((p) => (
                            <SelectItem key={p.slug} value={p.slug}>
                              {p.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Jalur Pendaftaran *</Label>
                      <RadioGroup
                        value={formData.jalurPendaftaran}
                        onValueChange={(val) => handleChange("jalurPendaftaran", val as string)}
                      >
                        <div className="grid gap-3">
                          {jalurOptions.map((j) => (
                            <label
                              key={j.value}
                              htmlFor={j.value}
                              className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                                formData.jalurPendaftaran === j.value
                                  ? "border-primary bg-primary/5"
                                  : "hover:bg-muted/50"
                              }`}
                            >
                              <RadioGroupItem value={j.value} id={j.value} className="mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">{j.label}</p>
                                <p className="text-xs text-muted-foreground">{j.description}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="catatan">Catatan Tambahan (Opsional)</Label>
                      <Textarea
                        id="catatan"
                        placeholder="Tulis informasi tambahan yang ingin disampaikan..."
                        value={formData.catatan}
                        onChange={(e) => handleChange("catatan", e.target.value)}
                      />
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground">
                        <strong>Catatan:</strong> Pilihan program keahlian tidak dapat
                        diubah setelah pendaftaran diproses. Pastikan pilihan Anda sudah
                        tepat.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Konfirmasi */}
              {step === "konfirmasi" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Konfirmasi Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Pastikan semua data yang Anda masukkan sudah benar. Setelah
                      pendaftaran dikirim, Anda akan menerima email konfirmasi.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Data Diri
                        </p>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Nama:</span> {formData.namaLengkap || "-"}</p>
                          <p><span className="text-muted-foreground">NISN:</span> {formData.nisn || "-"}</p>
                          <p><span className="text-muted-foreground">Lahir:</span> {formData.tempatLahir ? `${formData.tempatLahir}, ${formData.tanggalLahir || "-"}` : "-"}</p>
                          <p><span className="text-muted-foreground">Gender:</span> {formData.jenisKelamin || "-"}</p>
                          <p><span className="text-muted-foreground">Agama:</span> {formData.agama || "-"}</p>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Kontak
                        </p>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Telepon:</span> {formData.telepon || "-"}</p>
                          <p><span className="text-muted-foreground">Email:</span> {formData.email || "-"}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            <span className="font-medium">Alamat:</span> {formData.alamat || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Orang Tua
                        </p>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">Nama:</span> {formData.namaOrangTua || "-"}</p>
                          <p><span className="text-muted-foreground">Pekerjaan:</span> {formData.pekerjaanOrangTua || "-"}</p>
                          <p><span className="text-muted-foreground">Telepon:</span> {formData.teleponOrangTua || "-"}</p>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Pilihan
                        </p>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Program:</span>{" "}
                            {programs.find((p) => p.slug === formData.programPilihan)?.title || "-"}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Jalur:</span>{" "}
                            {jalurOptions.find((j) => j.value === formData.jalurPendaftaran)?.label || "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-primary/5 p-4">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Yang perlu disiapkan:</p>
                          <ul className="list-disc pl-4 space-y-0.5">
                            <li>Foto copy NISN / Akta Kelahiran</li>
                            <li>Foto copy Kartu Keluarga</li>
                            <li>Foto copy Ijazah / SKHUN (jika ada)</li>
                            <li>Pas foto 3x4 (2 lembar)</li>
                            <li>Sertifikat prestasi (jika ada)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-6">
                {currentStepIndex > 0 ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    className={buttonVariants({
                      variant: "outline",
                      className: "gap-2",
                    })}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Sebelumnya
                  </button>
                ) : (
                  <div />
                )}

                {currentStepIndex < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className={buttonVariants({ className: "gap-2" })}
                  >
                    Selanjutnya
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={buttonVariants({ className: "gap-2" })}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Kirim Pendaftaran
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
