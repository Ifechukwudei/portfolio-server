const path = require("path")
const fs = require("fs")
const http = require("http")

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    req.url === "/"
      ? "index.html"
      : req.url === "/home"
      ? "index.html"
      : req.url === "/about"
      ? "about.html"
      : req.url === "/contact"
      ? "contact.html"
      : req.url
  )
  let contentType = getContentType(filePath) || "text/html"
  let emptyPagePath = path.join(__dirname, "", "404.html")
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(emptyPagePath, "utf8", (err, data) => {
          res.writeHead(200, { "content-Type": contentType })
          res.end(content)
        })
      } else {
        res.writeHead(500)
        res.end("A server error has occured")
      }
    }
    if (!err) {
      res.writeHead(200, { "content-Type": contentType })
      res.end(content)
    }
  })
})

const getContentType = (filePath) => {
  let extname = path.extname(filePath)
  if (extname === ".js") {
    return "text/javascript"
  }
  if (extname === ".css") {
    return "text/css"
  }
  if (extname === ".jpg") {
    return "image/jpg "
  }
  if (extname === ".png") {
    return "image/png"
  }
}
const port = 3000

server.listen(port, () => {
  console.log(`sever is running on port ${port}`)
})
