
const express = require('express')
const userController = require('../controllers/userControllers.js')
const { signup, login, findAll } = userController
const router = express.Router();
const auth = require("../middleware/userAuth.js");

router.post('/register', signup);
router.post('/login', login);
//router.get('/login/validate',auth);
router.get('/users', auth, findAll, function (req, res) {
    res.status(200).send({ message: "YOU HAVE ACCESS" })
});
module.exports = router