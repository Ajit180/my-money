import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import QuickAddTransaction from "@/components/dashboard/QuickAddTransaction"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RecentTransactions from "@/components/dashboard/RecentTransactions"

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect("/login")

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user.firstName || "User"} 👋</h1>
        <QuickAddTransaction />
      </div>

      <SummaryCards />
      <RecentTransactions />
    </main>
  )
}
