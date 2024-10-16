import ServiceDAO from "../dao/serviceDAO.mjs";
import db from "../db/db";
import Service from "../models/service.mjs";
import {describe, expect, test, jest} from "@jest/globals";

jest.mock("../db/db");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("ServiceDAO tests", () => {
    const serviceDAO = new ServiceDAO();
    const mockDbGet = jest.spyOn(db, "get");
    const mockDbAll = jest.spyOn(db, "all");
    const mockDbRun = jest.spyOn(db, "run");

    const testService = new Service(1, "Test Service", "TS", 10);

    test("getServiceDetails", async () => {
        mockDbGet.mockImplementation((query, params, callback) => {
            callback(null, testService);
        });

        const serviceDetails = await serviceDAO.getServiceDetails("Test Service");
        expect(mockDbGet).toHaveBeenCalled();
        expect(serviceDetails).toEqual(testService);

    });

    test("getServicesForAllCounters", async () => {
        mockDbAll.mockImplementation((query, params, callback) => {
            callback(null, [testService]);
        });

        const services = await serviceDAO.getServicesForAllCounters();
        expect(mockDbAll).toHaveBeenCalled();
        expect(services).toEqual([testService]);
    });
});

