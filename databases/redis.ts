import { green, bold, yellow, connectRedis, Redis } from "../deps.ts"

class RedisDb {
  client?: Redis
  constructor() {}
  connect = async (retry?: boolean) => {
    try {
      this.client = await connectRedis({
        hostname: String(Deno.env.get("REDIS_DB_URL") || "127.0.0.1"),
        port: Deno.env.get("REDIS_DB_PORT") ?? 6379
      })

      console.log(green("Redis connection opened"))
    } catch (e) {
      console.log(yellow(`Redis connection error: ${e}`))
      if (retry) {
        setTimeout(
          this.connect,
          Number(Deno.env.get("REDIS_DB_RETRY_TIMOUT")) || 15000
        )
      }
    }
  }
  set = async (key: string, value: any) => {
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
  close = async () => {
    await this.client?.close()
    console.log(bold("Redis connection closed"))
  }
}

const redis = new RedisDb()

export { redis }
