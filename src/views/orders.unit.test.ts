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
  name: "orders find view",
  fn: () => {
    const view = orderViews.orderFind()

    assertEquals(typeof view, "string")
    assertMatch(view, new RegExp("Search"))
    assertMatch(view, new RegExp("Find"))
  }
})

Deno.test({
  name: "orders create view",
  fn: () => {
    const view = orderViews.orderCreate()

    assertEquals(typeof view, "string")
    assertMatch(view, new RegExp("random"))
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
