import userService from "../services/userService";

const handleLogin = async (req, res) => {
  let { email = "", password = "" } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let getAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing id",
    });
  }

  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users: users,
  });
};

let createNewUser = async (req, res) => {
  let {
    email = "",
    password = "",
    firstName = "",
    lastName = "",
    address = "",
    phoneNumber = "",
    gender = "",
    roleId = "",
  } = req.body;
  if (!email || !password || !firstName || !lastName || !address) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }

  let message = await userService.createUser(req.body);
  return res.status(200).json({
    message,
  });
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;

  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing parameter",
    });
  }
  let message = await userService.deleteUserById(id);

  return res.status(200).json({
    message,
  });
};

module.exports = {
  handleLogin: handleLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
