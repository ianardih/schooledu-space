"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, Save, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

type BeritaItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  detail: { author: string; body: string[] };
};

type BeritaData = {
  sectionTitle: string;
  sectionDescription: string;
  items: BeritaItem[];
};

export default function BeritaAdminPage() {
  const [data, setData] = useState<BeritaData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/content/berita")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/berita", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Berita berhasil disimpan!");
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

  const updateBody = (itemIndex: number, bodyIndex: number, value: string) => {
    if (!data) return;
    const items = [...data.items];
    const body = [...items[itemIndex].detail.body];
    body[bodyIndex] = value;
    items[itemIndex] = { ...items[itemIndex], detail: { ...items[itemIndex].detail, body } };
    setData({ ...data, items });
  };

  const addBody = (itemIndex: number) => {
    if (!data) return;
    const items = [...data.items];
    items[itemIndex] = {
      ...items[itemIndex],
      detail: { ...items[itemIndex].detail, body: [...items[itemIndex].detail.body, ""] },
    };
    setData({ ...data, items });
  };

  const removeBody = (itemIndex: number, bodyIndex: number) => {
    if (!data) return;
    const items = [...data.items];
    items[itemIndex] = {
      ...items[itemIndex],
      detail: { ...items[itemIndex].detail, body: items[itemIndex].detail.body.filter((_: string, i: number) => i !== bodyIndex) },
    };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const maxId = data.items.length > 0 ? Math.max(...data.items.map((d) => d.id)) : 0;
    setData({
      ...data,
      items: [
        {
          id: maxId + 1,
          title: "",
          date: new Date().toISOString().split("T")[0],
          category: "Kegiatan",
          image: "",
          excerpt: "",
          detail: { author: "", body: [""] },
        },
        ...data.items,
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
          <h1 className="text-2xl font-bold text-gray-900">Berita</h1>
          <p className="text-gray-500">Kelola berita dan kegiatan sekolah</p>
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
            <div>
              <CardTitle className="text-sm">{item.title || `Berita ${i + 1}`}</CardTitle>
              <p className="text-xs text-gray-500 mt-1">{item.date} - {item.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); removeItem(i); }}>
                <Trash2 className="h-4 w-4" />
              </Button>
              {expandedId === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
          {expandedId === item.id && (
            <CardContent className="space-y-3 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Judul</Label><Input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} /></div>
                <div><Label>Tanggal</Label><Input type="date" value={item.date} onChange={(e) => updateItem(i, "date", e.target.value)} /></div>
                <div><Label>Kategori</Label><Input value={item.category} onChange={(e) => updateItem(i, "category", e.target.value)} placeholder="Prestasi / Kegiatan / Kerja Sama / PMB / Akademik" /></div>
                <ImageUpload
                  value={item.image}
                  onChange={(url) => updateItem(i, "image", url)}
                  label="Gambar Berita"
                />
              </div>
              <div><Label>Excerpt</Label><Textarea value={item.excerpt} onChange={(e) => updateItem(i, "excerpt", e.target.value)} rows={2} /></div>
              <div><Label>Penulis</Label><Input value={item.detail.author} onChange={(e) => updateDetail(i, "author", e.target.value)} /></div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Isi Berita (Paragraf)</Label>
                  <Button size="sm" variant="outline" onClick={() => addBody(i)}>
                    <Plus className="h-3 w-3 mr-1" /> Tambah Paragraf
                  </Button>
                </div>
                <div className="space-y-2">
                  {item.detail.body.map((paragraph: string, j: number) => (
                    <div key={j} className="flex gap-2">
                      <Textarea value={paragraph} onChange={(e) => updateBody(i, j, e.target.value)} rows={2} className="flex-1" />
                      <Button size="sm" variant="destructive" onClick={() => removeBody(i, j)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Berita
      </Button>
    </div>
  );
}
