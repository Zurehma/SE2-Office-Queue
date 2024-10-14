import request from "supertest";
import { app } from "../index.mjs";
import ServiceDAO from "../dao/serviceDAO.mjs";
import ServiceRoutes from "../routes/serviceRoutes.mjs";
import Utility from "../utilities.mjs";
import express from "express";
import {describe, expect, test, jest} from "@jest/globals";

jest.mock("../models/queue.mjs")
jest.mock("../dao/serviceDAO.mjs")

const baseURL = "/api/service";

describe("POST /ticket" , () => {
    let app;
    let mockServiceDAO;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use(Utility.errorHandler);
        const serviceRoutes = new ServiceRoutes();
        serviceRoutes.initRoutes();
        app.use(baseURL, serviceRoutes.getRouter());


    });

    beforeEach(() => {
        // Mock the serviceDAO methods directly
        mockServiceDAO = new ServiceDAO();

        jest.spyOn(mockServiceDAO, 'getServiceDetails');
        jest.spyOn(mockServiceDAO, 'getServicesForAllCounters');
        
        // Replace the real serviceDAO with the mock
        ServiceRoutes.prototype.serviceDAO = mockServiceDAO;
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    
    test ('POST /ticket', async () => {

        jest.spyOn(mockServiceDAO, 'getServiceDetails').mockResolvedValue({
            id: 1,
            name: 'Money Transfer',
            code: 'MT',
            averageTime: 15
        });

        const response = await request(app)
            .post(baseURL + '/ticket')
            .send({
            service: 'Money Transfer'
            });
    
        expect(mockServiceDAO.getServiceDetails).toHaveBeenCalledWith('money transfer')
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            ticket: "MT1",
            estimatedWaitTime: expect.any(Number),
          });
        });
    });



        


