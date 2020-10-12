const topUpModel = require("../Models/TopUp");

module.exports = {
  getAllTopUp: (req, res) => {
    topUpModel
      .getAllUsers()
      .then((data) => {
        res.status(200).send({
            message: 'Success get all data',
            data: data
        })
      })
      .catch((err) => {
        res.status(500).send({
            message: error.message
        })
      });
  },
  addTopUp: (req, res) => {
    topUpModel
      .addTopUp(req.body)
      .then((data) => {
        res.status(201).send({
            message: 'Success insert data topup',
        })
      })
      .catch((err) => {
        res.status(500).send({
            message: err.message
        })
      });
  },
  deleteTopUp: (req, res) => {
    topUpModel
      .deleteTopUp(req.params.id)
      .then((data) => {
        res.status(200).send({
            message: 'Success delete data topup'
        })
      })
      .catch((err) => {
        res.status(500).send({
            message: err.message
        })
      });
  },
  updateTopUp: (req, res) => {
    topUpModel
      .updateTopUp(req.params.id,req.body)
      .then((data) => {
        res.status(200).send({
            message: 'Success update data topup'
        })
      })
      .catch((err) => {
        res.status(500).send({
            message: err.message
        })
      });
  },
};





