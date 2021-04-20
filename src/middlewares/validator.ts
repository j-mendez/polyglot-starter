import { Context } from "../deps.ts"
import { validateOrderItems } from "../validators/rest/order.ts"
import { validateBody } from "../validators/rest/body.ts"

const validator = async (ctx: Context, next: () => Promise<void>) => {
  const pathname = ctx.request.url.pathname
  const method = ctx.request.method
  switch (pathname) {
    case "/api/orders":
      if (["POST", "UPDATE"].includes(method)) {
        const body = validateBody(ctx)
        validateOrderItems(ctx, body)
      }
      break
    default:
      break
  }
  await next()
}

export { validator }
