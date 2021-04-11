import { mongodb } from "../databases/mongodb.ts"
import { MongoClient, Bson } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"

class OrderModel {
  #dbClient: typeof mongodb
  constructor(dbClient: typeof mongodb) {
    this.#dbClient = dbClient
  }
  private async get(id?: string): Promise<OrderSchema | OrderSchema[]> {
    try {
      await this.#dbClient?.connect()
      let result
      if (!id) {
        result = (await this?.ordersCollection
          ?.find()
          ?.toArray()) as OrderSchema[]
      } else {
        result = (await this?.ordersCollection?.findOne({
          _id: new Bson.ObjectId(id)
        })) as OrderSchema
      }
      await this.#dbClient?.close()
      return result
    } catch (error) {
      throw error
    }
  }

  get ordersCollection() {
    return this.#dbClient?.db?.collection<OrderSchema>("Orders")
  }

  async insert(order: OrderSchema): Promise<{ id: Bson.ObjectId | string }> {
    try {
      await this.#dbClient?.connect()
      const newOrder = (await this?.ordersCollection?.insertOne(
        order
      )) as Bson.ObjectId
      await this.#dbClient?.close()
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
      await this.#dbClient?.connect()

      const updatedOrder = await this?.ordersCollection?.updateOne(
        {
          _id: new Bson.ObjectId(id)
        },
        { $set: { items: order?.items } }
      )

      await this.#dbClient?.close()

      return { id: String(updatedOrder?.upsertedId) }
    } catch (error) {
      throw error
    }
  }

  async deleteById(id?: string): Promise<number | undefined> {
    try {
      await this.#dbClient?.connect()

      const result = await this?.ordersCollection?.deleteOne({
        _id: new Bson.ObjectId(id)
      })

      await this.#dbClient?.close()

      return result
    } catch (error) {
      throw error
    }
  }
}

export const Order = new OrderModel(mongodb)
