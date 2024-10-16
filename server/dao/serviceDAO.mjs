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
 * Get all the services in the database
 * @returns {Promise<Service[]>} A promise that resolves to an array of **Service** object
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
 * Get the service in the database represented by the given service code
 * @param {String} serviceCode
 * @returns {Promise<Service>} A promise that resolves to a **Service** object
 */
const getServiceByCode = (serviceCode) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM services WHERE code = ?";

    db.get(query, [serviceCode], (err, row) => {
      if (err) {
        reject(err);
      } else if (row == undefined) {
        resolve(undefined);
      } else {
        resolve(mapRowsToService([row])[0]);
      }
    });
  });
};

/**
 * Add a new served customer to the database with the provided information
 * @param {Number} counterID
 * @param {Number} serviceID
 * @param {String} date
 * @returns {Promise<Number>} A promise that resolves to an integer that represent the number of lines changed in the database
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
  this.getServiceByCode = getServiceByCode;
  this.addServedCustomer = addServedCustomer;
  this.getServiceDetails = getServiceDetails;
  this.getServicesForAllCounters = getServicesForAllCounters;
}

export default ServiceDAO;
