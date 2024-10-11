const express = require('express');
const controller = require('../controller/authController')

const route = express.Router();


route.post('/login', controller.loginFunction)
route.post('/signup', controller.signupFucntion)






module.exports = route