import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

let initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/get-crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/getUserById", homeController.getUserById);
  router.put("/update-crud", homeController.putCRUD);
  return app.use("/", router);
};

export { initWebRoute };
