const user = require('./user');

module.exports = db => {
    let root   = {};
    let schema = `
    type User {
        username : String!
        password : String!
        email    : String
    }

    input UserInput {
        username : String!
        password : String
        email    : String
    }

    type Query {
        getUser(username: String): User

        getUserByToken(token: String): User
    }

    type Mutation {
        setUser(user: UserInput)                  : User
        updateUser(user: UserInput, token:String) : User

        signin(username: String!, password: String!): String
    }
    `;

    const append = (next) => {
        root = Object.assign(root, next(db));
    }

    append(require('./user'));
    append(require('./auth'));

    return {
        root: root,
        schema: schema
    }
}