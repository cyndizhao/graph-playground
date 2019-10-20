const router = require('express').Router()
const db = require('../database')


router.get('/books', async(req, res, next) => {
    try{
        const books = await db.select().from(db.tables.books)
        res.json(books)
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.get('/book/byId/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const book = await db.select().from(db.tables.books).where('id', id).first()
        res.json(book)
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.get('/book/byAuthorId/:authorId', async(req, res, next) => {
    try{
        const authorId = req.params.authorId
        const books = await db.select().from(db.tables.books).where('authorId', authorId)
        res.json(books)
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.post('/book', async(req, res, next) => {
    try{
        const book = await db(db.tables.books).insert(req.body, '*')
        res.json(book[0])
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.get('/authors', async(req, res, next) => {
    try{
        const authors = await db.select().from(db.tables.authors)
        res.json(authors)

    }catch(err){
        console.log(err)
        next(err)
    }
})

router.get('/author/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const author = await db.select().from(db.tables.authors).where('id', id).first()
        res.json(author)
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.post('/author', async(req, res, next) => {
    try{
        const author = await db(db.tables.authors).insert(req.body, '*')
        console.log(author[0])
        res.json(author[0])

    }catch(err){
        console.log(err)
        next(err)
    }
})


module.exports = router