import request from "supertest";
import { app } from "../index.mjs";

const baseURL = "/api/service";

test ('POST /ticket', async () => {
    const response = await new request(app)
        .post(baseURL + '/ticket')
        .send({
        service: 'Money Transfer'
        });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
        ticket: "MT1",
        estimatedWaitTime: 7.5,
      });
    }
);
