import type { OrderSchema, Item } from "../types/order.ts"
import { templateHead } from "../templates/head/orders.ts"

export const orderViews = {
  landing: `"Dedicated to that one guy that really loves tacos"`,
  orderFind: () => {
    return `
      ${templateHead("Find Order")}
      <h1>Find your order</h1>
      <h2>Get the taco by ID</h2>
      <form method="get" action="/api/orders">
        <label for="id">Order ID</label><br>
        <input type="text" id="id" name="id" placeholder="ex: 60818f5397ba0eef59399c4c">
        <input type="submit" value="Submit">
      </form>

      <h3>Search by name, ingredient, etc</h3>

      <form method="get" action="/api/orders">
        <label for="query">Query</label><br>
        <input type="text" id="query" name="query" placeholder="ex: chicken">
        <input type="submit" value="Submit">
      </form>

    `
  },
  orderCreate: () => {
    return `
      ${templateHead("Add Random Order")}
      <h1>Random Taco Generator</h1>
      <h2>Create a new randomly generated taco</h2>
      <form method="post" action="/api/orders">
        <input type="radio" id="random" name="random" value="true" checked>
        <label for="random">Random</label><br>
        <input type="submit" value="Submit">
      </form>
    `
  },
  ordersList: (orders: OrderSchema[]) => {
    return `
    ${templateHead()}
    <h1>Orders List</h1>
    <h2>The latest orders posted below</h2>
    <p>${orders?.length} orders visible</p>
    <ul>${orders
      .map((order: OrderSchema, index: number) => {
        return `<li>${order.items
          .map((item: Item) => {
            const { name, ingredients, qty } = item
            return `<details>
                      <summary><b>${name}</b> - ${order._id}</summary>
                      <p>Qty: ${qty}</p>
                      <u>Ingredients</u>
                      ${Object.entries(ingredients)
                        .map(([key, value]) => {
                          return `<p>${key}: ${value}</p>`
                        })
                        .join("")}
                </details>`
          })
          .join("")}</li>`
      })
      .join("")}
    </ul>`
  }
}
