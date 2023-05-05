
const express = require('express')
const userController = require('../controllers/userControllers.js')
const { signup, login } = userController
const router = express.Router();

router.post('/register',signup);
router.get('/register',signup);


router.post('/login', login )

module.exports = router