
const config = require('./knexfile')

const knex = require('knex')(config[process.env.NODE_ENV || 'development'])



knex.tables = {
    books: 'books',
    authors:'authors'
}

module.exports = knex