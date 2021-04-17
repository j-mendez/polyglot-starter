import type { AppContext } from "../types/context.ts"
import { Status, cyan } from "../deps.ts"
import { Order } from "../models/order.ts"
import { notFound } from "../validators/rest/not-found.ts"
import { apiError } from "../validators/rest/api-error.ts"
import { validateOrderItems } from "../validators/rest/order.ts"
import { validateBody } from "../validators/rest/body.ts"
import { randomize } from "../utils/randomize.ts"
import { orderViews } from "../views/orders.ts"

export default {
  createOrder: async (ctx: AppContext) => {
    validateBody(ctx)
    const newOrder = ctx.request.body()
    validateOrderItems(ctx, newOrder)

    try {
      const id = await Order.insert(
        newOrder.random ? randomize("order") : newOrder
      )

      ctx.response.body = { data: id }
    } catch (e) {
      console.error(`${cyan("Error:")} ${e?.message}`)
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
      console.error(`${cyan("Error:")} ${e?.message}`)
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
      console.error(`${cyan("Error:")} ${e?.message}`)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  },
  updateOrderById: async (ctx: AppContext) => {
    validateBody(ctx)
    const updatedOrder = ctx.request.body()
    validateOrderItems(ctx, updatedOrder)

    try {
      ctx.response.body = await Order.updateById(
        String(ctx?.params?.id),
        updatedOrder
      )
    } catch (e) {
      console.error(`${cyan("Error:")} ${e?.message}`)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  },
  deleteOrderById: async (ctx: AppContext) => {
    try {
      ctx.response.body = await Order.deleteById(ctx?.params?.id)
    } catch (e) {
      console.error(`${cyan("Error:")} ${e?.message}`)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  }
}
