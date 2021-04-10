import type { AppContext } from "../types/context.ts"
import type { Order } from "../types/order.ts"
import { Status } from "../deps.ts"

const orders = new Map<string, Order>()

orders.set("0", {
  id: "0",
  items: [
    {
      ingredients: {
        wrap: "hard",
        meat: "chicken",
        toppings: ["lettuce"],
        cheese: "chedder"
      },
      qty: 1
    }
  ]
})

export default {
  createOrder: async (ctx: AppContext) => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, "Bad Request")
    }

    const id = String(orders.size)
    const newOrder = {
      ...ctx.request.body(),
      id
    }

    ctx.assert(
      newOrder.items &&
        Array.isArray(newOrder.items) &&
        newOrder.items.length > 0,
      Status.BadRequest,
      "Order items not found, please add items and try again"
    )

    orders.set(id, newOrder)
    ctx.response.body = newOrder
  },
  getLanding: (ctx: AppContext) => {
    ctx.response.body = `"Dedicated to that one guy that really loves tacos"`
  },
  getAllOrders: (ctx: AppContext) => {
    ctx.response.body = Array.from(orders.values())
  },
  getOrderById: (ctx: AppContext) => {},
  updateOrderById: async (ctx: AppContext) => {},
  deleteOrderById: (ctx: AppContext) => {}
}
