const TopUp = require('express').Router()
const topupController = require('../Controllers/TopUp')
const Authentication = require('../Helpers/Authentication');

TopUp.get('/',Authentication.allAccess,topupController.getAllTopUp)
TopUp.post('/',Authentication.admin,topupController.addTopUp)
TopUp.delete('/:id',Authentication.admin,topupController.deleteTopUp)
TopUp.put('/:id',Authentication.admin,topupController.updateTopUp)


module.exports = TopUp


