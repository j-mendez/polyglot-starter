import type { OrderSchema } from "../types/order.ts"
import { MongoDb } from "../databases/mongodb.ts"
import { RedisDb } from "../databases/redis.ts"
import { Meilisearch } from "../databases/meilisearch.ts"
import { randomize } from "../utils/randomize.ts"
import { MongoClient, Bson } from "../deps.ts"

class OrderModel {
  #mongodbClient: MongoDb
  #redisClient: RedisDb
  #meilisearchClient: Meilisearch
  #collectionName: string = "Orders"
  constructor() {
    this.#mongodbClient = new MongoDb()
    this.#redisClient = new RedisDb()
    this.#meilisearchClient = new Meilisearch()
  }
  private async get(id?: string): Promise<OrderSchema | OrderSchema[]> {
    try {
      await this.#redisClient?.connect()
      let result = await this.#redisClient?.get(id ?? this.#collectionName)

      if (!result) {
        await this.#mongodbClient?.connect()
        result = await this.#mongodbClient?.get(this.#collectionName, id)
      }

      return result
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  async insert(order: OrderSchema): Promise<{ id: Bson.ObjectId | string }> {
    try {
      await this.clientsConnect()
      order = order.random ? randomize() : order

      await Promise.all([
        await this.#mongodbClient?.set(this.#collectionName, order),
        this.pipelineNewOrder(order),
        this.#meilisearchClient?.set(this.#collectionName, [order])
      ])

      return { id: order._id + "" }
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  async find(): Promise<OrderSchema[]> {
    try {
      return ((await this.get()) ?? []) as OrderSchema[]
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
    id: string,
    order: OrderSchema
  ): Promise<{ id: Bson.ObjectId | string }> {
    try {
      await this.clientsConnect()

      const updatedOrder = await this.#mongodbClient?.update(
        this.#collectionName,
        id,
        order
      )

      await Promise.all([
        this.#redisClient.update(id, JSON.stringify(order)),
        this.#meilisearchClient?.update(this.#collectionName, id)
      ])

      return { id: String(updatedOrder?.upsertedId) }
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  async deleteById(id: string): Promise<string | undefined> {
    try {
      await this.clientsConnect()

      const result = await this.#mongodbClient?.del(this.#collectionName, id)

      await Promise.all([
        this.pipelineDeleteOrder(id),
        this.#meilisearchClient?.del(this.#collectionName, id)
      ])

      return result + ""
    } catch (error) {
      throw error
    } finally {
      await this.clientsDisconnect()
    }
  }

  // Only Meilisearch
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

  async pipelineNewOrder(order: OrderSchema) {
    try {
      const allOrders =
        (await this.#redisClient.get(this.#collectionName)) || []

      if (allOrders.length >= 20) {
        allOrders.pop()
      }

      allOrders.unshift(order)

      const pl = this.#redisClient?.client?.pipeline()

      if (pl) {
        pl.set(order._id + "", JSON.stringify(order))
        pl.set(this.#collectionName, JSON.stringify(allOrders))
        await pl.flush()
      }
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

      const pl = this.#redisClient?.client?.pipeline()

      if (pl) {
        pl.del(id)
        pl.set(this.#collectionName, JSON.stringify(newOrders))
        await pl.flush()
      }
    } catch (e) {
      console.error(e)
    }
  }

  async clientsConnect() {
    await this.#mongodbClient?.connect()
    await this.#redisClient?.connect()
    await this.#meilisearchClient?.connect()
  }

  async clientsDisconnect() {
    await this.#mongodbClient?.close()
    await this.#redisClient?.close()
    await this.#meilisearchClient?.close()
  }
}

export { OrderModel }
