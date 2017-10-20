'use strict'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { createServer } from 'http'
import { executableSchema } from './data/schema'

const HOST_PORT = 3000
const GRAPHQL_PATH = '/graphql'

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema: executableSchema
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: GRAPHQL_PATH
}))

createServer(app).listen(HOST_PORT)
console.log('Server runing')
