import { green, bold, yellow, MeiliSearchClient } from "../deps.ts"
import type { Search } from "../types/search.ts"

class Meilisearch {
  client?: Search
  #connected?: boolean = false
  constructor() {}
  connect = async (retry?: boolean) => {
    try {
      this.client = await new MeiliSearchClient({
        host: `http://${
          Deno.env.get("MEILISEARCH_DB_URL") || "127.0.0.1"
        }:7700`,
        apiKey: Deno.env.get("MEILISEARCH_DB_API_KEY")
      })
      this.#connected = true
      console.log(green("Meilisearch connection opened"))
    } catch (e) {
      console.log(yellow(`Meilisearch connection error: ${e}`))
      if (retry) {
        setTimeout(
          this.connect,
          Number(Deno.env.get("MEILISEARCH_DB_RETRY_TIMOUT")) || 15000
        )
      }
    }
  }
  addDocuments = async (collection: string, documents: any) => {
    if (typeof this.client !== "undefined") {
      try {
        const index = this.client.index(collection)

        return await index?.addDocuments(documents)
      } catch (e) {
        console.error(e)
      }
    }
  }
  search = async (collection: string, query: string) => {
    if (typeof this.client !== "undefined") {
      try {
        const index = this.client?.index(collection)

        return await index.search(query)
      } catch (e) {
        console.error(e)
      }
    }
  }
  updateDocuments = async (collection: string, documents: any) => {
    if (typeof this.client !== "undefined") {
      try {
        const index = this.client?.index(collection)

        return await index?.updateDocuments([documents])
      } catch (e) {
        console.error(e)
      }
    }
  }
  deleteDocument = async (collection: string, id: string | number) => {
    if (typeof this.client !== "undefined") {
      try {
        const index = this.client?.index(collection)

        return await index?.deleteDocument(id)
      } catch (e) {
        console.error(e)
      }
    }
  }
  close = async () => {
    if (this.#connected) {
      try {
        this.client = undefined
        console.log(bold("Meilisearch connection closed"))
        this.#connected = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const meilisearch = new Meilisearch()

export { meilisearch }
