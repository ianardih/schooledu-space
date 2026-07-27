"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type MenuItem = { label: string; href: string };
type NavbarData = { schoolName: string; logo: string; menu: MenuItem[] };

export default function NavbarAdminPage() {
  const [data, setData] = useState<NavbarData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/navbar")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/navbar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Navbar berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateMenu = (index: number, field: keyof MenuItem, value: string) => {
    if (!data) return;
    const newMenu = [...data.menu];
    newMenu[index] = { ...newMenu[index], [field]: value };
    setData({ ...data, menu: newMenu });
  };

  const addMenu = () => {
    if (!data) return;
    setData({ ...data, menu: [...data.menu, { label: "", href: "" }] });
  };

  const removeMenu = (index: number) => {
    if (!data) return;
    setData({ ...data, menu: data.menu.filter((_, i) => i !== index) });
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navbar</h1>
          <p className="text-gray-500">Kelola navigasi dan nama sekolah</p>
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
          <div>
            <Label>Nama Sekolah</Label>
            <Input value={data.schoolName} onChange={(e) => setData({ ...data, schoolName: e.target.value })} />
          </div>
          <div>
            <ImageUpload
              value={data.logo}
              onChange={(url) => setData({ ...data, logo: url })}
              label="Logo Sekolah"
              maxWidth={256}
              maxHeight={256}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menu Navigasi</CardTitle>
          <Button size="sm" variant="outline" onClick={addMenu}>
            <Plus className="h-4 w-4 mr-1" /> Tambah Menu
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.menu.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Label" value={item.label} onChange={(e) => updateMenu(i, "label", e.target.value)} className="flex-1" />
              <Input placeholder="Href" value={item.href} onChange={(e) => updateMenu(i, "href", e.target.value)} className="flex-1" />
              <Button size="sm" variant="destructive" onClick={() => removeMenu(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
