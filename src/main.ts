import "https://deno.land/x/dotenv/load.ts"
import { Application } from "./deps.ts"

const app = new Application()

app.use(ctx => {
  ctx.response.body = "Hello"
})

await app.listen({ port: Number(Deno.env.get("PORT")) || 0 })
