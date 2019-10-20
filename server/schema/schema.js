
// what schema does 
// # define type 
// # define relationships between types 
// # define requires 
const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = require('graphql') 
const axios = require('../src/connection.js')

const BookType = new GraphQLObjectType({
    name:'Book',
    //fields property must be a function , when we have multiple types and they have references to one another, then unless we wrap the fields in a function, one type may not be necessarily know what the other type is.
    //TODO:
    fields: () => ({
            //when we define, we need to say what type it is (a graphql type)
            id: {type: GraphQLID},
            name:{type: GraphQLString},
            genre:{type: GraphQLString},
            author:{
                type: AuthorType,
                resolve(parent, args){
                    return axios.get(`/author/${parent.authorId}`)
                    .then(res => res.data)
                    .catch(error => {
                        console.log(error)
                    })
                }
            }
        }
    ) 
  
})


const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () =>({
        id: {type: GraphQLID},
        name:{type:GraphQLString},
        age: {type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return axios.get(`/book/byAuthorId/${parent.id}`).then(res => res.data).catch(err => console.log(err))
            }
        }
    })
})

// rootQuery how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        // the name of the require matters, that's what we use to require data in the front end
        book: {
            type: BookType,
            //pass the argument alone with the require, book(id:'123') in the front end
            args:{id: {type: GraphQLID}},
            // resolve function is where we write code to get whichever data we need from our database or some other source
            // parent: will coming to play when we start to look relationship between data
            resolve(parent, args){
                return axios.get(`/book/byId/${args.id}`).then(res => res.data).catch(err => console.log(err))
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return axios.get('/books').then(res => res.data).catch(err => console.log(err))
            }
        },
        author:{
            type: AuthorType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return axios.get(`/author/${args.id}`).then(res => res.data).catch(err => console.log(err))
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return axios.get('/authors').then(res => res.data).catch(err => console.log(err))
            }
        },
    }
})


const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString) },
                age:{type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                return axios.post('/author', {...args})
                .then(res => { 
                    console.log(res.data)
                    return res.data
                }).catch(error => console.log(error))
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString) },
                genre: {type: new GraphQLNonNull(GraphQLString) },
                authorId: {type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                return axios.post('/book', {...args})
                .then(res => res.data).catch(error => console.log(error))
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutation:Mutation
})
