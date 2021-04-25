import { Context } from "../deps.ts"

const defaultItems = {
  ingredients: {
    toppings: []
  },
  qty: 0
}

const formFormatter = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.request.hasBody) {
    let body: any = {}

    Object.entries(ctx.request.body()).some(([key, value]) => {
      const findArray = String(key).indexOf("]")
      if (findArray !== -1) {
        const itemIndex = key.substring(key.indexOf("[") + 1, key.indexOf("]"))

        if (!body.items) {
          body = {
            items: []
          }
        }

        if (!body.items[itemIndex]) {
          body.items.push(Object.assign({}, defaultItems))
        }

        const matchPath = key.substring(findArray + 1)

        switch (matchPath) {
          case "[qty]":
            body.items[itemIndex].qty = Number(value)
            break
          case "[name]":
            body.items[itemIndex].name = value
            break
          case "[ingredients][wrap]":
            body.items[itemIndex].ingredients.wrap = value
            break
          case "[ingredients][protein]":
            body.items[itemIndex].ingredients.protein = value
            break
          case "[ingredients][cheese]":
            body.items[itemIndex].ingredients.cheese = value
            break
          case "[ingredients][toppings][0]":
            body.items[itemIndex].ingredients.toppings[0] = value
            break
          default:
            break
        }
      } else {
        return true
      }
    })

    if (Object.keys(body).length) {
      ctx.request.body = function () {
        return body
      }
    }
  }
  await next()
}

export { formFormatter }
