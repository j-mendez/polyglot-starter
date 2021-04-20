import { cyan } from "../deps.ts"

export const log = (e: unknown) => {
  if (e instanceof Error) {
    console.error(`${cyan("Error:")} ${e.message}`)
  } else {
    console.log(e)
  }
}
