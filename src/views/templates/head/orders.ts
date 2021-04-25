export const templateHead = (title: string = "All Taco Orders") => {
  return `<head>
      <title>${title}</title>
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
      </style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/2.3.7/mini-dark.min.css">
    </head>`
}
