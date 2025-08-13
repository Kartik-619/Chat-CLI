const mongoose=require('mongoose');
MongoUrl='mongodb+srv://testuser:test12345@cluster0.mtcedjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectDB=async ()=>{
    try{
        await mongoose.connect(MongoUrl);
        console.log('Database connected');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports=connectDB;