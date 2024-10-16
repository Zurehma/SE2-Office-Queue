import request from "supertest";
import { app } from "../index.mjs";
import ServiceDAO from "../dao/serviceDAO.mjs";
import ServiceRoutes from "../routes/serviceRoutes.mjs";
import QueueManager from "../models/queue.mjs";
import Utility from "../utilities.mjs";
import {describe, expect, test, jest} from "@jest/globals";

jest.mock("../models/queue.mjs")
jest.mock("../dao/serviceDAO.mjs")

const baseURL = "/api/service";

describe("POST /ticket" , () => {
    let mockServiceDAO;

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

    test ('It should return 200 status code, ticket number and estimated wait time ', async () => {

        jest.mock('express-validator', () => ({
            body: jest.fn.mockImplementation(() => ({
                isString: () => ({ notEmpty: () => ({}) })
            }))
        }));
        jest.spyOn(Utility, 'validateRequest').mockImplementation((req, res, next) => next());

        mockServiceDAO.getServiceDetails.mockResolvedValue({
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
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            ticket: "MT1",
            estimatedWaitTime: expect.any(Number),
          });
        });

        test('It should return 400 status code if service is not valid', async () => {

            jest.mock('express-validator', () => ({
                body: jest.fn.mockImplementation(() => ({
                    isString: () => ({ notEmpty: () => ({}) })
                }))
            }));
            jest.spyOn(Utility, 'validateRequest').mockImplementation((req, res, next) => next());

            mockServiceDAO.getServiceDetails.mockResolvedValue(undefined);

            const response = await request(app)
                .post(baseURL + '/ticket')
                .send({
                    service: 'Invalid Service Name'
            });

            expect(response.statusCode).toBe(400);
        });

        test('It should return 422 status code if service is not provided', async () => {

            const response = await request(app)
                .post(baseURL + '/ticket')
                .send({});
            
            expect(response.statusCode).toBe(422);
        });
            


    });








        


