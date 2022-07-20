const express         = require('express');
const PORT            = process.env.PORT || 8080;

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app            = express();
const {root, schema} = require('./src/all');

app.use('/graphql', graphqlHTTP({
    schema    : buildSchema(schema),
    rootValue : root,
    graphiql  : true,
}));

app.use(express.static('public/'));
app.listen(PORT, () => console.log(`Started on port: ${PORT}`));