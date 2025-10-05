import { NextResponse } from "next/server"
import { getTransactions, createTransaction } from "@/lib/actions/transactions"

// ✅ GET /api/transactions → fetch transactions
export async function GET() {
  try {
    const transactions = await getTransactions(20)
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("❌ [GET /api/transactions] Error:", error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

// ✅ POST /api/transactions → create a transaction
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const tx = await createTransaction(body)
    return NextResponse.json(tx)
  } catch (error) {
    console.error("❌ [POST /api/transactions] Error:", error)
    return NextResponse.json({ error}, { status: 500 })
  }
}
