// Module for the counter's Data Access Object (DAO)

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

/**
 *
 * @param {*} counterID
 * @returns
 */
const getConfiguration = (counterID) => {
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
 * @returns
 */
const addConfiguration = (counterID, serviceID) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO servicesPerCounter (counterId, serviceId) VALUES (?, ?)";

    db.run(query, [counterID, serviceID], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

/**
 *
 * @returns
 */
const deleteConfiguration = () => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM servicesPerCounter";

    db.run(query, [], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

function CounterDAO() {
  this.getCounters = getCounters;
  this.getConfiguration = getConfiguration;
  this.addConfiguration = addConfiguration;
  this.deleteConfiguration = deleteConfiguration;
}

export default CounterDAO;
