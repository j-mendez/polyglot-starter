import { Router } from "../deps.ts"
import controller from "../controllers/orders.ts"

const router = new Router()

router
  .get("/", controller.getLanding)
  .get("/api/orders", controller.getAllOrders)
  .get<{ id: string }>("/api/orders/:id", controller.getOrderById)
  .post("/api/orders", controller.createOrder)
  .put<{ id: string }>("/api/orders/:id", controller.updateOrderById)
  .delete<{ id: string }>("/api/orders/:id", controller.deleteOrderById)

export { router }
