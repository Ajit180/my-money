import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import SummaryCards from "@/components/dashboard/SummaryCards"
import RecentTransactions from "@/components/dashboard/RecentTransactions"
import QuickAddTransaction from "@/components/dashboard/QuickAddTransaction"

export default async function DashboardHome() {
  // ✅ Server-side protection
  const user = await currentUser()
  if (!user) redirect("/login")

  // ✅ No client hook (server component now)
  return (
    <div className="p-6 sm:p-10 space-y-10">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, {user.firstName || "User"} 👋
        </h1>
        <p className="text-slate-500">
          Here’s your latest financial summary.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Quick Action */}
      <div className="flex justify-end">
        <QuickAddTransaction />
      </div>

      {/* Recent Transactions Table */}
      <RecentTransactions />
    </div>
  )
}
