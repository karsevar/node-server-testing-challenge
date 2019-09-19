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

    describe('POST /auth/login', () => {
        it('should return status 200 ok if given validate user credentials', async () => {
            const response = await request(server).post('/auth/login').send({username: 'alice', password: 'alice'})
            expect(response.status).toBe(200)
        })
    })
})