import type { AppContext } from "../types/context.ts"
import { OrderModel } from "../models/order.ts"
import { orderViews } from "../views/orders.ts"

export default {
  createOrder: async (ctx: AppContext) => {
    ctx.response.body = {
      data: await new OrderModel().insert(ctx.request.body())
    }
  },
  getLanding: (ctx: AppContext) => {
    ctx.response.type = "text/html"
    ctx.response.body = orderViews.landing()
  },
  getAllOrders: async (ctx: AppContext) => {
    ctx.response.body = await new OrderModel().find()
  },
  getOrderById: async (ctx: AppContext) => {
    ctx.response.body = await new OrderModel().findById(ctx?.params?.id)
  },
  updateOrderById: async (ctx: AppContext) => {
    ctx.response.body = {
      data: await new OrderModel().updateById(
        String(ctx?.params?.id),
        ctx.request.body()
      )
    }
  },
  deleteOrderById: async (ctx: AppContext) => {
    ctx.response.body = await new OrderModel().deleteById(
      String(ctx?.params?.id)
    )
  },
  searchOrders: async (ctx: AppContext) => {
    ctx.response.body = await new OrderModel().search(
      decodeURI(String(ctx?.params?.id))
    )
  },
  renderOrderFindPage: async (ctx: AppContext) => {
    ctx.response.type = "text/html"
    ctx.response.body = orderViews.orderFind()
  },
  renderOrdersCreatePage: async (ctx: AppContext) => {
    ctx.response.type = "text/html"
    ctx.response.body = orderViews.orderCreate()
  },
  renderOrdersCreateRandomPage: async (ctx: AppContext) => {
    ctx.response.type = "text/html"
    ctx.response.body = orderViews.orderCreateRandom()
  },
  renderOrdersListPage: async (ctx: AppContext) => {
    ctx.response.type = "text/html"
    ctx.response.body = orderViews.ordersList(await new OrderModel().find())
  }
}
