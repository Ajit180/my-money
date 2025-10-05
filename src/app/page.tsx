"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ArrowRight, Wallet } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-50 px-6 text-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <Wallet className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          MyMoney
        </h1>
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-4xl font-semibold text-slate-700 max-w-2xl mb-4"
      >
        Take control of your money with ease 💰
      </motion.h2>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-500 max-w-lg mb-10"
      >
        Track your expenses, manage budgets, and stay on top of your finances — 
        all in one place, powered by Next.js, Prisma, and Clerk.
      </motion.p>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-3 sm:gap-4"
      >
        <SignedOut>
          {/* Primary Button */}
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="px-8 py-6 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-sm"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </SignInButton>

          {/* Subtext */}
          <p className="text-sm text-slate-600 mt-2">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center gap-3">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="px-8 py-6 text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-sm"
              >
                Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-xs text-slate-400">
        © {new Date().getFullYear()} MyMoney. Built with ❤️ by Ajit Yadav.
      </footer>
    </main>
  )
}
