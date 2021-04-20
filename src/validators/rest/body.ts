import type { AppContext } from "../../types/context.ts"
import { Status } from "../../deps.ts"

export function validateBody(ctx: AppContext) {
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, "Bad Request")
  }
  return ctx.request.body()
}
