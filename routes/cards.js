const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
    let {side} = req.query;
    const { id } = req.params;

    if (!side) {
       return res.redirect(`/cards/${id}?side=question`);
    }
    
    const name = req.cookies.username;
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = { text, id, side, name }

    if (side === 'question') {
        templateData.hint = hint;
        return res.render('card-front', templateData);
    } else {
        return res.render('card-back', templateData);
    }
    
    
});

router.get('/', (req, res) => {
    const length = cards.length;
    const randomCard = Math.floor(Math.random()*length);
    res.redirect(`/cards/${randomCard}`)
});

module.exports = router;