"use client"

import { useState } from "react"
import { toast } from "sonner" // ✅ Sonner import
import { useCreateAccount } from "@/hooks/use-account"
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
import { Wallet } from "lucide-react"

export default function AddAccountModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [provider, setProvider] = useState("")
  const [initialBalance, setInitialBalance] = useState("")

  const createAccount = useCreateAccount()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return toast.error("Account name is required")

    try {
      await createAccount.mutateAsync({
        name,
        provider,
        initialBalance: Number(initialBalance || 0),
      })

      toast.success("Account created successfully 🎉")
      setOpen(false)
      setName("")
      setProvider("")
      setInitialBalance("")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create account. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" /> Add Account
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Account Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HDFC Bank, Cash"
              required
            />
          </div>

          <div>
            <Label>Provider (optional)</Label>
            <Input
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              placeholder="e.g. HDFC"
            />
          </div>

          <div>
            <Label>Initial Balance</Label>
            <Input
              type="number"
              step="0.01"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <Button
            type="submit"
            disabled={createAccount.isPending}
            className="w-full"
          >
            {createAccount.isPending ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
