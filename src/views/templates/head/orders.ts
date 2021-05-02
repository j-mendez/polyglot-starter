export const templateHead = (title: string = "All Taco Orders") => {
  return `<head>
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/2.3.7/mini-dark.min.css">
      <style>
        body {
          padding: 0px;
          margin: 0px;
          font-family: system-ui;
        }
        nav {
          margin: 0px;
        }
        nav a {
          display: inline;
          margin-right: 4px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        .list-item {
          border: 1px solid #ccc;
          padding: 6px 10px;
        }
        .small-box {
          display: inline-block;
        }
      </style>
    </head>`
}
