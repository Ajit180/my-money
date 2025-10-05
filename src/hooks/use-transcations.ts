"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// ------------------------------
// 📦 Fetch transactions
// ------------------------------
async function fetchTransactions() {
  const res = await fetch("/api/transactions")
  if (!res.ok) throw new Error("Failed to fetch transactions")
  return res.json()
}

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  })
}

// ------------------------------
// ➕ Create transaction
// ------------------------------
export function useCreateTransaction() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (body: {
      accountId: string
      categoryId?: string
      type: "INCOME" | "EXPENSE"
      amount: number
      notes?: string
      date?: string
    }) => {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Failed to create transaction")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] })
      qc.invalidateQueries({ queryKey: ["accounts"] })
    },
  })
}
