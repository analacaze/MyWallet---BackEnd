const request = require('supertest');
const app = require('../src/app');
const bd = require('../src/database');

beforeEach(async () => {
    await bd.query('DELETE FROM users');
});

afterAll(async () => {
    await bd.query('DELETE FROM users');
    bd.end();
});

describe('POST /api/users/sign-up', () => {
    it('should respond with http status 201 for valid input objects', async () => {
        const body = { name: 'ana', email: 'ana@gmail.com', password: '123456' , passwordConfirmation: '123456'};
        const res = await request(app).post('/api/users/sign-up').send(body);
        expect(res.status).toBe(201);
    });

    it('should respond with http status 422 for invalid input objects', async () => {
        const body = { name: 'ana', email: 'ana@gmail.com', password: '123456' , passwordConfirmation: 'a'};
        const res = await request(app).post('/api/users/sign-up').send(body);    
        expect(res.status).toBe(422);
    });


    it('should respond with http status 409 for invalid input objects', async () => {
        const body = { name: 'ana', email: 'ana@gmail.com', password: '123456' , passwordConfirmation: '123456'};
        await bd.query(`INSERT INTO users (name, email, password) VALUES ('ana','ana@gmail.com','123456')`);
        const res = await request(app).post('/api/users/sign-up').send(body);    
        expect(res.status).toBe(409);
    });
});

describe('POST /api/users/sign-in', () => {
    it('should respond with http status 201 for valid input objects', async () => {
        const body = { email: 'ana@gmail.com', password: '123456' };
        await bd.query(`INSERT INTO users (name, email, password) VALUES ('ana','ana@gmail.com','123456')`);
        const res = await request(app).post('/api/users/sign-in').send(body);
        expect(res.status).toBe(201);
    });

    it('should respond with http status 422 for invalid input objects', async () => {
        const body = { email: 'ana', password: '123456' };
        const res = await request(app).post('/api/users/sign-in').send(body);    
        expect(res.status).toBe(422);
    });

    it('should respond with http status 401 for valid input objects', async () => {
        const body = { email: 'maria@gmail.com', password: '123456' };
        const res = await request(app).post('/api/users/sign-in').send(body);
        expect(res.status).toBe(401);
    });
});