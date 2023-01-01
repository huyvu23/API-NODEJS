import db from "../models";
var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resole, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"], // define column you want return
        });
        // CHECK PASSWORD
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = `OK`;
            // Bỏ password khi trả về
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Your's User is't exist in your system `;
        }
        // END CHECK
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email is't exist in your system .Please try other email`;
        resole(userData);
      }
      resole(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resole, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resole(true);
      } else {
        resole(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resole, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = db.User.findAll({
          attributes: {
            // SKIP PASSWORD WHEN RETURN
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            // SKIP PASSWORD WHEN RETURN
            exclude: ["password"],
          },
        });
      }

      resole(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createUser = (data) => {
  return new Promise(async (resole, reject) => {
    try {
      // check email is exist ?
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resole({
          errCode: 1,
          message: "Email is exist",
        });
      } else {
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
        resole({
          errCode: 0,
          message: "OK",
        });
      }
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
      reject("Error:", error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        resolve({
          errCode: 2,
          message: "The user isn't exist !",
        });
      } else {
        await db.User.destroy({
          where: { id: userId },
        });
        resolve({
          errCode: 0,
          message: "Delete Success !",
        });
      }
    } catch (error) {
      reject("Error:", error);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Missing id",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (!user) {
        resolve({
          errCode: 1,
          message: "User not found !",
        });
      } else {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address);
        await user.save();
        resolve({
          errCode: 0,
          message: "Update success !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createUser: createUser,
  deleteUserById: deleteUserById,
  editUser: editUser,
};
