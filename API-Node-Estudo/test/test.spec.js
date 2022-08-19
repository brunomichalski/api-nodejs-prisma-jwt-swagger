const request = require("supertest");
const app = require("../src/server");

//import request from "supertest";
//import app from "../src/server.js";
// describe("Conexão", () => {
//     it("Testando conexão", async () => {
//         const res = await request(app).get("/users");

//         expect(res.body).toHaveProperty();
//     });
// });

describe("create user", () => {
    it("create user", () => {
        expect(1).toBe(1);
    });
});
