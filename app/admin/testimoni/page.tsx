"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type TestimoniItem = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

type TestimoniData = {
  sectionTitle: string;
  sectionDescription: string;
  items: TestimoniItem[];
};

export default function TestimoniAdminPage() {
  const [data, setData] = useState<TestimoniData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/testimoni")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/testimoni", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Testimoni berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateItem = (index: number, field: keyof TestimoniItem, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const maxId = data.items.length > 0 ? Math.max(...data.items.map((d) => d.id)) : 0;
    setData({ ...data, items: [...data.items, { id: maxId + 1, name: "", role: "", avatar: "", quote: "" }] });
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
          <h1 className="text-2xl font-bold text-gray-900">Testimoni</h1>
          <p className="text-gray-500">Kelola testimoni alumni dan mitra</p>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">{item.name || `Testimoni ${i + 1}`}</CardTitle>
            <Button size="sm" variant="destructive" onClick={() => removeItem(i)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div><Label>Nama</Label><Input value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} /></div>
              <div><Label>Role/Jabatan</Label><Input value={item.role} onChange={(e) => updateItem(i, "role", e.target.value)} /></div>
              <ImageUpload
                value={item.avatar}
                onChange={(url) => updateItem(i, "avatar", url)}
                label="Avatar"
                maxWidth={256}
                maxHeight={256}
              />
            </div>
            <div><Label>Testimoni</Label><Textarea value={item.quote} onChange={(e) => updateItem(i, "quote", e.target.value)} rows={2} /></div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Testimoni
      </Button>
    </div>
  );
}
