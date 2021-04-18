import { mongodb } from "../databases/mongodb.ts"
import { redis } from "../databases/redis.ts"
import { MongoClient, Bson } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"

class OrderModel {
  #mongodbClient: typeof mongodb
  #redisClient: typeof redis
  #collectionName: string = "Orders"
  constructor(mongodbClient: typeof mongodb, redisClient: typeof redis) {
    this.#mongodbClient = mongodbClient
    this.#redisClient = redisClient
  }
  private async get(id?: string): Promise<OrderSchema | OrderSchema[]> {
    try {
      let result
      await this.#redisClient?.connect()
      if (!id) {
        result = await this.#redisClient?.get(this.#collectionName)
        if (!result?.length) {
          await this.#mongodbClient?.connect()
          result = (await this?.ordersCollection
            ?.find()
            ?.toArray()) as OrderSchema[]
        }
      } else {
        result = await this.#redisClient?.get(id)
        if (!result) {
          await this.#mongodbClient?.connect()
          result = (await this?.ordersCollection?.findOne({
            _id: new Bson.ObjectId(id)
          })) as OrderSchema
        }
      }

      await this.clientsDisconnect()

      return result
    } catch (error) {
      throw error
    }
  }

  get ordersCollection() {
    return this.#mongodbClient?.db?.collection<OrderSchema>(
      this.#collectionName
    )
  }

  async insert(order: OrderSchema): Promise<{ id: Bson.ObjectId | string }> {
    try {
      await this.clientsConnect()

      const newOrder = (await this?.ordersCollection?.insertOne(
        order
      )) as Bson.ObjectId
      await this.pipelineNewOrder(newOrder + "", order)

      await this.clientsDisconnect()

      return { id: newOrder }
    } catch (error) {
      throw error
    }
  }

  async find(): Promise<OrderSchema[]> {
    try {
      return (await this.get()) as OrderSchema[]
    } catch (error) {
      throw error
    }
  }

  async findById(id?: string): Promise<OrderSchema> {
    try {
      return (await this.get(id)) as OrderSchema
    } catch (error) {
      throw error
    }
  }

  async updateById(
    id?: string,
    order?: OrderSchema
  ): Promise<{ id: Bson.ObjectId | string }> {
    try {
      await this.clientsConnect()

      const updatedOrder = await this?.ordersCollection?.updateOne(
        {
          _id: new Bson.ObjectId(id)
        },
        { $set: order }
      )
      await this.#redisClient.set(id + "", JSON.stringify(order))

      await this.clientsDisconnect()

      return { id: String(updatedOrder?.upsertedId) }
    } catch (error) {
      throw error
    }
  }

  async deleteById(id?: string): Promise<number | undefined> {
    try {
      await this.clientsConnect()

      const result = await this?.ordersCollection?.deleteOne({
        _id: new Bson.ObjectId(id)
      })
      await this.pipelineDeleteOrder(id + "")

      await this.clientsDisconnect()

      return result
    } catch (error) {
      throw error
    }
  }

  async clientsConnect() {
    Promise.all([
      await this.#mongodbClient?.connect(),
      await this.#redisClient?.connect()
    ])
  }

  async clientsDisconnect() {
    Promise.all([
      await this.#mongodbClient?.close(),
      await this.#redisClient?.close()
    ])
  }

  async pipelineNewOrder(id: string, order: OrderSchema) {
    try {
      const pl = this.#redisClient?.client?.pipeline()
      const allOrders =
        (await this.#redisClient.get(this.#collectionName)) || []

      if (allOrders.length >= 20) {
        allOrders.pop()
      }

      allOrders.unshift(order)

      if (pl) {
        pl.set(id, JSON.stringify(order))
        pl.set(this.#collectionName, JSON.stringify(allOrders))
        await pl.flush()
      }
    } catch (e) {
      console.error(e)
    }
  }

  async pipelineDeleteOrder(id: string) {
    try {
      const pl = this.#redisClient?.client?.pipeline()
      const allOrders =
        (await this.#redisClient.get(this.#collectionName)) || []
      const newOrders = allOrders.filter(
        (collection: OrderSchema) => String(collection._id) !== id
      )

      if (pl) {
        pl.del(id)
        pl.set(this.#collectionName, JSON.stringify(newOrders))
        await pl.flush()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const Order = new OrderModel(mongodb, redis)
