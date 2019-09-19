const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server.js root route', () => {
    it('should return an ok status code from the index route', async () => {
        const response = await request(server).get('/');
        console.log(response.text)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({message: 'server base route is working!'})
    })
    it('should return a response object of {message: "server base route is working!"}', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({message: 'server base route is working!'})
    })
})

describe('authRoute.js', () => {
    afterAll(async () => {
        await db('cars').truncate();
        await db('users').truncate();

    });


    describe('POST /auth/register', () => {
        it('should return id number of newly created user', async () => {
            const response = await request(server).post('/auth/register').send({username: 'mason', password: 'mason'})
            expect(response.body).toEqual(1)
        })
        it('should return a 201 ok status code if given unique username', async () => {
            const response = await request(server).post('/auth/register').send({username: 'alice', password: 'alice'})
            expect(response.status).toBe(201); 
        })
        it('should return a 500 status code if not given a unique username', async () => {
            const response = await request(server).post('/auth/register').send({username: 'alice', password: 'alice'})
            expect(response.status).toBe(500); 
        })
    })

    // describe('POST /auth/login', () => {
    //     it('should return status 200 ok if given validate user credentials', async () => {
    //         const response = await request(server).post('/auth/login').send({username: 'alice', password: 'alice'})
    //         expect(response.status).toBe(200)
    //     })
    // })
    describe('carsRoute.js', () => {
        describe('POST /cars', () => {
            it('should display status code 200 ok', async () => {
                const response = await request(server).post('/cars').send({
                    "user_id": 1,
                    "make_id": "Ford",
                    "model_id": "Fleetwood",
                    "vin": "1297449jdad",
                    "status": "salvage",
                    "mileage": 120000
                })
                expect(response.status).toBe(200);
            })
            it('should return the id of the newly inserted record', async () => {
                const response = await request(server).post('/cars').send({
                    "user_id": 2,
                    "make_id": "Ford",
                    "model_id": "Fleetwood",
                    "vin": "1297449jdadd",
                    "status": "salvage",
                    "mileage": 120000
                })
                expect(response.body[0]).toBe(2);
            })
        })

        describe('DELETE /cars/:id', () => {
            it('should display 1 if a record was deleted', async () => {
                const response = await request(server).delete('/cars/2')
                expect(response.body).toEqual(1)
            })
            it('should display 0 if a record has not been deleted', async () => {
                const response = await request(server).delete('/cars/2')
                expect(response.body).toEqual(0)
            })
        })
    })
})


// describe("post new", () => {
//     afterAll(async () => {
//                 await db('users').truncate();
//             });

//     it('should return status 200 ok if given validate user credentials', async () => {
//         const response = await request(server).post('/auth/register').send({username: 'alice', password: 'alice'})
//         const response2 = await request(server).post('/auth/login').send({username: 'alice', password: 'alice'})
//         expect(response2.status).toBe(200)
//     })
// })
