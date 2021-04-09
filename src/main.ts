import "https://deno.land/x/dotenv/load.ts"
import { Application } from "./deps.ts"
import { registerMiddlewares } from "./middlewares/register.ts"
import { registerEventListeners } from "./events/register-listeners.ts"

const server = async () => {
  const app = new Application()
  registerMiddlewares(app)
  registerEventListeners(app)

  await app.listen({ port: Number(Deno.env.get("PORT")) || 0 })
}

server()
