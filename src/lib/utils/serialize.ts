import { Prisma } from "@prisma/client"

export type Serialized<T> =
  T extends Prisma.Decimal ? number :
  T extends Date ? string :
  T extends (infer U)[] ? Serialized<U>[] :
  T extends object ? { [K in keyof T]: Serialized<T[K]> } :
  T

export function serializePrisma<T>(data: T, seen = new WeakSet()): Serialized<T> {
  if (data === null || data === undefined) return data as Serialized<T>

  // Prevent infinite recursion on circular references
  if (typeof data === "object") {
    if (seen.has(data as object)) return data as Serialized<T>
    seen.add(data as object)
  }

  // ✅ Prisma.Decimal
  if (data instanceof Prisma.Decimal) {
    const num = data.toNumber()
    return (isNaN(num) ? 0 : num) as Serialized<T>
  }

  // ✅ Date
  if (data instanceof Date) {
    return data.toISOString() as Serialized<T>
  }

  // ✅ Array
  if (Array.isArray(data)) {
    return data.map((item) => serializePrisma(item, seen)) as Serialized<T>
  }

  // ✅ Object
  if (typeof data === "object") {
    const obj = {} as { [K in keyof T]: Serialized<T[K]> }
    for (const [key, value] of Object.entries(data)) {
      obj[key as keyof T] = serializePrisma(value, seen) as Serialized<T[keyof T]>
    }
    return obj as Serialized<T> // ✅ fixed type error here
  }

  // ✅ Primitive
  return data as Serialized<T>
}
