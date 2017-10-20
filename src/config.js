'use strict'

// environment variables
const env = {
  host: process.env.ARANGODB_HOST,
  port: process.env.ARANGODB_PORT,
  database: process.env.ARANGODB_DB,
  user: {
    username: process.env.ARANGODB_USERNAME,
    password: process.env.ARANGODB_PASSWORD
  },
  admin: {
    username: process.env.ARANGODB_ADMIN_USERNAME,
    password: process.env.ARANGODB_ADMIN_PASSWORD
  }
}

//  name of collections
const listCollections = [
  'Login',
  'Patient',
  'kindPatient',
  'School',
  'Doctor',
  'Consult',
  'Ailment',
  'Medicament',
  'medicamentWay',
  'medicamentoDuration'
]

module.exports = {
  env,
  listCollections
}
