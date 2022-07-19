const express = require('express');
const PORT    = process.env.PORT || 8080;

const app = express();
const db  = { users: [] }

app.use(express.static('public/'));

// routes
require('./routes/user')(app, db);
//

app.listen(PORT, () => console.log(`Started on port: ${PORT}`));