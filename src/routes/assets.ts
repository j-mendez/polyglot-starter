import { Router } from "../deps.ts"
import controller from "../controllers/assets.ts"

const router = new Router()

router
  .get("/assets/static/:id", controller.getAssets)
  .get("/assets/:id", controller.streamAssets)

export { router }
