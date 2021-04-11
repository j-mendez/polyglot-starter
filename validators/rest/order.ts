import type { AppContext } from "../../types/context.ts"
import type { OrderSchema, IngredientsOptions } from "../../types/order.ts"
import { Toppings, Wrap, Protein, Cheese } from "../../types/order.ts"
import { yellow, Status } from "../../deps.ts"

export function validateOrderItems(ctx: AppContext, newOrder: OrderSchema) {
  hasOrderItems(ctx, newOrder)
  hasValidOrderItems(ctx, newOrder)
}

const hasOrderItems = (ctx: AppContext, newOrder: OrderSchema) => {
  ctx.assert(
    newOrder.items &&
      Array.isArray(newOrder.items) &&
      newOrder.items.length > 0,
    Status.BadRequest,
    "Order items not found, please add items and try again"
  )
}

const validateOrderIngredient = (
  ctx: AppContext,
  { key, value, validator }: IngredientsOptions
) => {
  const validators = Object.values(validator).filter(
    item => typeof item !== "number"
  )
  const validateItem = (val: string) => {
    ctx.assert(
      validators.includes(val),
      Status.BadRequest,
      `${val} is not an option, valid ${key} are ${validators}`
    )
  }

  if (Array.isArray(value)) {
    value.forEach(val => {
      validateItem(val)
    })
  } else {
    validateItem(value)
  }
}

const hasValidOrderItems = (ctx: AppContext, newOrder: OrderSchema) => {
  newOrder.items.forEach(item => {
    ctx.assert(
      item.ingredients,
      Status.BadRequest,
      "Order item ingredients not found, please add ingredients and try again"
    )
    ctx.assert(
      typeof item.qty === "number",
      Status.BadRequest,
      "Order item qty not a number, please add a valid qty value and try again"
    )

    const optionsSet = {
      toppings: false,
      wrap: false,
      protein: false,
      cheese: false
    }

    for (const [key, value] of Object.entries(item.ingredients)) {
      switch (key) {
        case "toppings":
          validateOrderIngredient(ctx, { key, value, validator: Toppings })
          optionsSet[key] = true
          break
        case "wrap":
          validateOrderIngredient(ctx, { key, value, validator: Wrap })
          optionsSet[key] = true
          break
        case "protein":
          validateOrderIngredient(ctx, { key, value, validator: Protein })
          optionsSet[key] = true
          break
        case "cheese":
          validateOrderIngredient(ctx, { key, value, validator: Cheese })
          optionsSet[key] = true
          break
        default:
          console.info(
            `${yellow(
              key
            )} is not a valid key for ingredients, this property will not be stored`
          )
          delete item.ingredients[key]
          break
      }
    }

    for (const [key, value] of Object.entries(optionsSet)) {
      ctx.assert(
        value,
        Status.BadRequest,
        `${key} is required, please add ${key} as a key inside ingredients and try again`
      )
    }
  })
}
