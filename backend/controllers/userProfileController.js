const express=require('express');

const Profile=async (req,res)=> {
    try{
        //add profile photo se
        const {username,bio,gender}=req.body;
        const existUser=await User.findOne({username});
                if(!existUser){
                    return res.status(200).json(
                        {success:false,
                        message:'user doesnt exist in the database'});

                }
                existUser.details.bio=await bio;
                existUser.details.gender=await gender;

                
                existUser.save();
                return res.status(200).json({
                    success:true,
                    message:'The Profile has been updated successfully!',
                    existUser:{
                        username:existUser.username,
                       detail:existUser.details
                    }
                });

    }catch(err){
        console.error('error in updating user profile',err);
        return res.status(500).json({success:false,message:'Internal Server Error'});
    }
}
modules.export={Profile};