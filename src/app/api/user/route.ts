import { NextResponse } from "next/server"
import { getOrCreateUser } from "@/lib/actions/user"

export async function GET() {
  try {
    const user = await getOrCreateUser()
    return NextResponse.json(user)
  } catch (error: any) {
    console.error("❌ [GET /api/user] Error:", error)
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}
