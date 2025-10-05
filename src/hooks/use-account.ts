"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// ------------------------------
// 📦 Fetch all accounts
// ------------------------------
async function fetchAccounts() {
  const res = await fetch("/api/accounts")
  if (!res.ok) throw new Error("Failed to fetch accounts")
  return res.json()
}

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  })
}

// ------------------------------
// ➕ Create new account
// ------------------------------
export function useCreateAccount() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (body: {
      name: string
      provider?: string
      currency?: string
      initialBalance?: number
    }) => {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Failed to create account")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accounts"] })
    },
  })
}
