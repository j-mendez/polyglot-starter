import type { OrderSchema, Item } from "../types/order.ts"
import { templateHead } from "./templates/head/orders.ts"
import { canvasLoader } from "./templates/web-assembly/canvas.ts"
import { navbar } from "./templates/nav/navbar.ts"
import { Toppings, Wrap, Protein, Cheese } from "../types/order.ts"

export const orderViews = {
  landing: () => {
    return `
      ${templateHead("Taco App")}
      ${navbar("/")}
      <main>
        <h1>The Taco App</h1>
        <h2>Dedicated to that one guy that really loves tacos</h2>
        <p>This app is a showcase of using DENO to create high performance applications.</p>
        <h3>Deno REST Starter Application</h3>
        <a href="https://github.com/j-mendez/deno-rest-starter">Github</a>
      </main>
      ${canvasLoader()}
    `
  },
  orderFind: () => {
    return `
      ${templateHead("Find Order")}
      <main>
        ${navbar("pages/order")}
        <h1>Find your order</h1>
        <h2>Get order by ID</h2>
        <div class="small-box">
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
        </div>
      </main>
      ${canvasLoader()}
    `
  },
  orderCreate: () => {
    return `
      ${templateHead("Add Taco")}
      ${navbar("pages/create")}
      <h1>Taco Creator</h1>
      <h2>Create a new order</h2>
      <p>Form WIP currently you can only add one order</p>
      <form method="post" action="/api/orders">
        <label for="items[0][name]">Name</label><br>
        <input type="text" id="name" name="items[0][name]" placeholder="Name of taco lineup"><br>
        <label for="items[0][qty]">QTY</label><br>
        <input type="number" id="qty" name="items[0][qty]" placeholder="1-Infinity"><br>
        <label for="items[0][ingredients][wrap]">Wrap</label><br>
        <select name="items[0][ingredients][wrap]" id="wrap">
          ${Object.values(Wrap)
            .filter(item => typeof item !== "number")
            .map(name => `<option value="${name}">${name}</option>`)}
        </select><br>
        <label for="items[0][ingredients][protein]">Protein</label><br>
        <select name="items[0][ingredients][protein]" id="wrap">
          ${Object.values(Protein)
            .filter(item => typeof item !== "number")
            .map(name => `<option value="${name}">${name}</option>`)}
        </select><br>
        <label for="items[0][ingredients][cheese]">Cheese</label><br>
        <select name="items[0][ingredients][cheese]" id="wrap">
          ${Object.values(Cheese)
            .filter(item => typeof item !== "number")
            .map(name => `<option value="${name}">${name}</option>`)}
        </select><br>
        <label for="items[0][ingredients][toppings][0]">Toppings</label><br>
        <input type="text" id="toppings" name="items[0][ingredients][toppings][0]" placeholder="lettuce,onions"><br>
        <input type="submit" value="Submit">
      </form>
    `
  },
  orderCreateRandom: () => {
    return `
      ${templateHead("Add Random Order")}
      ${navbar("pages/create-random")}
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
    ${navbar("pages/orders")}
    <h1>Orders List</h1>
    <h2>The latest orders posted below</h2>
    <p>${orders?.length} orders visible</p>
    <ul>${orders
      .map((order: OrderSchema, index: number) => {
        return `<li class="list-item">${order.items
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
