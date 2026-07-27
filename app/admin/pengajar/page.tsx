"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, Save, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

type PengajarItem = {
  id: number;
  name: string;
  photo: string;
  position: string;
  program: string;
  shortBio: string;
  detail: {
    tempatLahir: string;
    tanggalLahir: string;
    pendidikan: string[];
    pengalaman: string[];
    keahlian: string[];
    email: string;
    telepon: string;
  };
};

type PengajarData = {
  sectionTitle: string;
  sectionDescription: string;
  items: PengajarItem[];
};

export default function PengajarAdminPage() {
  const [data, setData] = useState<PengajarData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/content/pengajar")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/pengajar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Profil Pengajar berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateItem = (index: number, field: string, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const updateDetail = (index: number, field: string, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], detail: { ...items[index].detail, [field]: value } };
    setData({ ...data, items });
  };

  const updateArrayField = (idx: number, field: "pendidikan" | "pengalaman" | "keahlian", arrIdx: number, value: string) => {
    if (!data) return;
    const items = [...data.items];
    const arr = [...items[idx].detail[field]];
    arr[arrIdx] = value;
    items[idx] = { ...items[idx], detail: { ...items[idx].detail, [field]: arr } };
    setData({ ...data, items });
  };

  const addArrayItem = (idx: number, field: "pendidikan" | "pengalaman" | "keahlian") => {
    if (!data) return;
    const items = [...data.items];
    items[idx] = {
      ...items[idx],
      detail: { ...items[idx].detail, [field]: [...items[idx].detail[field], ""] },
    };
    setData({ ...data, items });
  };

  const removeArrayItem = (idx: number, field: "pendidikan" | "pengalaman" | "keahlian", arrIdx: number) => {
    if (!data) return;
    const items = [...data.items];
    items[idx] = {
      ...items[idx],
      detail: { ...items[idx].detail, [field]: items[idx].detail[field].filter((_: string, i: number) => i !== arrIdx) },
    };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const maxId = data.items.length > 0 ? Math.max(...data.items.map((d) => d.id)) : 0;
    setData({
      ...data,
      items: [
        ...data.items,
        {
          id: maxId + 1,
          name: "",
          photo: "",
          position: "",
          program: "",
          shortBio: "",
          detail: {
            tempatLahir: "",
            tanggalLahir: "",
            pendidikan: [""],
            pengalaman: [""],
            keahlian: [""],
            email: "",
            telepon: "",
          },
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profil Pengajar</h1>
          <p className="text-gray-500">Kelola data tenaga pengajar</p>
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
        <CardHeader><CardTitle>Header Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Judul Section</Label><Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} /></div>
          <div><Label>Deskripsi Section</Label><Textarea value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} rows={2} /></div>
        </CardContent>
      </Card>

      {data.items.map((item, i) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                {item.name ? item.name.split(" ").filter((n: string) => n.length > 2).slice(0, 2).map((n: string) => n[0]).join("").toUpperCase() : "?"}
              </div>
              <div>
                <CardTitle className="text-sm">{item.name || `Pengajar ${i + 1}`}</CardTitle>
                <p className="text-xs text-gray-500">{item.position || "Belum diisi"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); removeItem(i); }}>
                <Trash2 className="h-4 w-4" />
              </Button>
              {expandedId === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
          {expandedId === item.id && (
            <CardContent className="space-y-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Nama Lengkap</Label><Input value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} /></div>
                <div><Label>Jabatan</Label><Input value={item.position} onChange={(e) => updateItem(i, "position", e.target.value)} placeholder="Kepala Program / Guru Produktif" /></div>
                <div><Label>Program Keahlian</Label><Input value={item.program} onChange={(e) => updateItem(i, "program", e.target.value)} placeholder="RPL / TKJ / Umum" /></div>
                <ImageUpload
                  value={item.photo}
                  onChange={(url) => updateItem(i, "photo", url)}
                  label="Foto Pengajar"
                  maxWidth={512}
                  maxHeight={512}
                />
              </div>
              <div><Label>Short Bio</Label><Textarea value={item.shortBio} onChange={(e) => updateItem(i, "shortBio", e.target.value)} rows={2} /></div>

              <div className="border-t pt-4">
                <Label className="font-semibold">Detail Biodata</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div><Label>Tempat Lahir</Label><Input value={item.detail.tempatLahir} onChange={(e) => updateDetail(i, "tempatLahir", e.target.value)} /></div>
                  <div><Label>Tanggal Lahir</Label><Input type="date" value={item.detail.tanggalLahir} onChange={(e) => updateDetail(i, "tanggalLahir", e.target.value)} /></div>
                  <div><Label>Email</Label><Input value={item.detail.email} onChange={(e) => updateDetail(i, "email", e.target.value)} /></div>
                  <div><Label>Telepon</Label><Input value={item.detail.telepon} onChange={(e) => updateDetail(i, "telepon", e.target.value)} /></div>
                </div>
              </div>

              {(["pendidikan", "pengalaman", "keahlian"] as const).map((field) => (
                <div key={field}>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="capitalize font-medium">{field}</Label>
                    <Button size="sm" variant="outline" onClick={() => addArrayItem(i, field)}>
                      <Plus className="h-3 w-3 mr-1" /> Tambah
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {item.detail[field].map((val: string, j: number) => (
                      <div key={j} className="flex gap-2">
                        <Input value={val} onChange={(e) => updateArrayField(i, field, j, e.target.value)} className="flex-1" />
                        <Button size="sm" variant="destructive" onClick={() => removeArrayItem(i, field, j)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Pengajar
      </Button>
    </div>
  );
}
