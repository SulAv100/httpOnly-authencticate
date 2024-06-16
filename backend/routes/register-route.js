const express = require("express");
const authController = require("../controllers/register-controller.js")
const authMiddleware = require("../middlewares/auth-middleware.js")

const router = express.Router();


router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout)
router.get('/profile', authMiddleware, authController.getProfile);


module.exports = router