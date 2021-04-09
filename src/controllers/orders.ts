import type { AppContext, Order } from "../types/central.ts"

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
    const id = String(orders.size)
    const newOrder = {
      ...ctx.request.body(),
      id
    }
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
