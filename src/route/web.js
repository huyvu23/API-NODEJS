import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

let initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/get-crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  return app.use("/", router);
};

export { initWebRoute };
