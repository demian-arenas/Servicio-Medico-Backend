'use strict'

import db from '../connection'

const patientsTypesLogic = {
  replaceId (item) {
    item.id = item._id
  },
  async allTypes (_) {
    let result = await db.query(`
    FOR kind IN kindPatient
    RETURN kind
    `)
    result = result._result
    result.map(this.replaceId)
    return result
  },
  async typesById (_, { id }) {
    let result = await db.query(`
    FOR kind IN kindPatient
    FILTER kind._id == "${id}"
    RETURN kind
    `)
    result = result._result[0]
    if (result !== undefined) {
      this.replaceId(result)
      return result
    }
    return false
  },
  async addType (_, args) {
    let exist = await this.typesById(_, args)
    if (!exist) {
      await db.query(`INSERT {
        type: "${args.type}"
        } IN kindPatient
      `)
      return true
    }
    return false
  },
  async deleteType (_, { id }) {
    try {
      await db.query(`
        FOR kind IN kindPatient
        FILTER kind._key == "${id}" 
        RETURN kind
      `)
      return true
    } catch (e) {
      return false
    }
  },
  async updateType (_, args) {
    try {
      await db.query(`
        UPDATE "${args.id}" WITH {
          type: "${args.type}"
        } IN kindPatient
      `)
      return true
    } catch (e) {
      return false
    }
  }
}

export default patientsTypesLogic
