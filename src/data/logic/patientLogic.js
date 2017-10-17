'use strict'
import db from '../connection';

const patientLogic = {
  async allPatients(_, ) {
    let result = await db.query(`
    FOR user IN Patient
    RETURN user
    `)
    result = result._result
    result.map((item) => {
      item.id = item._id
    })
    return result
  },
  async patientById(_, { id }) {
    let patient = await db.query(`
    FOR user IN Patient
    FILTER user._id == "${id}"
    RETURN user
    `)
    patient = patient._result[0]
    patient.id = patient._id
    return patient
  }
}

export default patientLogic
