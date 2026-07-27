"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

type Program = {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  videoYoutubeId: string;
  detail: {
    overview: string;
    kurikulum: string[];
    kompetensi: string[];
    prospek: string[];
  };
};

type ProgramData = {
  sectionTitle: string;
  sectionDescription: string;
  programs: Program[];
};

export default function ProgramKeahlianAdminPage() {
  const [data, setData] = useState<ProgramData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/content/programKeahlian")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/programKeahlian", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage("Program Keahlian berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const updateProgram = (index: number, field: string, value: string) => {
    if (!data) return;
    const programs = [...data.programs];
    programs[index] = { ...programs[index], [field]: value };
    setData({ ...data, programs });
  };

  const updateDetail = (index: number, field: string, value: string) => {
    if (!data) return;
    const programs = [...data.programs];
    programs[index] = {
      ...programs[index],
      detail: { ...programs[index].detail, [field]: value },
    };
    setData({ ...data, programs });
  };

  const updateArrayField = (progIndex: number, field: "kurikulum" | "kompetensi" | "prospek", arrIndex: number, value: string) => {
    if (!data) return;
    const programs = [...data.programs];
    const arr = [...programs[progIndex].detail[field]];
    arr[arrIndex] = value;
    programs[progIndex] = {
      ...programs[progIndex],
      detail: { ...programs[progIndex].detail, [field]: arr },
    };
    setData({ ...data, programs });
  };

  const addArrayItem = (progIndex: number, field: "kurikulum" | "kompetensi" | "prospek") => {
    if (!data) return;
    const programs = [...data.programs];
    programs[progIndex] = {
      ...programs[progIndex],
      detail: {
        ...programs[progIndex].detail,
        [field]: [...programs[progIndex].detail[field], ""],
      },
    };
    setData({ ...data, programs });
  };

  const removeArrayItem = (progIndex: number, field: "kurikulum" | "kompetensi" | "prospek", arrIndex: number) => {
    if (!data) return;
    const programs = [...data.programs];
    programs[progIndex] = {
      ...programs[progIndex],
      detail: {
        ...programs[progIndex].detail,
        [field]: programs[progIndex].detail[field].filter((_: string, i: number) => i !== arrIndex),
      },
    };
    setData({ ...data, programs });
  };

  const addProgram = () => {
    if (!data) return;
    const maxId = data.programs.length > 0 ? Math.max(...data.programs.map((p) => p.id)) : 0;
    setData({
      ...data,
      programs: [
        ...data.programs,
        {
          id: maxId + 1,
          title: "",
          slug: "",
          description: "",
          icon: "Monitor",
          color: "bg-blue-500",
          videoYoutubeId: "",
          detail: { overview: "", kurikulum: [], kompetensi: [], prospek: [] },
        },
      ],
    });
  };

  const removeProgram = (index: number) => {
    if (!data) return;
    setData({ ...data, programs: data.programs.filter((_, i) => i !== index) });
  };

  if (!data) return <div className="text-gray-500">Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Program Keahlian</h1>
          <p className="text-gray-500">Kelola program keahlian sekolah</p>
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
            <Textarea value={data.sectionDescription} onChange={(e) => setData({ ...data, sectionDescription: e.target.value })} rows={2} />
          </div>
        </CardContent>
      </Card>

      {data.programs.map((prog, i) => (
        <Card key={prog.id}>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setExpandedId(expandedId === prog.id ? null : prog.id)}>
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded ${prog.color} flex items-center justify-center text-white text-xs font-bold`}>
                {prog.title.charAt(0)}
              </div>
              <CardTitle className="text-sm">{prog.title || `Program ${i + 1}`}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); removeProgram(i); }}>
                <Trash2 className="h-4 w-4" />
              </Button>
              {expandedId === prog.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
          {expandedId === prog.id && (
            <CardContent className="space-y-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Judul</Label><Input value={prog.title} onChange={(e) => updateProgram(i, "title", e.target.value)} /></div>
                <div><Label>Slug</Label><Input value={prog.slug} onChange={(e) => updateProgram(i, "slug", e.target.value)} /></div>
                <div><Label>Deskripsi</Label><Input value={prog.description} onChange={(e) => updateProgram(i, "description", e.target.value)} /></div>
                <div><Label>Icon</Label><Input value={prog.icon} onChange={(e) => updateProgram(i, "icon", e.target.value)} /></div>
                <div><Label>Color</Label><Input value={prog.color} onChange={(e) => updateProgram(i, "color", e.target.value)} placeholder="bg-blue-500" /></div>
                <div><Label>YouTube ID</Label><Input value={prog.videoYoutubeId} onChange={(e) => updateProgram(i, "videoYoutubeId", e.target.value)} /></div>
              </div>
              <div><Label>Overview</Label><Textarea value={prog.detail.overview} onChange={(e) => updateDetail(i, "overview", e.target.value)} rows={3} /></div>

              {(["kurikulum", "kompetensi", "prospek"] as const).map((field) => (
                <div key={field}>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="capitalize">{field}</Label>
                    <Button size="sm" variant="outline" onClick={() => addArrayItem(i, field)}>
                      <Plus className="h-3 w-3 mr-1" /> Tambah
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {prog.detail[field].map((item: string, j: number) => (
                      <div key={j} className="flex gap-2">
                        <Input value={item} onChange={(e) => updateArrayField(i, field, j, e.target.value)} className="flex-1" />
                        <Button size="sm" variant="destructive" onClick={() => removeArrayItem(i, field, j)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" onClick={addProgram}>
        <Plus className="h-4 w-4 mr-2" /> Tambah Program
      </Button>
    </div>
  );
}
