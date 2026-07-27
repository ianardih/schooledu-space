"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

type Facility = {
  id: number;
  title: string;
  description: string;
  icon: string;
  videoYoutubeId: string;
};

type FasilitasData = {
  sectionTitle: string;
  sectionDescription: string;
  introVideo: { title: string; description: string; youtubeId: string };
  items: Facility[];
};

export default function FasilitasAdminPage() {
  const [data, setData] = useState<FasilitasData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/content/fasilitas")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/fasilitas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Fasilitas berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateItem = (index: number, field: keyof Facility, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const maxId = data.items.length > 0 ? Math.max(...data.items.map((d) => d.id)) : 0;
    setData({ ...data, items: [...data.items, { id: maxId + 1, title: "", description: "", icon: "Monitor", videoYoutubeId: "" }] });
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
          <h1 className="text-2xl font-bold text-gray-900">Fasilitas</h1>
          <p className="text-gray-500">Kelola fasilitas sekolah</p>
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
        <CardHeader><CardTitle>Header & Video Intro</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Judul Section</Label><Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} /></div>
          <div><Label>Deskripsi Section</Label><Textarea value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} rows={2} /></div>
          <div className="border-t pt-4 mt-4">
            <Label className="text-sm font-semibold">Video Intro</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div><Label>Judul Video</Label><Input value={data.introVideo.title} onChange={(e) => setData({ ...data, introVideo: { ...data.introVideo, title: e.target.value } })} /></div>
              <div><Label>Deskripsi Video</Label><Input value={data.introVideo.description} onChange={(e) => setData({ ...data, introVideo: { ...data.introVideo, description: e.target.value } })} /></div>
              <div><Label>YouTube ID</Label><Input value={data.introVideo.youtubeId} onChange={(e) => setData({ ...data, introVideo: { ...data.introVideo, youtubeId: e.target.value } })} /></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {data.items.map((item, i) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
            <CardTitle className="text-sm">{item.title || `Fasilitas ${i + 1}`}</CardTitle>
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
                <div><Label>Icon</Label><Input value={item.icon} onChange={(e) => updateItem(i, "icon", e.target.value)} /></div>
              </div>
              <div><Label>Deskripsi</Label><Textarea value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} rows={2} /></div>
              <div><Label>YouTube Video ID</Label><Input value={item.videoYoutubeId} onChange={(e) => updateItem(i, "videoYoutubeId", e.target.value)} /></div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Fasilitas
      </Button>
    </div>
  );
}
