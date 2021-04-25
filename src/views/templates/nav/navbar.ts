export const navbar = (route?: string) => {
  const isLanding = route === "/"
  const isOrdersList = route === "pages/orders"
  const isOrders = route === "pages/order"
  const isOrdersCreate = route === "pages/create"
  const isOrdersCreateRandom = route === "pages/create-random"
  const highlighted = ` style="color: #fff;"`

  return `
	<nav>
		<a href="/"${isLanding ? highlighted : ""}>Tacos</a>
		<a href="/pages/orders"${isOrdersList ? highlighted : ""}>Orders List</a>
		<a href="/pages/order"${isOrders ? highlighted : ""}>Find Order</a>
		<a href="/pages/create"${isOrdersCreate ? highlighted : ""}>Create Order</a>
		<a href="/pages/create-random"${
      isOrdersCreateRandom ? highlighted : ""
    }>Create Random Order</a>
	</nav>
`
}
