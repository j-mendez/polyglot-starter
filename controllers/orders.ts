import type { AppContext } from "../types/context.ts"
import { Status, Bson, cyan } from "../deps.ts"
import { mongodb } from "../databases/mongodb.ts"
import { notFound } from "../validators/rest/not-found.ts"
import { validateOrderItems } from "../validators/rest/order.ts"
import { validateBody } from "../validators/rest/body.ts"

export default {
  createOrder: async (ctx: AppContext) => {
    validateBody(ctx)

    const newOrder = ctx.request.body()

    validateOrderItems(ctx, newOrder)

    const id = await mongodb?.ordersCollection?.insertOne(newOrder)

    ctx.response.body = { data: { id } }
  },
  getLanding: (ctx: AppContext) => {
    ctx.response.body = `"Dedicated to that one guy that really loves tacos"`
  },
  getAllOrders: async (ctx: AppContext) => {
    ctx.response.body = await mongodb?.ordersCollection?.find()?.toArray()
  },
  getOrderById: async (ctx: AppContext) => {
    try {
      ctx.response.body = await mongodb?.ordersCollection?.findOne({
        _id: new Bson.ObjectId(ctx?.params?.id)
      })
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
      ctx.response.body = await mongodb?.ordersCollection?.updateOne(
        {
          _id: new Bson.ObjectId(ctx?.params?.id)
        },
        { $set: { items: updatedOrder.items } }
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
    const id = ctx?.params?.id

    try {
      ctx.response.body = await mongodb?.ordersCollection?.deleteOne({
        _id: new Bson.ObjectId(id)
      })
    } catch (e) {
      console.error(`${cyan("Error:")} ${e?.message}`)
    } finally {
      if (!ctx.response.body) {
        return notFound(ctx)
      }
    }
  }
}
