import type { AppContext } from "../../types/context.ts"
import type { OrderSchema } from "../../types/order.ts"
import { Status } from "../../deps.ts"

export function validateOrderItems(ctx: AppContext, newOrder: OrderSchema) {
  ctx.assert(
    newOrder.items &&
      Array.isArray(newOrder.items) &&
      newOrder.items.length > 0,
    Status.BadRequest,
    "Order items not found, please add items and try again"
  )
}
