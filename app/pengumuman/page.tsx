"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { siteContent } from "../data/content";
import dayjs from "dayjs";
import "dayjs/locale/id";
import {
  Search,
  CheckCircle2,
  GraduationCap,
  CalendarIcon,
  Clock,
  FileText,
  ArrowRight,
  Printer,
  Share2,
  Star,
} from "lucide-react";

dayjs.locale("id");

const ppdb = siteContent.ppdb;

const sampleResult = {
  noPendaftaran: "SMK-2026-00142",
  nama: "Rina Amelia Putri",
  nisn: "0067890123",
  tempatLahir: "Semarang",
  tanggalLahir: "2009-03-15",
  jenisKelamin: "Perempuan",
  agama: "Islam",
  alamat: "Jl. Diponegoro No. 45, Kec. Semarang Tengah, Kota Semarang",
  telepon: "081234567890",
  email: "rina.putri@email.com",
  namaOrangTua: "Budi Santoso",
  pekerjaanOrangTua: "Wiraswasta",
  programPilihan: "RPL",
  jalurPendaftaran: "Jalur Umum",
  gelombang: "Gelombang 1",
  tanggalDaftar: "2026-04-15",
  tanggalPengumuman: "2026-07-12",
  status: "DITERIMA",
  nilaiTes: 87,
  ranking: 12,
  kuotaProgram: 40,
};

