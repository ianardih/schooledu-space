"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type VisiMisiData = {
  sectionTitle: string;
  sectionDescription: string;
  visi: string;
  misi: string[];
};

export default function VisiMisiAdminPage() {
  const [data, setData] = useState<VisiMisiData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/visiMisi")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/visiMisi", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Visi & Misi berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visi & Misi</h1>
          <p className="text-gray-500">Kelola visi dan misi sekolah</p>
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
          <div>
            <Label>Judul Section</Label>
            <Input value={data.sectionTitle} onChange={(e) => setData({ ...data, sectionTitle: e.target.value })} />
          </div>
          <div>
            <Label>Deskripsi Section</Label>
            <Textarea value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Visi</CardTitle></CardHeader>
        <CardContent>
          <Label>Visi Sekolah</Label>
          <Textarea value={data.visi} onChange={(e) => setData({ ...data, visi: e.target.value })} rows={4} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Misi</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setData({ ...data, misi: [...data.misi, ""] })}>
            <Plus className="h-3 w-3 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.misi.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-500 w-8 shrink-0">{i + 1}.</span>
              <Textarea value={item} onChange={(e) => { const m = [...data.misi]; m[i] = e.target.value; setData({ ...data, misi: m }); }} rows={2} className="flex-1" />
              <Button size="sm" variant="destructive" onClick={() => setData({ ...data, misi: data.misi.filter((_, j) => j !== i) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
