const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const PORT = process.env.PORT || 8000
const schema = require('./schema/schema')
const api = require('./src/api')
app.use(bodyParser.json())
app.use(cors({
    origin:true
}))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.get('/', function (req, res) {
    res.send('Hello World!'); // This will serve your request to '/'.
  });

app.use('/', api)




app.listen(PORT, () => {
    console.log(`now listening for request on port ${PORT}`)
})