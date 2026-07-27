"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Save, CheckCircle } from "lucide-react";

type HeroData = {
  tagline: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  image: string;
};

export default function HeroAdminPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/hero")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Hero berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const update = (field: keyof HeroData, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-500">Kelola bagian utama landing page</p>
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
        <CardHeader><CardTitle>Konten Hero</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tagline</Label>
            <Input value={data.tagline} onChange={(e) => update("tagline", e.target.value)} />
          </div>
          <div>
            <Label>Judul Utama</Label>
            <Input value={data.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div>
            <Label>Deskripsi</Label>
            <Textarea value={data.description} onChange={(e) => update("description", e.target.value)} rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Tombol Aksi</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>CTA Utama - Teks</Label>
              <Input value={data.ctaPrimary} onChange={(e) => update("ctaPrimary", e.target.value)} />
            </div>
            <div>
              <Label>CTA Utama - Link</Label>
              <Input value={data.ctaPrimaryHref} onChange={(e) => update("ctaPrimaryHref", e.target.value)} />
            </div>
            <div>
              <Label>CTA Sekunder - Teks</Label>
              <Input value={data.ctaSecondary} onChange={(e) => update("ctaSecondary", e.target.value)} />
            </div>
            <div>
              <Label>CTA Sekunder - Link</Label>
              <Input value={data.ctaSecondaryHref} onChange={(e) => update("ctaSecondaryHref", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Gambar</CardTitle></CardHeader>
        <CardContent>
          <ImageUpload
            value={data.image}
            onChange={(url) => update("image", url)}
            label="Gambar Hero"
          />
        </CardContent>
      </Card>
    </div>
  );
}
