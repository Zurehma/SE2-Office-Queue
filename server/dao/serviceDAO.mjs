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

function ServiceDAO() {
  this.getServices = getServices;
  this.getServicesPerCounter = getServicesPerCounter;
}

export default ServiceDAO;
