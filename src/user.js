const jwt              = require("jsonwebtoken")

module.exports = db => { return {
    setUser: ({user}) => {
        if (db[user.username])
            throw new Error("User already exists");

        db[user.username] = user;
        return user;
    },

    updateUser: ({user, token}) => {
        jwt.verify(token, process.env.jwtKey); // throws on fail

        db[user.username] = user;
        return user;
    },

    getUser: ({username}) => {
        const data = Object.assign({}, db[username]);
        delete data.password;

        return data;
    }
}}