import db from "../models";

let getHomePage = async (req, res) => {
  try {
    return res.send("Hello from controller");
  } catch (error) {
    console.log(error);
  }
};

export { getHomePage };
