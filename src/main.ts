import "https://deno.land/x/dotenv/load.ts"
import { registerMiddlewares } from "./middlewares/register.ts"
import { registerEventListeners } from "./events/register-listeners.ts"
import { Application } from "./deps.ts"

const app = new Application()

registerMiddlewares(app)
registerEventListeners(app)

await app.listen({ port: Number(Deno.env.get("PORT")) || 0 })