export default function PengumumanPage() {
  const [noPendaftaran, setNoPendaftaran] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!noPendaftaran.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1500);
  }

  function handlePrint() {
    window.print();
  }

  const program = ppdb.programs.find(
    (p) => p.code === sampleResult.programPilihan
  );

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3">
                Pengumuman PPDB
              </Badge>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
                Hasil Seleksi Penerimaan
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Masukkan nomor pendaftaran Anda untuk melihat hasil pengumuman
                seleksi PPDB {ppdb.academicYear}.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            {/* Search Form */}
            {!showResult && (
              <Card>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="text-center mb-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                        <Search className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-lg font-bold">Cek Hasil Pengumuman</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Masukkan nomor pendaftaran yang Anda terima saat mendaftar
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="noPendaftaran">Nomor Pendaftaran</Label>
                      <Input
                        id="noPendaftaran"
                        placeholder="Contoh: SMK-2026-00142"
                        value={noPendaftaran}
                        onChange={(e) => setNoPendaftaran(e.target.value)}
                        className="text-center text-lg tracking-wider font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!noPendaftaran.trim() || isSearching}
                      className={buttonVariants({
                        className: "w-full gap-2",
                        size: "lg",
                      })}
                    >
                      {isSearching ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Mencari Data...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4" />
                          Lihat Hasil
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-muted-foreground">
                      * Gunakan nomor pendaftaran yang tertera pada bukti pendaftaran Anda
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Result */}
            {showResult && (
              <div className="space-y-6" id="pengumuman-content">
                {/* Success Banner - no-print */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 md:p-8 text-center no-print">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mx-auto mb-4">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                      SELAMAT!
                    </h2>
                    <p className="text-lg text-emerald-100">
                      Anda DITERIMA di SMK Nusantara Tech
                    </p>
                    <Badge className="mt-3 bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm">
                      {sampleResult.gelombang} — {sampleResult.noPendaftaran}
                    </Badge>
                  </div>
                </div>

                {/* ===== PRINTABLE LETTER ===== */}
                <div className="print-letter">
                  {/* Paper wrapper */}
                  <div className="bg-white text-black rounded-lg border shadow-sm">
                    {/* Letterhead */}
                    <div className="border-b-2 border-black p-5 md:p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black shrink-0">
                          <GraduationCap className="h-8 w-8" />
                        </div>
                        <div className="text-center flex-1">
                          <h3 className="text-lg font-extrabold tracking-wide uppercase">
                            SMK Nusantara Tech
                          </h3>
                          <p className="text-[11px] tracking-wide">
                            Jl. Pendidikan No. 123, Kec. Teknologi, Kota Semarang, Jawa Tengah 50231
                          </p>
                          <p className="text-[11px] tracking-wide">
                            Telp. (024) 1234567 | Email: info@smknusantara-tech.sch.id
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Letter body */}
                    <div className="p-5 md:p-6 md:px-10 space-y-5">
                      {/* Title */}
                      <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.25em] mb-1 font-medium">
                          Surat Keterangan Kelulusan
                        </p>
                        <h2 className="text-xl font-extrabold uppercase tracking-wide">
                          Pengumuman Kelulusan
                        </h2>
                        <p className="text-sm mt-1">
                          Penerimaan Peserta Didik Baru Tahun Ajaran {ppdb.academicYear}
                        </p>
                      </div>

                      {/* Number & date */}
                      <div className="flex justify-between text-sm">
                        <span>No. {sampleResult.noPendaftaran}/SKL-PPDB/{dayjs(sampleResult.tanggalPengumuman).format("MM/YYYY")}</span>
                        <span>Semarang, {dayjs(sampleResult.tanggalPengumuman).format("D MMMM YYYY")}</span>
                      </div>

                      <p className="text-sm leading-relaxed">
                        Kepada Yth.
                        <br />
                        <strong className="text-base">{sampleResult.nama}</strong>
                        <br />
                        di Tempat
                      </p>

                      <p className="text-sm leading-relaxed">
                        Dengan hormat,
                      </p>

                      <p className="text-sm leading-relaxed">
                        Bersama ini kami sampaikan bahwa calon peserta didik dengan identitas di bawah ini dinyatakan{" "}
                        <strong className="text-emerald-600 text-base">DITERIMA</strong> di{" "}
                        <strong>SMK Nusantara Tech</strong> pada program keahlian{" "}
                        <strong>{program?.name}</strong> untuk tahun ajaran {ppdb.academicYear}.
                      </p>

                      {/* Student identity table */}
                      <div className="rounded-lg border overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            <TableRow label="Nomor Pendaftaran" value={sampleResult.noPendaftaran} />
                            <TableRow label="Nama Lengkap" value={sampleResult.nama} />
                            <TableRow label="NISN" value={sampleResult.nisn} />
                            <TableRow label="Tempat, Tanggal Lahir" value={`${sampleResult.tempatLahir}, ${dayjs(sampleResult.tanggalLahir).format("D MMMM YYYY")}`} />
                            <TableRow label="Jenis Kelamin" value={sampleResult.jenisKelamin} />
                            <TableRow label="Agama" value={sampleResult.agama} />
                            <TableRow label="Alamat" value={sampleResult.alamat} />
                            <TableRow label="Program Keahlian" value={`${program?.name} (${sampleResult.programPilihan})`} />
                            <TableRow label="Jalur Pendaftaran" value={sampleResult.jalurPendaftaran} />
                            <TableRow label="Gelombang" value={sampleResult.gelombang} />
                            <TableRow label="Nilai Seleksi" value={`${sampleResult.nilaiTes}`} />
                          </tbody>
                        </table>
                      </div>

                      <p className="text-sm leading-relaxed">
                        Demikian surat keterangan ini kami buat dengan sebenar-benarnya
                        untuk dapat dipergunakan sebagaimana mestinya.
                      </p>

                      {/* Signature + Stamp */}
                      <div className="flex justify-between items-end pt-4">
                        <div>
                          <p className="text-sm font-semibold underline">
                            Dr. Surya Pratama, M.Pd.
                          </p>
                          <p className="text-xs">Kepala SMK Nusantara Tech</p>
                          <p className="text-[10px] text-gray-500">NIP. 197501012005011002</p>
                        </div>
                        <div className="text-center">
                          <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                            <span className="text-[10px] text-gray-400 font-medium leading-tight">
                              STAMPEL<br />SEKOLAH
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ===== END PRINTABLE LETTER ===== */}

                {/* Next steps - no-print */}
                <div className="no-print">
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Langkah Selanjutnya
                    </h4>
                    <div className="space-y-3">
                      <StepItem
                        number={1}
                        title="Daftar Ulang"
                        description={`Lakukan daftar ulang paling lambat ${dayjs(sampleResult.tanggalPengumuman).add(7, "day").format("D MMMM YYYY")}`}
                      />
                      <StepItem
                        number={2}
                        title="Berkas yang Dibutuhkan"
                        description="Fotokopi ijazah, SKHUN, akte kelahiran, KK, foto 3x4 (4 lembar), surat keterangan sehat"
                      />
                      <StepItem
                        number={3}
                        title="Pembayaran"
                        description="Biaya pendaftaran ulang dan SPP awal dapat dilihat pada surat daftar ulang"
                      />
                      <StepItem
                        number={4}
                        title="Masa Orientasi"
                        description={`Masa orientasi siswa baru: ${dayjs("2026-07-20").format("D MMMM YYYY")}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions - no-print */}
                <div className="flex flex-col sm:flex-row gap-3 no-print">
                  <button
                    onClick={handlePrint}
                    className={buttonVariants({ variant: "outline", className: "gap-2 flex-1" })}
                  >
                    <Printer className="h-4 w-4" />
                    Cetak Surat
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("pengumuman-content");
                      if (el) {
                        const text = el.innerText;
                        navigator.clipboard.writeText(text);
                        alert("Berhasil disalin ke clipboard!");
                      }
                    }}
                    className={buttonVariants({ variant: "outline", className: "gap-2 flex-1" })}
                  >
                    <Share2 className="h-4 w-4" />
                    Salin Hasil
                  </button>
                </div>

                {/* Re-check */}
                <div className="text-center no-print">
                  <button
                    onClick={() => {
                      setShowResult(false);
                      setNoPendaftaran("");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Cek Nomor Lain
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Info section */}
        {!showResult && (
          <section className="py-12 md:py-16 bg-muted/30 border-t">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold mb-2">Informasi Pengumuman</h2>
                <p className="text-sm text-muted-foreground">
                  Perhatikan informasi berikut sebelum mengecek hasil pengumuman
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {ppdb.batches.map((batch) => (
                  <Card key={batch.name}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold">{batch.name}</h3>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            batch.status === "closed"
                              ? "bg-emerald-500/10 text-emerald-700"
                              : batch.status === "active"
                                ? "bg-blue-500/10 text-blue-700"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {batch.status === "closed"
                            ? "Sudah Diumumkan"
                            : batch.status === "active"
                              ? "Belum Diumumkan"
                              : "Akan Datang"}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3 w-3" />
                          Pengumuman:{" "}
                          <span className="font-medium text-foreground">
                            {dayjs(batch.announcementDate).format("D MMMM YYYY")}
                          </span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          Daftar ulang: 7 hari setelah pengumuman
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 rounded-lg border bg-card p-4">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Hal Penting
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Star className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                    Pastikan nomor pendaftaran yang dimasukkan sesuai dengan bukti pendaftaran
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                    Hasil pengumuman juga dikirimkan melalui email yang terdaftar
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                    Siswa dinyatakan diterima wajib melakukan daftar ulang sesuai jadwal
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                    Kegagalan daftar ulang dalam batas waktu yang ditentukan mengakibatkan gugur
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/kontak"
                  className={buttonVariants({ variant: "outline", className: "gap-2" })}
                >
                  Hubungi Panitia PPDB
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .no-print, header, footer, nav { display: none !important; }
          #pengumuman-content,
          #pengumuman-content * { visibility: visible !important; }
          .print-letter {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-letter > div {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          @page {
            size: A4;
            margin: 15mm 20mm;
          }
        }
      `}</style>
    </>
  );
}

function TableRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="px-3 py-2 text-xs font-medium bg-muted/50 w-2/5 align-top">
        {label}
      </td>
      <td className="px-3 py-2 text-sm">{value}</td>
    </tr>
  );
}

function StepItem({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
