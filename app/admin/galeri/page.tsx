"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Trash2, Plus, Save, Loader2, CheckCircle } from "lucide-react";

type GaleriItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
};

type GaleriData = {
  sectionTitle: string;
  sectionDescription: string;
  items: GaleriItem[];
};

const categoryOptions = ["Pembelajaran", "Event", "Pelatihan", "Upacara", "Prestasi", "Kunjungan"];

export default function GaleriAdmin() {
  const [data, setData] = useState<GaleriData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/galeri").then((r) => r.json()).then(setData);
  }, []);

  const updateItem = (index: number, field: keyof GaleriItem, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const maxId = Math.max(0, ...data.items.map((i) => i.id));
    setData({
      ...data,
      items: [...data.items, { id: maxId + 1, title: "", category: "Pembelajaran", image: "", description: "" }],
    });
  };

  const removeItem = (index: number) => {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/galeri", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Galeri berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galeri Kegiatan</h1>
          <p className="text-gray-500">Kelola foto kegiatan sekolah</p>
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan
        </Button>
      </div>

      {message && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
          <CheckCircle className="h-4 w-4" /> {message}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Section Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Judul Section</Label>
            <Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} />
          </div>
          <div>
            <Label>Deskripsi Section</Label>
            <Input value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Foto ({data.items.length})</h2>
          <Button size="sm" variant="outline" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" /> Tambah
          </Button>
        </div>

        {data.items.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Foto {index + 1}</span>
                <Button size="sm" variant="ghost" onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Judul</Label>
                  <Input value={item.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
                </div>
                <div>
                  <Label>Kategori</Label>
                  <select
                    className="flex h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                    value={item.category}
                    onChange={(e) => updateItem(index, "category", e.target.value)}
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label>Deskripsi</Label>
                <Input value={item.description} onChange={(e) => updateItem(index, "description", e.target.value)} />
              </div>
              <div>
                <ImageUpload
                  value={item.image}
                  onChange={(url) => updateItem(index, "image", url)}
                  label="Gambar"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
