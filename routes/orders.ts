import { Router } from "../deps.ts"
import controller from "../controllers/orders.ts"

const router = new Router()

router
  .get("/", controller.getLanding)
  .get("/orders", controller.getAllOrders)
  .get<{ id: string }>("/orders/:id", controller.getOrderById)
  .post("/orders", controller.createOrder)
  .put<{ id: string }>("/orders/:id", controller.updateOrderById)
  .delete<{ id: string }>("/orders/:id", controller.deleteOrderById)

export { router }
