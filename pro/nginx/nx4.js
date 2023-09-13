const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World! 4000 '))
app.listen(4000, () => console.log('Node.js app 4000 listening'))
