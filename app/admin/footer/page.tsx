"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type FooterData = {
  schoolName: string;
  address: string;
  phone: string;
  email: string;
  socialMedia: { instagram: string; facebook: string; youtube: string };
  quickLinks: { label: string; href: string }[];
  copyright: string;
};

export default function FooterAdminPage() {
  const [data, setData] = useState<FooterData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/footer")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Footer berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Footer</h1>
          <p className="text-gray-500">Kelola footer website</p>
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
        <CardHeader><CardTitle>Informasi Sekolah</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Nama Sekolah</Label><Input value={data.schoolName} onChange={(e) => setData({ ...data, schoolName: e.target.value })} /></div>
          <div><Label>Alamat</Label><Textarea value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} rows={2} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Telepon</Label><Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></div>
            <div><Label>Email</Label><Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
          </div>
          <div><Label>Hak Cipta</Label><Input value={data.copyright} onChange={(e) => setData({ ...data, copyright: e.target.value })} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Media Sosial</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Instagram</Label><Input value={data.socialMedia.instagram} onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, instagram: e.target.value } })} /></div>
          <div><Label>Facebook</Label><Input value={data.socialMedia.facebook} onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, facebook: e.target.value } })} /></div>
          <div><Label>YouTube</Label><Input value={data.socialMedia.youtube} onChange={(e) => setData({ ...data, socialMedia: { ...data.socialMedia, youtube: e.target.value } })} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quick Links</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setData({ ...data, quickLinks: [...data.quickLinks, { label: "", href: "" }] })}>
            <Plus className="h-3 w-3 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.quickLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Label" value={link.label} onChange={(e) => { const l = [...data.quickLinks]; l[i] = { ...l[i], label: e.target.value }; setData({ ...data, quickLinks: l }); }} className="flex-1" />
              <Input placeholder="Href" value={link.href} onChange={(e) => { const l = [...data.quickLinks]; l[i] = { ...l[i], href: e.target.value }; setData({ ...data, quickLinks: l }); }} className="flex-1" />
              <Button size="sm" variant="destructive" onClick={() => setData({ ...data, quickLinks: data.quickLinks.filter((_, j) => j !== i) })}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
