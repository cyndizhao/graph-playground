// // Update with your config settings.

require('dotenv').config({path:'../../.env'})
// TODO:
module.exports = {
  development:{
      client:'pg',
      // connection: process.env.DATABASE_URL,
      connection: process.env.DATABASE_URL || 'postgres://localhost/graphql_playground',
      migrations:{
          tableName:'knex_migration'
      },
      seeds:{
          directory:'./seeds/dev'
      }

  },
  production:{
    client:'pg',
    connection: process.env.DATABASE_URL,
    pool:{
      min:2,
      max:10
    },
    migrations:{
        tableName:'knex_migration'
    }
  }
}

