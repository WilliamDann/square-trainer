module.exports.schema = `
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
    }

    type Mutation {
        setUser(user: UserInput): User
    }
`;

module.exports.root = db => { return {
    setUser: ({user}) => {
        if (db[user.username])
            throw new Error("User already exists");

        db[user.username] = user;
        return user;
    },

    getUser: ({username}) => db[username]
}}