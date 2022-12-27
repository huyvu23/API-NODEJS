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
  let id = req.body.id;

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
    user: users,
  });
};

module.exports = {
  handleLogin: handleLogin,
  getAllUsers: getAllUsers,
};
