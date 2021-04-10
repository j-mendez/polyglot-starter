import { Context } from "../deps.ts"
import { Status } from "../deps.ts"

export function notFound(ctx: Context) {
  ctx.response.status = Status.NotFound
  ctx.response.body = `<html><body><h1>404 - Not Found</h1><p>${ctx.request.url} could not be found.</p></body></html>`
}
