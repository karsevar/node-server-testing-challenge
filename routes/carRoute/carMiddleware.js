const carDb = require('./carModel.js')

function restricted(req, res, next) {
    if (req.session && req.session.user) {
        console.log('from the restricted middleware', req.session.user)
        next();
    } else {
        res.status(401).json({message: 'invalid credentials'})
    }
}

function attachUserId (req, res, next) {
    req.body.user_id = req.session.user.id
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