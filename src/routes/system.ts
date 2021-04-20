import { Router } from "../deps.ts"
import controller from "../controllers/system.ts"

const router = new Router()

router
  .get("/api/system/ratelimit", controller.getRateLimit)
  .post("/api/system/ratelimit", controller.toggleRateLimit)

export { router }
