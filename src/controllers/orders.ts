import { Context } from "../deps.ts"
import type { Order } from "../types/order.ts"

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
  createOrder: async (ctx: Context) => {},
  getLanding: (ctx: Context) => {
    ctx.response.body = `"Dedicated to that one guy that really loves tacos"`
  },
  getAllOrders: (ctx: Context) => {
    ctx.response.body = Array.from(orders.values())
  },
  getOrderById: (ctx: Context) => {},
  updateOrderById: async (ctx: Context) => {},
  deleteOrderById: (ctx: Context) => {}
}
