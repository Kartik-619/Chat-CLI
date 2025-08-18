//
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String , required:true,unique:true},
    details:{bio:{
        type:String,required:true
    },
    gender:{
        type:String,
        required:true,
        default:null,
        enum:['male','female','other']
    }    
},
    follow:{type:Boolean,required:true},
    follow_list:{type:Array,default:[]}
});

module.exports=mongoose.model('User',userSchema);
