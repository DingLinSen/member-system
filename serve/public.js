const http = require('http')
const server = http.createServer((req, res) => {
  res.end('hello lzj')
})
server.listen(4000)
