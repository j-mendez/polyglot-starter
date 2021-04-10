import type { AppContext } from "../types/context.ts"
import { mongodb } from "../databases/mongodb.ts"
import { Status } from "../deps.ts"

export default {
  createOrder: async (ctx: AppContext) => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, "Bad Request")
    }

    const newOrder = ctx.request.body()

    ctx.assert(
      newOrder.items &&
        Array.isArray(newOrder.items) &&
        newOrder.items.length > 0,
      Status.BadRequest,
      "Order items not found, please add items and try again"
    )

    const id = await mongodb?.ordersCollection?.insertOne(newOrder)

    ctx.response.body = { data: { id }, status: "success" }
  },
  getLanding: (ctx: AppContext) => {
    ctx.response.body = `"Dedicated to that one guy that really loves tacos"`
  },
  getAllOrders: async (ctx: AppContext) => {
    ctx.response.body = await mongodb?.ordersCollection?.find()?.toArray()
  },
  getOrderById: (ctx: AppContext) => {},
  updateOrderById: async (ctx: AppContext) => {},
  deleteOrderById: (ctx: AppContext) => {}
}
