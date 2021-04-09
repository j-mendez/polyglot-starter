import { Router } from "../deps.ts"
import controller from "../controllers/orders.ts"

const router = new Router()

router
  .get("/", controller.getLanding)
  .get("/orders", controller.getAllOrders)
  .get("/orders/:id", controller.getOrderById)
  .post("/orders", controller.createOrder)
  .put("/orders/:id", controller.updateOrderById)
  .delete("/orders/:id", controller.deleteOrderById)

export { router }
