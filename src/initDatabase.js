// src/initDatabase.js
const AppDataSource = require("./data-source");

const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = initializeDatabase;
