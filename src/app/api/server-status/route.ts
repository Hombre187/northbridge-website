import { NextResponse } from "next/server";
import { getFiveMServerStatus } from "@/lib/fivem-status";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 6;

export async function GET() {
  const status = await getFiveMServerStatus();
  return NextResponse.json(status, {
    status: status.online ? 200 : 503,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
