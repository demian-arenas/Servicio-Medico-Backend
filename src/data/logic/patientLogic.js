'use strict'
import db from '../connection';

const patientLogic = {
  replaceId (item) {
    return item.id = item._id
  },
  async allPatients (_, ) {
    let result = await db.query(`
    FOR user IN Patient
    RETURN user
    `)
    result = result._result
    result.map(this.replaceId)
    return result
  },
  async patientById (_, { id }) {
    let patient = await db.query(`
    FOR user IN Patient
    FILTER user._id == "${id}"
    RETURN user
    `)
    patient = patient._result[0]
    if (patient !== undefined) {
      this.replaceId(patient)
      return patient
    }
    return false
  },
  async addPatient (_, args) {
    let exist = await this.patientById(_, args)
    if (exist) {
      let patient = await db.query(`INSERT {
        _key: "${args.id}",
        age: ${args.age},
        name: "${args.name}",
        lastnames: "${args.lastnames}",
        address: "${args.address}"
        } IN Patient
      `)
      return true
    }
    return false
  },
  async deletePatient (_, {id}) {
    try {
      let patient = await db.query(`
        FOR user IN Patient
        FILTER user._key == "${id}" 
        RETURN user
      `) 
      return true;
    } catch (e) {
      return false
    }
  },
  async updatePatient (_, args) {
    try {
      await db.query(`
        UPDATE "${args.id}" WITH {
          name: "${args.name}",
          age: ${args.age},
          lastnames: "${args.lastnames}",
          address: "${args.address}"
        } IN Patient
      `)
      return true
    } catch (e) {
      return false
    }
  }
}

export default patientLogic
