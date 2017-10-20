import { Database } from 'arangojs'
import { env } from '../config'

const db = new Database({
  url: `http://${env.user.username}:${env.user.password}@${env.host}:${env.port}`,
  databaseName: env.database
})

export default db
