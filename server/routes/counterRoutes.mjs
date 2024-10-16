// Module for the counter routes

import { Router } from "express";
import { check, body, param, query } from "express-validator";

import Utility from "../utilities.mjs";

import ServiceDAO from "../dao/serviceDAO.mjs";
import CounterDAO from "../dao/counterDAO.mjs";

function CounterRoutes() {
  this.router = Router();

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
    this.router.post("/configuration", Utility.isLoggedInAndAdmin, async (req, res, next) => {
      try {
      } catch (err) {
        return next(err);
      }
    });

    /**
     * Route to reset the counter-service configuration
     */
    this.router.delete("/configuration", Utility.isLoggedInAndAdmin, async (req, res, next) => {
      try {
        const changes = await this.counterDAO.deleteConfiguration();

        if (changes === 0) {
          const err = { errCode: 400, errMessage: "No configuration available!" };
          throw err;
        }

        return res.status(200);
      } catch (err) {
        return next(err);
      }
    });
  };
}

export default CounterRoutes;
