const fs              = require('fs');

const express         = require('express');
const PORT            = process.env.PORT || 8080;

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app            = express();
const db             = JSON.parse(fs.readFileSync('./data/dump.json'));

const {root, schema} = require('./src/all')(db);

const dumpDB = () => {
    console.log("Dumping data...")
    require('fs').writeFileSync('./data/dump.json', JSON.stringify(db));
    process.exit(0);
}

// DEBUG ONLY
// process.env.jwtKey           = "DEBUG";
// process.env.jwtExpirySeconds = 2592000;
//

process.on("SIGTERM", () => dumpDB());
process.on("SIGINT", () => dumpDB());

app.use('/graphql', graphqlHTTP({
    schema    : buildSchema(schema),
    rootValue : root,
    graphiql  : true,
}));

app.use(express.static('public/'));
app.listen(PORT, () => console.log(`Started on port: ${PORT}`));