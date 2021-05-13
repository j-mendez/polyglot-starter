import { green, bold, yellow, MongoClient, Bson, Database } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"
import { Connector } from "./connector.ts"

class MongoDb extends Connector {
  client: MongoClient | null
  connectTimeout = Number(Deno.env.get("MONGO_DB_RETRY_TIMOUT"))
  constructor() {
    super()
    this.client = new MongoClient()
  }
  connect(): Promise<void> {
    return super.connect(false, {
      name: "MongoDb",
      client: this.client?.connect(Deno.env.get("MONGO_DB_URL") + ""),
      setClient: false
    })
  }
  get db() {
    return this.client?.database(Deno.env.get("MONGO_DB_NAME") + "")
  }
  set = async (
    collection: string,
    insertBy: OrderSchema
  ): Promise<Bson.ObjectId | string> => {
    try {
      return (await this?.db
        ?.collection<OrderSchema>(collection)
        .insertOne(insertBy)) as Bson.ObjectId
    } catch (e) {
      console.error(e)
      return ""
    }
  }
  get = async (collection: string, id?: string) => {
    try {
      const _collection = this?.db?.collection<OrderSchema>(collection)

      if (typeof id !== "undefined") {
        return (await _collection?.findOne({
          _id: new Bson.ObjectId(id)
        })) as OrderSchema
      } else {
        return (await _collection?.find()?.toArray()) as OrderSchema[]
      }
    } catch (e) {
      console.error(e)
    }
  }
  update = async (collection: string, id: string, updateBy: OrderSchema) => {
    try {
      return await this?.db?.collection<OrderSchema>(collection).updateOne(
        {
          _id: new Bson.ObjectId(id)
        },
        { $set: updateBy }
      )
    } catch (e) {
      console.error(e)
      return { upsertedId: null }
    }
  }
  del = async (collection: string, id: string | number) => {
    try {
      return await this?.db?.collection<OrderSchema>(collection).deleteOne({
        _id: new Bson.ObjectId(id)
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export { MongoDb }
