const User=require('../schema/User.js');
exports.login=async ()=>{
    //requesting these vars from clien side
    const {username,password}=req.body;
    try{
        //validating the client password and username against the database
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({success:false ,message:'Username does not exist!!'});
        }
        if(!user.password!=password){
            return res.status(400).json({success:false,message:'The password you have entered is wrong...'});
        }
        //returning the username back upon successful login
        return res.json({
            success:true,
            message:'Login Successful',
            user:{username:user.username}
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error while logging in'
        });

    }
}