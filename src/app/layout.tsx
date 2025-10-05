import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import TanStackProvider from "@/components/providers/TanstackProvider"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Manage your expenses smartly with AI insights",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <TanStackProvider>
        <html lang="en">
          <body className="bg-background text-foreground">
            {children}
               <Toaster position="top-right" richColors />
            </body>
        </html>
      </TanStackProvider>
    </ClerkProvider>
  )
}
