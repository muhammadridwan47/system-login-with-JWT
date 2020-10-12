const authRoute = require('express').Router()
const authController = require('../Controllers/Auth')

authRoute.post('/register', authController.register)
authRoute.post('/login', authController.login)
authRoute.post('/token', authController.token)
authRoute.delete('/logout', authController.logout)


module.exports = authRoute


