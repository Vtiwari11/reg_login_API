const express = require('express');
const register = require('../dbconfig/db_connection');
const  router = express.Router();
const auth = require("../middleware/auth");

 
const data=require('../controller/logincontroller');
router.post('/register',data.register);
router.get('/login',data.login);

router.post("/welcome", auth,data.welcome);


 
module.exports=router