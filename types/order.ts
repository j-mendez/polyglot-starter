export enum Toppings {
  lettuce,
  onions
}

export enum Wrap {
  soft,
  hard
}

export enum Protein {
  chicken,
  beef
}

export enum Cheese {
  chedder,
  provolon,
  mixed
}

export type ToppingsOptions = keyof typeof Toppings
export type WrapOptions = keyof typeof Wrap
export type ProteinOptions = keyof typeof Protein
export type CheeseOptions = keyof typeof Cheese

export type Ingredients = {
  wrap: WrapOptions
  protein: ProteinOptions
  cheese: CheeseOptions
  toppings: ToppingsOptions[]
  [x: string]: any
}

export type IngredientsOptions = {
  validator: typeof Toppings | typeof Wrap | typeof Protein | typeof Cheese
  key: keyof Ingredients
  value: ToppingsOptions | WrapOptions | ProteinOptions | CheeseOptions | any
}

export type Item = {
  customIngredients?: keyof Ingredients
  ingredients: Ingredients
  qty: number
}

export interface OrderSchema {
  _id?: { $oid: string }
  items: Item[]
}
