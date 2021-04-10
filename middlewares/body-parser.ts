import { Context } from "../deps.ts"

const bodyParser = async (ctx: Context, next?: () => Promise<void>) => {
  if (ctx.request.hasBody) {
    const result = ctx.request.body()
    if (result.type === "json") {
      const value = await result.value
      ctx.request.body = function () {
        return value
      }
    }
  }
  next && (await next())
}

export { bodyParser }
