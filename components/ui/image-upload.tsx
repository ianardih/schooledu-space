"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  UploadCloud,
  X,
  ImageIcon,
  Loader2,
  Trash2,
  Scissors,
  RotateCcw,
} from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxWidth?: number;
  maxHeight?: number;
  compressionQuality?: number;
  folder?: string;
}

interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  format: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function compressImage(
  file: File,
  options: {
    quality: number;
    maxWidth: number;
    maxHeight: number;
    outputFormat: "image/jpeg" | "image/webp";
  }
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      const { maxWidth, maxHeight, quality, outputFormat } = options;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Gagal membuat canvas"));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Gagal mengompres gambar"));
            return;
          }

          const ext = outputFormat === "image/webp" ? "webp" : "jpg";
          const compressedFile = new File([blob], `compressed.${ext}`, {
            type: outputFormat,
          });

          resolve({
            file: compressedFile,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            width,
            height,
            format: outputFormat,
          });
        },
        outputFormat,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gagal memuat gambar"));
    };

    img.src = url;
  });
}

function ImageUpload({
  value,
  onChange,
  label = "Gambar",
  className,
  accept = "image/jpeg,image/png,image/webp",
  maxWidth = 1920,
  maxHeight = 1080,
  compressionQuality = 0.92,
  folder = "uploads",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = React.useState<CompressionResult | null>(null);
  const [showSettings, setShowSettings] = React.useState(false);
  const [quality, setQuality] = React.useState(compressionQuality);
  const [outputFormat, setOutputFormat] = React.useState<"image/jpeg" | "image/webp">("image/webp");
  const [maxW, setMaxW] = React.useState(maxWidth);
  const [maxH, setMaxH] = React.useState(maxHeight);
  const [compress, setCompress] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const previewUrl = preview || value || null;

  const handleFile = React.useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Hanya file gambar yang diizinkan");
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);
      setCompressionInfo(null);

      try {
        let fileToUpload = file;
        let result: CompressionResult | null = null;

        if (compress && file.type !== "image/svg+xml") {
          setUploadProgress(10);
          result = await compressImage(file, {
            quality,
            maxWidth: maxW,
            maxHeight: maxH,
            outputFormat,
          });
          fileToUpload = result.file;
          setCompressionInfo(result);
          setUploadProgress(30);
        }

        const localPreview = URL.createObjectURL(fileToUpload);
        setPreview(localPreview);

        const formData = new FormData();
        formData.append("file", fileToUpload);

        setUploadProgress(50);

        const xhr = new XMLHttpRequest();
        const responsePromise = new Promise<{ success: boolean; url: string }>(
          (resolve, reject) => {
            xhr.upload.addEventListener("progress", (e) => {
              if (e.lengthComputable) {
                setUploadProgress(50 + Math.round((e.loaded / e.total) * 40));
              }
            });
            xhr.addEventListener("load", () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject(new Error("Upload gagal"));
              }
            });
            xhr.addEventListener("error", () => reject(new Error("Upload gagal")));
            xhr.open("POST", "/api/upload");
            xhr.send(formData);
          }
        );

        setUploadProgress(60);
        const data = await responsePromise;
        setUploadProgress(100);

        if (data.success && data.url) {
          onChange(data.url);
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Gagal mengunggah gambar. Silakan coba lagi.");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [compress, quality, maxW, maxH, outputFormat, onChange]
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [handleFile]
  );

  const handleRemove = React.useCallback(() => {
    onChange("");
    setPreview(null);
    setCompressionInfo(null);
  }, [onChange]);

  const handleManualUrl = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(true)}
          >
            <Scissors className="h-3.5 w-3.5 mr-1" />
            Kompresi
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemove}>
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Hapus
            </Button>
          )}
        </div>
      </div>

      {previewUrl ? (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border border-border bg-muted">
            <img
              src={previewUrl}
              alt={label}
              className="w-full h-48 object-contain bg-black/5"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">{uploadProgress}%</p>
                </div>
              </div>
            )}
          </div>
          {compressionInfo && (
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                {compressionInfo.width} x {compressionInfo.height}
              </span>
              <span>
                {formatBytes(compressionInfo.originalSize)} →{" "}
                {formatBytes(compressionInfo.compressedSize)}
                {compressionInfo.compressedSize < compressionInfo.originalSize && (
                  <span className="text-green-600 ml-1">
                    (hemat{" "}
                    {Math.round(
                      (1 - compressionInfo.compressedSize / compressionInfo.originalSize) *
                        100
                    )}
                    %)
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          ) : (
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isDragging
                ? "Lepaskan gambar di sini..."
                : "Seret & lepas gambar atau klik untuk memilih"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WebP, GIF (maks. 10MB)
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      <div>
        <Label className="text-xs text-muted-foreground">Atau masukkan URL gambar</Label>
        <Input
          value={value}
          onChange={handleManualUrl}
          placeholder="/uploads/nama-file.jpg"
          className="mt-1"
        />
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pengaturan Kompresi Gambar</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="flex items-center justify-between">
              <Label>Aktifkan Kompresi</Label>
              <button
                type="button"
                onClick={() => setCompress(!compress)}
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                  compress ? "bg-primary" : "bg-input"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    compress ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {compress && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Kualitas</Label>
                    <span className="text-sm text-muted-foreground">{Math.round(quality * 100)}%</span>
                  </div>
                  <Slider
                    value={[quality * 100]}
                    onValueChange={(v: number | readonly number[]) => {
                      const val = Array.isArray(v) ? v[0] : v;
                      setQuality(val / 100);
                    }}
                    min={10}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    92% = kualitas tinggi, ukuran lebih kecil. 100% = tanpa kompresi.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Format Output</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={outputFormat === "image/webp" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOutputFormat("image/webp")}
                    >
                      WebP (Disarankan)
                    </Button>
                    <Button
                      type="button"
                      variant={outputFormat === "image/jpeg" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOutputFormat("image/jpeg")}
                    >
                      JPEG
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Lebar Max (px)</Label>
                    <Input
                      type="number"
                      value={maxW}
                      onChange={(e) => setMaxW(Number(e.target.value))}
                      min={100}
                      max={10000}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Tinggi Max (px)</Label>
                    <Input
                      type="number"
                      value={maxH}
                      onChange={(e) => setMaxH(Number(e.target.value))}
                      min={100}
                      max={10000}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuality(compressionQuality);
                    setMaxW(maxWidth);
                    setMaxH(maxHeight);
                    setOutputFormat("image/webp");
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset ke default
                </button>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setShowSettings(false)}>
              Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { ImageUpload, compressImage, formatBytes };
export type { ImageUploadProps, CompressionResult };
