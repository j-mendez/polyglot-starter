import type { Context } from "../deps.ts"

export interface AppContext extends Context {
  request: Context["request"] & { body?: any }
  params?: { id?: string }
}
