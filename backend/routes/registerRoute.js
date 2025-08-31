const express=require('express');
const router=express.Router();
const {register}=require('../controllers/registerController');
const auth=require('../middlewares/authMiddleware');

router.post('/register',register);

module.exports=router;