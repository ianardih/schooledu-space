"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, CheckCircle } from "lucide-react";

type LokasiData = {
  sectionTitle: string;
  sectionDescription: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
};

export default function LokasiAdmin() {
  const [data, setData] = useState<LokasiData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/lokasi").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/lokasi", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Lokasi berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lokasi</h1>
          <p className="text-gray-500">Kelola informasi lokasi dan peta sekolah</p>
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
          <CardTitle className="text-base">Informasi Lokasi</CardTitle>
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
          <div>
            <Label>Alamat Lengkap</Label>
            <Input value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Telepon</Label>
              <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Jam Operasional</Label>
            <Input value={data.hours} onChange={(e) => setData({ ...data, hours: e.target.value })} />
          </div>
          <div>
            <Label>Google Maps Embed URL</Label>
            <Input value={data.mapEmbedUrl} onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." />
            <p className="text-xs text-gray-500 mt-1">Buka Google Maps, klik &quot;Share&quot; &gt; &quot;Embed a map&quot;, lalu copy URL-nya</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
