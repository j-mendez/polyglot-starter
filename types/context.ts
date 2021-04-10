import type { ContextTypes } from "../deps.ts"

export interface AppContext extends ContextTypes {
  request: ContextTypes["request"] & { body: any }
}
