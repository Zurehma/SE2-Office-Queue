// Module for the authentication routes

import { Router } from "express";
import { check } from "express-validator";

import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

import Utility from "../utilities.mjs";

import UserDAO from "../dao/userDAO.mjs";

/**
 *
 * @param {*} app
 */
function AuthRoutes(app) {
  this.router = Router();
  this.app = app;

  this.getRouter = () => this.router;

  this.initRoutes = () => {};
}

export default AuthRoutes;
