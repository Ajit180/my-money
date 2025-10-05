"use server"

import { Prisma } from "@prisma/client"
import { prisma } from "../prisma"
import { getOrCreateUser } from "./user"
import { safeAction } from "../utils/safeaction"



// ✅ Get all accounts of current user
export async function getAccounts() {
  const user = await getOrCreateUser()

  //here await is not used because the wrapper function safeAction having the await 
  const account = await safeAction(()=>prisma.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  }))

  return account;
}




export async function createAccount(data: { name: string; provider?: string; currency?: string; initialBalance?: number }) {
  const user = await getOrCreateUser()

  const account = await safeAction(
    ()=>
    prisma.account.create({
    data: {
      userId: user.id,
      name: data.name,
      provider: data.provider ?? null,
      currency: data.currency ?? "INR",
      balance: new Prisma.Decimal(String(data.initialBalance ?? 0)),
    },
  })
  ) 

  return account;
}
