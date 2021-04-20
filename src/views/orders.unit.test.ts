import { assertEquals, assertMatch } from "../../test-deps.ts"
import { orderViews } from "./orders.ts"

Deno.test({
  name: "orders landing view",
  fn: () => {
    const view = orderViews.landing

    assertEquals(typeof view, "string")
    assertMatch(view, new RegExp("tacos"))
  }
})

Deno.test({
  name: "orders list page",
  fn: () => {
    const testFixture = JSON.parse(
      Deno.readTextFileSync("./fixtures/order.json")
    )

    const view = orderViews.ordersList([{ ...testFixture, _id: "010101010" }])

    assertEquals(typeof view, "string")
    assertMatch(view, new RegExp("Ingredients"))
  }
})
