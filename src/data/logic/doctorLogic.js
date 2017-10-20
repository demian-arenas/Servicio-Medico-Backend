'use strict'

import db from '../connection'

const doctorLogic = {
  replaceId (item) {
    item.id = item._id
  },
  async allDoctors (_) {
    let result = await db.query(`
    FOR user IN Doctor
    RETURN user
    `)
    result = result._result
    result.map(this.replaceId)
    return result
  },
  async doctorById (_, { id }) {
    let doctor = await db.query(`
    FOR user IN Doctor
    FILTER user._id == "${id}"
    RETURN user
    `)
    doctor = doctor._result[0]
    if (doctor !== undefined) {
      this.replaceId(doctor)
      return doctor
    }
    return false
  },
  async addDoctor (_, args) {
    let exist = await this.doctorById(_, args)
    if (!exist) {
      await db.query(`INSERT {
        _key: "${args.id}",
        age: ${args.age},
        name: "${args.name}",
        lastnames: "${args.lastnames}"
        } IN Doctor
      `)
      return true
    }
    return false
  },
  async deleteDoctor (_, { id }) {
    try {
      await db.query(`
        FOR user IN Doctor
        FILTER user._key == "${id}" 
        RETURN user
      `)
      return true
    } catch (e) {
      return false
    }
  },
  async updatedoctor (_, args) {
    try {
      await db.query(`
        UPDATE "${args.id}" WITH {
          name: "${args.name}",
          age: ${args.age},
          lastnames: "${args.lastnames}"
        } IN Doctor
      `)
      return true
    } catch (e) {
      return false
    }
  }
}

export default doctorLogic
