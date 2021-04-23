import { Context } from "../deps.ts"

const bodyParser = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.request.hasBody) {
    const result = ctx.request.body()
    let body: any = {}

    switch (result.type) {
      case "json":
        body = await result.value
        break
      case "form":
        const { value } = ctx.request.body({ type: "form" })
        const formData = await value
        for (const [key, value] of formData.entries()) {
          body[key] = value
        }
        break
      default:
        break
    }

    ctx.request.body = function () {
      return body
    }
  }
  await next()
}

export { bodyParser }
