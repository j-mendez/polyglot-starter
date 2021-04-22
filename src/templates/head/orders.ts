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
        li {
          padding: 12px;
          border: 1px solid #fff;
        }
      </style>
    </head>`
}
