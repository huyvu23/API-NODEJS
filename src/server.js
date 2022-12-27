import express from "express";
//  cái này để lấy tất cả những gì mà client gửi về
import bodyParser from "body-parser";
import { configViewEngine } from "./config/viewEngine";
import { initWebRoute } from "./route/web";

// Tác dụng của câu này là để sử dụng process.env
require("dotenv").config();
import { connectDB } from "./config/connectDB";

const app = express();
const cors = require("cors");
const whitelist = [process.env.REACT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configApp
configViewEngine(app);
initWebRoute(app);

connectDB();

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("BACKEND NODEJS is running on the PORT:" + PORT);
});
