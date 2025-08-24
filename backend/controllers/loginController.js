const User = require('../schema/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();


const login = async (req, res) => {
    //requesting these vars from clien side
    const {email, username, password } = req.body;
    try {
        //validating the client password and username against the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Username does not exist!!' });
        }
       
        //returning the username back upon successful login
       const Match=await  bcrypt.compare(password, user.password);
        if (!Match) {
            return res.status(401).json({
                success: false,
                message: 'The password you have entered is wrong...'
            });
        }
        const payload={
            email:user.email,
            username:user.username,
            loginTime:Date.now()
        };
        const token=jwt.sign(payload,process.env.JWT_KEY||'the-default-secret-key',{expiresIn:'2h'});
        res.cookie('token',token,{
            httpOnly:true,
            //cookies sent only in https production mode
            secure:process.env.NODE_ENV ==='production',
            //cookies is sent with cross-site requests ..prevents CSRF attack
            sameSite:'strict',
            maxAge:2*60*60*1000
        });
            return res.json({
                success: true,
                message: 'Login Successful',
                token,
                user: { username: user.username }
            });
       


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error while logging in'
        });

    }
}
module.exports={login};