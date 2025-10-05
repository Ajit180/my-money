"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <nav className="flex items-center justify-between w-full h-16 px-6 sm:px-12 bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Wallet className="w-6 h-6 text-indigo-600" />
        <Link href="/" className="font-bold text-lg text-slate-800">
          MyMoney
        </Link>
      </div>

      {/* Center: Navigation links (desktop) */}
      <div className="hidden sm:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-indigo-600",
              pathname === link.href ? "text-indigo-600" : "text-slate-600"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: Auth buttons */}
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default" size="sm" className="rounded-full">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}
