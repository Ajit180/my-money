"use server"

import { prisma } from "../prisma"
import { safeAction } from "../utils/safeaction"
import { getOrCreateUser } from "./user"
import { Prisma } from "@prisma/client"




export async function getTransactions(limit = 20) {
  const user = await getOrCreateUser()
  const transaction = await safeAction(()=>
    prisma.transaction.findMany({
    where: { userId: user.id },
    include: { account: true, category: true },
    orderBy: { date: "desc" },
    take: limit,
  })
  ) 
  
  return transaction;
  
}

export async function createTransaction(input: {
  accountId: string
  categoryId?: string
  type: "EXPENSE" | "INCOME"
  amount: number
  notes?: string
  date?: string
}) {
  const user = await getOrCreateUser()

  return await safeAction(async () => {
    const result = await prisma.$transaction(async (tx) => {
      const createdTx = await tx.transaction.create({
        data: {
          userId: user.id,
          accountId: input.accountId,
          categoryId: input.categoryId,
          type: input.type,
          amount: new Prisma.Decimal(input.amount),
          notes: input.notes,
          date: input.date ? new Date(input.date) : new Date(),
        },
        include: { account: true, category: true },
      })

      // update account balance
      const account = await tx.account.findUnique({ where: { id: input.accountId } })
      if (!account) throw new Error("Account not found")

      const newBalance =
        input.type === "INCOME"
          ? new Prisma.Decimal(account.balance).plus(input.amount)
          : new Prisma.Decimal(account.balance).minus(input.amount)

      await tx.account.update({
        where: { id: input.accountId },
        data: { balance: newBalance },
      })

      return createdTx
    })

    return result
  })
}