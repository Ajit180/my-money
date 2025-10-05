import { serializePrisma, Serialized } from "./serialize"

/**
 * Safe wrapper for server-side logic.
 * - Handles async functions
 * - Serializes Prisma results
 * - Provides clean error logging
 */
export async function safeAction<T>(fn: () => Promise<T> | T, label?: string): Promise<Serialized<T>> {
  try {
    const result = await fn()
    return serializePrisma(result)
  } catch (error) {
    console.error(`❌ [safeAction${label ? `:${label}` : ""}]`, error)
    throw error
  }
}
