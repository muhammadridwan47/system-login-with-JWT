const userRoute = require('express').Router()
const usersController = require('../Controllers/Users')
const Authentication = require('../Helpers/Authentication');

userRoute.get('/',Authentication.allAccess,usersController.getAllUsers)


module.exports = userRoute


