import request from 'supertest'
import app from '../src/app.js'

import * as assert from "node:assert";

describe('Server Integration Test', () => {
    describe('health check', () => {
        it('should return 200', async () => {
            const response = await request(app)
                .get("/health")
            assert.equal(200, response.status)
        });
    });
    describe('DB Migration test', () => {
        it('should return 200', async () => {
            const response = await request(app)
                .get("/migrate")
            assert.equal(200, response.status)
        });
    });

});