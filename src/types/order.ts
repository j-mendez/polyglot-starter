enum Toppings {
  lettuce,
  onions
}

enum Wrap {
  soft,
  hard
}

enum Protein {
  chicken,
  beef
}

enum Cheese {
  chedder,
  provolon,
  mixed
}

type ToppingsStrings = keyof typeof Toppings

type Ingredients = {
  wrap: keyof typeof Wrap
  meat: keyof typeof Protein
  cheese: keyof typeof Cheese
  toppings: ToppingsStrings[]
}

type Items = {
  ingredients: Ingredients
  qty: number
}

export interface Order {
  id: string
  items: Items[]
}
