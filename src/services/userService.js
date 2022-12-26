import db from "../models";
var bcrypt = require("bcryptjs");

let handleUserLogin = (email, password) => {
  return new Promise(async (resole, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
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

module.exports = {
  handleUserLogin: handleUserLogin,
};
