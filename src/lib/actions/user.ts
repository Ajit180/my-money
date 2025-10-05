"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "../prisma"

export async function getOrCreateUser() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  // ✅ Step 1: Find user in your database
  let user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (user) return user

  // ✅ Step 2: Fetch user info from Clerk
  const clerkUser = await currentUser()
  if (!clerkUser) throw new Error("Failed to fetch user details from Clerk")

  // ✅ Step 3: Create new DB record with basic profile info
  user = await prisma.user.create({
    data: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress || null,
      name: clerkUser.firstName
        ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        : clerkUser.username || null,
    },
  })

  return user
}
