"use client"

import { useTransactions } from "@/hooks/use-transcations"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RecentTransactions() {
  const { data: transactions, isLoading, error } = useTransactions()

  if (isLoading) return <p>Loading recent transactions...</p>
  if (error) return <p className="text-red-500">Failed to load transactions.</p>
  if (!transactions || transactions.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No transactions yet.</p>
        </CardContent>
      </Card>
    )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx: any) => {
              // ✅ Ensure date is a string before split
              const formattedDate =
                typeof tx.date === "string"
                  ? tx.date.split("T")[0]
                  : new Date(tx.date).toISOString().split("T")[0]

              return (
                <TableRow key={tx.id}>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{tx.account?.name || "-"}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell
                    className={
                      tx.type === "EXPENSE"
                        ? "text-red-500 font-medium"
                        : "text-green-500 font-medium"
                    }
                  >
                    {tx.type === "EXPENSE" ? "-" : "+"}₹
                    {Number(tx.amount).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>{tx.notes || "-"}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
