import type { AppContext } from "../types/context.ts"
import { Order } from "../models/order.ts"
import { notFound } from "../validators/rest/not-found.ts"
import { apiError } from "../validators/rest/api-error.ts"
import { randomize } from "../utils/randomize.ts"
import { log } from "../utils/log.ts"
import { orderViews } from "../views/orders.ts"

export default {
  createOrder: async (ctx: AppContext) => {
    const newOrder = ctx.request.body()

    try {
      ctx.response.body = {
        data: await Order.insert(
          newOrder.random ? randomize("order") : newOrder
        )
      }
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return apiError(ctx)
      }
    }
  },
  getLanding: (ctx: AppContext) => {
    ctx.response.body = orderViews.landing
  },
  getAllOrders: async (ctx: AppContext) => {
    try {
      ctx.response.body = await Order.find()
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return apiError(ctx)
      }
    }
  },
  getOrderById: async (ctx: AppContext) => {
    try {
      ctx.response.body = await Order.findById(ctx?.params?.id)
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  },
  updateOrderById: async (ctx: AppContext) => {
    const updatedOrder = ctx.request.body()

    try {
      ctx.response.body = {
        data: await Order.updateById(String(ctx?.params?.id), updatedOrder)
      }
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  },
  deleteOrderById: async (ctx: AppContext) => {
    try {
      ctx.response.body = await Order.deleteById(String(ctx?.params?.id))
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  },
  searchOrders: async (ctx: AppContext) => {
    try {
      ctx.response.body = await Order.search(String(ctx?.params?.id))
    } catch (e) {
      log(e)
    } finally {
      if (!ctx.response.body) {
        return apiError(ctx)
      }
    }
  },
  renderOrdersListPage: async (ctx: AppContext) => {
    ctx.response.type = "text/html"
    ctx.response.body = orderViews.ordersList(
      await Order.find().catch(e => {
        console.error(e)
        return []
      })
    )
  }
}
