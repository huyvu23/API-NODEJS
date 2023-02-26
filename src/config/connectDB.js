const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("LearnSequelize", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  define: {
    timestamps: false,
  },
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDB };
