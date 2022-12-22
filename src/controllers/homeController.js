import db from "../models";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    return res.send("Hello from controller");
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = async (req, res) => {
  try {
    let listUsers = await CRUDService.getAllUsers();
    console.log("data:", listUsers);
  } catch (error) {
    console.log(error);
  }
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
