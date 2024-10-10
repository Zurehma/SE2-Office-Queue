// Module for the service's Data Access Object (DAO)

import db from "../db/db.mjs";
import Service from "../models/service.mjs";

/**
 *
 * @param {*} rows
 * @returns
 */
const mapRowsToService = (rows) => {
  return rows.map((row) => new Service(row.name, row.code, row.averageTime));
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
      "SELECT name, averageTime, code FROM services s, servicesPerCounter sc WHERE s.serviceId == sc.serviceId AND sc.counterId = ?";

    db.all(query, [counterID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(mapRowsToService(rows));
      }
    });
  });
};

const getServiceCode = (serviceName) =>{
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
}

function ServiceDAO() {
  this.getServices = getServices;
  this.getServicesPerCounter = getServicesPerCounter;
  this.getServiceCode = getServiceCode;
}

export default ServiceDAO;
