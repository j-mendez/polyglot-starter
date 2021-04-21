import { green, bold, yellow, MongoClient, Database } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"
import { Connector } from "./connector.ts"

class MongoDb extends Connector {
  client: MongoClient | null
  connectTimeout: number = Number(Deno.env.get("MONGO_DB_RETRY_TIMOUT"))
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
}

const mongodb = new MongoDb()

export { mongodb }
