import { Context, helpers } from "../deps.ts"

const redirect = async (ctx: Context, next: () => Promise<unknown>) => {
  const pathname = ctx.request.url.pathname
  const method = ctx.request.method
  switch (pathname) {
    case "/api/orders":
      if (["GET"].includes(method)) {
        const { id, query } = helpers.getQuery(ctx, { mergeParams: true })
        if (typeof id !== "undefined") {
          ctx.response.redirect(`/api/orders/${id}`)
        } else if (typeof query !== "undefined") {
          ctx.response.redirect(`/api/orders/search/${query}`)
        }
      }
      break
    default:
      break
  }
  await next()
}

export { redirect }
