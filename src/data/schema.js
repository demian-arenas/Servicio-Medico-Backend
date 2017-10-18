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

  type Mutation {
    createPatient(id: String!, name: String!, lastnames: String!, age: Int!, address: String!): Boolean
    deletePatient(id: String!): Boolean
    updatePatient(id: String!, name: String!, lastnames: String!, age: Int!, address: String!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

export default executableSchema
