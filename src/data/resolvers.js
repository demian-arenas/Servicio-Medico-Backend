'use strict'
//  import GraphQLDate from 'graphql-date'
//  import { map } from 'lodash'
//  import bcrypt from 'bcrypt'
//  import jwt from 'jsonwebtoken'

import db from './connection'
import patientLogic from './logic/patientLogic'

//const JWT_SECRET = process.env.JWT_SECRET

export const Resolvers = {
  Query: {
    Patient(_, args) {
      return patientLogic.patientById(_, args)
    },
    Patients(_, args) {
      return patientLogic.allPatients(_)
    }
  }
}

export default Resolvers