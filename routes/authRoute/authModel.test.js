const db = require('../../data/dbConfig.js');
const userDb = require('./authModel.js');

describe('authModel.js helper functions', () => {
    afterAll(async () => {
        await db('users').truncate();
    })

    describe('insert functionality', () => {
        it('should return id of newly created user', async () => {
            let users = await db('users');
            expect(users).toHaveLength(0);

            let user = await userDb.add({username: 'mason', password: 'mason'})
            expect(user).toBe(1)
        })

        it("should return id 2 for another newly created user", async () => {
            let user = await userDb.add({username: 'alice', password: 'alice'})
            console.log(user)
            expect(user).toBe(2)
        })
    })

    describe('findBy helper function', () => {
        it('should return object when provided the username', async () => {
            const username = 'mason'
            let user = await userDb.findBy({username})
            expect(user[0]).toEqual({id: 1, username: 'mason', password: 'mason'})
        })
    })
})