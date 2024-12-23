// src/data-source.js
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // Replace with your PostgreSQL username
  password: "123321" ,// Replace with your PostgreSQL password
  database: "products",
  synchronize: true, // Auto-sync entities with the database; disable in production
  entities: [require("./entities/Product")],
});

module.exports = AppDataSource;
