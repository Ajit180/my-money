"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { useAccounts } from "@/hooks/use-account"
import { useTransactions } from "@/hooks/use-transcations"

export default function SummaryCards() {
  const { data: accounts, isLoading: loadingAccounts } = useAccounts()
  const { data: transactions, isLoading: loadingTx } = useTransactions()

  if (loadingAccounts || loadingTx) return <p>Loading...</p>

  const totalBalance =
    accounts?.reduce((acc: number, a: any) => acc + Number(a.balance), 0) ?? 0

  const income =
    transactions
      ?.filter((t: any) => t.type === "INCOME")
      .reduce((acc: number, t: any) => acc + Number(t.amount), 0) ?? 0

  const expense =
    transactions
      ?.filter((t: any) => t.type === "EXPENSE")
      .reduce((acc: number, t: any) => acc + Number(t.amount), 0) ?? 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Total Balance</CardTitle>
          <Wallet className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">₹{totalBalance.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Income</CardTitle>
          <ArrowUpCircle className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-green-500">+₹{income.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Expense</CardTitle>
          <ArrowDownCircle className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-red-500">-₹{expense.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  )
}
