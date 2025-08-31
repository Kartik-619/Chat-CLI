const express=require('express');
const User=require('../schema/User');
const bcrypt=require('bcryptjs');

const register=async (req,res)=>{
    try{
        const {username,password,email}=req.body;
        const existUser=await User.findOne({username});
        if(existUser){
            return res.status(401).json({success:false,message:'The username already exists..'});
        }
       
        const hashedPassword=await  bcrypt.hash(password,10);
        const user=new User({username,email,password:hashedPassword});
        await user.save();

        res.json({
            success:true,
            message:'The user was successfully registered',
            user:{username,email}
        });


    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

module.exports={register};