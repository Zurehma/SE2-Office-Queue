// Module for the service routes

import { Router } from "express";
import { check, body, param, query } from "express-validator";
import dayjs from "dayjs";

import Utility from "../utilities.mjs";

import ServiceDAO from "../dao/serviceDAO.mjs";
import QueueManager from "../models/queue.mjs";
import CounterDAO from "../dao/counterDAO.mjs";

const calculateEstimatedWaitTime = async (queueLength, serviceDetails, counterServicesMapped) => {
  let sum = 0;
  Object.keys(counterServicesMapped).forEach((counterId) => {
    const services = counterServicesMapped[counterId];
    const canServe = services.includes(serviceDetails.id);
    if (canServe) {
      const k_i = services.length;
      sum += 1 / k_i;
    }
  });

  const estimatedWaitTime = serviceDetails.averageTime * (queueLength / sum + 1 / 2);
  return estimatedWaitTime;
};

/**
 *
 */
function ServiceRoutes() {
  this.router = Router();

  this.queueManager = new QueueManager();
  this.serviceDAO = new ServiceDAO();
  this.counterDAO = new CounterDAO();

  this.queueManager.init();

  this.getRouter = () => this.router;

  this.initRoutes = () => {
    /**
     * Route to call the next customer in the queue of one of the services provided by the counterID provided in the body of the request
     */
    this.router.post(
      "/ticket/next",
      Utility.isLoggedInAndManager,
      body("date").isISO8601({ strict: true }),
      Utility.validateRequest,
      async (req, res, next) => {
        try {
          if (dayjs().isBefore(req.body.date)) {
            const err = { errCode: 400, errMessage: "Invalid date!" };
            throw err;
          }

          let services = await this.counterDAO.getConfiguration(req.user.id);

          if (services.length === 0) {
            const err = { errCode: 404, errMessage: "The counter does not exist!" };
            throw err;
          }

          const maxQueueLength = Math.max(
            ...[...services].map((service) => this.queueManager.length(service.code))
          );
          services = [...services].filter(
            (service) => this.queueManager.length(service.code) === maxQueueLength
          );
          const minAverageTime = Math.min(...[...services].map((service) => service.averageTime));
          const service = services.find((service) => service.averageTime === minAverageTime);
          const ticket = this.queueManager.dequeue(service.code);

          if (ticket === undefined) {
            const err = { errCode: 400, errMessage: "The queues are empty!" };
            throw err;
          }

          await this.serviceDAO.addServedCustomer(req.user.id, service.id, req.body.date);

          return res.status(200).json({ serviceID: service.id, ticket: ticket });
        } catch (err) {
          return next(err);
        }
      }
    );

    /* 
      Route for user to get new ticket
    */
    this.router.post(
      "/ticket",
      [body("service").isString().notEmpty(), Utility.validateRequest],
      async (req, res, next) => {
        try {
          const serviceName = req.body.service.toLowerCase();
          const serviceDetails = await this.serviceDAO.getServiceDetails(serviceName);
          
          if (serviceDetails === undefined) {
            const err = { errCode: 400, errMessage: "Service not found" };
            throw err;
          }

          const serviceCode = serviceDetails.code;
          const queueLength = this.queueManager.length(serviceCode);

          const allServices = await this.serviceDAO.getServicesForAllCounters();
          const counterServicesMapped = {};
          allServices.forEach((service) => {
            const { counterId, serviceId } = service;
            if (counterServicesMapped[counterId] === undefined) {
              counterServicesMapped[counterId] = [];
            }
            counterServicesMapped[counterId].push(serviceId);
          });

          const ticket = this.queueManager.enqueue(serviceCode);
          const estimatedWaitTime = await calculateEstimatedWaitTime(
            queueLength,
            serviceDetails,
            counterServicesMapped
          );

          return res.status(200).json({ ticket: ticket, estimatedWaitTime: estimatedWaitTime });
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

        return res.status(200).json(services);
      } catch (err) {
        return next(err);
      }
    });

    /**
     * Route to get the list of services of the currently logged manager
     */
    this.router.get("/manager", async (req, res, next) => {
      try {
        const services = await this.serviceDAO.getServicesPerCounter(req.user.id);

        return res.status.json(services);
      } catch (err) {
        return next(err);
      }
    });

    //Route for manager or admin to clear queues
    this.router.delete("/resetQueues", Utility.isLoggedIn, async (req, res) => {
      this.queueManager.reset();
      return res.status(200).json({ message: "Queues cleared" });
    });
  };
}

export default ServiceRoutes;
