'use strict'
//  import GraphQLDate from 'graphql-date'
//  import { map } from 'lodash'
//  import bcrypt from 'bcrypt'
//  import jwt from 'jsonwebtoken'

import patientLogic from './logic/patientLogic'
import doctorLogic from './logic/doctorLogic'
import patientsTypesLogic from './logic/patientsTypesLogic'

//  const JWT_SECRET = process.env.JWT_SECRET

export const Resolvers = {
  Query: {
    Patient (_, args) {
      return patientLogic.patientById(_, args)
    },
    Patients (_, args) {
      return patientLogic.allPatients(_)
    },
    Doctor (_, args) {
      return doctorLogic.doctorById(_, args)
    },
    Doctors (_, args) {
      return doctorLogic.allDoctors(_)
    },
    patientsTypes (_, args) {
      return patientsTypesLogic.allTypes(_)
    },
    patientType (_, args) {
      return patientsTypesLogic.typesById(_, args)
    }
  },
  Mutation: {
    createPatient (_, args) {
      return patientLogic.addPatient(_, args)
    },
    deletePatient (_, args) {
      return patientLogic.deletePatient(_, args)
    },
    updatePatient (_, args) {
      return patientLogic.updatePatient(_, args)
    },
    createDoctor (_, args) {
      return doctorLogic.addDoctor(_, args)
    },
    deleteDoctor (_, args) {
      return doctorLogic.deleteDoctor(_, args)
    },
    updateDoctor (_, args) {
      return doctorLogic.updateDoctor(_, args)
    },
    createPatientType (_, args) {
      return patientsTypesLogic.addType(_, args)
    },
    deletePatientType (_, args) {
      return patientsTypesLogic.deleteType(_, args)
    },
    updatePatientType (_, args) {
      return patientsTypesLogic.updateType(_, args)
    }
  }
}

export default Resolvers
