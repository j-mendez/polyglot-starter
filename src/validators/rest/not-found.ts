import type { AppContext } from "../../types/context.ts"
import { Status } from "../../deps.ts"

export function notFound(ctx: AppContext) {
  ctx.response.status = Status.NotFound
  ctx.response.body = false
}
