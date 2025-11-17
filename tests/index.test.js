const request = require('supertest');
const app = require('../index');

describe('Express App Tests', () => {

    test('GET / should return HTML with greeting', async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Hello from Express');
        expect(res.text).toContain('<a href="/health">/health</a>');
    });

    test('GET /health should return status JSON', async () => {
        const res = await request(app).get('/health');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('uptime');
        expect(res.body).toHaveProperty('timestamp');

        expect(typeof res.body.uptime).toBe('number');
        expect(typeof res.body.timestamp).toBe('number');
    });
});