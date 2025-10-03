import request from "supertest";
import app from "../backend/src/app";

describe("GET /api/data/nearby", () => {
  it("responds with data (demo mode)", async () => {
    const res = await request(app).get("/api/data/nearby?lat=32.7&lng=-96.8&radiusKm=5");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});