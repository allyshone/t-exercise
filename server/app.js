const express = require('express');
const exphbs  = require('express-handlebars');
const router = require('./router');
const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}!`));