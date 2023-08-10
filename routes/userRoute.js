const express = require('express')
const userController = require('../controllers/userController');
const middleWare = require("../middleware/middleware") 
const router = express.Router();

router.get("/signup",userController.showSignup);
router.post("/signup",userController.signup);
router.get("/login",userController.showLogin);
router.post("/login",userController.login);
router.post("/logout",userController.logout);
router.get('/',middleWare.isLoggedIn,userController.profile);


module.exports = router;