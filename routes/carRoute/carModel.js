const db = require('../../data/dbConfig.js');

function findByModel(model) {
    return db('models').where(model).select('id') 
}

function findByMake(make) {
    return db('makes').where(make)
}

function postCar(car) {
    return db('cars').insert(car)
}

function deleteCar(id) {
    return db('cars').where({id}).del()
}

module.exports = {
    findByModel,
    findByMake,
    postCar, 
    deleteCar
}