const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes/index.js');
const cardRoutes = require('./routes/cards.js');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    console.log('hello');
    const err = new Error('Oh no!');
    err.status = 500;
    next(err);
});

app.use((req, res, next) => {
    console.log('world');
    next();
});


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
})

app.listen(3000, () =>{
    console.log('The application is running port 3000');
});

