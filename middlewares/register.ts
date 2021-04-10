import { Application } from "../deps.ts"
import { router as OrdersRoutes } from "../routes/orders.ts"
import { bodyParser } from "./body-parser.ts"

const registerMiddlewares = (app: Application) => {
  const middlewares = [
    bodyParser,
    OrdersRoutes.routes(),
    OrdersRoutes.allowedMethods()
  ]

  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}

export { registerMiddlewares }
