const db = require('../../data/dbConfig.js');
const carsDb = require('./carModel.js');
const usersDb = require('../authRoute/authModel');

describe('carModel.js helper functions', () => {
    afterAll(async () => {
        await db('cars').truncate();
        await db('users').truncate();
    })

    describe('insert functionality for the cars table', async () => {
        it('should return id of newly created record', async () => {
            usersDb.add({username: 'mason', password: 'mason'})
            let cars = await db('cars');
            expect(cars).toHaveLength(0);

            let car = await carsDb.postCar({
                make_id: 1,
                model_id: 1,
                user_id: 1,
                vin: 'dkadfed8473',
                status: 'salvage',
                mileage: 120000
            })
            expect(car[0]).toBe(1);
        });

        it('should save the car object onto the database', async () => {
            let cars = await db('cars');
            expect(cars).toHaveLength(1);

            let [id] = await carsDb.postCar({
                make_id: 1,
                model_id: 2,
                user_id: 1,
                vin: 'dkadfed847334',
                status: 'salvage',
                mileage: 120000
            })
            const car = await db('cars').where({id}).first()
            expect(car).toEqual({
                id: 2,
                make_id: 1,
                model_id: 2,
                user_id: 1,
                vin: 'dkadfed847334',
                status: 'salvage',
                mileage: 120000,
                transmission: 'automatic'
            })
        });

    })

    describe('delete functionality', () => {
        it ('should delete a record in cars table', async () => {
            const result = await carsDb.deleteCar(1);
            expect(result).toBe(1);
        })
        it ('should decrease the number of entries by one', async () => {
            const cars = await db('cars')
            expect(cars).toHaveLength(1)
        })
    })
})