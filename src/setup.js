'use strict'

const { Database } = require('arangojs')
const inquirer = require('inquirer')
const minimist = require('minimist')
const { env, listCollections } = require('./config')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()

const setup = async () => {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }

  const db = new Database({
    url: `http://${env.admin.username}:${env.admin.password}@${env.host}:${env.port}`
  })
  db.dropDatabase(env.database)
    .then(console.log('The database was deleted, I hope you have not lost valuable information.'))
    .catch(console.log('The database does not exist'))

  await db.createDatabase(env.database)

  db.useDatabase(env.database)

  listCollections.map(async (item) => {
    let collection = db.collection(item)
    await collection.create()
  })
  console.log('setup finish')
}

setup()
