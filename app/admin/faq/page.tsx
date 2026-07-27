"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Save, Loader2, CheckCircle } from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type FAQData = {
  sectionTitle: string;
  sectionDescription: string;
  items: FAQItem[];
};

export default function FAQAdmin() {
  const [data, setData] = useState<FAQData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/faq").then((r) => r.json()).then(setData);
  }, []);

  const updateItem = (index: number, field: keyof FAQItem, value: string) => {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    if (!data) return;
    const maxId = Math.max(0, ...data.items.map((i) => i.id));
    setData({
      ...data,
      items: [...data.items, { id: maxId + 1, question: "", answer: "" }],
    });
  };

  const removeItem = (index: number) => {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("FAQ berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
          <p className="text-gray-500">Kelola pertanyaan umum yang ditampilkan di landing page</p>
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
          <CardTitle className="text-base">Section Header</CardTitle>
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
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pertanyaan ({data.items.length})</h2>
          <Button size="sm" variant="outline" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" /> Tambah
          </Button>
        </div>

        {data.items.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">FAQ {index + 1}</span>
                <Button size="sm" variant="ghost" onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div>
                <Label>Pertanyaan</Label>
                <Input value={item.question} onChange={(e) => updateItem(index, "question", e.target.value)} />
              </div>
              <div>
                <Label>Jawaban</Label>
                <Textarea value={item.answer} onChange={(e) => updateItem(index, "answer", e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
