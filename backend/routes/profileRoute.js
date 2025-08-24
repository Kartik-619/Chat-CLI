const express=require('express');
const router=express.Router();
const {Profile,showProfile}=require('../controllers/userProfileController');
const auth=require('../middlewares/authMiddleware');

router.put('/userprofile',auth,Profile);
router.get('/userprofile',auth,showProfile);

module.exports=router;