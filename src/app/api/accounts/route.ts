import { NextResponse } from "next/server"
import { getAccounts, createAccount } from "@/lib/actions/accounts"

// ✅ GET /api/accounts → get all accounts
export async function GET() {
  try {
    const accounts = await getAccounts()
    return NextResponse.json(accounts)
  } catch (error) {
    console.error("❌ [GET /api/accounts] Error:", error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

// ✅ POST /api/accounts → create a new account
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const account = await createAccount(body)
    return NextResponse.json(account)
  } catch (error) {
    console.error("❌ [POST /api/accounts] Error:", error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
