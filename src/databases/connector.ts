import { green, bold, yellow, Redis, MongoClient } from "../deps.ts"
import type { Search } from "../types/search.ts"

class Connector {
  #connected?: boolean = false
  #connectionName: string = ""
  client?: Redis | MongoClient | Search | null
  connectTimeout: number = 15000
  async connect(
    retry: boolean = false,
    connection: {
      name: string
      client: any
      setClient: boolean
    }
  ): Promise<void> {
    try {
      this.#connected = true
      this.#connectionName = connection.name
      const client = await connection.client
      if (connection.setClient) {
        this.client = client
      }
      console.log(green(`${this.#connectionName} connection opened`))
    } catch (e) {
      console.log(yellow(`${this.#connectionName} connection error: ${e}`))
      if (retry) {
        setTimeout(
          () => this.connect(retry, connection),
          Number(this.connectTimeout)
        )
      }
    }
  }
  close = async () => {
    if (this.#connected) {
      try {
        if (typeof this.client?.close === "function") {
          await this.client.close()
        } else {
          this.client = undefined
        }
        console.log(bold(`${this.#connectionName} connection closed`))
        this.#connected = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export { Connector }
