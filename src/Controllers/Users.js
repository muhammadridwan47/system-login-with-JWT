const userModel = require("../Models/Users");
const formResponse = require("../Helpers/FormResponse");

module.exports = {
  getAllUsers: (req, res) => {
    userModel
      .getAllUsers()
      .then((data) => formResponse(data, res, 200))
      .catch((err) => console.log(err));
  },
};





