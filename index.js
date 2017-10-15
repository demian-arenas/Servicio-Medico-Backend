'use strict'

const express = require('express')
const bodyParser =  require('body-parser')
const { createServer } = require('http')

const HOST_PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

createServer(app).listen(HOST_PORT)
