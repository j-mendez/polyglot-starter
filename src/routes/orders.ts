import { Router } from "../deps.ts"
import controller from "../controllers/orders.ts"

const router = new Router()

router
  .get("/", controller.getLanding)
  .get("/pages/orders", controller.renderOrdersListPage)
  .get("/pages/order", controller.renderOrderFindPage)
  .get("/pages/create", controller.renderOrdersCreatePage)
  .get("/api/orders", controller.getAllOrders)
  .get<{ id: string }>("/api/orders/:id", controller.getOrderById)
  .get<{ id: string }>("/api/orders/search/:id", controller.searchOrders)
  .post("/api/orders", controller.createOrder)
  .put<{ id: string }>("/api/orders/:id", controller.updateOrderById)
  .delete<{ id: string }>("/api/orders/:id", controller.deleteOrderById)

export { router }
