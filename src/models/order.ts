import { mongodb } from "../databases/mongodb.ts"
import { redis } from "../databases/redis.ts"
import { meilisearch } from "../databases/meilisearch.ts"
import { MongoClient, Bson } from "../deps.ts"
import type { OrderSchema } from "../types/order.ts"

class OrderModel {
  #mongodbClient: typeof mongodb
  #redisClient: typeof redis
  #meilisearchClient: typeof meilisearch
  #collectionName: string = "Orders"
  constructor(
    mongodbClient: typeof mongodb,
    redisClient: typeof redis,
    meilisearchClient: typeof meilisearch
  ) {
    this.#mongodbClient = mongodbClient
    this.#redisClient = redisClient
    this.#meilisearchClient = meilisearchClient
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

      return result
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  // TODO: move collection outside model
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
      await this.#meilisearchClient?.set(this.#collectionName, [order])

      return { id: newOrder }
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
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
      await this.#meilisearchClient?.update(this.#collectionName, id + "")

      return { id: String(updatedOrder?.upsertedId) }
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  async deleteById(id?: string): Promise<number | undefined> {
    try {
      await this.clientsConnect()

      const result = await this?.ordersCollection?.deleteOne({
        _id: new Bson.ObjectId(id)
      })
      await this.pipelineDeleteOrder(id + "")
      await this.#meilisearchClient?.del(this.#collectionName, id + "")

      return result
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  // only run on meilisearch for now
  async search(query: string) {
    try {
      await this.#meilisearchClient?.connect()
      return await this.#meilisearchClient?.get(this.#collectionName, query)
    } catch (e) {
      console.error(e)
    } finally {
      await this.#meilisearchClient?.close()
    }
  }

  async clientsConnect() {
    Promise.all([
      await this.#mongodbClient?.connect(),
      await this.#redisClient?.connect(),
      await this.#meilisearchClient?.connect()
    ])
  }

  async clientsDisconnect() {
    Promise.all([
      await this.#mongodbClient?.close(),
      await this.#redisClient?.close(),
      await this.#meilisearchClient?.close()
    ])
  }

  async pipelineNewOrder(id: string, order: OrderSchema) {
    try {
      const allOrders =
        (await this.#redisClient.get(this.#collectionName)) || []

      if (allOrders.length >= 20) {
        allOrders.pop()
      }

      allOrders.unshift(order)

      await this.#redisClient.set(id, JSON.stringify(order))
      await this.#redisClient.set(
        this.#collectionName,
        JSON.stringify(allOrders)
      )
    } catch (e) {
      console.error(e)
    }
  }

  async pipelineDeleteOrder(id: string) {
    try {
      const allOrders =
        (await this.#redisClient.get(this.#collectionName)) || []
      const newOrders = allOrders.filter(
        (collection: OrderSchema) => String(collection._id) !== id
      )

      await this.#redisClient.del(id)
      await this.#redisClient.set(
        this.#collectionName,
        JSON.stringify(newOrders)
      )
    } catch (e) {
      console.error(e)
    }
  }
}

export const Order = new OrderModel(mongodb, redis, meilisearch)
