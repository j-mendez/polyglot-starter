import type { AppContext } from "../../types/context.ts"
import { Status } from "../../deps.ts"

export function apiError(ctx: AppContext) {
  ctx.response.status = Status.InternalServerError
  ctx.response.body = false
}
