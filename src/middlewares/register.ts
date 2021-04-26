import { Application } from "../deps.ts"
import { router as OrdersRoutes } from "../routes/orders.ts"
import { router as SystemRoutes } from "../routes/system.ts"
import { router as AssetRoutes } from "../routes/assets.ts"
import { bodyParser } from "./body-parser.ts"
import { notFound, errorHandler } from "./errors.ts"
import { rateLimit } from "./rate-limiting.ts"
import { formFormatter } from "./form-formatter.ts"
import { validator } from "./validator.ts"
import { redirect } from "./redirect.ts"

const registerMiddlewares = (app: Application) =>
  [
    rateLimit,
    bodyParser,
    formFormatter,
    errorHandler,
    validator,
    redirect,
    SystemRoutes.routes(),
    SystemRoutes.allowedMethods(),
    OrdersRoutes.routes(),
    OrdersRoutes.allowedMethods(),
    AssetRoutes.routes(),
    AssetRoutes.allowedMethods(),
    notFound
  ].forEach(middleware => {
    app.use(middleware)
  })

export { registerMiddlewares }
