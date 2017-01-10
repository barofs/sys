const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

/************************************************************
  Middleware ou mediador, no campo da computação distribuída,
  é um programa de computador que faz a mediação entre
  software e demais aplicações. É utilizado para mover ou
  transportar informações e dados entre programas de diferentes
  protocolos de comunicação, plataformas e dependências do
  sistema operacional.
*************************************************************/
/* Middleware */
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server
