const express = require('express');
const bcrypt = require('bcryptjs');

const userDb = require('./authModel.js');

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    userDb.add(user) 
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

module.exports = router;