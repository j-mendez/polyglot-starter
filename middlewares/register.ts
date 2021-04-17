import { Application } from "../deps.ts"
import { router as OrdersRoutes } from "../routes/orders.ts"
import { bodyParser } from "./body-parser.ts"
import { notFound, errorHandler } from "./errors.ts"
import { rateLimit } from "./rate-limiting.ts"
import { validator } from "./validator.ts"

const registerMiddlewares = (app: Application) => {
  ;[
    rateLimit,
    bodyParser,
    errorHandler,
    validator,
    OrdersRoutes.routes(),
    OrdersRoutes.allowedMethods(),
    notFound
  ].forEach(middleware => {
    app.use(middleware)
  })
}

export { registerMiddlewares }
