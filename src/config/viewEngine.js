import express from "express";
let configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  //   khai báo sử dụng View engine nào
  app.set("view engine", "ejs");

  app.set("views", "./src/views");
};

export { configViewEngine };
