const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const db = require('./config/db/index');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
var cookieParser = require('cookie-parser')

var methodOverride = require('method-override');
// connect to DB
db.connect();

const route = require('./routes');

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img' , express.static('uploads'))
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);

// http logger
// app.use(morgan('combined'))

// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field , sort) =>{
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span></a>`
            },
            pagination: (field , page) =>{
                const pages = page +1;
                return `<a href="?_pagination&column=${field}&page=${pages}"> `
            },
        },
        
    }),
);
app.set('view engine', 'hbs');
// 
app.set('views', path.join(__dirname, 'resources', 'view'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
