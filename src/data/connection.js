import { Database } from 'arangojs'
const host = process.env.ARANGODB_HOST;
const port = process.env.ARANGODB_PORT;
const database = process.env.ARANGODB_DB;
const username = process.env.ARANGODB_USERNAME;
const password = process.env.ARANGODB_PASSWORD;

const db = new Database({
  url: `http://${username}:${password}@${host}:${port}`,
  databaseName: database
})

export default db
