import {expect} from 'chai';
import request from 'supertest';
import app from '../index';

describe('Users API', function () {
    after(async () => {

    });
    it('should create a new user', async () => {
        const payload = {name: 'Alice', balance: 100}
        const res = await request(app)
            .post('/users')
            .send(payload);
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal(payload.name);
        expect(res.body.id).to.exist;
        expect(res.body.balance).to.equal(payload.balance);
    }).timeout(0);

    it('should retrieve user details', async () => {
        const payload = {name: 'bob', balance: 150}

        const createUserRes = await request(app)
            .post('/users/')
            .send(payload);

        const userId = createUserRes.body.id;

        const getUserRes = await request(app).get(`/users/${userId}`);

        expect(getUserRes.status).to.equal(200);
        expect(getUserRes.body.name).to.equal(payload.name);
        expect(getUserRes.body.balance).to.equal(payload.balance);
    }).timeout(0);
    it('should retrieve all user details', async () => {
        const getUserRes: request.Response = await request(app).get(`/users`);
        expect(getUserRes.status).to.equal(200);
        expect(getUserRes.body.length).to.be.greaterThan(0);
    }).timeout(0);

    // Add more test cases for edge cases, validation, etc.
});
