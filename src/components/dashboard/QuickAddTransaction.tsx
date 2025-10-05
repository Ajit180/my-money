"use client"

import { useState } from "react"
import { useCreateTransaction } from "@/hooks/use-transcations"
import { useAccounts } from "@/hooks/use-account"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import AddAccountModal from "./AddAccountModal"

export default function QuickAddTransaction() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"EXPENSE" | "INCOME">("EXPENSE")
  const [accountId, setAccountId] = useState("")
  const [notes, setNotes] = useState("")

  const { data: accounts, isLoading } = useAccounts()
  const createTx = useCreateTransaction()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!accountId) return alert("Please select an account")
    if (!amount || Number(amount) <= 0) return alert("Enter a valid amount")

    try {
      await createTx.mutateAsync({
        amount: Number(amount),
        type,
        accountId,
        notes,
      })
      setOpen(false)
      setAmount("")
      setNotes("")
      setType("EXPENSE")
    } catch (error) {
      console.error(error)
      alert("Failed to add transaction.")
    }
  }

  if (isLoading) {
    return <Button disabled>Loading...</Button>
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          You need to create an account before adding transactions.
        </p>
        <AddAccountModal />
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <Label>Account</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc: any) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name} ({acc.currency})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Type</Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as "EXPENSE" | "INCOME")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXPENSE">Expense</SelectItem>
                <SelectItem value="INCOME">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notes</Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional note"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createTx.isPending || !accountId}
          >
            {createTx.isPending ? "Saving..." : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
