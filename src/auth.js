const jwt = require("jsonwebtoken")

module.exports = db => { return {
    signin: ({username, password}) => {
        if (!db[username] || db[username].password != password)
            throw new Error("Authentication Error");

        const token = jwt.sign({ username }, process.env.jwtKey, {
            algorithm: "HS256",
            expiresIn: process.env.jwtExpirySeconds,
        });

        return token;
    },

    getUserByToken: ({token}) => {
        const payload = jwt.verify(token, process.env.jwtKey);

        if (!db[payload.username])
            throw new Error("User was deleted.");

        return db[payload.username];
    }
}}