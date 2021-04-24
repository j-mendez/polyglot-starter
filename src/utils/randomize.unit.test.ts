import { assertEquals, assertMatch } from "../test-deps.ts"
import { randomize } from "./randomize.ts"

Deno.test({
  name: "randomize order",
  fn: () => {
    const order = randomize()

    assertEquals(typeof order, "object")
    assertEquals(Array.isArray(order?.items), true)
  }
})
