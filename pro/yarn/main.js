/* CJS */
// const fs = require('fs')
// const exC = require('./a.cjs')
/* ESM */
import fs from 'fs'
import { exM } from './b.mjs'
fs.readdir('./', (e, list) => {
  for (const v of list) console.log(v)
})
// console.log(exC)
console.log(exM)
