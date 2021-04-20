import { Context, Status, isHttpError } from "../deps.ts"

export function notFound(ctx: Context) {
  ctx.response.status = Status.NotFound
  ctx.response.body = `<html><body><h1>404 - Not Found</h1><p>${ctx.request.url} could not be found.</p></body></html>`
}

export const errorHandler = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next()
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          if (!ctx.response.body) {
            ctx.response.body = err.message ?? "404"
          }
          break
        case Status.BadRequest:
          if (!ctx.response.body) {
            ctx.response.body = err.message ?? "Bad Request"
          }
          break
        default:
          if (!ctx.response.body) {
            ctx.response.body = err.message ?? "Error"
          }
      }
    } else {
      throw err
    }
  }
}
