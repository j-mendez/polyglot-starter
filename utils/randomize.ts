import { Toppings, Wrap, Protein, Cheese } from "../types/order.ts"

const getIngredientOptions = (option: any) =>
  Object.values(option).filter(item => typeof item !== "number")

const randomNumberFrom = (max: number, min: number = 0) =>
  Math.floor(Math.random() * max) + min

export const randomize = (type: string) => {
  if (type === "order") {
    const toppingOptions = getIngredientOptions(Toppings)
    const wrapOptions = getIngredientOptions(Wrap)
    const proteinOptions = getIngredientOptions(Protein)
    const cheeseOptions = getIngredientOptions(Cheese)

    const items = new Array(randomNumberFrom(5, 1)).fill(null).map(() => {
      return {
        ingredients: {
          toppings: new Array(randomNumberFrom(3, 1))
            .fill(null)
            .map(() => toppingOptions[randomNumberFrom(toppingOptions.length)]),
          wrap: wrapOptions[randomNumberFrom(wrapOptions.length)],
          protein: proteinOptions[randomNumberFrom(proteinOptions.length)],
          cheese: cheeseOptions[randomNumberFrom(cheeseOptions.length)]
        },
        qty: randomNumberFrom(10)
      }
    })

    return {
      items
    }
  }
}
