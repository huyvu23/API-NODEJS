import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

const router = express.Router();

let initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/get-crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/getUserById", homeController.getUserById);
  router.put("/update-crud", homeController.putCRUD);
  router.delete("/delete-crud", homeController.deleteId);
  // ====================================================
  router.post("/api/login", userController.handleLogin);
  router.get("/api/getAllUsers", userController.getAllUsers);
  router.post("/api/createUser", userController.createNewUser);
  return app.use("/", router);
};

export { initWebRoute };
