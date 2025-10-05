import { Prisma } from "@prisma/client"

export function serializePrisma<T>(data: T): T {
  if (data === null || data === undefined) return data

  // ✅ Handle Prisma.Decimal
  if (data instanceof Prisma.Decimal) {
    const num = data.toNumber()
    return (isNaN(num) ? 0 : num) as T
  }

  // ✅ Handle Date
  if (data instanceof Date) {
    return data.toISOString() as T
  }

  // ✅ Handle Array
  if (Array.isArray(data)) {
    return data.map((item) => serializePrisma(item)) as T
  }

  // ✅ Handle Object (recursively)
  if (typeof data === "object") {
    const obj: any = {}
    for (const [key, value] of Object.entries(data)) {
      obj[key] = serializePrisma(value)
    }
    return obj
  }

  // ✅ Return primitive (string, number, boolean, etc.)
  return data
}
