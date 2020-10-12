const authModel = require("../Models/Auth");
const formResponse = require("../Helpers/FormResponse");

module.exports = {
  register: (req, res) => {
    authModel
      .register(req.body)
      .then((data) => {
        res.status(201).send({
          success: true,
          message: "Register Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.send({
            success: false,
            message: err.message,
          });
      });
  },
  token: (req, res) => {
    authModel
      .token(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Successfully",
          accessToken: data
        });
      })
      .catch((err) => {
        res.send({
            success: false,
            message: err,
          });
      });
  },
  logout: (req, res) => {
    authModel
      .logout(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: data,
        });
      })
      .catch((err) => {
        res.status(401).send({
            success: false,
            message: err,
          });
      });
  },
  login: (req, res) => {
    authModel
      .login(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Login Successfully",
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      })
      .catch((err) => {
        res.send({
            success: false,
            message: err,
          });
      });
  },
 
  
};
