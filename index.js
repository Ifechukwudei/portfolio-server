const path = require('path')
const fs = require('fs')
const http = require('http')
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    let filePath = path.join(__dirname, 'public', 'index.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.writeHead(200, { 'content-Type': 'text.html' })
      res.end(data)
    })
  }
  if (req.url === '/contact') {
    let filePath = path.join(__dirname, 'public', 'contact.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.writeHead(200, { 'content-Type': 'text.html' })
      res.end(data)
    })
  }
  if (req.url === '/about') {
    let filePath = path.join(__dirname, 'public', 'about.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.writeHead(200, { 'content-Type': 'text.html' })
      res.end(data)
    })
  }

  if (err) {
    if (err.code === 'ENOENT') {
      fs.readFile(emptyPagePath, 'utf8', (err, data) => {
        res.writeHead(200, { 'content-Type': contentType })
        res.end(data)
      })
    } else {
      res.writeHead(500)
      res.end('A server error has occured')
    }
  }
})

const port = 3000

server.listen(port, () => {
  console.log(`sever is running on port ${port}`)
})
