const faker = require('faker')
const random = require('random')

let authors = Array(5).fill().map(item => {
    return {
        name: faker.name.findName(),
        age:faker.random.number()
    }
})

let books = Array(10).fill().map(item => {
    return {
        name:faker.hacker.phrase(),
        genre: faker.lorem.word(),
        authorId:random.int(min = 1, max = 5)
    }
})


exports.seed = async function(knex){
    console.log('hello')
    await knex('authors').insert(authors)
    await knex('books').insert(books)
}