"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, CheckCircle } from "lucide-react";

type VideoProfilData = {
  sectionTitle: string;
  sectionDescription: string;
  youtubeId: string;
  thumbnail: string;
};

export default function VideoProfilAdmin() {
  const [data, setData] = useState<VideoProfilData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/videoProfil").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/videoProfil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Video profil berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Profil</h1>
          <p className="text-gray-500">Kelola video profil sekolah</p>
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
          <CardTitle className="text-base">Pengaturan Video</CardTitle>
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
            <Label>YouTube Video ID</Label>
            <Input value={data.youtubeId} onChange={(e) => setData({ ...data, youtubeId: e.target.value })} placeholder="dQw4w9WgXcQ" />
            <p className="text-xs text-gray-500 mt-1">Masukkan ID video dari URL YouTube (bagian setelah v=)</p>
          </div>
          {data.youtubeId && (
            <div className="rounded-lg overflow-hidden border">
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${data.youtubeId}`}
                  title="Preview"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
