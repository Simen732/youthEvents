const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "simen",
    password: "Blakstad12",
    database: "youthmeet",
    multipleStatements: true,
    queueLimit: 5000,
    waitForConnections: true,
    connectionLimit: 10
});



module.exports = db