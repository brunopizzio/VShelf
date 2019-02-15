const express = require('express');
const Book = require('../models//index');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.send({ book });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed'});
    }
});

module.exports = app => app.use('/auth', router);