import express from "express";

const router = express.Router();

let initWebRoute = (app) => {
  app.get("/", (req, res) => {
    return res.send("Hello Huy");
  });
  return app.use("/", router);
};

export { initWebRoute };
