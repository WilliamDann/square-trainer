const user = require('./user');

let db = {
    users: {}
}

let root   = {};
let schema = "";

const append = (next) => {
    root    = Object.assign(root, next.root(db));
    schema += next.schema;
}

append(require('./user'));

module.exports = { 
    root: root, 
    schema: schema 
}
