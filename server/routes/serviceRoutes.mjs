// Module for the authentication routes

import { Router } from "express";
import { check, body, param, query } from "express-validator";
import dayjs from "dayjs";

import Utility from "../utilities.mjs";

import ServiceDAO from "../dao/serviceDAO.mjs";
import QueueManager from "../models/queue.mjs";

/**
 *
 */
function ServiceRoutes() {
  this.router = Router();

  this.queueManager = new QueueManager();
  this.serviceDAO = new ServiceDAO();

  this.queueManager.init();

  this.getRouter = () => this.router;

  this.initRoutes = () => {
    /**
     * Route to call the next customer in the queue of one of the services provided by the counterID provided in the body of the request
     */
    this.router.post(
      "/ticket/next",
      Utility.isLoggedInAndManager,
      body("counterID").isInt({ gt: 0 }),
      body("date").isISO8601({ strict: true }),
      Utility.validateRequest,
      async (req, res, next) => {
        try {
          if (dayjs().isBefore(req.body.date)) {
            const err = { errCode: 400, errMessage: "Invalid date!" };
            throw err;
          }

          const services = await this.serviceDAO.getServicesPerCounter(req.body.counterID);

          if (services.length === 0) {
            const err = { errCode: 404, errMessage: "The counter does not exist!" };
            throw err;
          }

          const maxQueueLength = Math.max(
            ...[...services].map((service) => this.queueManager.length(service.code))
          );
          services.filter((service) => this.queueManager.length(service.code) === maxQueueLength);
          const minAverageTime = Math.min(...[...services].map((service) => service.averageTime));
          const service = services.find((service) => service.averageTime === minAverageTime);
          const ticket = this.queueManager.dequeue(service.code);

          if (ticket === undefined) {
            const err = { errCode: 400, errMessage: "The queues are empty!" };
            throw err;
          }

          await this.serviceDAO.addServedCustomer(req.body.counterID, service.id, req.user.id, req.body.date);

          return res
            .status(200)
            .json({ serviceCode: service.code, ticket: ticket, counterID: req.body.counterID });
        } catch (err) {
          return next(err);
        }
      }
    );

    /**
     * Route to get the list of services available
     */
    this.router.get("", async (req, res, next) => {
      try {
        const services = await this.serviceDAO.getServices();

        return res.status(200).json({ services: services });
      } catch (err) {
        return next(err);
      }
    });

    /**
     * Route to get the list of counter's id
     */
    this.router.get("/counters", Utility.isLoggedIn, async (req, res, next) => {
      try {
        const counters = await this.serviceDAO.getCounters();

        return res.status(200).json({ counters: counters });
      } catch (err) {
        return next(err);
      }
    });

    //Route for user to get new ticket
    this.router.post(
      "/ticket",
      [check("service").isString().notEmpty(), Utility.validateRequest],
      async (req, res, next) => {
        try {
          const service = req.body.service.toLowerCase();
          const serviceCode = await this.serviceDAO.getServiceCode(service);
          if (serviceCode === undefined) {
            const error = { errCode: 400, errMessage: "Invalid service!" };
            throw error;
          }
          const ticket = this.queueManager.enqueue(serviceCode);
          return res.status(200).json({ ticket: ticket });
        } catch (err) {
          return next(err);
        }
      }
    );

    //Route for manager or admin to clear queues
    this.router.delete("/resetQueues", Utility.isLoggedInAndAdmin, async (req, res) => {
      this.queueManager.reset();
      return res.status(200).json({ message: "Queues cleared" });
    });
  };
}

export default ServiceRoutes;
