var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
import db from "../models";

let createNewUser = async (data) => {
  return new Promise(async (resole, reject) => {
    try {
      let hashPassWord = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassWord,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resole("CREATE SUCCESS");
    } catch (error) {
      reject(error);
    }
  });
};

// hàm dùng để mã hoá pass
let hashUserPassword = (password) => {
  return new Promise(async (resole, reject) => {
    try {
      var hash = await bcrypt.hashSync(password, salt);
      resole(hash);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};