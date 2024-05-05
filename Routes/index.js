const express = require('express');
const { SendingMessage_Controller } = require('../Controllers/SendingMessage_Controller');
const { SignUP_Controllers, Login_Controller , Check_user_Controller, } = require('../Controllers/auth_controllers');
const { Create_Post_Controller } = require('../Controllers/Create_Post_Controller');
const { Check_auth_middleware } = require('../Middlewares/check_auth_middleware');


const router = express.Router();

router.get('/checkingServer',SendingMessage_Controller)
router.post('/Signup',SignUP_Controllers)
router.post('/Login',Login_Controller)
router.get('/check_user',Check_auth_middleware,Check_user_Controller)
router.post("/Create_Post",Check_auth_middleware,Create_Post_Controller)



module.exports = router;
