const express = require('express')
const router = express.Router();

const creatUser = require('../controllers/CreateUserController')


router.post('/', creatUser.createUser)

module.exports = router