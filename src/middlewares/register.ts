import { Application } from "../deps.ts"
import { bodyParser } from "./body-parser.ts"
import { notFound, errorHandler } from "./errors.ts"
import { rateLimit } from "./rate-limiting.ts"
import { formFormatter } from "./form-formatter.ts"
import { validator } from "./validator.ts"
import { redirect } from "./redirect.ts"
import { setApplicationRoutes } from "./router.ts"

const registerMiddlewares = async (app: Application) => {
  app.use(
    rateLimit,
    bodyParser,
    formFormatter,
    errorHandler,
    validator,
    redirect
  )
  await setApplicationRoutes(app)
  app.use(notFound)
}

export { registerMiddlewares }
