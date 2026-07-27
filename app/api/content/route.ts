import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/content";

function getCookie(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith(`${name}=`));
  return match ? match.trim().split("=").slice(1).join("=") : undefined;
}

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { error: "Gagal membaca konten" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const token = getCookie(request, "admin_token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    await updateContent(data, `admin_token=${token}`);
    return NextResponse.json({
      success: true,
      message: "Konten berhasil diperbarui",
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan konten" },
      { status: 500 }
    );
  }
}
