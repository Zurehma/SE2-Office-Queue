// Module to access the database

import sqlite3 from "sqlite3";

const dbUrl = process.env?.NODE_ENV === "test" ? "./db/db.db" : "./db/dbTest.db";

const db = new sqlite3.Database(dbUrl, (err) => {
  if (err) throw err;
});


export default db;
