import mysql from "mysql";

const db = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "task_module",
});
export default db;
