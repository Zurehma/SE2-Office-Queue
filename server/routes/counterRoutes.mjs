// Module for the counter routes

import { Router } from "express";
import { check, body, param, query } from "express-validator";

import Utility from "../utilities.mjs";

import ServiceDAO from "../dao/serviceDAO.mjs";
import CounterDAO from "../dao/counterDAO.mjs";
import UserDAO from "../dao/userDAO.mjs";

function CounterRoutes() {
  this.router = Router();

  this.userDAO = new UserDAO();
  this.serviceDAO = new ServiceDAO();
  this.counterDAO = new CounterDAO();

  this.getRouter = () => this.router;

  this.initRoutes = () => {
    /**
     * Route to get the list of counter's id
     */
    this.router.get("", Utility.isLoggedIn, async (req, res, next) => {
      try {
        const counters = await this.counterDAO.getCounters();

        return res.status(200).json(counters);
      } catch (err) {
        return next(err);
      }
    });

    /**
     * Route to add a new counter-service configuration
     */
    this.router.post(
      "/configuration",
      Utility.isLoggedInAndAdmin,
      body().isArray(),
      body("*.counterID").isInt({ min: 0 }),
      body("*.serviceCodes").isArray(),
      body("*.serviceCodes.*").isString().notEmpty(),
      Utility.validateRequest,
      async (req, res, next) => {
        try {
          const configurations = req.body;
          const err = { errCode: 404, errMessage: "Counter id or service code not found!" };
          let services = {};

          for (let configuration of configurations) {
            const user = await this.userDAO.getUserById(configuration.counterID);

            if (user.error || user.role !== "manager") {
              throw err;
            }

            for (let serviceCode of configuration.serviceCodes) {
              let service = await this.serviceDAO.getServiceByCode(serviceCode);

              if (service === undefined) {
                throw err;
              }

              if (!services.hasOwnProperty(serviceCode)) {
                services[serviceCode] = service;
              }
            }
          }

          await this.counterDAO.deleteConfiguration();

          for (let configuration of configurations) {
            for (let serviceCode of configuration.serviceCodes) {
              await this.counterDAO.addConfiguration(configuration.counterID, services[serviceCode].id);
            }
          }

          return res.status(200).end();
        } catch (err) {
          return next(err);
        }
      }
    );

    /**
     * Route to reset the counter-service configuration
     */
    this.router.delete("/configuration", Utility.isLoggedInAndAdmin, async (req, res, next) => {
      try {
        await this.counterDAO.deleteConfiguration();

        return res.status(200).end();
      } catch (err) {
        return next(err);
      }
    });
  };
}

export default CounterRoutes;
