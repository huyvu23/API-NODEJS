import db from "../models";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("data:", data);
    return res.send("Hello from controller");
  } catch (error) {
    console.log(error);
  }
};

export { getHomePage };
