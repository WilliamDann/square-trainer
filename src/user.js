const jwt              = require("jsonwebtoken")
import jwt_decode from "jwt-decode";

module.exports = db => { return {
    setUser: ({user}) => {
        if (db[user.username])
            throw new Error("User already exists");

        db[user.username] = user;
        return user;
    },

    updateUser: ({user, token}) => {
        jwt.verify(token, process.env.jwtKey); // throws on fail
        let decoded = jwt_decode(token.trim()) // removes whitespace from token and stores the decoded token

        if(decoded.username === user.username) {
            db[user.username] = user;
        }
        return user;
    },

    getUser: ({username}) => {
        const data = Object.assign({}, db[username]);
        delete data.password;

        return data;
    }
}}