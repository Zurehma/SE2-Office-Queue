// Module for the authentication routes

import { Router } from "express";
import { check, body, param, query } from "express-validator";

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
    this.router.post(
      "/ticket/dequeue",
      body("counterId").isString().notEmpty(),
      Utility.validateRequest,
      async (req, res, next) => {
        try {
          const services = await this.serviceDAO.getServicesPerCounter(req.counterId);
          const maxQueueLength = Math.max(
            ...[...services].map((service) => this.queueManager[service.code].length())
          );
          services.filter((service) => this.queueManager[service.code].length === maxQueueLength);
          const minAverageTime = Math.min(...[...services].map((service) => service.averageTime));
          const service = services.find((service) => service.averageTime === minAverageTime);
          const ticket = this.queueManager.dequeue(service.code);

          if (ticket === undefined) {
            const err = { errCode: 400, errMessage: "The queues are empty!" };
            throw err;
          }

          return res.status(200).json({ serviceCode: service.code, ticket: ticket, counterId: counterId });
        } catch (err) {
          return next(err);
        }
      }
    );
  };
}

export default ServiceRoutes;
