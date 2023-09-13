const express = require('express')
const app = express()

app.use('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('Hello, World!\n\n💚 🔒.js')
})

// app.listen(3000) // test server listening

require('greenlock-express')
  .init({
    packageRoot: __dirname,
    configDir: './greenlock.d',

    maintainerEmail: 'jon@example.com',

    cluster: false
  })
  // Serves on 80 and 443
  // Get's SSL certificates magically!
  .serve(app)
c
