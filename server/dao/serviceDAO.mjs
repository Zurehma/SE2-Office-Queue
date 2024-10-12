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
 * @returns
 */
const getServicesPerCounter = (counterID) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT s.id, name, averageTime, code FROM services s, servicesPerCounter sc WHERE s.id == sc.serviceId AND sc.counterId = ?";

    db.all(query, [counterID], (err, rows) => {
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
 * @returns
 */
const getCounters = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id FROM users WHERE role == 'manager'";

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const addServedCustomer = (counterID, serviceID, officer, date) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO served (counterId, serviceId, officer, date) VALUES (?, ?, ?, ?)";

    db.run(query, [counterID, serviceID, officer, date], function (err) {
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

function ServiceDAO() {
  this.getServices = getServices;
  this.getCounters = getCounters;
  this.getServicesPerCounter = getServicesPerCounter;
  this.addServedCustomer = addServedCustomer;
  this.getServiceCode = getServiceCode;
}

export default ServiceDAO;
