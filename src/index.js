const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const db = require('./config/db/index');
var methodOverride = require('method-override');

// connect to DB
db.connect();

const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img' , express.static('uploads'))
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// http logger
// app.use(morgan('combined'))

// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'view'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
