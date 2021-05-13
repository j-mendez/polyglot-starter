import { mainStyles } from "../../styles/main.ts"

export const templateHead = (title = "All Taco Orders") => {
  return `<head>
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/2.3.7/mini-dark.min.css">
      ${mainStyles()}
    </head>`
}
