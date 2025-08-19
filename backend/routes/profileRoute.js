const express=require('express');
const router=express.Router();
const {Profile}=require('../controllers/userProfileController')

router.put('/userprofile',Profile);

module.exports=router;