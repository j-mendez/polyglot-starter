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
      case "form-data":
        const formValue = ctx.request.body({ type: "form-data" })
        const formFields = await formValue.value.read()
        body = formFields.fields
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
