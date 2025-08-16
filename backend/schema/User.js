//
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String , required:true,unique:true},
    bio:{type:String ,required:true},
    follow:{type:Boolean,required:true},
    follow_list:{type:Array}
});

module.exports=mongoose.model('User',userSchema);
