const express = require('express');

const carDb = require('./carModel.js');
const middleware = require('./carMiddleware.js')

const router = express.Router();

router.post('/', middleware.restricted, 
            middleware.attachUserId, 
            middleware.attachMake, 
            middleware.attachModel, 
            (req, res) => {
    carDb.postCar(req.body)
                .then(results => {
                    res.status(200).json(results)
                })
                .catch(error => {
                    res.status(500).json(error)
                })
});

router.delete('/:id', middleware.restricted, (req, res) => {
    carDb.deleteCar(req.params.id)
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = router;