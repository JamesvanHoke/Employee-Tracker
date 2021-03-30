const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db",
});

connection.connect();

// turns our connection query into a promise
connection.query = util.promisify(connection.query);

module.exports = connection;
