// Module for the service's Data Access Object (DAO)

import db from "../db/db.mjs";
import Service from "../models/service.mjs";

/**
 *
 * @param {*} rows
 * @returns
 */
const mapRowsToService = (rows) => {
  return rows.map((row) => new Service(row.id, row.name, row.code, row.averageTime));
};

/**
 *
 * @returns
 */
const getServices = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM services";

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(mapRowsToService(rows));
      }
    });
  });
};

/**
 *
 * @param {*} counterID
 * @param {*} serviceID
 * @param {*} officer
 * @param {*} date
 * @returns
 */
const addServedCustomer = (counterID, serviceID, date) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO served (counterId, serviceId, date) VALUES (?, ?, ?)";

    db.run(query, [counterID, serviceID, date], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

const getServiceCode = (serviceName) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT code FROM services WHERE LOWER(name) = ?";
    db.get(query, [serviceName], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.code);
      }
    });
  });
};

const getServiceDetails = (serviceName) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM services WHERE LOWER(name) = ?";
    db.get(query, [serviceName], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        resolve(undefined);
      } else {
        resolve(mapRowsToService([row])[0]);
      }
    });
  });
};

//for each counter, get the services that are available
const getServicesForAllCounters = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM servicesPerCounter";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function ServiceDAO() {
  this.getServices = getServices;
  this.addServedCustomer = addServedCustomer;
  this.getServiceCode = getServiceCode;
  this.getServiceDetails = getServiceDetails;
  this.getServicesForAllCounters = getServicesForAllCounters;
}

export default ServiceDAO;
