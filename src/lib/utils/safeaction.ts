import { serializePrisma } from "./serialize"

// A small wrapper that safely runs async server logic
export async function safeAction<T>(fn: () => Promise<T> | T): Promise<T> {
  try {
    const result = await fn()
    return serializePrisma(result)
  } catch (error) {
    console.error("❌ [safeAction] Error:", error)
    throw error
  }
}
