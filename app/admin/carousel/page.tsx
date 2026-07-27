"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type CarouselItem = {
  id: number;
  type: string;
  title: string;
  description: string;
  badge: string;
  gradient: string;
  icon: string;
  href: string;
};

export default function CarouselAdminPage() {
  const [data, setData] = useState<CarouselItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/carousel")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/content/carousel", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Carousel berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateItem = (index: number, field: keyof CarouselItem, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const addItem = () => {
    const maxId = data.length > 0 ? Math.max(...data.map((d) => d.id)) : 0;
    setData([...data, { id: maxId + 1, type: "event", title: "", description: "", badge: "", gradient: "from-blue-600 to-blue-800", icon: "Calendar", href: "/" }]);
  };

  const removeItem = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carousel</h1>
          <p className="text-gray-500">Kelola slide carousel landing page</p>
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

      {data.map((item, i) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Slide {i + 1}</CardTitle>
            <Button size="sm" variant="destructive" onClick={() => removeItem(i)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Judul</Label>
                <Input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} />
              </div>
              <div>
                <Label>Badge</Label>
                <Input value={item.badge} onChange={(e) => updateItem(i, "badge", e.target.value)} />
              </div>
              <div>
                <Label>Tipe</Label>
                <Input value={item.type} onChange={(e) => updateItem(i, "type", e.target.value)} placeholder="event / pengumuman / prestasi" />
              </div>
              <div>
                <Label>Icon</Label>
                <Input value={item.icon} onChange={(e) => updateItem(i, "icon", e.target.value)} placeholder="Calendar / Trophy / Megaphone" />
              </div>
              <div>
                <Label>Gradient</Label>
                <Input value={item.gradient} onChange={(e) => updateItem(i, "gradient", e.target.value)} placeholder="from-blue-600 to-blue-800" />
              </div>
              <div>
                <Label>Link</Label>
                <Input value={item.href} onChange={(e) => updateItem(i, "href", e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Textarea value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} rows={2} />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Slide
      </Button>
    </div>
  );
}
