// src/types/transaction.ts
export interface TransactionClient {
  id: string
  userId: string
  accountId: string
  categoryId?: string | null
  type: "EXPENSE" | "INCOME"
  amount: number
  notes?: string | null
  date: string // always serialized to ISO string
  account?: {
    id: string
    name: string
    currency: string
  } | null
  category?: {
    id: string
    name: string
  } | null
}
