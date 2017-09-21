const express = require('express');
const router = express.Router();

app.get('/', (req, res) => { 
    const name = req.cookies.username
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt : "Who is burried in Grant's tomb?",
    hint : "Think about whose tomb is this"
 });
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
    
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/remove', (req,res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});