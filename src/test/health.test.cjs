// health.test.cjs
const request = require('supertest');
const { app } = require('../index.js');

describe("GET /api/v1/health", () => {
  it("should return Server is up", async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({ status: "Server is up" });
  });
});
