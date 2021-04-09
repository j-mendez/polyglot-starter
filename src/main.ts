import "https://deno.land/x/dotenv/load.ts"
import { Application } from "./deps.ts"
import { router as OrderRoutes } from "./routes/orders.ts"

const app = new Application()

app.use(OrderRoutes.routes())
app.use(OrderRoutes.allowedMethods())

await app.listen({ port: Number(Deno.env.get("PORT")) || 0 })
