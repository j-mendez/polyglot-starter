import { green, bold, yellow, MongoClient, Database } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"

class MongoDb {
  client: MongoClient
  constructor() {
    this.client = new MongoClient()
  }
  connect = async (retry?: boolean) => {
    try {
      await this.client?.connect(Deno.env.get("MONGO_DB_URL") + "")
      console.log(green("MongoDb connection opened"))
    } catch (e) {
      console.log(yellow(`MongoDb connection error: ${e}`))
      if (retry) {
        setTimeout(
          this.connect,
          Number(Deno.env.get("MONGO_DB_RETRY_TIMOUT")) || 15000
        )
      }
    }
  }
  get db() {
    return this.client?.database(Deno.env.get("MONGO_DB_NAME") + "")
  }
  close = async () => {
    await this.client?.close()
    console.log(bold("MongoDb connection closed"))
  }
}

const mongodb = new MongoDb()

export { mongodb }
