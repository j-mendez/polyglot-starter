import { Context } from "../deps.ts"

const bodyParser = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.request.hasBody) {
    const result = ctx.request.body()
    if (result.type === "json") {
      const body = await result.value
      ctx.request.body = function () {
        return body
      }
    }
    if (result.type === "form") {
      const { value } = ctx.request.body({ type: "form" })
      const formData = await value
      const body: any = {}
      for (const [key, value] of formData.entries()) {
        body[key] = value
      }
      ctx.request.body = function () {
        return body
      }
    }
  }
  await next()
}

export { bodyParser }
