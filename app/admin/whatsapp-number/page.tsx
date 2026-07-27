"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, CheckCircle } from "lucide-react";

export default function WhatsAppAdmin() {
  const [number, setNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content/whatsappNumber")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data === "string") setNumber(data);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/content/whatsappNumber", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(number),
    });
    if (res.ok) {
      setMessage("Nomor WhatsApp berhasil disimpan!");
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp</h1>
          <p className="text-gray-500">Kelola nomor WhatsApp untuk floating CTA</p>
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
          <CardTitle className="text-base">Nomor WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nomor WhatsApp (dengan kode negara)</Label>
            <Input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="6281234567890"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: kode negara + nomor tanpa spasi. Contoh: 6281234567890
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
