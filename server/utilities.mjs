// Utilities module

import { validationResult } from "express-validator";

/**
 * Middleware to check if a user has logged in
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ error: "Not authenticated", status: 401 });
};

/**
 * Middleware to check if a user has logged in and is an admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isLoggedInAndAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }

  return res.status(401).json({ error: "Not authorized", status: 401 });
};

/**
 * Middleware to check if a user has logged in and is a manager
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isLoggedInAndManager = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "manager") {
    return next();
  }

  return res.status(401).json({ error: "Not authorized", status: 401 });
};

/**
 * Middleware to manage validation request errors
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  let errorMessage = "The parameters are not formatted properly\n\n";

  errors.array().forEach((error) => {
    errorMessage +=
      "- Value: **" +
      error.value +
      "** - Reason: **" +
      error.msg +
      "** - Location: **" +
      error.location +
      "*\n\n";
  });

  return res.status(422).json({ error: errorMessage, status: 422 });
};

/**
 *ƒ
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const errorHandler = (err, req, res, next) => {
  return res.status(err.errCode || 503).json({
    error: err.errMessage || "Internal Server Error",
    status: err.errCode || 503,
  });
};

/**
 *
 */
const Utility = {
  isLoggedIn,
  isLoggedInAndManager,
  isLoggedInAndAdmin,
  validateRequest,
  errorHandler,
};

export default Utility;
