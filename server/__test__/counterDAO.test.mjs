import {describe, expect, test, jest} from "@jest/globals";
// import { cleanup } from "../db/cleanup.mjs";
import CounterDAO from "../dao/counterDAO.mjs";
import request from 'supertest'
import { app } from "../index.mjs";

const routePath = "/api";

beforeEach(async() => {
    jest.clearAllMocks();
});

const testUserLogin = async (username, password) => {
    const res = await request(app)
        .post("/api/sessions/login")
        .send({ username: username, password: password })
        .expect(200);
    return res;
};

const authCookie = (res) => {
    return res.headers["set-cookie"][0];
};


describe("GET /api/counter", () => {
    test("should retrieve all the counters id", async () => {
        await request(app)
        .get(`${routePath}/counter`)
        .set("Cookie", authCookie(await testUserLogin("manager1", "manager@123")))
        .expect(200)
        .then((response) => {
            const expected = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
            expect(response.body).toEqual(expected);
        })
    });

});

describe("DELETE /api/counter/configuration", () => {
    test("should delete all from counterPerService table", async () => {
        await request(app)
        .delete(`${routePath}/counter/configuration`)
        .set("Cookie", authCookie(await testUserLogin("admin", "admin@123")))
        .expect(200);
    });
});