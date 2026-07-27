"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type PPDBData = {
  title: string;
  subtitle: string;
  academicYear: string;
  countdownTarget: string;
  countdownLabel: string;
  batches: { name: string; registrationStart: string; registrationEnd: string; selectionDate: string; announcementDate: string; status: string; quota: number; registered: number }[];
  registrationFlow: { step: number; title: string; description: string; duration: string }[];
  requirements: string[];
  programs: { code: string; name: string; quota: number }[];
  contact: { phone: string; whatsapp: string; email: string; hours: string };
};

export default function PPDBAdminPage() {
  const [data, setData] = useState<PPDBData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/ppdb")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/ppdb", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("PPDB berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PPDB</h1>
          <p className="text-gray-500">Kelola penerimaan siswa baru</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Menyimpan..." : <><Save className="h-4 w-4 mr-2" /> Simpan</>}
        </Button>
      </div>

      {message && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
          <CheckCircle className="h-4 w-4" /> {message}
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>Informasi Umum</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Judul</Label><Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></div>
          <div><Label>Subjudul</Label><Textarea value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} rows={2} /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><Label>Tahun Ajaran</Label><Input value={data.academicYear} onChange={(e) => setData({ ...data, academicYear: e.target.value })} /></div>
            <div><Label>Countdown Target</Label><Input type="datetime-local" value={data.countdownTarget?.replace("Z", "").slice(0, 16)} onChange={(e) => setData({ ...data, countdownTarget: e.target.value + ":00" })} /></div>
            <div><Label>Countdown Label</Label><Input value={data.countdownLabel} onChange={(e) => setData({ ...data, countdownLabel: e.target.value })} /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gelombang</CardTitle>
          <Button size="sm" variant="outline" onClick={() => {
            setData({ ...data, batches: [...data.batches, { name: "", registrationStart: "", registrationEnd: "", selectionDate: "", announcementDate: "", status: "upcoming", quota: 0, registered: 0 }] });
          }}>
            <Plus className="h-3 w-3 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.batches.map((batch, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Gelombang {i + 1}</Label>
                <Button size="sm" variant="destructive" onClick={() => setData({ ...data, batches: data.batches.filter((_, j) => j !== i) })}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Nama</Label><Input value={batch.name} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], name: e.target.value }; setData({ ...data, batches: b }); }} /></div>
                <div><Label>Status</Label><Input value={batch.status} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], status: e.target.value }; setData({ ...data, batches: b }); }} placeholder="active / upcoming / closed" /></div>
                <div><Label>Daftar Mulai</Label><Input type="date" value={batch.registrationStart} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], registrationStart: e.target.value }; setData({ ...data, batches: b }); }} /></div>
                <div><Label>Daftar Akhir</Label><Input type="date" value={batch.registrationEnd} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], registrationEnd: e.target.value }; setData({ ...data, batches: b }); }} /></div>
                <div><Label>Tanggal Seleksi</Label><Input type="date" value={batch.selectionDate} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], selectionDate: e.target.value }; setData({ ...data, batches: b }); }} /></div>
                <div><Label>Tanggal Pengumuman</Label><Input type="date" value={batch.announcementDate} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], announcementDate: e.target.value }; setData({ ...data, batches: b }); }} /></div>
                <div><Label>Kuota</Label><Input type="number" value={batch.quota} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], quota: parseInt(e.target.value) || 0 }; setData({ ...data, batches: b }); }} /></div>
                <div><Label>Terdaftar</Label><Input type="number" value={batch.registered} onChange={(e) => { const b = [...data.batches]; b[i] = { ...b[i], registered: parseInt(e.target.value) || 0 }; setData({ ...data, batches: b }); }} /></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Alur Pendaftaran</CardTitle>
          <Button size="sm" variant="outline" onClick={() => {
            setData({ ...data, registrationFlow: [...data.registrationFlow, { step: data.registrationFlow.length + 1, title: "", description: "", duration: "" }] });
          }}>
            <Plus className="h-3 w-3 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.registrationFlow.map((flow, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm font-bold w-8">{flow.step}.</span>
              <Input placeholder="Judul" value={flow.title} onChange={(e) => { const f = [...data.registrationFlow]; f[i] = { ...f[i], title: e.target.value }; setData({ ...data, registrationFlow: f }); }} className="flex-1" />
              <Input placeholder="Deskripsi" value={flow.description} onChange={(e) => { const f = [...data.registrationFlow]; f[i] = { ...f[i], description: e.target.value }; setData({ ...data, registrationFlow: f }); }} className="flex-1" />
              <Input placeholder="Durasi" value={flow.duration} onChange={(e) => { const f = [...data.registrationFlow]; f[i] = { ...f[i], duration: e.target.value }; setData({ ...data, registrationFlow: f }); }} className="w-36" />
              <Button size="sm" variant="destructive" onClick={() => setData({ ...data, registrationFlow: data.registrationFlow.filter((_, j) => j !== i).map((f, idx) => ({ ...f, step: idx + 1 })) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Persyaratan</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setData({ ...data, requirements: [...data.requirements, ""] })}>
            <Plus className="h-3 w-3 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.requirements.map((req, i) => (
            <div key={i} className="flex gap-2">
              <Input value={req} onChange={(e) => { const r = [...data.requirements]; r[i] = e.target.value; setData({ ...data, requirements: r }); }} className="flex-1" />
              <Button size="sm" variant="destructive" onClick={() => setData({ ...data, requirements: data.requirements.filter((_, j) => j !== i) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Program & Kuota</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setData({ ...data, programs: [...data.programs, { code: "", name: "", quota: 0 }] })}>
            <Plus className="h-3 w-3 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.programs.map((prog, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Kode" value={prog.code} onChange={(e) => { const p = [...data.programs]; p[i] = { ...p[i], code: e.target.value }; setData({ ...data, programs: p }); }} className="w-20" />
              <Input placeholder="Nama Program" value={prog.name} onChange={(e) => { const p = [...data.programs]; p[i] = { ...p[i], name: e.target.value }; setData({ ...data, programs: p }); }} className="flex-1" />
              <Input type="number" placeholder="Kuota" value={prog.quota} onChange={(e) => { const p = [...data.programs]; p[i] = { ...p[i], quota: parseInt(e.target.value) || 0 }; setData({ ...data, programs: p }); }} className="w-24" />
              <Button size="sm" variant="destructive" onClick={() => setData({ ...data, programs: data.programs.filter((_, j) => j !== i) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Kontak PPDB</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Telepon</Label><Input value={data.contact.phone} onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })} /></div>
          <div><Label>WhatsApp</Label><Input value={data.contact.whatsapp} onChange={(e) => setData({ ...data, contact: { ...data.contact, whatsapp: e.target.value } })} /></div>
          <div><Label>Email</Label><Input value={data.contact.email} onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} /></div>
          <div><Label>Jam Operasional</Label><Input value={data.contact.hours} onChange={(e) => setData({ ...data, contact: { ...data.contact, hours: e.target.value } })} /></div>
        </CardContent>
      </Card>
    </div>
  );
}
