const User = require('../schema/User');
const bcrypt=require('bcryptjs');
const login = async (req, res) => {
    //requesting these vars from clien side
    const { username, password } = req.body;
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


        
            return res.json({
                success: true,
                message: 'Login Successful',
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