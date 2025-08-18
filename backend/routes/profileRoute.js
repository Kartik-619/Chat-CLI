const express=require('express');
const router=express.Router();

router.put('/userprofile',require('../controllers/userProfileController'));

modules.export=router;