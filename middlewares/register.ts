import { Application } from "../deps.ts"
import { router as OrdersRoutes } from "../routes/orders.ts"
import { bodyParser } from "./body-parser.ts"
import { notFound, errorHandler } from "./errors.ts"
import { rateLimit } from "./rate-limiting.ts"

const registerMiddlewares = (app: Application) => {
  const middlewares = [
    rateLimit,
    bodyParser,
    errorHandler,
    OrdersRoutes.routes(),
    OrdersRoutes.allowedMethods(),
    notFound
  ]

  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}

export { registerMiddlewares }
