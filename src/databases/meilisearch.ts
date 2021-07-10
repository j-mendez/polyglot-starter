import { MeiliSearchClient } from "../deps.ts";
import type { Search } from "../types/search.ts";
import { Connector } from "./connector.ts";

class Meilisearch extends Connector {
  client: Search | null;
  connectTimeout = Number(Deno.env.get("MEILISEARCH_DB_RETRY_TIMOUT"));
  constructor() {
    super();
    this.client = null;
  }
  connect(): Promise<void> {
    return super.connect(false, {
      name: "Meilisearch",
      client: new MeiliSearchClient({
        host: Deno.env.get("MEILISEARCH_DB_URL"),
        apiKey: Deno.env.get("MEILISEARCH_DB_API_KEY"),
      }),
      setClient: true,
    });
  }
  set = async (collection: string, documents: unknown[]) => {
    try {
      return await this.client?.index(collection)?.addDocuments(documents);
    } catch (e) {
      console.error(e);
    }
  };
  get = async (collection: string, query: string) => {
    try {
      return await this.client?.index(collection)?.search(query);
    } catch (e) {
      console.error(e);
    }
  };
  update = async (collection: string, documents: unknown) => {
    try {
      return await this.client?.index(collection)?.updateDocuments([documents]);
    } catch (e) {
      console.error(e);
    }
  };
  del = async (collection: string, id: string | number) => {
    try {
      return await this.client?.index(collection)?.deleteDocument(id);
    } catch (e) {
      console.error(e);
    }
  };
}

export { Meilisearch };
