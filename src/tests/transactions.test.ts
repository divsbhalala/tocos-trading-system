import {expect} from 'chai';
import request from 'supertest';
import app from '../index';
import {IUser} from "models/User";

let senderUser: request.Response;
let reciverUser: request.Response;
describe('Transactions API', function(){
    this.timeout(10000);
    before(async () => {
        // Create a user for testing
        this.timeout(10000)
        senderUser = await request(app)
            .post('/users/')
            .send({name: 'bob', balance: 150});

        reciverUser = await request(app)
            .post('/users')
            .send({name: 'Receiver', balance: 150});
    })

    it('should perform a valid transaction', async () => {
        const senderId = senderUser.body.id;
        const receiverId = reciverUser.body.id;

        const transactionRes = await request(app)
            .post('/transactions')
            .send({senderId, receiverId, amount: 50});

        expect(transactionRes.status).to.equal(200);
        expect(transactionRes.body.message).to.equal('Transaction successful');

        // Check sender's updated balance
        const updatedSenderRes = await request(app).get(`/users/${senderId}`);
        expect(updatedSenderRes.status).to.equal(200);
        expect(updatedSenderRes.body.balance).to.equal(senderUser.body.balance - 50);
        senderUser = updatedSenderRes;

        // Check receiver's updated balance
        const updatedReceiverRes = await request(app).get(`/users/${receiverId}`);
        expect(updatedReceiverRes.status).to.equal(200);
        expect(updatedReceiverRes.body.balance).to.equal(reciverUser.body.balance + 50);
        reciverUser = updatedReceiverRes;

    }).timeout(0)

    it('should throw a insufficient transaction', async () => {
        const senderId = senderUser.body.id;
        const receiverId = reciverUser.body.id;

        const transactionRes = await request(app)
            .post('/transactions')
            .send({senderId, receiverId, amount: 150});
        expect(transactionRes.status).to.equal(200);
        expect(transactionRes.body.error).to.equal('Insufficient balance');
    }).timeout(0)
    it('should retrieve all transaction', async () => {
        const transactionRes = await request(app)
            .get('/transactions')
        expect(transactionRes.status).to.equal(200);
        expect(transactionRes.body.length).to.be.greaterThan(0);
    }).timeout(0)
    // Add more test cases for edge cases, validation, etc.
});
