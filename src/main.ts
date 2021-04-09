import "https://deno.land/x/dotenv/load.ts"
import { Application } from "./deps.ts"
import { registerMiddlewares } from "./middlewares/register.ts"

const app = new Application()

registerMiddlewares(app)

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: http${secure ? "s" : ""}://${
      hostname ?? "localhost"
    }:${port}`
  )
})

await app.listen({ port: Number(Deno.env.get("PORT")) || 0 })
