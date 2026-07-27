"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type StatItem = { value: string; label: string };

export default function StatistikAdminPage() {
  const [data, setData] = useState<StatItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/statistik")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/content/statistik", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Statistik berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateItem = (index: number, field: keyof StatItem, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    setData(updated);
  };

  const addItem = () => {
    setData([...data, { value: "", label: "" }]);
  };

  const removeItem = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistik</h1>
          <p className="text-gray-500">Kelola angka statistik sekolah</p>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Daftar Statistik</CardTitle>
          <Button size="sm" variant="outline" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" /> Tambah
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Angka (e.g. 2500+)" value={item.value} onChange={(e) => updateItem(i, "value", e.target.value)} className="w-40" />
              <Input placeholder="Label (e.g. Siswa Aktif)" value={item.label} onChange={(e) => updateItem(i, "label", e.target.value)} className="flex-1" />
              <Button size="sm" variant="destructive" onClick={() => removeItem(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
