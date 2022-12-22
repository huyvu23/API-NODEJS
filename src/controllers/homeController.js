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

let getUserById = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let user = await CRUDService.getUserInfoById(id);
    console.log("Found a user:", user);
  } else {
    console.log("cannot found user ");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  if (data) {
    let message = await CRUDService.editUser(data);
    console.log(message);
  } else {
    console.log("Cannot update !");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getUserById: getUserById,
  putCRUD: putCRUD,
};
