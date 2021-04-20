import type { OrderSchema, Item } from "../types/order.ts"

export const orderViews = {
  landing: `"Dedicated to that one guy that really loves tacos"`,
  ordersList: (orders: OrderSchema[]) => {
    return `
    <head>
      <title>All Taco Orders</title>
      <style>
        body {
          background: #333;
          color: #fff;
          padding: 12px;
          font-family: system-ui;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          padding: 12px;
          border: 1px solid #fff;
        }
      </style>
    </head>
    <h1>Orders List</h1>
    <h2>The latest orders posted below</h2>
    <p>${orders?.length} orders visible</p>
    <ul>${orders
      .map((order: OrderSchema, index: number) => {
        return `<li>${order.items.map((item: Item) => {
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
        })}</li>`
      })
      .join("")}
    </ul>`
  }
}
