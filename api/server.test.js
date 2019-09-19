const request = require('supertest');
const server = require('./server.js');

describe('server.js root route', () => {
    it('should return an ok status code from the index route', async () => {
        const response = await request(server).get('/');
        console.log(response.text)
        expect(response.status).toEqual(201)
        expect(response.text).toHaveLength(43)
    })
})