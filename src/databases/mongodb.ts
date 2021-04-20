import { green, bold, yellow, MongoClient, Database } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"

class MongoDb {
  client: MongoClient
  #connected: boolean = false
  constructor() {
    this.client = new MongoClient()
  }
  connect = async (retry?: boolean) => {
    try {
      await this.client?.connect(Deno.env.get("MONGO_DB_URL") + "")
      this.#connected = true
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
    if (this.#connected) {
      try {
        await this.client?.close()
        this.#connected = false
        console.log(bold("MongoDb connection closed"))
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const mongodb = new MongoDb()

export { mongodb }
