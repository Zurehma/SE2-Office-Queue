// Module for the authentication routes

import { Router } from "express";
import { check } from "express-validator";

import Utility from "../utilities.mjs";

import ServiceDAO from "../dao/serviceDAO.mjs";

/**
 *
 */
function ServiceRoutes() {
  this.router = Router();

  this.getRouter = () => this.router;

  this.initRoutes = () => {};
}

export default ServiceRoutes;
