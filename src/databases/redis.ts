import { green, bold, yellow, connectRedis, Redis } from "../deps.ts"
import { Connector } from "./connector.ts"

class RedisDb extends Connector {
  client: Redis | null
  connectTimeout: number = Number(Deno.env.get("REDIS_DB_RETRY_TIMOUT"))
  constructor() {
    super()
    this.client = null
  }
  connect(): Promise<void> {
    return super.connect(false, {
      name: "Redis",
      client: connectRedis({
        hostname: String(Deno.env.get("REDIS_DB_URL") || "127.0.0.1"),
        port: Deno.env.get("REDIS_DB_PORT") ?? 6379
      }),
      setClient: true
    })
  }
  set = async (key: string, value: string) => {
    return await this.client?.set(key, value)
  }
  get = async (key: string) => {
    const result = await this.client?.get(key)
    if (result) {
      try {
        return JSON.parse(result)
      } catch (e) {
        console.error(e)
        return result
      }
    }
    return null
  }
  del = async (key: string) => {
    return await this.client?.del(key)
  }
}

const redis = new RedisDb()

export { redis }
