import { NextResponse } from "next/server";
import { getContent, updateSection } from "@/lib/content";

function getCookie(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith(`${name}=`));
  return match ? match.trim().split("=").slice(1).join("=") : undefined;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const content = await getContent();
    const data = (content as Record<string, unknown>)[section];
    if (data === undefined) {
      return NextResponse.json(
        { error: `Section "${section}" tidak ditemukan` },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Gagal membaca section" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const token = getCookie(request, "admin_token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { section } = await params;
    const data = await request.json();
    await updateSection(
      section as keyof import("@/lib/content").SiteContent,
      data,
      `admin_token=${token}`
    );
    return NextResponse.json({
      success: true,
      message: `Section "${section}" berhasil diperbarui`,
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan section" },
      { status: 500 }
    );
  }
}
