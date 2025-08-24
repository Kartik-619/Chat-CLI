const express=require('express');
const User = require('../schema/User');

//allows to make a get request to send user data into the frontend
const showProfile=async (req,res)=>{
    try{
        const username=req.user.username;
        const user=await User.findOne({username}).select('username details ');
        if(!user){
            return res.status(200).json({
                success:false,
                message:'The user doesnt exists'});
        }
        return res.status(200).json({
            success:true,
            user
        });
    }catch{
        return res.status(500).json({
            success:false,
            message:'server error'
        });
    }
}

//allows to make changes in already exisiting data
const Profile=async (req,res)=> {
    try{
        //add profile photo se
        const username=req.user.username;
        const {bio,gender}=req.body;
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
module.exports={Profile,showProfile};