const carDb = require('./carModel.js');
const jwt = require('jsonwebtoken')

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JSON_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'You shall not pass'})
            } else {
                req.user = {username: decodedToken.username, id: decodedToken.subject}
                next();
            }
        })
    } else {
        res.status(401).json({message: 'invalid credentials'})
    }
}

function attachUserId (req, res, next) {
    req.body.user_id = req.user.id
    next();
}

function attachMake (req, res, next) {
    const make = req.body.make_id
    carDb.findByMake({make})
        .first()
        .then(results => {
            req.body.make_id = results.id
            next();
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

function attachModel (req, res, next) {
    const model = req.body.model_id;
    carDb.findByModel({model})
        .first()
        .then(results => {
            req.body.model_id = results.id
            next();
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

module.exports = {
    restricted,
    attachUserId,
    attachMake,
    attachModel
}