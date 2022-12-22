import db from "../models";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    return res.send("Hello from controller");
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = (req, res) => {
  return res.send("Hello CRUD");
};

let postCRUD = async (req, res) => {
  try {
    let message = await CRUDService.createNewUser(req.body);
    console.log("postMessage:", message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};

// how fix "Unknown column 'createdAt' in 'field list'" in nodejs ?
