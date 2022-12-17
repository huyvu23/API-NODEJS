import express from "express";
import { getHomePage } from "../controllers/homeController";
const router = express.Router();

let initWebRoute = (app) => {
  app.get("/", getHomePage);
  return app.use("/", router);
};

export { initWebRoute };
