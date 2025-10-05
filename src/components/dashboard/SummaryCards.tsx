"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { useAccounts } from "@/hooks/use-account"
import { useTransactions } from "@/hooks/use-transcations"
import { Account } from "@prisma/client"
import { TransactionClient } from "@/types/transaction"

export default function SummaryCards() {
  const { data: accounts = [], isLoading: loadingAccounts } = useAccounts()
  const { data: transactions = [], isLoading: loadingTx } = useTransactions()

  if (loadingAccounts || loadingTx) return <p>Loading...</p>

  const totalBalance = accounts.reduce(
    (acc: number, a: Account) => acc + Number(a.balance),
    0
  )

  const income = transactions
    .filter((t: TransactionClient) => t.type === "INCOME")
    .reduce((acc: number, t: TransactionClient) => acc + Number(t.amount), 0)

  const expense = transactions
    .filter((t: TransactionClient) => t.type === "EXPENSE")
    .reduce((acc: number, t: TransactionClient) => acc + Number(t.amount), 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Total Balance */}
      <Card className="border border-slate-100 shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Total Balance</CardTitle>
          <Wallet className="h-5 w-5 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-slate-800">
            ₹{totalBalance.toLocaleString("en-IN")}
          </p>
        </CardContent>
      </Card>

      {/* Income */}
      <Card className="border border-slate-100 shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Income</CardTitle>
          <ArrowUpCircle className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">
            +₹{income.toLocaleString("en-IN")}
          </p>
        </CardContent>
      </Card>

      {/* Expense */}
      <Card className="border border-slate-100 shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Expense</CardTitle>
          <ArrowDownCircle className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-red-600">
            -₹{expense.toLocaleString("en-IN")}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
