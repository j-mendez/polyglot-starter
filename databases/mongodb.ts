import { green, yellow, MongoClient, Database } from "../deps.ts"
import { OrderSchema } from "../types/order.ts"

class MongoDb {
  db?: Database
  connect = async () => {
    try {
      const client = new MongoClient()
      await client.connect(Deno.env.get("MONGO_DB_URL") + "")
      console.log(green("Database connection successful"))
      this.db = client.database(Deno.env.get("MONGO_DB_NAME") + "")
    } catch (e) {
      console.log(yellow(`Database connection error: ${e}`))
      setTimeout(
        this.connect,
        Number(Deno.env.get("MONGO_DB_RETRY_TIMOUT")) || 15000
      )
    }
  }
  get ordersCollection() {
    return this.db?.collection<OrderSchema>("Orders")
  }
}

const mongodb = new MongoDb()

export { mongodb }
