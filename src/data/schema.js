'use strict'

import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools'
import Resolvers from './resolvers'

export const Schema = [`
  # a user -- keep type really simple for now
  type Patient {
    id: String!
    name: String!
    lastnames: String!
    age: Int!
    address: String!
  }

  # query for types
  type Query {
    Patient(id: String!): Patient
    Patients: [Patient]
  }

  schema {
    query: Query
  }
`];

export const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

export default executableSchema
