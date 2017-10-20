'use strict'

import { makeExecutableSchema } from 'graphql-tools'
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

  type Doctor {
    id: String!
    name: String!
    lastnames: String!
    age: Int!
  }

  type patientsTypes {
    id: String!
    type: String!
  }

  # query for types
  type Query {
    Patient(id: String!): Patient
    Patients: [Patient]!
    Doctor(id: String!): Doctor
    Doctors: [Doctor]!
    patientsTypes: [patientsTypes]!
    patientType(id: String!): patientsTypes
  }

  type Mutation {
    createPatient(id: String!, name: String!, lastnames: String!, age: Int!, address: String!): Boolean
    deletePatient(id: String!): Boolean
    updatePatient(id: String!, name: String!, lastnames: String!, age: Int!): Boolean
    createDoctor(id: String!, name: String!, lastnames: String!, age: Int!): Boolean
    deleteDoctor(id: String!): Boolean
    updateDoctor(id: String!, name: String!, lastnames: String!, age: Int!): Boolean
    createPatientType(type: String!): Boolean
    deletePatientType(id: String!): Boolean
    updatePatientType(id: String!, type: String!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`]

export const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

export default executableSchema
